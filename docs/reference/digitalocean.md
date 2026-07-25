# DigitalOcean

> 一台没有屏幕、永远开机、拿 SSH 当显示器的 Linux 电脑。

## 认脸
- 登船只读五件套：`pwd` / `ls` / `df -h` / `free -h` / `top`
- 服务交给管家：`systemctl start/stop/status` + `enable`（开机自启）+ `journalctl -u`（日记）
- 固定月租 = 账单天然封顶（自己养服务器的隐藏优点）

## 常见坑
- **磁盘被日志撑满是裸服务器的头号隐形杀手**——定期 `df -h`
- root 无护栏：每条命令都是实弹，红线卡字字生效

## 深入读
- [第四册 第 2 章 · 登上我们的 DO](/guide/04/ch02)
- [第四册 第 3 章 · 让程序永远醒着](/guide/04/ch03)
- [第四册 第 4 章 · 端口与反向代理](/guide/04/ch04)

## 官方
- [docs.digitalocean.com](https://docs.digitalocean.com/)
