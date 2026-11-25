/* Shared Interactive Runtime for Storage & Validation Engineering Hub */
(function () {
  const THEME_KEY = 'sandisk_storage_theme_v1';
  const PROGRESS_KEY = 'sandisk_storage_progress_v1';

  const SUBJECTS = [
    { id: 'hub', label: 'Storage & Validation Hub', rel: 'index.html' },
    { id: 'tutor', label: 'Interactive 102-Concept NVMe Tutor', rel: 'nvme_systems_tutor.html' },
    { id: 'p01', label: '01. Industry Standards & Protocols', rel: '01-standards-and-protocols/index.html' },
    { id: 'p02', label: '02. PCIe, Interconnects & Signal Integrity', rel: '02-pcie-interconnects-and-si/index.html' },
    { id: 'p03', label: '03. Flash Physics & SanDisk Platforms', rel: '03-flash-physics-and-sandisk-platforms/index.html' },
    { id: 'p04', label: '04. Architecture, OS & Concurrency', rel: '04-architecture-os-and-concurrency/index.html' },
    { id: 'p05', label: '05. Performance, Telemetry & Observability', rel: '05-performance-telemetry-and-observability/index.html' },
    { id: 'p06', label: '06. Validation, Fault Injection & Formal Methods', rel: '06-validation-fault-injection-and-formal-methods/index.html' },
    { id: 'p07', label: '07. Power, Thermals & Liquid Cooling', rel: '07-power-thermals-and-liquid-cooling/index.html' },
    { id: 'p08', label: '08. Workloads, Tiering, Fabrics & Security', rel: '08-workloads-tiering-fabrics-and-security/index.html' },
    { id: 'p09', label: '09. 24-Week Mastery Syllabus & Labs', rel: '09-24-week-mastery-syllabus/index.html' }
  ];

  // Theme management
  function applyTheme(mode) {
    document.body.classList.toggle('theme-light', mode === 'light');
    document.body.classList.toggle('theme-dark', mode !== 'light');
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = mode === 'light' ? 'Dark Mode' : 'Light Mode';
    window.dispatchEvent(new CustomEvent('themechange', { detail: { mode } }));
  }

  function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch (_) {}
    if (!saved) {
      const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
      saved = prefersLight ? 'light' : 'dark';
    }
    applyTheme(saved);
    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.addEventListener('click', () => {
        const next = document.body.classList.contains('theme-light') ? 'dark' : 'light';
        try { localStorage.setItem(THEME_KEY, next); } catch (_) {}
        applyTheme(next);
      });
    }
  }

  // Subject switcher dropdown
  function initSubjectNav() {
    const sel = document.getElementById('subject-nav');
    if (!sel) return;
    const basePrefix = sel.dataset.base || './';
    const currentId = sel.dataset.current || 'hub';
    sel.innerHTML = '';
    if (!SUBJECTS.some(s => s.id === currentId)) {
      const ph = document.createElement('option');
      ph.value = '';
      ph.textContent = 'Jump to Storage Subject...';
      ph.selected = true;
      sel.appendChild(ph);
    }
    SUBJECTS.forEach(s => {
      const opt = document.createElement('option');
      opt.value = basePrefix + s.rel;
      opt.textContent = s.label;
      if (s.id === currentId) opt.selected = true;
      sel.appendChild(opt);
    });
    sel.addEventListener('change', () => {
      if (sel.value) window.location.href = sel.value;
    });
  }

  // Persistent checklist progress
  function loadProgress() {
    try {
      return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}') || {};
    } catch (_) {
      return {};
    }
  }

  function saveProgress(map) {
    try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(map)); } catch (_) {}
  }

  function updateProgressDisplays() {
    const progress = loadProgress();
    document.querySelectorAll('[data-progress-prefix]').forEach(el => {
      const prefix = el.dataset.progressPrefix;
      const total = parseInt(el.dataset.progressTotal || '0', 10);
      if (!total) return;
      let done = 0;
      for (const k of Object.keys(progress)) {
        if (k.startsWith(prefix) && progress[k]) done++;
      }
      const pct = Math.min(100, Math.round((done / total) * 100));
      const fill = el.querySelector('.progress-fill');
      const label = el.querySelector('.progress-text');
      if (fill) fill.style.width = pct + '%';
      if (label) label.textContent = `${done} / ${total} (${pct}%)`;
    });
  }

  function initChecklists() {
    const progress = loadProgress();
    document.querySelectorAll('input[type="checkbox"][data-check-id]').forEach(cb => {
      const id = cb.dataset.checkId;
      const checked = !!progress[id];
      cb.checked = checked;
      const row = cb.closest('.check-item');
      if (row) row.classList.toggle('done', checked);
      cb.addEventListener('change', () => {
        const cur = loadProgress();
        cur[id] = cb.checked;
        saveProgress(cur);
        if (row) row.classList.toggle('done', cb.checked);
        updateProgressDisplays();
        window.dispatchEvent(new CustomEvent('progresschange'));
      });
    });
    updateProgressDisplays();
  }

  // Reusable tab groups
  function initTabs() {
    document.querySelectorAll('[data-tab-group]').forEach(group => {
      const groupName = group.dataset.tabGroup;
      const btns = group.querySelectorAll('[data-tab-target]');
      btns.forEach(btn => {
        btn.addEventListener('click', () => {
          const target = btn.dataset.tabTarget;
          btns.forEach(b => b.classList.toggle('active', b === btn));
          document.querySelectorAll(`[data-tab-pane-group="${groupName}"]`).forEach(p => {
            p.classList.toggle('active', p.dataset.tabPane === target);
          });
          requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));
        });
      });
    });
  }

  // Canvas utilities shared across interactive visualizers
  function getCanvasTheme() {
    const s = getComputedStyle(document.body);
    const g = (v, fb) => (s.getPropertyValue(v) || '').trim() || fb;
    return {
      bg: g('--bg', '#0b1120'),
      card: g('--card', '#111c33'),
      sub: g('--sub', '#16223a'),
      border: g('--border', '#263552'),
      fg: g('--fg', '#f1f5f9'),
      muted: g('--muted', '#94a3b8'),
      primary: g('--primary', '#38bdf8'),
      primaryFg: g('--primary-fg', '#082f49'),
      success: g('--success', '#22c55e'),
      warning: g('--warning', '#f59e0b'),
      error: g('--error', '#ef4444'),
      violet: g('--accent-violet', '#a78bfa'),
      pink: g('--accent-pink', '#f472b6'),
      cyan: g('--accent-cyan', '#22d3ee')
    };
  }

  function prepCanvas(canvas, customH) {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(280, Math.floor(rect.width || 640));
    const h = customH || parseInt(canvas.getAttribute('height'), 10) || 240;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.height = h + 'px';
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    return { ctx, w, h, th: getCanvasTheme() };
  }

  function fitText(ctx, text, maxW) {
    if (maxW <= 12) return '';
    if (ctx.measureText(text).width <= maxW) return text;
    let t = String(text);
    while (t.length > 1 && ctx.measureText(t + '…').width > maxW) t = t.slice(0, -1);
    return t + '…';
  }

  let _probeCtx = null;
  function contrastText(cssColor) {
    try {
      if (!_probeCtx) {
        const c = document.createElement('canvas');
        c.width = 1; c.height = 1;
        _probeCtx = c.getContext('2d', { willReadFrequently: true });
      }
      _probeCtx.clearRect(0, 0, 1, 1);
      _probeCtx.fillStyle = cssColor;
      _probeCtx.fillRect(0, 0, 1, 1);
      const d = _probeCtx.getImageData(0, 0, 1, 1).data;
      const lum = (0.299 * d[0] + 0.587 * d[1] + 0.114 * d[2]) / 255;
      return lum > 0.62 ? '#0f172a' : '#ffffff';
    } catch (_) {
      return '#ffffff';
    }
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    if (typeof ctx.roundRect === 'function') ctx.roundRect(x, y, w, h, r);
    else ctx.rect(x, y, w, h);
  }

  window.StorageHub = {
    SUBJECTS,
    loadProgress,
    saveProgress,
    updateProgressDisplays,
    getCanvasTheme,
    prepCanvas,
    fitText,
    contrastText,
    roundRect
  };

  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSubjectNav();
    initChecklists();
    initTabs();
  });
})();
