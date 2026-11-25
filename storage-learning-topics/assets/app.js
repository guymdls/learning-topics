/* ==========================================================================
   Storage & Validation Engineering Hub — Pedagogical Interactive Runtime
   ========================================================================== */
(function () {
  const THEME_KEY = 'sandisk_storage_theme_v1';
  const DEPTH_KEY = 'sandisk_storage_depth_v1';
  const PROGRESS_KEY = 'sandisk_storage_progress_v1';

  const COURSE_MODULES = [
    { id: 'hub', num: '★', label: 'Start Here: Course Hub', rel: 'index.html', group: 'start' },
    { id: 'p09', num: '24w', label: '24-Week Study Roadmap', rel: '09-24-week-mastery-syllabus/index.html', group: 'start', prefix: 'syl_', total: 16 },
    { id: 'tutor', num: 'Lab', label: '102-Concept Visual Simulator', rel: 'nvme_systems_tutor.html', group: 'start' },
    { id: 'p01', num: '01', label: 'NVMe & OCP Protocols', rel: '01-standards-and-protocols/index.html', group: 'p1', prefix: 'p01_', total: 5 },
    { id: 'p02', num: '02', label: 'PCIe 6.0 & Signal Integrity', rel: '02-pcie-interconnects-and-si/index.html', group: 'p1', prefix: 'p02_', total: 5 },
    { id: 'p03', num: '03', label: '3D NAND & SanDisk SSDs', rel: '03-flash-physics-and-sandisk-platforms/index.html', group: 'p1', prefix: 'p03_', total: 5 },
    { id: 'p04', num: '04', label: 'OS I/O, SPDK & Concurrency', rel: '04-architecture-os-and-concurrency/index.html', group: 'p2', prefix: 'p04_', total: 5 },
    { id: 'p05', num: '05', label: 'Benchmarking & Telemetry', rel: '05-performance-telemetry-and-observability/index.html', group: 'p2', prefix: 'p05_', total: 5 },
    { id: 'p06', num: '06', label: 'Fault Injection, PLP & TLA+', rel: '06-validation-fault-injection-and-formal-methods/index.html', group: 'p3', prefix: 'p06_', total: 5 },
    { id: 'p07', num: '07', label: 'Power & Liquid Cooling', rel: '07-power-thermals-and-liquid-cooling/index.html', group: 'p3', prefix: 'p07_', total: 5 },
    { id: 'p08', num: '08', label: 'AI KV-Cache, CXL & Security', rel: '08-workloads-tiering-fabrics-and-security/index.html', group: 'p4', prefix: 'p08_', total: 6 }
  ];

  function loadProgress() {
    try { return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}') || {}; }
    catch (_) { return {}; }
  }

  function saveProgress(map) {
    try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(map)); } catch (_) {}
  }

  // Theme toggle
  function applyTheme(mode) {
    document.body.classList.toggle('theme-light', mode === 'light');
    document.body.classList.toggle('theme-dark', mode !== 'light');
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = mode === 'light' ? 'Dark' : 'Light';
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

  // Simple Mode vs Deep Spec Mode toggle
  function applyDepth(mode) {
    const openAll = (mode === 'deep');
    document.querySelectorAll('details.deep-dive').forEach(d => { d.open = openAll; });
    document.querySelectorAll('.depth-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.depth === mode);
    });
  }

  function initDepthToggle() {
    let saved = 'simple';
    try { saved = localStorage.getItem(DEPTH_KEY) || 'simple'; } catch (_) {}
    applyDepth(saved);
    document.querySelectorAll('.depth-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.dataset.depth;
        try { localStorage.setItem(DEPTH_KEY, mode); } catch (_) {}
        applyDepth(mode);
      });
    });
  }

  // Persistent Sidebar rendering + live progress sync
  function renderSidebar() {
    const sb = document.getElementById('course-sidebar');
    if (!sb) return;
    const base = sb.dataset.base || './';
    const current = sb.dataset.current || 'hub';
    const progress = loadProgress();

    // Compute overall checklist completion across p01..p08 + syl (57 items total)
    let totalAll = 0, doneAll = 0;
    COURSE_MODULES.forEach(m => {
      if (m.prefix && m.total) {
        totalAll += m.total;
        for (const k of Object.keys(progress)) {
          if (k.startsWith(m.prefix) && progress[k]) doneAll++;
        }
      }
    });
    const overallPct = totalAll ? Math.min(100, Math.round((doneAll / totalAll) * 100)) : 0;

    const groups = [
      { key: 'start', title: 'Start & Navigation' },
      { key: 'p1', title: 'Phase 1 • Hardware & Bus' },
      { key: 'p2', title: 'Phase 2 • OS & Speed' },
      { key: 'p3', title: 'Phase 3 • Reliability & Power' },
      { key: 'p4', title: 'Phase 4 • AI, Apps & Security' }
    ];

    const sectionsHtml = groups.map(g => {
      const links = COURSE_MODULES.filter(m => m.group === g.key).map(m => {
        let rightBadge = '';
        if (m.prefix && m.total) {
          let d = 0;
          for (const k of Object.keys(progress)) {
            if (k.startsWith(m.prefix) && progress[k]) d++;
          }
          const isDone = d >= m.total;
          rightBadge = `<span class="nav-pill-pct ${isDone ? 'done' : ''}">${isDone ? '✓' : d + '/' + m.total}</span>`;
        }
        return `<a class="nav-link ${m.id === current ? 'active' : ''}" href="${base}${m.rel}">
          <span style="display:flex;align-items:center;gap:8px;min-width:0;">
            <span class="nav-num">${m.num}</span>
            <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${m.label}</span>
          </span>
          ${rightBadge}
        </a>`;
      }).join('');
      return `<div><div class="nav-section-label">${g.title}</div><div class="nav-list">${links}</div></div>`;
    }).join('');

    sb.innerHTML = `
      <a class="sidebar-brand" href="${base}index.html">
        <span class="brand-badge">SSD</span>
        <span class="sidebar-brand-text">
          <strong>Storage Mastery</strong>
          <span>SanDisk Validation Track</span>
        </span>
      </a>
      <div class="sidebar-progress-box">
        <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px;">
          <span class="muted" style="font-weight:600;">Course Mastery</span>
          <strong class="mono">${doneAll}/${totalAll} (${overallPct}%)</strong>
        </div>
        <div class="progress-track"><div class="progress-fill" style="width:${overallPct}%"></div></div>
      </div>
      ${sectionsHtml}
    `;
  }

  function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (btn) btn.addEventListener('click', () => document.body.classList.toggle('sidebar-open'));
    if (backdrop) backdrop.addEventListener('click', () => document.body.classList.remove('sidebar-open'));
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
    renderSidebar();
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
      });
    });
    updateProgressDisplays();
  }

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

  // Reusable Quick-Check Quiz Renderer
  function renderQuiz(containerId, questions) {
    const root = document.getElementById(containerId);
    if (!root || !Array.isArray(questions)) return;
    root.innerHTML = '';
    questions.forEach((item, qIdx) => {
      const wrap = document.createElement('div');
      wrap.className = 'quiz-q';
      const title = document.createElement('div');
      title.className = 'quiz-q-title';
      title.textContent = `Q${qIdx + 1}. ${item.q}`;
      const opts = document.createElement('div');
      opts.className = 'quiz-opts';
      const exp = document.createElement('div');
      exp.className = 'quiz-explain';

      item.options.forEach((optText, oIdx) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'quiz-opt';
        b.textContent = optText;
        b.addEventListener('click', () => {
          opts.querySelectorAll('.quiz-opt').forEach((el, idx) => {
            el.classList.remove('correct', 'wrong');
            if (idx === item.answer) el.classList.add('correct');
            else if (idx === oIdx) el.classList.add('wrong');
          });
          exp.innerHTML = (oIdx === item.answer ? '<strong>✓ Spot on!</strong> ' : '<strong>Not quite — here is why:</strong> ') + item.explain;
          exp.classList.add('visible');
        });
        opts.appendChild(b);
      });

      wrap.appendChild(title);
      wrap.appendChild(opts);
      wrap.appendChild(exp);
      root.appendChild(wrap);
    });
  }

  // Canvas utilities
  function getCanvasTheme() {
    const s = getComputedStyle(document.body);
    const g = (v, fb) => (s.getPropertyValue(v) || '').trim() || fb;
    return {
      bg: g('--bg', '#090e1a'),
      card: g('--card', '#111a2e'),
      sub: g('--sub', '#16223b'),
      border: g('--border', '#233252'),
      fg: g('--fg', '#f1f5f9'),
      muted: g('--muted', '#94a3b8'),
      primary: g('--primary', '#38bdf8'),
      primaryFg: g('--primary-fg', '#06283d'),
      success: g('--success', '#22c55e'),
      warning: g('--warning', '#f59e0b'),
      error: g('--error', '#f87171'),
      violet: g('--violet', '#a78bfa'),
      cyan: g('--cyan', '#22d3ee')
    };
  }

  function prepCanvas(canvas, customH) {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(280, Math.floor(rect.width || 640));
    const h = customH || parseInt(canvas.getAttribute('height'), 10) || 220;
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
    } catch (_) { return '#ffffff'; }
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    if (typeof ctx.roundRect === 'function') ctx.roundRect(x, y, w, h, r);
    else ctx.rect(x, y, w, h);
  }

  window.StorageHub = {
    COURSE_MODULES,
    loadProgress,
    saveProgress,
    updateProgressDisplays,
    renderQuiz,
    getCanvasTheme,
    prepCanvas,
    fitText,
    contrastText,
    roundRect
  };

  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initDepthToggle();
    renderSidebar();
    initMobileMenu();
    initChecklists();
    initTabs();
  });
})();
