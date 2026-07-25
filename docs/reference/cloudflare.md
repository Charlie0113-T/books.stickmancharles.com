# Cloudflare

> 电话簿 + 调度员 + 保安，三位一体。

## 认脸
- 一切能力源于一个事实：**橙云一开，所有流量先过它的手**
- 橙云 = 藏源站 + CDN + 防护生效；灰云 = 只做 DNS 直连
- SSL 模式用 Full/Strict，别用 Flexible（半程裸奔）

## 常见坑
- 改了记录不生效：传播 + 缓存，等或 Purge
- "重定向次数过多" = SSL 模式配错的经典症状

## 深入读
- [第一册 第 6 章 · 域名与 DNS](/guide/01/ch06)
- [第四册 第 1 章 · Cloudflare 全解](/guide/04/ch01)

## 官方
- [developers.cloudflare.com](https://developers.cloudflare.com/)
