
% AI Prompt for building datax.cash (updated with client confirmations)

目标：为网站 datax.cash（后续独立 repo/project：datax-cash-site）生成一份供 AI 使用的完整 Prompt 文档。该 Prompt 将被用于后续生成独立的、静态的前端站点代码（不在当前仓库内直接开发），并严格遵守以下已确认的设计与技术要求。

项目已确认要点（来自客户）
- 主要语言：默认英文，但必须原生支持多语（繁体中文 zh-TW）。
- Logo：当前无现成 logo，请 AI 生成一个极简风格的 logo（SVG 为佳），slogan: "Price Ur Data,  Cash Ur Data"。
- 登录/注册：不需要静态登录/注册表单占位。
- 托管目标：GitHub Pages / self-hosted（用户将使用 GitHub Pages 或自托管 Nginx）。
- 日志与分析：必须包含完整的访问日志记录与文件下载记录与分析设计（详见下文）。
- 服务器建议：基于 Nginx 管理，提供示例 nginx 配置片段（仅作参考）。
- 隔离要求：生成的项目须为独立项目（例如：`datax-cash-site/`），与当前仓库保持隔离；本 Prompt 仅写入当前仓库的 `web/` 目录作为需求文档，不会生成代码在此仓库中。

一、总体说明（给 AI 的任务指令）
- 目标受众：面向开发者、数据提供者与运维工程师，介绍服务能力、定价、文档和下载管控。优先保证信息清晰、信任感与 CTA 明确。
- 参考结构：以 https://termius.com/ 为布局参考（顶部导航 + Hero + 功能卡片 + 演示/截图 + 定价 + FAQ + 页脚）。
- 输出要求（给后续生成器/开发者的明确清单）：生成一个独立项目文件夹 `datax-cash-site/`，包含至少：
  - index.html, features.html, pricing.html, docs.html（或多语言等价页面）
  - /assets/images/ （SVG/PNG 占位与生成的极简 logo.svg）
  - /assets/images/ （SVG/PNG 占位与生成的极简 logo.svg）。注意：LOGO 图标与 SLOGAN 应分开输出——图标/标识文件例如 `logo.svg` 与 `logo-64.png` 仅包含视觉元素或字体标识；SLOGAN 应作为独立文本文档或在 README/HTML 中以文本形式提供（例如 `assets/images/slogan.txt` 或在页面模板中单独字段），以便多语言与样式分离。
  - /assets/css/tailwind.css 或 tailwind 构建说明
  - /assets/js/main.js（交互逻辑）
  - tailwind.config.js, postcss.config.js（如需）
  - README.md（包含本地预览、构建、部署到 GitHub Pages 与 Nginx 的说明）
  - /i18n/ 或 /locales/（每种语言的翻译 JSON 或独立页面说明）

二、设计风格（必须遵守）
- 主色调：深蓝（示例 #0b2747）; 辅色：白、浅灰（#f5f7fa、#e6e9ef）。
- 字体：Inter（Google Fonts 或本地）。
- 排版：清晰标题层级，正文易读。H1~H3 提示字号建议见原 Prompt。
- 动画：平滑滚动、悬停过渡、页面过渡（淡入/上滑）。
- 响应式：断点 sm/md/lg/xl，移动端汉堡菜单。

三、技术要求（必须逐条满足）
- 语义化 HTML5 标签（header/nav/main/section/article/footer 等）。
- 使用 Tailwind CSS（可提供 CDN 快速预览与 Tailwind CLI 构建说明）。
- 原生 JavaScript（ES6+）：导航、汉堡菜单、语言切换、页面内锚点平滑滚动、图片懒加载（IntersectionObserver）。
- 不使用任一前端框架。
- 代码需含详细注释（中文/英文皆可）。

四、多语言实现建议（静态站点策略）
- 选项 A（推荐）：为每种语言生成独立页面目录： `/en/index.html`, `/zh-cn/index.html`, `/zh-tw/index.html`，并在每页提供显著的语言切换控件；优点：SEO 与无 JS 环境兼容。
- 选项 B（备用）：单页 HTML + JS 动态替换文案，使用 JSON 翻译文件（/i18n/en.json, zh-CN.json, zh-TW.json）。适合更小项目但需 JS 支持。

五、Logo 说明（AI 需生成）
- 风格：极简、扁平、可缩放的 SVG；可包含字母 "DX" 或象征现金/数据的简化图形，颜色主用 dx-blue。
- 输出：SVG 文件（logo.svg）和一个小尺寸 PNG（logo-64.png）占位。

