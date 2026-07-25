---
stars: 1
readTime: 7
---
# 附录 A · 术语表（中英对照）

> 这份表是活的：每征服一个新词，就自己加一行。

<strong>网络基础</strong>
- <strong>客户端（Client）</strong>：发起请求的一方，通常是用户的浏览器或 App。
- <strong>服务器（Server）</strong>：响应请求的一方，一台永远开机、等人来问的电脑。
- <strong>请求 / 响应（Request / Response）</strong>：互联网对话的基本单位——一问一答。
- <strong>HTTP / HTTPS</strong>：客户端和服务器约定的说话格式；S 表示加密。
- <strong>URL</strong>：一个资源在互联网上的完整地址。
- <strong>IP 地址（IP Address）</strong>：每台联网设备的数字门牌号。
- <strong>域名（Domain）</strong>：给 IP 起的人类能记住的名字，按年付费租用。
- <strong>DNS</strong>：把域名翻译成 IP 的全球电话簿；A/CNAME/TXT/MX 是常见记录类型。
- <strong>CDN</strong>：把文件复制到全球各地节点、就近分发的网络。
- <strong>缓存（Cache)</strong>：把结果暂存起来下次直接用，快，但可能"旧"。

<strong>前端与后端</strong>
- <strong>前端（Frontend）</strong>：跑在用户设备上的那一半，用户看得见也改得了。
- <strong>后端（Backend）</strong>：跑在服务器上的那一半，掌管规则与数据。
- <strong>HTML / CSS / JavaScript</strong>：页面的骨架 / 皮肤 / 动作。
- <strong>框架（Framework）</strong>：一套现成的搭建方式和规矩，如 React。
- <strong>React</strong>：把界面拆成可复用"积木"（组件）来拼的前端框架。
- <strong>组件（Component）</strong>：界面积木，一块可复用的界面单元。
- <strong>全栈（Full-stack）</strong>：前后端都做，AI 时代你我默认就是全栈。

<strong>数据与存储</strong>
- <strong>数据库（Database）</strong>：专门负责"记住"的软件。
- <strong>表 / 行 / 列（Table / Row / Column）</strong>：数据的抽屉 / 一条记录 / 一个属性。
- <strong>SQL</strong>：和数据库说话的语言，核心是查增改删四个动词。
- <strong>Postgres</strong>：最流行的开源关系型数据库，Supabase 的地基。
- <strong>Supabase</strong>：托管好的 Postgres，附送登录、存储和现成 API。
- <strong>迁移（Migration）</strong>：把每次表结构变更写成脚本，让数据库历史可追溯、可重放。
- <strong>Schema</strong>：数据库的整体结构设计——有哪些表、各有哪些列。
- <strong>RLS（Row Level Security）</strong>：行级权限——规定谁能看、能改哪些行。不开约等于公开。
- <strong>Auth</strong>：登录与身份系统。永远用现成的，别自己造。

<strong>API 与集成</strong>
- <strong>API</strong>：软件为其他软件开的服务窗口。
- <strong>REST</strong>：最流行的 API 风格——URL 是名词，HTTP 方法是动词。
- <strong>端点（Endpoint）</strong>：API 的一个具体窗口，如 `GET /certificates/123`。
- <strong>JSON</strong>：软件之间传数据的通用格式，"名字: 值"的组合。
- <strong>API Key</strong>：调用 API 的通行证，属于秘密。
- <strong>Token</strong>：广义的"凭证/令牌"。注意 AI 语境里另有含义：文本的计量单位。
- <strong>Webhook</strong>：反向的 API——你留个网址，对方那边一有事就主动来敲门通知你。

<strong>云与部署</strong>
- <strong>云（Cloud）</strong>：别人机房里租给你的电脑和服务。
- <strong>VPS / 服务器</strong>：租的一整台永远开机的机器，全部自管。
- <strong>Serverless</strong>：不用管服务器的运行方式——函数被访问才唤醒，按次计费。
- <strong>Function / Edge Function</strong>：Serverless 里那段"被叫醒才干活"的代码。
- <strong>Vercel</strong>：前端全球分发 + 后端函数托管 + 连 GitHub 自动部署的平台。
- <strong>部署（Deploy）</strong>：把代码放到全世界能访问的地方跑起来。
- <strong>构建（Build）</strong>：把源代码翻译、打包成可上线成品的过程。
- <strong>localhost</strong>：你自己这台电脑；只有你访问得到。
- <strong>开发 / 预览 / 生产环境（Dev / Preview / Production）</strong>：私人试验田 / 每次改动的临时预览网址 / 真实用户用的正式版。
- <strong>回滚（Rollback）</strong>：一键退回上一个正常版本。
- <strong>CI/CD</strong>：push 后自动测试、自动部署的流水线的统称。

<strong>版本控制</strong>
- <strong>Git</strong>：代码的时间机器。
- <strong>GitHub</strong>：Git 仓库的云端家园与协作社区。
- <strong>仓库（Repository / Repo）</strong>：一个项目的全部代码和全部历史。
- <strong>commit</strong>：一个存档点，附一句改动说明。
- <strong>branch / merge</strong>：开平行宇宙试新想法 / 把宇宙合回主线。
- <strong>push / pull / clone</strong>：上传存档 / 拉取存档 / 整仓复制。
- <strong>PR（Pull Request）</strong>："我改好了，请过目后合并"的正式流程。
- <strong>.gitignore</strong>：告诉 Git"这些文件别拍进存档"的清单，`.env` 必须在列。

<strong>依赖与工具</strong>
- <strong>库 / 包（Library / Package）</strong>：别人写好打磨好的轮子。
- <strong>npm / pip</strong>：JavaScript / Python 世界的包管理器。
- <strong>依赖（Dependency）</strong>：你的项目用到的所有外部包。
- <strong>package.json / lock 文件</strong>：购物清单 / 把精确版本钉死的清单。
- <strong>node_modules</strong>：按清单搬回家的货，巨大而正常，可随时重装。
- <strong>终端（Terminal / CLI）</strong>：用命令和电脑对话的界面。
- <strong>日志（Log）</strong>：程序运行过程的流水账，排查问题的第一现场。
- <strong>环境变量（Environment Variable）</strong>：放在代码外面的配置与秘密口袋。
- <strong>.env</strong>：本地集中存放环境变量的文件，永不进 Git。

<strong>AI 协作</strong>
- <strong>上下文（Context）</strong>：AI 当前"视野"里的全部信息；有限，会被挤出去。
- <strong>提示词（Prompt）</strong>：你对 AI 说的话；质量决定产出。
- <strong>Agent</strong>：能自己计划、执行、观察、再计划的 AI 工作方式，Claude Code 即是。
- <strong>幻觉（Hallucination）</strong>：AI 一本正经的胡说。防它的方法是第 14 章。

<strong>我们的世界</strong>
- <strong>区块链（Blockchain)</strong>：一本全球共同记账、写上去就改不了的公共账本。
- <strong>智能合约（Smart Contract）</strong>：部署到链上就无法修改的程序——刻在石头上的后端，所以部署前的谨慎要乘一百。
- <strong>铸造（Mint）</strong>：在链上创造一个新的凭证/资产，不可逆操作的典型代表。
