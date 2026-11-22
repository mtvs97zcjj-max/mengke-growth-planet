# 云端发布说明

这个项目同时兼容 Netlify Functions 和 Vercel Serverless。当前 `majestic-lolly-be6bcf.netlify.app` 是静态发布，因此页面和安装功能正常，但 `/api/chat` 返回 404，智能聊天没有真正启用。

## 1. 准备密钥

在 OpenAI API 平台创建一个服务端 API Key。密钥只会填写在 Vercel 的环境变量里，不需要写入 `app.js` 或发给浏览器。

## 2. 修复当前 Netlify 网站

注意：在 Netlify 页面里直接拖拽文件只能发布静态页面，不会带上 `netlify/functions/chat.js`。需要让 Netlify 从 Git 仓库构建一次。

1. 使用新版 `mengke-learning-workbench.zip` 或项目目录，确保包含：
   - `netlify.toml`
   - `netlify/functions/chat.js`
   - `lib/chat-core.js`
2. 把这些文件更新到 GitHub 仓库。
3. 打开现有 Netlify 站点，进入 Site configuration → Build & deploy，将站点链接到该 Git 仓库。
4. 如果无法给现有站点链接仓库，可以新建一个 Netlify 站点并选择 Git 导入。
5. 添加环境变量：
   - `OPENAI_API_KEY`：服务端 API Key。
   - `OPENAI_MODEL`：可留空；默认 `gpt-4.1-mini`。
6. 触发一次 Deploy，等待 Functions 构建完成。
7. 重新打开网站并进入聊天，标题旁应显示“智能陪伴 · 已连接”。

## 3. 用浏览器发布到 Vercel（备选）

### 先把文件放进 GitHub

1. 打开 GitHub，新建一个空仓库，例如 `mengke-growth-planet`。
2. 解压 `mengke-learning-workbench.zip`。
3. 在空仓库页面选择“上传已有文件”，把解压目录里的全部文件和文件夹拖进去。
4. 确认能看到 `index.html`、`app.js`、`api`、`icons`、`package.json` 等文件，然后提交。

### 再由 Vercel 发布

1. 登录 Vercel，选择“Add New → Project”。
2. 连接刚才的 GitHub 仓库并导入。
3. Framework Preset 选择 `Other`，不需要设置 Build Command。
4. 在 Environment Variables 中添加：
   - `OPENAI_API_KEY`：你的服务端 API Key。
   - `OPENAI_MODEL`：可留空；默认使用 `gpt-4.1-mini`。
5. 三个环境都建议勾选 Production、Preview、Development。
6. 点击 Deploy。

发布后访问 Vercel 提供的 HTTPS 地址。打开工作台，进入“成长记录 → 家长设置 → 安装”，即可把图标添加到桌面。

如果直接在 Vercel 修改了环境变量，需要回到 Deployments 页面重新部署一次。

## 4. 验证智能聊天

打开“和萌可聊聊”，标题旁应显示“智能陪伴 · 已连接”。连续聊三轮，例如：

1. “我明天要去新学校，有点紧张。”
2. “嗯。”
3. “我担心找不到教室。”

萌可应能继续理解“新学校、紧张、找教室”是同一条对话线，而不是重新给一段无关回答。

如果显示“本地陪聊”，请检查所选平台的 `OPENAI_API_KEY` 环境变量，并在修改后重新部署。

## 安全说明

- API Key 只存放在云端环境变量，前端永远不接触密钥。
- `/api/chat` 限制请求长度、消息数量、返回字数，并带有基础频率限制。
- 云端提示词包含儿童隐私、伤害披露、成人内容和危险内容的保护规则。
- 对话不会写入本站数据库；模型服务商的数据处理仍应以其 API 条款为准。
- 公网发布前建议在 Vercel 配置用量告警和预算上限。
