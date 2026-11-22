const { handleChat } = require("../lib/chat-core");

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store, max-age=0");
  res.setHeader("X-Content-Type-Options", "nosniff");
  const ip = String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown")
    .split(",")[0]
    .trim();
  const result = await handleChat({
    method: req.method,
    headers: req.headers,
    body: req.body,
    ip
  });
  res.status(result.status).json(result.body);
};
