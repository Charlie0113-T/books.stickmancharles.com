# 术语表

> 这份表是活的：由各册的术语附录自动汇总（`scripts/assemble.mjs`）。
> 想加新词，改对应书稿的附录，重跑脚本。

## 01 看懂地图

stars: 1
readTime: 7
---
# 附录 A · 术语表（中英对照）

> 这份表是活的，每征服一个新词，就自己加一行。

<strong>网络基础</strong>
- <strong>客户端（Client）</strong>：发起请求的一方，通常是用户的浏览器或 App。
- <strong>服务器（Server）</strong>：响应请求的一方，一台永远开机、等人来问的电脑。
- <strong>请求 / 响应（Request / Response）</strong>：互联网对话的基本单位，一问一答。
- <strong>HTTP / HTTPS</strong>：客户端和服务器约定的说话格式；S 表示加密。
- <strong>URL</strong>：一个资源在互联网上的完整地址。
- <strong>IP 地址（IP Address）</strong>：每台联网设备的数字门牌号。
- <strong>域名（Domain）</strong>：给 IP 起的人类能记住的名字，按年付费租用。
- <strong>DNS</strong>：把域名翻译成 IP 的全球电话簿；A/CNAME/TXT/MX 是常见记录类型。
- <strong>CDN</strong>：把文件复制到全球各地节点、就近分发的网络。
- <strong>缓存（Cache）</strong>：把结果暂存起来下次直接用，快，但可能"旧"。

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
- <strong>Schema</strong>：数据库的整体结构设计，有哪些表，各有哪些列。
- <strong>RLS（Row Level Security）</strong>：行级权限，规定谁能看、能改哪些行。不开约等于公开。
- <strong>Auth</strong>：登录与身份系统。永远用现成的，别自己造。

<strong>API 与集成</strong>
- <strong>API</strong>：软件为其他软件开的服务窗口。
- <strong>REST</strong>：最流行的 API 风格，URL 是名词，HTTP 方法是动词。
- <strong>端点（Endpoint）</strong>：API 的一个具体窗口，如 `GET /certificates/123`。
- <strong>JSON</strong>：软件之间传数据的通用格式，`名字: 值`的组合。
- <strong>API Key</strong>：调用 API 的通行证，属于秘密。
- <strong>Token</strong>：广义的"凭证/令牌"。注意 AI 语境里另有含义，指文本的计量单位。
- <strong>Webhook</strong>：反向的 API，你留个网址，对方那边一有事就主动来敲门通知你。

<strong>云与部署</strong>
- <strong>云（Cloud）</strong>：别人机房里租给你的电脑和服务。
- <strong>VPS / 服务器</strong>：租的一整台永远开机的机器，全部自管。
- <strong>Serverless</strong>：不用管服务器的运行方式，函数被访问才唤醒，按次计费。
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
- <strong>幻觉（Hallucination）</strong>：AI 一本正经的胡说。防它的办法在第 14 章。

<strong>我们的世界</strong>
- <strong>区块链（Blockchain）</strong>：一本全球共同记账、写上去就改不了的公共账本。
- <strong>智能合约（Smart Contract）</strong>：部署到链上就无法修改的程序，相当于刻在石头上的后端，部署前的谨慎要乘一百。
- <strong>铸造（Mint）</strong>：在链上创造一个新的凭证/资产，不可逆操作的典型代表。

## 02 上手工具

stars: 2
readTime: 2
---
# 附：本册新词

