# Auth · RLS

> 身份与门规：谁能进，谁能看哪一行。

## 认脸
- 永远不要自己发明登录系统——用现成的 Auth，密码绝不明文
- RLS：开启后**默认全拒**，每条 policy 是开出的一条缝
- `using` 管旧行给不给看，`with check` 管新行收不收；`auth.uid()` = 敲门人是谁

## 常见坑
- **前端查询永远返回空数组** = RLS 默认拒绝、缺 policy（本层最经典症状）
- 只测"看得到自己"不算测完——必须测"看不到别人"

## 深入读
- [第一册 第 15 章 · 安全](/guide/01/ch15)
- [第四册 第 6 章 · RLS 策略实战](/guide/04/ch06)

## 官方
- [Supabase · Auth](https://supabase.com/docs/guides/auth)
- [Supabase · RLS](https://supabase.com/docs/guides/database/postgres/row-level-security)
