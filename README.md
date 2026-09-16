# 会写字的魔王

PAUL 的个人主页与技术笔记，使用 Hexo 和 Butterfly 构建，发布到 GitHub Pages。

## 本地查看

```powershell
npm install
npm run server
```

浏览器打开终端中显示的本地地址即可查看。

## 写文章

文章保存在 `source/_posts`。新建 Markdown 文件并填写标题、日期、分类和标签，提交到 `master` 后会自动检查并发布。

## 检查构建

```powershell
npm run check
```

检查会验证首页、404、项目页、关于页、旧文章、搜索索引、站点地图和 RSS 是否正常生成，同时阻止已经废弃的搜索、评论及 HTTP 资源重新进入网站。
