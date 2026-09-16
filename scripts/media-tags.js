'use strict'

const { escapeHTML } = require('hexo-util')

const safeSource = (value, label) => {
  const source = String(value || '').trim()
  if (!source) throw new Error(`${label}缺少文件地址`)
  if (/^(?:javascript|vbscript|data):/i.test(source)) {
    throw new Error(`${label}使用了不安全的文件地址`)
  }
  return escapeHTML(source)
}

const caption = content => {
  const text = String(content || '').trim()
  return text ? `<figcaption>${escapeHTML(text)}</figcaption>` : ''
}

hexo.extend.tag.register('media_image', (args, content) => {
  const source = safeSource(args[0], '动态图片')
  const alt = escapeHTML(String(content || '').trim() || '文章动态图片')

  return `<figure class="article-media article-media-image">
  <img src="${source}" alt="${alt}" loading="lazy" decoding="async">
  ${caption(content)}
</figure>`
}, { ends: true })

hexo.extend.tag.register('media_video', (args, content) => {
  const source = safeSource(args[0], '视频')
  const poster = args[1] ? ` poster="${safeSource(args[1], '视频封面')}"` : ''

  return `<figure class="article-media article-media-video">
  <video src="${source}"${poster} controls playsinline preload="metadata">当前浏览器不支持视频播放。</video>
  ${caption(content)}
</figure>`
}, { ends: true })

hexo.extend.tag.register('bilibili', (args, content) => {
  const videoId = String(args[0] || '').trim()
  const page = Math.max(1, Number.parseInt(args[1], 10) || 1)
  let videoQuery

  if (/^BV[a-zA-Z0-9]+$/.test(videoId)) {
    videoQuery = `bvid=${encodeURIComponent(videoId)}`
  } else {
    const aid = videoId.match(/^(?:av)?(\d+)$/i)
    if (!aid) throw new Error('Bilibili 视频需要填写 BV 号或 av 号')
    videoQuery = `aid=${encodeURIComponent(aid[1])}`
  }

  const title = escapeHTML(String(content || '').trim() || 'Bilibili 视频')
  const player = `https://player.bilibili.com/player.html?${videoQuery}&page=${page}&high_quality=1&danmaku=0`

  return `<figure class="article-media article-media-embed">
  <div class="article-media-frame">
    <iframe src="${player}" title="${title}" loading="lazy" scrolling="no" frameborder="0" allow="fullscreen; autoplay; picture-in-picture" allowfullscreen></iframe>
  </div>
  ${caption(content)}
</figure>`
}, { ends: true })
