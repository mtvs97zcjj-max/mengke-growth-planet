let blobModule = null;
const latestProgress = globalThis.__mengkeLatestProgress || new Map();
globalThis.__mengkeLatestProgress = latestProgress;
try {
  blobModule = require("@netlify/blobs");
} catch {
  // The frontend remains usable if the storage package is unavailable.
}

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store, max-age=0",
      "X-Content-Type-Options": "nosniff"
    },
    body: JSON.stringify(body)
  };
}

function normalizeHeaders(headers = {}) {
  return Object.fromEntries(
    Object.entries(headers).map(([key, value]) => [String(key).toLowerCase(), value])
  );
}

function validDeviceId(value) {
  return /^[a-zA-Z0-9-]{12,80}$/.test(String(value || ""));
}

exports.handler = async function handler(event) {
  const headers = normalizeHeaders(event.headers || {});
  const origin = headers.origin;
  const host = headers.host;
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) return json(403, { error: "origin_not_allowed" });
    } catch {
      return json(403, { error: "origin_not_allowed" });
    }
  }

  const deviceId = event.queryStringParameters?.deviceId;
  if (!validDeviceId(deviceId)) return json(400, { error: "device_id_required" });
  if (!blobModule?.getStore) return json(503, { error: "storage_not_available" });

  if (typeof blobModule.connectLambda === "function") {
    blobModule.connectLambda(event);
  }
  const store = blobModule.getStore("mengke-learning-progress");
  const key = `device/${deviceId}`;

  if (event.httpMethod === "GET") {
    if (latestProgress.has(key)) {
      return json(200, { ok: true, progress: latestProgress.get(key) });
    }
    const progress = await store.get(key, { type: "json" }).catch(() => null);
    if (progress) latestProgress.set(key, progress);
    return json(200, { ok: true, progress: progress || null });
  }

  if (event.httpMethod !== "POST") return json(405, { error: "method_not_allowed" });
  if (String(event.body || "").length > 250_000) return json(413, { error: "payload_too_large" });

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { error: "invalid_json" });
  }
  if (!payload.progress || typeof payload.progress !== "object") {
    return json(400, { error: "progress_required" });
  }

  const progress = {
    days: payload.progress.days && typeof payload.progress.days === "object" ? payload.progress.days : {},
    skills: payload.progress.skills && typeof payload.progress.skills === "object" ? payload.progress.skills : {},
    stars: Math.max(0, Number(payload.progress.stars) || 0),
    pet: payload.progress.pet && typeof payload.progress.pet === "object" ? payload.progress.pet : {},
    updatedAt: new Date().toISOString()
  };

  await store.setJSON(key, progress);
  latestProgress.set(key, progress);
  return json(200, { ok: true, updatedAt: progress.updatedAt });
};
