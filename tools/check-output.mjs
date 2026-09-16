import { readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

const requiredFiles = [
  'index.html',
  '404.html',
  'about/index.html',
  'projects/index.html',
  'archives/index.html',
  '2015/10/30/HTML/index.html',
  '2026/09/16/ai-office-2026-from-assistant-to-agent/index.html',
  '2026/09/16/documentary-hexi-corridor/index.html',
  'search.xml',
  'sitemap.xml',
  'atom.xml'
];

const errors = [];

for (const relativePath of requiredFiles) {
  try {
    const file = await stat(join('public', relativePath));
    if (!file.isFile() || file.size === 0) {
      errors.push(`${relativePath} 不是有效文件`);
    }
  } catch {
    errors.push(`缺少 ${relativePath}`);
  }
}

const htmlFiles = requiredFiles.filter(path => path.endsWith('.html'));
for (const relativePath of htmlFiles) {
  let html;
  try {
    html = await readFile(join('public', relativePath), 'utf8');
  } catch {
    continue;
  }
  for (const forbidden of ['static.duoshuo.com', 's.swiftypecdn.com', 'bdimg.share.baidu.com', 'www.qq.com/404/']) {
    if (html.includes(forbidden)) {
      errors.push(`${relativePath} 仍包含旧服务 ${forbidden}`);
    }
  }
  if (/\b(?:src|href)=["']http:\/\//i.test(html)) {
    errors.push(`${relativePath} 仍包含 HTTP 资源`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`构建检查通过：${requiredFiles.length} 个关键文件均已生成。`);
