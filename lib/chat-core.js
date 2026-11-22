const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 40;
const rateBuckets = globalThis.__mengkeRateBuckets || new Map();
globalThis.__mengkeRateBuckets = rateBuckets;

function providerFromEnvironment() {
  const providers = [
    {
      id: "deepseek",
      label: "DeepSeek",
      key: process.env.DEEPSEEK_API_KEY,
      baseUrl: process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com",
      model: process.env.DEEPSEEK_MODEL || "deepseek-chat"
    },
    {
      id: "doubao",
      label: "豆包",
      key: process.env.DOUBAO_API_KEY || process.env.ARK_API_KEY,
      baseUrl: process.env.DOUBAO_BASE_URL || "https://ark.cn-beijing.volces.com/api/v3",
      model: process.env.DOUBAO_MODEL || process.env.ARK_MODEL || ""
    },
    {
      id: "openai",
      label: "OpenAI",
      key: process.env.OPENAI_API_KEY,
      baseUrl: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1",
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini"
    }
  ];
  const requested = String(process.env.AI_PROVIDER || "").trim().toLowerCase();
  if (requested) {
    const explicit = providers.find((provider) => provider.id === requested);
    if (explicit?.key) return explicit;
  }
  return providers.find((provider) => provider.key) || null;
}

function chatEndpoint(provider) {
  const base = String(provider.baseUrl || "").replace(/\/+$/, "");
  if (base.endsWith("/chat/completions")) return base;
  return `${base}/chat/completions`;
}

function extractReply(data) {
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((part) => typeof part === "string" ? part : part?.text || part?.content || "")
      .join(" ");
  }
  return "";
}

const SYSTEM_PROMPT = `你是“萌可”，一个住在儿童学习工作台里的奶油色小宠物伙伴。你正和一名约5岁、即将上小学一年级的中国女孩聊天。

对话目标：
- 像熟悉孩子、认真倾听的温柔大姐姐一样自然交谈，不像客服，不像机器人在套模板。
- 必须先接住孩子刚刚说的具体内容，再自然回应。孩子换话题时立刻跟着换，不要硬拉回旧话题。
- 记得最近对话里的人物、地点、事件和情绪，正确理解“他、她、它、那里、刚才”等指代。
- 每次回复通常2到4个短句，约35到110个汉字。自然时可以不问问题；需要追问时最多问一个问题。
- 孩子只回答“嗯、是、不是、不知道”时，要接着上一轮的话题，不要重新开始或答非所问。
- 使用5岁孩子能听懂的口语，温和、具体、有陪伴感。避免说教、心理学术语、夸张承诺和固定口头禅。
- 家长或孩子提到学习时，可以给一个很小、可执行的办法，但不要每次都出题。
- 不复述孩子原话超过12个字，不使用Markdown、列表、标题、网址、电话或联系方式。
- 孩子问英语时可以自然双语；其余默认简体中文。

儿童安全边界：
- 不索取姓名、学校全名、住址、电话、照片、密码或其他隐私。
- 不鼓励隐瞒虐待、受伤、威胁或危险行为。出现这些情况时，先表达关心，再明确让孩子立刻告诉家长、老师或其他可信赖的大人。
- 不提供成人、浪漫、性、暴力或危险行为指导，不诱导线下见面，不冒充真实人类或声称自己有真实身体。
- 不诊断疾病。涉及身体或心理紧急情况时，明确建议找可信赖的大人及专业人员。
- 如果不知道答案，坦率说不知道，可以陪孩子一起想或建议问大人，不编造事实。`;

function normalizeHeaders(headers = {}) {
  return Object.fromEntries(
    Object.entries(headers).map(([key, value]) => [String(key).toLowerCase(), value])
  );
}

function normalizeBody(body) {
  if (body && typeof body === "object") return body;
  if (typeof body === "string" && body.length <= 12_000) {
    try {
      return JSON.parse(body);
    } catch {
      return null;
    }
  }
  return null;
}

function isRateLimited(ip) {
  const now = Date.now();
  const bucket = rateBuckets.get(ip);
  if (!bucket || now - bucket.startedAt > RATE_LIMIT_WINDOW_MS) {
    rateBuckets.set(ip, { startedAt: now, count: 1 });
    return false;
  }
  bucket.count += 1;
  return bucket.count > RATE_LIMIT_MAX;
}

