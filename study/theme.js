// theme.js — shared light/dark toggle for all pages

(function () {
  const STORAGE_KEY = 'study_theme';

  function getTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme === 'light' ? 'light' : '');
    const btn = document.getElementById('themeToggle');
    if (btn) {
      btn.querySelector('.toggle-icon').textContent = theme === 'light' ? '☀︎' : '☾';
      btn.querySelector('.toggle-label').textContent = theme === 'light' ? 'Light' : 'Dark';
    }
    // Re-draw any canvases so they pick up the new bg colour
    if (window.__themeChangeCallbacks) {
      window.__themeChangeCallbacks.forEach(fn => fn(theme));
    }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  }

  // Apply immediately (before paint) to prevent flash
  applyTheme(getTheme());

  // Wire button once DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('themeToggle');
    if (btn) {
      applyTheme(getTheme()); // re-apply so button label updates
      btn.addEventListener('click', toggleTheme);
    }
  });

  // Allow pages to register canvas redraw callbacks
  window.onThemeChange = function (fn) {
    window.__themeChangeCallbacks = window.__themeChangeCallbacks || [];
    window.__themeChangeCallbacks.push(fn);
  };
})();
