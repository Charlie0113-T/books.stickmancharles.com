# 域名与 DNS

> 互联网的门牌与电话簿。

## 认脸
- A 记录：名字 → IP；CNAME：名字 → 名字；TXT：贴便签证明所有权；MX：邮件去向
- 改记录要等：全球电话簿副本按 TTL 陆续更新（传播）
- `@` 代表根域名本身

## 常见坑
- 一部分人打得开一部分打不开 = 传播没走完，先别慌
- 改 DNS 前截图留底——写错一条，全站失联

## 深入读
- [第一册 第 6 章 · 域名与 DNS](/guide/01/ch06)
- [第四册 第 1 章 · Cloudflare 全解](/guide/04/ch01)

## 官方
- [Cloudflare · DNS 学习中心](https://www.cloudflare.com/zh-cn/learning/dns/what-is-dns/)
