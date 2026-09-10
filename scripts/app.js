/**
 * RANK COMPANION — Core Application Logic
 * Capacitor integration, PWA, event handling, calculations
 */

(async () => {
  'use strict';

  // ─────────────────────────────────────────────────────────────────────
  // INITIALIZATION & SETUP
  // ─────────────────────────────────────────────────────────────────────

  // DOM Selector Helper
  const $ = id => document.getElementById(id);

  // App State
  const state = {
    mode: 'percentile',
    rank: null,
    low: null,
    high: null,
    pct: null,
    source: null,
    candidates: null,
    isDarkMode: false
  };

  // ─────────────────────────────────────────────────────────────────────
  // CAPACITOR PLUGIN INITIALIZATION
  // ─────────────────────────────────────────────────────────────────────

  let haptics = null;
  let statusBar = null;
  let keyboard = null;
  let toast = null;

  // Load Capacitor plugins asynchronously
  async function initCapacitor() {
    try {
      if (window.Capacitor && window.Capacitor.isPluginAvailable('Haptics')) {
        const { Haptics } = window.Capacitor.Plugins;
        haptics = Haptics;
      }
      if (window.Capacitor && window.Capacitor.isPluginAvailable('StatusBar')) {
        const { StatusBar } = window.Capacitor.Plugins;
        statusBar = StatusBar;
        // Adjust status bar for notch/safe area
        statusBar?.setBackgroundColor({ color: '#171b4d' });
      }
      if (window.Capacitor && window.Capacitor.isPluginAvailable('Keyboard')) {
        const { Keyboard } = window.Capacitor.Plugins;
        keyboard = Keyboard;
      }
      if (window.Capacitor && window.Capacitor.isPluginAvailable('Toast')) {
        const { Toast } = window.Capacitor.Plugins;
        toast = Toast;
      }
    } catch (err) {
      console.warn('Capacitor plugins not available (running in web)', err);
    }
  }

  // Haptic feedback for button taps
  async function triggerHaptic(type = 'light') {
    if (haptics) {
      try {
        if (type === 'light') {
          await haptics.impact({ style: 'light' });
        } else if (type === 'medium') {
          await haptics.impact({ style: 'medium' });
        } else if (type === 'heavy') {
          await haptics.impact({ style: 'heavy' });
        }
      } catch (err) {
        console.warn('Haptic feedback failed:', err);
      }
    }
  }

  // Native toast notification
  async function showToast(message, duration = 'short') {
    if (toast) {
      try {
        await toast.show({ text: message, duration: duration === 'long' ? 3000 : 1500 });
      } catch (err) {
        console.warn('Toast notification failed:', err);
        showWebToast(message);
      }
    } else {
      showWebToast(message);
    }
  }

  // ─────────────────────────────────────────────────────────────────────
  // DARK MODE / THEME PERSISTENCE
  // ─────────────────────────────────────────────────────────────────────

  function initTheme() {
    const saved = localStorage.getItem('rank-companion-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    state.isDarkMode = saved ? saved === 'dark' : prefersDark;
    applyTheme(state.isDarkMode);
  }

  function applyTheme(isDark) {
    if (isDark) {
      document.documentElement.style.colorScheme = 'dark';
      $('themeToggle').setAttribute('aria-pressed', 'true');
      $('themeToggle').textContent = '☀️';
    } else {
      document.documentElement.style.colorScheme = 'light';
      $('themeToggle').setAttribute('aria-pressed', 'false');
      $('themeToggle').textContent = '🌙';
    }
    localStorage.setItem('rank-companion-theme', isDark ? 'dark' : 'light');
  }

  function toggleTheme() {
    state.isDarkMode = !state.isDarkMode;
    applyTheme(state.isDarkMode);
    triggerHaptic('light');
  }

  // ─────────────────────────────────────────────────────────────────────
  // PWA & SERVICE WORKER
  // ─────────────────────────────────────────────────────────────────────

  async function initPWA() {
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('sw.js');
        console.log('Service Worker registered for offline support');
      } catch (err) {
        console.warn('Service Worker registration failed:', err);
      }
    }

    // Detect offline status
    window.addEventListener('online', () => {
      $('offlineIndicator').style.display = 'none';
      showWebToast('Back online');
    });

    window.addEventListener('offline', () => {
      $('offlineIndicator').style.display = 'inline';
      showWebToast('Working offline');
    });
  }

  // ─────────────────────────────────────────────────────────────────────
  // DEBOUNCING FOR SEARCH/FILTER
  // ─────────────────────────────────────────────────────────────────────

  function debounce(fn, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  // ─────────────────────────────────────────────────────────────────────
  // UTILITY FUNCTIONS
  // ─────────────────────────────────────────────────────────────────────

  const fmt = value => Number(value).toLocaleString('en-IN');
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  function showError(message = '') {
    const el = $('error');
    el.textContent = message;
    el.classList.toggle('show', Boolean(message));
  }

  function showWebToast(message) {
    const el = $('toast');
    el.textContent = message;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 1700);
  }

  function escapeHtml(text) {
    return String(text).replace(/[&<>"']/g, char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[char]));
  }

  // ─────────────────────────────────────────────────────────────────────
  // RANKING & CALCULATION LOGIC
  // ─────────────────────────────────────────────────────────────────────

  function setMode(mode) {
    state.mode = mode;
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.setAttribute('aria-selected', btn.dataset.mode === mode ? 'true' : 'false');
    });
    document.querySelectorAll('.mode-panel').forEach(panel => {
      panel.classList.toggle('active', panel.id === `${mode}-panel`);
    });
  }

  function calculate() {
    showError();
    state.rank = state.low = state.high = state.pct = null;
    state.candidates = null;
    state.source = null;

    // Percentile Mode
    if (state.mode === 'percentile') {
      const pct = Number($('percentile').value);
      const n = Math.round(Number($('candidates').value));

      if ($('percentile').value === '') {
        render();
        return;
      }

      if (!Number.isFinite(pct) || pct < 0 || pct > 100) {
        showError('Percentile must be between 0 and 100');
        return;
      }

      state.pct = pct;
      state.candidates = n;
      state.source = 'percentile';
      state.rank = rankFromPercentile(pct, n);
      state.low = state.high = state.rank;
    }

    // Marks Mode
    if (state.mode === 'marks') {
      const score = Number($('marks').value);
      const n = Math.round(Number($('marksCandidates').value));
      const difficulty = $('difficulty').value;

      if ($('marks').value === '') {
        render();
        return;
      }

      if (!Number.isFinite(score) || score < -75 || score > 300) {
        showError('Marks must be between −75 and 300');
        return;
      }

      state.pct = marksToPercentile(score, difficulty);
      state.candidates = n;
      state.source = 'marks';
      state.rank = rankFromPercentile(state.pct, n);

      // Compute range based on spread
      const spread = getMarksSpreadFactor(score);
      const spread_ranks = Math.ceil(spread / 100 * n);
      state.low = Math.max(1, state.rank - spread_ranks);
      state.high = state.rank + spread_ranks;
    }

    // Official AIR Mode
    if (state.mode === 'official') {
      const rank = Math.round(Number($('officialRank').value));

      if ($('officialRank').value === '') {
        render();
        return;
      }

      if (!Number.isFinite(rank) || rank < 1) {
        showError('Enter a valid All India Rank');
        return;
      }

      state.source = 'official';
      state.rank = rank;
      state.low = state.high = rank;
      state.pct = null; // Not applicable for official AIR
    }

    // Normalize low/high
    if (state.low > state.high) {
      [state.low, state.high] = [state.high, state.low];
    }

    render();
    triggerHaptic('medium');
  }

  // ─────────────────────────────────────────────────────────────────────
  // COLLEGE ELIGIBILITY & RENDERING
  // ─────────────────────────────────────────────────────────────────────

  function getAdjustedCutoff(baseCutoff) {
    let multiplier = 1.0;
    const category = $('casteCategory').value;
    const gender = $('gender').value;
    const stateQuota = $('stateQuota').value;

    const categoryMap = {
      'OPEN': 1.0,
      'EWS': 1.18,
      'OBC': 1.35,
      'SC': 2.8,
      'ST': 4.5
    };

    multiplier *= categoryMap[category] || 1.0;
    if (gender === 'female') multiplier *= 1.22;
    if (stateQuota === 'HS') multiplier *= 1.35;

    return Math.round(baseCutoff * multiplier);
  }

  function renderColleges() {
    const list = $('collegeList');

    if (!Number.isFinite(state.rank)) {
      list.innerHTML = '<p class="empty">Enter your score or percentile above to view suitable college options.</p>';
      $('statEligible').textContent = '0 / ' + COLLEGE_DATABASE.length;
      $('statSafe').textContent = '0';
      $('statModerate').textContent = '0';
      return;
    }

    const searchTerm = ($('collegeSearch').value || '').toLowerCase().trim();
    const userRank = state.high || state.rank;

    let safeCount = 0;
    let moderateCount = 0;

    const allMapped = COLLEGE_DATABASE.map(c => ({
      ...c,
      adjustedCutoff: getAdjustedCutoff(c.cutoff)
    }));

    const eligible = allMapped.filter(c => {
      const matchesRank = c.adjustedCutoff >= userRank * 0.82;
      const matchesSearch = !searchTerm ||
        c.name.toLowerCase().includes(searchTerm) ||
        c.branch.toLowerCase().includes(searchTerm);

      if (matchesRank) {
        if (userRank <= c.adjustedCutoff * 0.8) safeCount++;
        else moderateCount++;
      }

      return matchesRank && matchesSearch;
    });

    $('statEligible').textContent = `${eligible.length} / ${COLLEGE_DATABASE.length}`;
    $('statSafe').textContent = safeCount;
    $('statModerate').textContent = moderateCount;

    if (eligible.length === 0) {
      list.innerHTML = '<p class="empty">No matching choices found for this rank or search term. Try adjusting search filters.</p>';
      return;
    }

    eligible.sort((a, b) => a.adjustedCutoff - b.adjustedCutoff);

    list.innerHTML = eligible.map(item => {
      let statusLabel = 'Safe Bet';
      let pillClass = 'safe';

      if (userRank > item.adjustedCutoff) {
        statusLabel = 'Reach';
        pillClass = 'reach';
      } else if (userRank > item.adjustedCutoff * 0.8) {
        statusLabel = 'Moderate';
        pillClass = 'reach';
      }

      return `
        <div class="college-card" role="listitem">
          <div class="college-info">
            <b>${escapeHtml(item.name)}</b>
            <span>${escapeHtml(item.branch)} • ~Closing Rank: ${fmt(item.adjustedCutoff)}</span>
          </div>
          <span class="pill ${pillClass}">${statusLabel}</span>
        </div>
      `;
    }).join('');
  }

  // ─────────────────────────────────────────────────────────────────────
  // RESULT RENDERING
  // ─────────────────────────────────────────────────────────────────────

  function render() {
    const hasResult = Number.isFinite(state.rank);

    // Rank Display
    $('rank').textContent = hasResult
      ? (state.source === 'official' ? fmt(state.rank) : '≈ ' + fmt(state.rank))
      : '—';

    // Status Badge
    $('status').textContent = !hasResult
      ? 'Waiting'
      : state.source === 'official'
        ? 'Official AIR'
        : 'Formula estimate';

    // Mode Label
    $('resultMode').textContent = !hasResult
      ? 'Enter a value to begin.'
      : state.source === 'marks'
        ? 'Marks-only scenario'
        : state.source === 'official'
          ? 'Scorecard value'
          : 'NTA percentile calculation';

    if (!hasResult) {
      $('rankLabel').textContent = 'Your result will appear here.';
      $('percentileOut').textContent = '—';
      $('topOut').textContent = '—';
      $('marker').style.left = '50%';
      $('resultCopy').innerHTML = '<strong>A small reality check:</strong> a raw score alone cannot produce an exact AIR because JEE Main uses multi-shift percentile normalisation.';
      renderColleges();
      return;
    }

    // Rank Label
    const range = state.low !== state.high
      ? `${fmt(state.low)} – ${fmt(state.high)}`
      : fmt(state.rank);

    $('rankLabel').textContent =
      state.source === 'official'
        ? 'Exact AIR entered from the scorecard.'
        : state.source === 'marks'
          ? `Indicative AIR range: ${range}`
          : `Indicative AIR range: ${range}`;

    // Percentile & Competition Position
    $('percentileOut').textContent = state.pct === null
      ? 'Not applicable'
      : state.source === 'marks'
        ? `${state.pct.toFixed(2)}% band`
        : `${state.pct.toFixed(7)}%`;

    const top = state.pct === null ? null : 100 - state.pct;
    $('topOut').textContent = top === null
      ? 'Official record'
      : `Top ${Math.max(0, top).toFixed(top < 1 ? 3 : 2)}%`;

    // Rank Rail Marker
    const candCount = state.candidates || 1418000;
    $('marker').style.left = clamp(((state.rank - 1) / Math.max(1, candCount - 1)) * 100, 1, 99) + '%';

    // Result Copy Text
    $('resultCopy').innerHTML =
      state.source === 'official'
        ? '<strong>Ready for college viewing.</strong> Verify exact category closing ranks from the JoSAA portal.'
        : state.source === 'marks'
          ? '<strong>Why a range?</strong> Marks alone don't determine percentile; JEE normalises per shift. Use the range for initial exploration.'
          : '<strong>Next steps:</strong> Check college cutoffs on JoSAA, confirm your category eligibility, and verify with official notifications.';

    renderColleges();
  }

  // ─────────────────────────────────────────────────────────────────────
  // COPY & SHARE
  // ─────────────────────────────────────────────────────────────────────

  function resultText() {
    if (!Number.isFinite(state.rank)) return 'No rank result yet.';

    const type = state.source === 'official'
      ? 'Official AIR'
      : state.source === 'marks'
        ? 'Indicative marks-based AIR'
        : 'Percentile-based AIR';

    const range = state.low !== state.high
      ? `${fmt(state.low)}–${fmt(state.high)}`
      : fmt(state.rank);

    const percentileText = state.pct === null
      ? ''
      : ` (${state.pct.toFixed(2)}%)`;

    return `${type}: ${range}${percentileText}\n\nSource: Rank Companion (jeemain.nta.ac.in)\nCalculated: ${new Date().toLocaleDateString('en-IN')}`;
  }

  async function copyResult() {
    try {
      await navigator.clipboard.writeText(resultText());
      await showToast('Result copied!', 'short');
      triggerHaptic('light');
    } catch (err) {
      console.warn('Clipboard copy failed:', err);
      showWebToast('Copy failed in this browser');
    }
  }

  // ─────────────────────────────────────────────────────────────────────
  // EVENT LISTENERS
  // ─────────────────────────────────────────────────────────────────────

  // Theme Toggle
  $('themeToggle').addEventListener('click', toggleTheme);

  // Mode Selection
  document.querySelectorAll('.mode-btn').forEach(button => {
    button.addEventListener('click', () => {
      setMode(button.dataset.mode);
      triggerHaptic('light');
    });
  });

  // Input Fields (auto-calculate on change)
  [
    'percentile', 'candidates', 'marks', 'difficulty', 'marksCandidates',
    'officialRank', 'casteCategory', 'gender', 'stateQuota'
  ].forEach(id => {
    $(id).addEventListener('input', calculate);
  });

  // College Search (debounced)
  $('collegeSearch').addEventListener('input', debounce(renderColleges, 200));

  // Calculate Button
  $('calculate').addEventListener('click', () => {
    calculate();
  });

  // Reset Button
  $('reset').addEventListener('click', () => {
    ['percentile', 'marks', 'officialRank', 'collegeSearch'].forEach(id => $(id).value = '');
    $('candidates').value = '1418000';
    $('marksCandidates').value = '1418000';
    $('difficulty').value = 'normal';
    calculate();
    triggerHaptic('medium');
  });

  // Copy Button
  $('copy').addEventListener('click', copyResult);

  // Enter Key to Calculate
  document.addEventListener('keydown', event => {
    if (event.key === 'Enter' && event.target.tagName !== 'BUTTON') {
      event.preventDefault();
      calculate();
    }
  });

  // ─────────────────────────────────────────────────────────────────────
  // INITIALIZATION
  // ─────────────────────────────────────────────────────────────────────

  await initCapacitor();
  initTheme();
  await initPWA();
  calculate();

  console.log('✓ Rank Companion initialized');
})();
