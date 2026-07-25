# SQL

> 和数据库说话：四个动词走天下。

## 认脸
- 读序反直觉：**FROM → JOIN → WHERE → SELECT**，不从第一行读
- JOIN = 两张表按"工号"（外键）对齐拼成宽表
- 迁移文件 = 一串 SQL 存档，AI 建表的产出就是它

## 常见坑
- **UPDATE / DELETE 没有 WHERE = 改/删整张表**——立刻停下叫人
- 只读的 SELECT 随便练，写操作先过测试环境

## 深入读
- [第一册 第 3 章 · 数据库](/guide/01/ch03)
- [第三册 第 8 章 · 读懂一条真正的查询](/guide/03/ch08)
- [第四册 第 5 章 · 把表设计好](/guide/04/ch05)

## 官方
- [PostgreSQL 文档](https://www.postgresql.org/docs/)