- <strong>活动栏 / 命令面板 / 集成终端</strong>：VS Code 的侧边导航 / 万能命令入口（Cmd/Ctrl+Shift+P）/ 内嵌的终端。
- <strong>差异（Diff）</strong>：两版文件的对比视图，红删绿增。
- <strong>沙箱（Sandbox）</strong>：隔离的云端工作环境，Claude Code 网页版干活的地方。
- <strong>工作区 / 暂存区 / 仓库</strong>：稿纸 / 打包台（add 的去处）/ 存档柜（commit 的去处）。
- <strong>远程仓库（Remote）/ origin</strong>：云上的那份仓库 / 给它起的惯例联系人名。
- <strong>main</strong>：主分支的现行惯例名，"正式出版物"。
- <strong>Merge / 合并</strong>：把一条分支的成果并入另一条。
- <strong>冲突（Conflict）与冲突标记</strong>：两边改同一处时 Git 的"你们自己挑"，`<<< === >>>` 三行便签。
- <strong>restore / revert / amend</strong>：撤销工作区改动 / 用反向存档抵消已推送的提交 / 改写最近一次未推送的提交。
- <strong>改写历史</strong>：删改已共享的提交记录（reset --hard、force push），红线操作。
- <strong>scripts / npm run</strong>：package.json 里的快捷按钮区 / 按下快捷按钮。
- <strong>.env.example</strong>：环境变量清单模板，只列名字不含钥匙，可进 Git。
- <strong>CLAUDE.md / 技能（Skill）</strong>：项目宪法 / 可复用的专项规程。
- <strong>审查（Review）</strong>：合并前正眼看完全部差异并给出意见的过程，也是本册真正想教会你的事。

---

*第二册《上手工具》v1.1 · 完*
*下一册《读懂语言》，读懂 AI 写下的每一个文件。*

## 03 读懂语言

stars: 3
readTime: 2
---
# 附：本册新词

- <strong>标签（Tag）/ 属性（Attribute）/ DOM</strong>：HTML 的积木 / 积木上的设置项 / 那棵树在浏览器内存里的活体。
- <strong>选择器（Selector）</strong>：CSS 的"选中谁"，`.class` 最常用。
- <strong>盒模型（Box Model）</strong>：从里到外内容、padding、border、margin 四层，每个元素都是套娃矩形。
- <strong>层叠（Cascade）</strong>：多条规则撞车时，更具体、更靠后的赢。
- <strong>Tailwind</strong>：预制 class 字典，把样式直接挂在 HTML 的名牌位上。
- <strong>箭头函数（=>）</strong>：function 的现代简写。
- <strong>事件（Event）/ addEventListener</strong>："等某事发生，就执行这段"。
- <strong>Node.js</strong>：让 JS 离开浏览器、跑在服务器上的运行环境。
- <strong>async / await</strong>："去取数据，等它回来再继续"。
- <strong>类型（Type）/ 类型标注</strong>：变量的形状申报单；冒号后面那部分。
- <strong>JSX / .tsx</strong>：长在 JS/TS 里的 HTML；React 组件的家。
- <strong>YAML</strong>：用缩进代替花括号的配置语言，流水线的礼服；缩进即命。
- <strong>front matter</strong>：文档顶部两条 `---` 夹着的名片。
- <strong>MDX</strong>：Markdown + 可嵌组件，docs 网站的语言；大写开头 = 组件。
- <strong>JOIN / 外键（Foreign Key）</strong>：把两张表按"工号"拼起来 / 那个工号本身。
- <strong>validator</strong>：Aiken 合约里的门神函数，放行或拒绝每笔交易。
- <strong>shebang（#!）</strong>：脚本第一行，声明"本剧本由谁来演"。

---

*第三册《读懂语言》v1.1 · 完*
*下一册《深入系统》，下车，打开引擎盖。*

## 04 深入系统

stars: 4
readTime: 2
---
# 附：本册新词