function cleanReply(text) {
  return String(text || "")
    .replace(/https?:\/\/\S+/gi, "")
    .replace(/\b\d{7,}\b/g, "")
    .replace(/[*#>`]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 320);
}

async function handleChat({ method = "GET", headers = {}, body = null, ip = "unknown" } = {}) {
  const normalizedHeaders = normalizeHeaders(headers);
  const provider = providerFromEnvironment();

  if (method === "GET") {
    return {
      status: 200,
      body: {
        ok: true,
        configured: Boolean(provider?.key && provider?.model),
        provider: provider?.id || "none",
        label: provider?.label || "",
        model: provider?.model || "",
        configError: provider?.id === "doubao" && !provider.model ? "DOUBAO_MODEL_REQUIRED" : ""
      }
    };
  }

  if (method !== "POST") {
    return { status: 405, body: { error: "method_not_allowed" } };
  }

  if (Number(normalizedHeaders["content-length"] || 0) > 12_000) {
    return { status: 413, body: { error: "payload_too_large" } };
  }

  const origin = normalizedHeaders.origin;
  const host = normalizedHeaders.host;
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) {
        return { status: 403, body: { error: "origin_not_allowed" } };
      }
    } catch {
      return { status: 403, body: { error: "origin_not_allowed" } };
    }
  }

  if (isRateLimited(ip)) {
    return { status: 429, body: { error: "too_many_requests" } };
  }

  if (!provider?.key) {
    return { status: 503, body: { error: "chat_not_configured" } };
  }
  if (!provider.model) {
    return {
      status: 503,
      body: { error: "chat_model_not_configured", provider: provider.id }
    };
  }

  const parsedBody = normalizeBody(body);
  if (!parsedBody || !Array.isArray(parsedBody.messages)) {
    return { status: 400, body: { error: "invalid_request" } };
  }
  try {
    if (JSON.stringify(parsedBody).length > 12_000) {
      return { status: 413, body: { error: "payload_too_large" } };
    }
  } catch {
    return { status: 400, body: { error: "invalid_request" } };
  }

  const messages = parsedBody.messages
    .slice(-14)
    .filter((message) => message && ["user", "assistant"].includes(message.role))
    .map((message) => ({
      role: message.role,
      content: String(message.content || "").trim().slice(0, 500)
    }))
    .filter((message) => message.content);

  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return { status: 400, body: { error: "user_message_required" } };
  }

  const context = parsedBody.appContext && typeof parsedBody.appContext === "object" ? parsedBody.appContext : {};
  const conversation = parsedBody.conversation && typeof parsedBody.conversation === "object"
    ? parsedBody.conversation
    : {};
  const childName = String(context.childName || "小朋友").slice(0, 12);
  const completedTasks = Array.isArray(context.completedTasks)
    ? context.completedTasks.map((item) => String(item).slice(0, 20)).slice(0, 6)
    : [];
  const contextNote = [
    `孩子昵称：${childName}`,
    `当前时段：${String(context.timeOfDay || "今天").slice(0, 8)}`,
    `今天已完成：${completedTasks.length ? completedTasks.join("、") : "还没有打卡任务"}`,
    `当前星星：${Math.max(0, Number(context.stars) || 0)}`,
    `萌可开心程度：${Math.max(0, Math.min(100, Number(context.petHappiness) || 0))}%`,
    `上一轮话题：${String(conversation.topic || "无").slice(0, 20)}`,
    `上一轮情绪：${String(conversation.emotion || "未识别").slice(0, 20)}`,
    `上一轮萌可的问题：${String(conversation.lastQuestion || "无").slice(0, 100)}`
  ].join("\n");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 18_000);
  try {
    const upstream = await fetch(chatEndpoint(provider), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${provider.key}`
      },
      body: JSON.stringify({
        model: provider.model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "system", content: `本轮应用上下文：\n${contextNote}` },
          ...messages
        ],
        temperature: 0.75,
        max_tokens: 220
      }),
      signal: controller.signal
    });

    if (!upstream.ok) {
      return {
        status: upstream.status === 429 ? 429 : 502,
        body: { error: "upstream_error", provider: provider.id }
      };
    }

    const data = await upstream.json();
    const reply = cleanReply(extractReply(data));
    if (!reply) return { status: 502, body: { error: "empty_reply", provider: provider.id } };
    return {
      status: 200,
      body: { reply, provider: provider.id, label: provider.label, model: provider.model }
    };
  } catch {
    return { status: 502, body: { error: "chat_unavailable", provider: provider.id } };
  } finally {
    clearTimeout(timeout);
  }
}

module.exports = { handleChat };
