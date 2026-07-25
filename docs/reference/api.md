# API

> 软件之间的服务窗口。

## 认脸
- REST：URL 是名词（`/v1/certificates/123`），HTTP 方法是动词（GET/POST/PATCH/DELETE）
- 状态码头牌：200 成了 · 400 你有毛病 · 401/403 你是谁/你不许 · 404 没有 · 500 我坏了
- 设计四柱：名词 URL、统一响应形状、钥匙进请求头、`/v1` 从第一天开始

## 常见坑
- API Key 放进 URL = 钥匙写在明信片上——只放 `Authorization` 请求头
- 已发布的接口只能追加，不能背叛（和链上合约、Git 公共历史同族）

## 深入读
- [第一册 第 4 章 · API](/guide/01/ch04)
- [第四册 第 7 章 · 自己开窗口](/guide/04/ch07)

## 官方
- [MDN · HTTP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP)
