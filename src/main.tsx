import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import 'uikit-3it-react/dist/css/uikit-3it-react.css'

function initThemeFromStorage(): void {
  if (typeof document === 'undefined') return
  const raw = localStorage.getItem('config')
  const conf: { darkTheme?: boolean } | null = raw ? JSON.parse(raw) : null
  const isDark = conf?.darkTheme === true
  document.documentElement.setAttribute('data-eit-theme', isDark ? 'dark' : 'light')
}

initThemeFromStorage()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)