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

### 动态图片

把 GIF、动态 WebP 或 APNG 文件放进 `source/media`，在文章中使用：

```text
{% media_image /media/demo.gif %}
图片说明
{% endmedia_image %}
```

普通 Markdown 图片语法同样支持 GIF：

```markdown
![图片说明](/media/demo.gif)
```

### 本地视频

把 MP4 或 WebM 文件放进 `source/media`，可将视频封面放进 `source/images`：

```text
{% media_video /media/demo.mp4 /images/demo-poster.jpg %}
视频说明
{% endmedia_video %}
```

视频封面可以省略：`{% media_video /media/demo.mp4 %}`。体积较大的视频建议上传到 Bilibili，再使用嵌入方式，避免仓库过大。

### Bilibili 视频

填写视频的 BV 号和分 P 页码：

```text
{% bilibili BV1xx411c7mD 1 %}
视频说明
{% endbilibili %}
```

可以复制 `source/_drafts/media-example.md` 作为写作模板。草稿默认不会发布。

## 检查构建

```powershell
npm run check
```

检查会验证首页、404、项目页、关于页、旧文章、搜索索引、站点地图和 RSS 是否正常生成，同时阻止已经废弃的搜索、评论及 HTTP 资源重新进入网站。
