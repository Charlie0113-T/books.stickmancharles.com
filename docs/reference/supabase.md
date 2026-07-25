# Supabase

> 托管好的 Postgres，附送 Auth、存储和现成 API。

## 认脸
- Table Editor 每次点击背后都是 SQL；迁移 = 数据库结构的存档
- 让 AI 建表永远追问："RLS 配了吗？每条 policy 的人话含义？"
- 日志面板：数据库、Auth 各有一本日记

## 常见坑
- 没开 RLS 的表 ≈ 向全网公开
- 直接操作生产数据库（清表、大范围 UPDATE）：先备份，先测试环境

## 深入读
- [第一册 第 3 章 · 数据库](/guide/01/ch03)
- [第四册 第 6 章 · RLS 策略实战](/guide/04/ch06)

## 官方
- [supabase.com/docs](https://supabase.com/docs)