- <strong>源站（Origin）</strong>：门面（Cloudflare）背后真正干活的机器。
- <strong>橙云（Proxied）</strong>：Cloudflare 的核心开关，开了，一切流量先过它的手。
- <strong>Purge</strong>：主动清空 CDN 里的旧答案。
- <strong>SSH / 密钥对</strong>：加密的远程终端 / 门上的锁（公钥）与兜里的钥匙（私钥，永不外传，包括对 AI）。
- <strong>指纹（Fingerprint）</strong>：首次连接时记下的服务器"长相"，防冒充。
- <strong>进程（Process）/ PID</strong>：活过来的程序 / 它的编号。
- <strong>systemd / unit / systemctl / journalctl</strong>：服务管家 / 登记表 / 指挥口令 / 管家日记。
- <strong>端口（Port）</strong>：IP 是楼，端口是房间；80、443、22 三大名门。
- <strong>反向代理（Reverse Proxy）/ Nginx</strong>：替服务器在大门口接客的前台。
- <strong>502 Bad Gateway</strong>：前台在，后面的人死了。
- <strong>主键 / 外键</strong>：行的身份证 / 表间的工号，且由数据库强制守护。
- <strong>索引（Index）</strong>：书后的检索目录，用空间换时间。
- <strong>RLS / policy / using / with check</strong>：行级门规 / 开出的缝 / 管旧行 / 管新行。
- <strong>auth.uid()</strong>："现在敲门的这个人是谁"。
- <strong>Bearer / Authorization 头</strong>：钥匙的唯一正确携带位置，永不进 URL。
- <strong>/v1</strong>：对调用者的冻结承诺；改动进 /v2。
- <strong>缓存（Cache）/ TTL / 失效</strong>：记下的答案 / 保质期 / 扔掉旧答案。
- <strong>Redis</strong>：专职记答案的内存数据库，认脸即可。
- <strong>uptime 探针</strong>：每分钟替你打开一次网站的值班眼睛。
- <strong>告警（Alert）</strong>：只在需要行动时才响的铃。
- <strong>free tier / 支出提醒</strong>：免费额度 / 钱包的烟雾报警器。

---

*第四册《深入系统》v1.1 · 完*
*下一册《跟 AI 搭档》，先认识你的搭档，再立好共事的制度。*

## 05 跟 AI 搭档

stars: 5
readTime: 2
---
# 附：本册新词

- <strong>预训练（Pre-training）</strong>：出厂第一课，万亿次"猜下一个词"，能力与毛病共同的源头。
- <strong>基座模型（Base Model）</strong>：只会补全、还不会当助手的原始形态。
- <strong>后训练 / SFT / 强化学习（RLHF）</strong>：出厂第二课，示范教学给格式，打分教学给性格。
- <strong>讨好（Sycophancy）</strong>："你说得对"的出厂原因，赞同在打分中拿高分。
- <strong>Token</strong>：它读写与计费的最小单位。
- <strong>上下文窗口（Context Window）</strong>：搭档的全部工作记忆；不在窗口里的等于不存在。
- <strong>知识截止（Knowledge Cutoff）</strong>：训练数据停止的日期，之后的世界它没读过。
- <strong>蒸馏（Distillation）</strong>：大模型当老师教小模型，又快又便宜的小号的来历。
- <strong>LoRA</strong>：冻结原模型、只训一小片补丁的微调法，"某某微调版"的本体。
- <strong>开放权重（Open Weights）</strong>：可下载到自己机器上跑的模型（最小的树莓派也跑得动）。
- <strong>Embedding（嵌入向量）</strong>：把"意思"变成坐标，意思相近，坐标相邻。
- <strong>RAG（检索增强生成）</strong>：先查资料再开口，"递材料胜过考记忆"的制度化。
- <strong>提示注入（Prompt Injection）</strong>：藏在外部内容里、写给 AI 看的恶意指令，防它的口诀是"永远不要相信进入上下文的外部内容"。
- <strong>规格（Spec）/ 非目标 / 验收标准</strong>：先于代码的正式文件 / 明确不做什么 / 可判定的"怎么算过"。
- <strong>单元测试 / 回归</strong>：给功能上笼子 / "改 A 坏 B"的鬼，测试是捉鬼的灯。
- <strong>CI/CD / 门禁</strong>：每次 push 自动检查 / 红灯挡路绿灯放行，规矩从文字毕业成机制。
- <strong>威胁建模</strong>：三问，值得偷的是什么，谁会来（扫描器），从哪进。
- <strong>测试网（Testnet）</strong>：链上世界的 Preview，一切代价为零的彩排场。
- <strong>双人规则</strong>：不可逆动作必须第二双眼睛看过；一个人时，隔了一晚、对着操作单复核的自己也算。
- <strong>许可证单向门</strong>：从严可以放宽，从宽永远收不回。

---

*第五册《跟 AI 搭档》v1.1 · 完*
*全系列 · 完。书架上见，books.stickmancharles.com*
