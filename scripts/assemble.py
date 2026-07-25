#!/usr/bin/env python3
"""assemble.py — 从 books/ 拆书装配站点。

单一真相源原则：书稿只住在 books/，站点章节页由本脚本生成。
改书 → 重跑本脚本 → 站点更新。永远不要直接编辑 docs/guide/ 下的生成文件。
"""
import json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BOOKS = ROOT / "books"
GUIDE = ROOT / "docs" / "guide"

VOLS = [
    dict(id="01", file="AI时代的编程指南-01-看懂地图.md", short="01 看懂地图", stars="★",
         parts=[("地图：软件世界长什么样", 1, 6), ("工具：每天在用的东西", 7, 11), ("心法：和 AI 一起变强", 12, 16)],
         extras=[("# 写在最后", "letter", "写在最后：给爸爸"),
                 ("# 附录 A", "appendix-a", "附录 A · 术语表"),
                 ("# 附录 B", "appendix-b", "附录 B · 解剖我们自己的项目"),
                 ("# 附录 C", "appendix-c", "附录 C · 红线卡")]),
    dict(id="02", file="AI时代的编程指南-02-上手工具.md", short="02 上手工具", stars="★★",
         parts=[("上手工具", 1, 12)],
         extras=[("# 附：本册新词", "terms", "附：本册新词")]),
    dict(id="03", file="AI时代的编程指南-03-读懂语言.md", short="03 读懂语言", stars="★★★",
         parts=[("读懂语言", 1, 10)],
         extras=[("# 附：本册新词", "terms", "附：本册新词")]),
    dict(id="04", file="AI时代的编程指南-04-深入系统.md", short="04 深入系统", stars="★★★★",
         parts=[("深入系统", 1, 10)],
         extras=[("# 附：本册新词", "terms", "附：本册新词")]),
]

BEAT_RE = re.compile(r"^\*\*(关键领悟|试一试|出事时想起我|认脸卡)\*\*(（[^）]*）)?[：:]\s*(.*)$")
BEAT_KIND = {"关键领悟": "info", "试一试": "tip", "出事时想起我": "warning", "认脸卡": "info"}
CH_RE = re.compile(r"^# 第\s*(\d+)\s*章\s*(.+)$")
PART_RE = re.compile(r"^# 第[一二三四五]部分")


def beats(text: str) -> str:
    """把 **关键领悟**：/ **试一试**：等单段标记转换成 VitePress 容器。"""
    out = []
    for line in text.split("\n"):
        m = BEAT_RE.match(line.strip())
        if m:
            name, paren, body = m.group(1), m.group(2) or "", m.group(3)
            kind = BEAT_KIND[name]
            title = f"{name}{paren}"
            out += [f"::: {kind} {title}", body, ":::"]
        else:
            out.append(line)
    return "\n".join(out)


def tidy(text: str) -> str:
    text = re.sub(r"\n---\n\s*$", "\n", text)          # 去掉块尾分隔线
    text = re.sub(r"^\s*---\n", "", text)               # 去掉块首分隔线
    return text.strip() + "\n"


def split_volume(vol):
    src = (BOOKS / vol["file"]).read_text(encoding="utf-8")
    lines = src.split("\n")
    # 找出所有 h1 的位置
    h1s = [(i, l) for i, l in enumerate(lines) if l.startswith("# ")]
    # 分块：每个 h1 到下一个 h1
    blocks = []
    for n, (i, l) in enumerate(h1s):
        end = h1s[n + 1][0] if n + 1 < len(h1s) else len(lines)
        blocks.append((l, "\n".join(lines[i:end])))

    outdir = GUIDE / vol["id"]
    outdir.mkdir(parents=True, exist_ok=True)
    chapters, extras_out = {}, []
    index_parts = []

    for head, body in blocks:
        if PART_RE.match(head):
            continue  # 部标题不成页，结构进侧边栏分组
        m = CH_RE.match(head)
        if m:
            num = int(m.group(1))
            title = m.group(2).strip()
            main = title.split("：")[0]
            fname = f"ch{num:02d}"
            body = re.sub(r"^# 第[一二三四五]部分.*$", "", body, flags=re.M)
            (outdir / f"{fname}.md").write_text(tidy(beats(body)), encoding="utf-8")
            chapters[num] = dict(file=fname, main=main)
            continue
        matched = False
        for prefix, fname, text in vol["extras"]:
            if head.startswith(prefix):
                (outdir / f"{fname}.md").write_text(tidy(beats(body)), encoding="utf-8")
                extras_out.append(dict(file=fname, text=text))
                matched = True
                break
        if not matched:
            # 扉页 / 小序 / 目录 / 序 → 汇入本册首页
            body = re.sub(r"^# 第[一二三四五]部分.*$", "", body, flags=re.M)
            index_parts.append(body)

    (outdir / "index.md").write_text(tidy("\n\n".join(index_parts)), encoding="utf-8")

    # 侧边栏分组
    items = [dict(text="扉页 · 序", link=f"/guide/{vol['id']}/")]
    groups = []
    for pname, lo, hi in vol["parts"]:
        gi = [dict(text=f"{n}. {chapters[n]['main']}", link=f"/guide/{vol['id']}/{chapters[n]['file']}")
              for n in range(lo, hi + 1) if n in chapters]
        groups.append(dict(text=pname, collapsed=False, items=gi))
    tail = [dict(text=e["text"], link=f"/guide/{vol['id']}/{e['file']}") for e in extras_out]
    sidebar_group = dict(text=f"{vol['short']} {vol['stars']}", collapsed=(vol["id"] != "01"),
                         items=items + groups + tail)
    return sidebar_group, extras_out, outdir


def main():
    GUIDE.mkdir(parents=True, exist_ok=True)
    # 总纲原样上站
    overview = (BOOKS / "AI时代的编程指南-00-总纲.md").read_text(encoding="utf-8")
    (GUIDE / "overview.md").write_text(overview, encoding="utf-8")

    sidebar, glossary_secs = [dict(text="00 总纲", link="/guide/overview")], []
    for vol in VOLS:
        group, extras_out, outdir = split_volume(vol)
        sidebar.append(group)
        # 收集术语表来源
        for e in extras_out:
            if e["file"] in ("appendix-a", "terms"):
                body = (outdir / f"{e['file']}.md").read_text(encoding="utf-8")
                body = "\n".join(body.split("\n")[1:]).strip()  # 去掉页内 h1
                glossary_secs.append((vol["short"], body))
    sidebar.append(dict(text="05 AI 工程心法（规划中）", link="/roadmap"))

    ts = "export default " + json.dumps(sidebar, ensure_ascii=False, indent=2)
    (ROOT / "docs" / ".vitepress" / "sidebar-books.ts").write_text(ts, encoding="utf-8")

    glossary = ["# 术语表",
                "",
                "> 这份表是活的：由各册的术语附录自动汇总（`scripts/assemble.py`）。",
                "> 想加新词，改对应书稿的附录，重跑脚本。",
                ""]
    for short, body in glossary_secs:
        glossary += [f"## {short}", "", body, ""]
    (ROOT / "docs" / "glossary.md").write_text("\n".join(glossary), encoding="utf-8")

    print(f"assembled: {len(sidebar)} sidebar groups, glossary sections: {len(glossary_secs)}")


if __name__ == "__main__":
    sys.exit(main())
