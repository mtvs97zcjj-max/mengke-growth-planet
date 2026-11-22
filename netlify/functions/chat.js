const { handleChat } = require("../../lib/chat-core");

exports.handler = async function handler(event) {
  const headers = event.headers || {};
  const ip = String(
    headers["x-nf-client-connection-ip"] ||
    headers["x-forwarded-for"] ||
    event.clientContext?.ip ||
    "unknown"
  ).split(",")[0].trim();
  const result = await handleChat({
    method: event.httpMethod,
    headers,
    body: event.body,
    ip
  });
  return {
    statusCode: result.status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store, max-age=0",
      "X-Content-Type-Options": "nosniff"
    },
    body: JSON.stringify(result.body)
  };
};
