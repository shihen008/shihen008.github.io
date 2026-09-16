(() => {
  let themeObserver

  const syncButton = () => {
    const button = document.getElementById('home-theme-toggle')
    if (!button) return

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
    const icon = button.querySelector('i')
    const label = button.querySelector('span')

    button.setAttribute('aria-pressed', String(isDark))
    button.setAttribute('aria-label', isDark ? '切换日间模式' : '切换夜间模式')
    if (icon) icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon'
    if (label) label.textContent = isDark ? '日间模式' : '夜间模式'
  }

  const toggleTheme = () => {
    const builtInButton = document.getElementById('darkmode')
    if (builtInButton) {
      builtInButton.click()
      return
    }

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
    const nextTheme = isDark ? 'light' : 'dark'
    isDark ? btf.activateLightMode() : btf.activateDarkMode()
    btf.saveToLocal.set('theme', nextTheme, 2)
  }

  const initThemeButton = () => {
    const button = document.getElementById('home-theme-toggle')
    if (button && button.dataset.themeToggleBound !== 'true') {
      button.addEventListener('click', toggleTheme)
      button.dataset.themeToggleBound = 'true'
    }

    if (!themeObserver) {
      themeObserver = new MutationObserver(syncButton)
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
      })
    }

    syncButton()
  }

  document.addEventListener('DOMContentLoaded', initThemeButton)
  document.addEventListener('pjax:complete', initThemeButton)
  if (document.readyState !== 'loading') initThemeButton()
})()
