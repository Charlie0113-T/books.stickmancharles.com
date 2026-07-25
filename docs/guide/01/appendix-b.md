---
stars: 1
readTime: 2
---
# 附录 B · 解剖我们自己的项目

全书的概念不是散的——它们此刻正拼在一起，跑着我们自己的东西。以 EchoForge 为例，画一遍这张地图（以实际代码库为准，欢迎修订）：

EchoForge 的技术栈是四大件：<strong>Cloudflare + Vercel + Supabase + DO</strong>。走一遍用户的旅程，你会看到它们各守一关。

用户打开浏览器，输入我们的<strong>域名</strong>。第一关是 <strong>Cloudflare</strong>：它查自己的电话簿（<strong>DNS</strong>，第 6 章）告诉浏览器该去哪，同时兼任就近分发的调度员和挡掉恶意流量的保安（CDN 与防护）。第二关是 <strong>Vercel</strong>（第 5 章）：送出<strong>前端</strong>——React 页面（第 2 章），并用 <strong>Serverless 函数</strong>处理"偶尔醒一次"的后端请求。第三关是 <strong>Supabase</strong>：那里住着 <strong>Postgres 数据库</strong>（第 3 章），存着用户和凭证的每一行数据，由 <strong>Auth</strong> 管身份、<strong>RLS</strong> 管权限（第 15 章）。第四关是 <strong>DO（DigitalOcean）上那台云服务器</strong>——第 5 章"第二层"的现实版，一台我们自己租的、永远醒着的机器，负责那些必须持续运行的活儿。穿插其间：发邮件时后端去调 <strong>Resend 的 API</strong>，钥匙装在<strong>环境变量</strong>口袋里（第 4、9 章）；而最特殊的一环，真正的凭证被<strong>铸造</strong>在 Cardano <strong>区块链</strong>上，由<strong>智能合约</strong>守规矩——那是一段部署后永不能改的后端，我们最重要的<strong>红线</strong>（第 12 章）。所有代码住在 <strong>GitHub</strong>（第 8 章），每次 push 触发<strong>构建与部署</strong>流水线（第 11 章）。每一层的具体分工，以实际代码库为准——这正是下面这个作业要你亲手核对的。

还有另一个世界：<strong>ForgeCard</strong>。那台插着 NFC 读卡器的树莓派，就是我们自己客厅里一台永远醒着的小<strong>服务器</strong>——同样的原理：程序、依赖、日志、调试，只是它的"用户请求"来自一张靠近的卡片，而不是浏览器。

<strong>一个好作业</strong>：和 AI 一起，把上面这段话画成一张真正的架构图，标出每个箭头对应本书哪一章。画完那天，这本书就读通了。