- 额外要求：LOGO 图标与 SLOGAN 必须分开交付。
  - 图标文件：`assets/images/logo.svg`（矢量）和 `assets/images/logo-64.png`（小图标），仅包含图形与/或品牌字母（例如 DX），不包含长文本或标语。
  - SLOGAN：应作为独立的文本资源（例如 `assets/images/slogan.txt` 或在 `README.md` 与 HTML 模板中以文本文案存在），示例英文文案："Price Ur Data, Cash Ur Data"。多语言版本应在对应语言目录或 i18n JSON 中提供。

六、日志与下载追踪规范（关键且已明确要求）
（目标）：提供完整的访问日志与文件下载记录，便于后续分析与合规审计。日志方案须兼容自托管 Nginx 与 GitHub Pages（对 GitHub Pages，说明其限制并推荐把下载文件走 Nginx 或对象存储）。

日志记录建议：
- 访问日志（Nginx）：使用 JSON 格式的 access log（每行一条 JSON），字段包括 timestamp、client_ip、method、path、status、bytes_sent、referer、user_agent、request_id（UUID）。示例 nginx log_format 可附在 README。
- 下载日志：对于所有可下载文件（例如 /downloads/filename），在 Nginx 层使用 X-Accel-Redirect 或代理到一个记录端点，或在应用层（若存在）记录。日志中应包含：timestamp、client_ip、user_agent、file_id、file_name、file_size、referrer、download_method（http/accelerated）、user_id（若有认证）、request_id。
- 结构化日志示例（JSON line）：
  {
    "ts":"2025-09-02T12:34:56Z",
    "request_id":"uuid-...",
    "client_ip":"1.2.3.4",
    "method":"GET",
    "path":"/downloads/data.csv",
    "status":200,
    "bytes":12345,
    "file_id":"data.csv",
    "user_agent":"...",
    "referrer":"https://..."
  }

日志保留与轮转：建议使用 logrotate 或类似工具，README 应说明保留策略与 GDPR/隐私注意事项（IP 采集/哈希化策略）。

分析建议：
- 提供一个简单的 log-parser 脚本（Python/Node 可选，作为示例，不包含在当前 Prompt 代码输出中），用于统计下载次数、按文件/按天的访问量、异常下载速率提醒。AI 在生成静态站点时应在 README 中附示例命令与输出格式。

七、Nginx 管理与示例配置
- 在 README 中提供参考 nginx 配置片段：
  - JSON access_log 的 format, log rotation 示例
  - 文件加速（X-Accel-Redirect）或直接托管静态文件示例
  - 为下载提供单独 location（例如 /downloads/），并示例如何将 download 请求记录到单独日志文件

八、隐私与合规要点（提示 AI 提示词）
- 在 README 中列出对用户隐私的基本建议：IP 最小化/哈希策略、日志加密/限制访问、数据保留期限说明。

九、输出项目结构约定（独立项目）
datax-cash-site/
├─ index.html
├─ features.html
├─ pricing.html
├─ docs.html
├─ en/
├─ zh-cn/
├─ zh-tw/
├─ assets/
│  ├─ css/
│  ├─ js/
│  └─ images/
├─ i18n/
├─ tailwind.config.js
├─ postcss.config.js
├─ README.md
└─ nginx/
   └─ example_nginx.conf

十、交付格式与验收标准（QA checklist）
- Prompt 及交付说明文件位于 `web/AI_PROMPT_for_datax_cash.md`（本文件）。
- 当 AI 使用本 Prompt 生成代码时，生成结果应为一个独立的、可直接在本地打开或部署到 GitHub Pages/Nginx 的项目文件夹。
- 日志与下载记录方案需包含示例 nginx 配置与 log 格式说明。

十一、注意事项（重要：当前阶段）
- 当前你已明确："不要开发代码， 目前只需要PROMPT文件，需要同当前项目隔离， 我会启动独立项目！"。因此本文件仅作为 AI Prompt/需求说明，不会在当前仓库生成可执行代码或修改其他项目文件。

十二、后续指示（当你准备好生成代码时）
- 若需我接着生成独立项目的静态代码，请回复并确认：
  1) 是否接受建议的多语言实现方式（独立目录 vs 单页 JS 切换）？
  2) 是否接受将下载流量通过 Nginx 并记录到单独日志的建议（是/否）？
  3) 你希望 logo 的风格偏文字（DX）还是图形化（图标 + 字母）？

——

本文件已更新为最终 Prompt 文档（放在 `web/AI_PROMPT_for_datax_cash.md`），如需微调文本或添加更多日志/合规细节，请告知要点，我会立即修改。 

