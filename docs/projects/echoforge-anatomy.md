# 解剖 EchoForge

这套书里所有概念，此刻正拼在一起，跑着我们自己的东西。EchoForge——一个基于 Cardano 区块链的存证/凭证系统——的技术栈是四大件：**Cloudflare + Vercel + Supabase + DO**。

完整的逐层解剖在[第一册附录 B](/guide/01/appendix-b)。这里给一张速览表，每一层链向讲透它的章节：

| 层 | 谁在干 | 干什么 | 深入读 |
|---|---|---|---|
| 门口 | Cloudflare | DNS 电话簿 + CDN 调度 + 防护，橙云藏住源站 | [4-1](/guide/04/ch01) |
| 前台 | Vercel | React 前端全球分发 + Serverless 函数 | [1-5](/guide/01/ch05) · [1-11](/guide/01/ch11) |
| 记忆 | Supabase | Postgres + Auth + RLS 行级门规 | [1-3](/guide/01/ch03) · [4-6](/guide/04/ch06) |
| 常驻 | DO 云服务器 | 必须永远醒着的活，systemd 管家照看 | [4-2](/guide/04/ch02) · [4-3](/guide/04/ch03) |
| 石头 | Cardano 链上合约 | 部署后永不能改的"后端"，红线之首 | [1-12](/guide/01/ch12) |
| 信使 | Resend API | 邮件，钥匙住在环境变量口袋里 | [1-4](/guide/01/ch04) · [1-9](/guide/01/ch09) |

另一个世界是 **ForgeCard**：一台插着 NFC 读卡器的树莓派——我们自己客厅里那台永远醒着的小服务器。同样的原理：程序、依赖、日志、systemd，只是它的"用户请求"来自一张靠近的卡片。

::: tip 试一试
这张表是我们画的。轮到你了：把你自己的项目按"层 → 谁在干 → 干什么"画一遍，画不出的那一层，就是下一个该读的章节。
:::
