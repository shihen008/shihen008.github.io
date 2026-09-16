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

const bilibiliUrl = value => {
  const source = String(value || '').trim()
  let parsed

  try {
    parsed = new URL(source)
  } catch {
    throw new Error('Bilibili 观看卡片需要填写完整页面地址')
  }

  if (parsed.protocol !== 'https:' || !/(^|\.)bilibili\.com$/i.test(parsed.hostname)) {
    throw new Error('Bilibili 观看卡片只能链接到 bilibili.com')
  }

  return escapeHTML(parsed.toString())
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

hexo.extend.tag.register('bilibili_link', (args, content) => {
  const pageUrl = bilibiliUrl(args[0])
  const cover = safeSource(args[1], 'Bilibili 观看卡片封面')
  const title = escapeHTML(String(content || '').trim() || '前往 Bilibili 观看')

  return `<figure class="article-media article-media-watch-card">
  <a href="${pageUrl}" target="_blank" rel="noopener noreferrer" aria-label="${title}">
    <img src="${cover}" alt="${title}" loading="lazy" decoding="async">
    <span class="article-media-watch-overlay" aria-hidden="true">
      <span class="article-media-watch-play">▶</span>
      <span class="article-media-watch-copy"><strong>在 Bilibili 观看</strong><small>打开官方正版页面</small></span>
    </span>
  </a>
  ${caption(content)}
</figure>`
}, { ends: true })
