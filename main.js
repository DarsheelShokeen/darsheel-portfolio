/**
 * Darsheel Shokeen — Portfolio Telemetry Runtime Engine
 * Hallmark Console Theme | Macrostructure 05 Workbench | Ledge Posture
 * 
 * Domains:
 * 1. ESP32 ADC Sampling (GPIO 34, 12-bit SAR ADC, 50Hz edge loop, 4000ms moving median debounce)
 * 2. Android Media3 Audio Pipeline (MediaSessionManager, 200ms buffer, <8.2ms AGSL blur, Octree Palette)
 * 3. Two-Stage DCF Financial Model (FCFF, explicit 5-year forecast + Gordon Growth terminal value)
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. Reactive Telemetry State Model
  // =========================================================================
  const telemetryState = {
    activeDomain: 'esp32',
    isStreamPaused: false,

    station: {
      id: 'DELHI-NODE-28N',
      location: 'Delhi, India (28.7041° N, 77.1025° E)',
      status: 'NOMINAL',
    },

    esp32: {
      gpioPin: 34,
      resolutionBits: 12,
      rawAdcOffset: 1420, // Baseline offset (24.2mm nominal depth)
      rawAdcMax: 4095,
      currentDepthMm: 24.2,
      rawAdcCounts: 1420,
      voltageVolts: 1.144,
      debounceSamples: [24, 24, 24, 25, 24, 24, 24, 24, 25, 24],
      debounceWindowMs: 4000,
      debounceCapacity: 10,
      status: 'NOMINAL',
      queueAlerts: 0,
      whatsappArmed: true,
      lastDispatchTime: null,
    },

    media3: {
      playbackState: 'STATE_PLAYING',
      bufferWindowMs: 200,
      crossfadeLatencyMs: 280,
      agslRenderTimeMs: 6.8,
      lruMemoryMb: 28.4,
      activeTrackIndex: 0,
      tracks: [
        {
          title: 'After Hours',
          artist: 'The Weeknd',
          format: '48.0 kHz / 24-bit PCM',
          swatches: {
            dominant: '#180B13',
            vibrant: '#00E5FF',
            muted: '#9F1239',
            lightVibrant: '#FECDD3',
            darkMuted: '#4C0519',
            darkVibrant: '#E11D48',
          },
        },
        {
          title: 'Random Access Memories',
          artist: 'Daft Punk',
          format: '96.0 kHz / 24-bit FLAC',
          swatches: {
            dominant: '#0B1329',
            vibrant: '#0284C7',
            muted: '#334155',
            lightVibrant: '#BAE6FD',
            darkMuted: '#0F172A',
            darkVibrant: '#1D4ED8',
          },
        },
        {
          title: 'Currents',
          artist: 'Tame Impala',
          format: '44.1 kHz / 16-bit Lossless',
          swatches: {
            dominant: '#1C0D29',
            vibrant: '#A855F7',
            muted: '#701A75',
            lightVibrant: '#F0ABFC',
            darkMuted: '#3B0764',
            darkVibrant: '#9333EA',
          },
        },
      ],
      spectrumBands: 16,
      spectrumAmplitudes: new Array(16).fill(12),
    },

    dcf: {
      baseFcfMillions: 158.0,
      growthRatePct: 12.0,      // 5-Year CAGR (range: 8.0 - 25.0)
      discountRateWaccPct: 9.5, // WACC discount rate (range: 7.5 - 14.0)
      terminalGrowthPct: 3.0,   // Perpetual Gordon Growth (range: 2.0 - 3.5)
      netDebtMillions: 200.0,
      sharesDilutedMillions: 25.0,
      currentMarketPrice: 115.00,
      pvExplicitHorizon: 846.1,
      pvTerminalValue: 2803.1,
      enterpriseValueBillions: 3.65,
      intrinsicValuePerShare: 137.95,
      marginOfSafetyPct: 20.0,
      valuationStatus: 'UNDERVALUED',
    },
  };

  // =========================================================================
  // 2. Telemetry Terminal Logger
  // =========================================================================
  function getTimestamp() {
    const now = new Date();
    return now.toTimeString().substring(0, 8) + '.' + String(now.getMilliseconds()).padStart(3, '0');
  }

  function appendTerminalLog(terminalId, actor, message, toneClass) {
    const term = document.getElementById(terminalId);
    if (!term) return;

    const line = document.createElement('span');
    line.className = 'term-line';

    const stamp = document.createElement('span');
    stamp.className = 'term-stamp';
    stamp.textContent = `[${getTimestamp()}] `;

    const actorSpan = document.createElement('span');
    actorSpan.className = toneClass ? `term-${toneClass}` : 'term-actor';
    actorSpan.textContent = actor ? `${actor}: ` : '';

    const textNode = document.createTextNode(message);

    line.appendChild(stamp);
    if (actor) line.appendChild(actorSpan);
    line.appendChild(textNode);

    term.appendChild(line);

    // Keep log capped at 50 entries
    while (term.children.length > 50) {
      term.removeChild(term.firstChild);
    }
    term.scrollTop = term.scrollHeight;
  }

  // =========================================================================
  // 3. ESP32 ADC Sampling Engine & Debounce Filter
  // =========================================================================
  function calculateMedian(arr) {
    if (!arr.length) return 0;
    const sorted = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  }

  function depthToAdcCounts(depthMm) {
    // Linear approximation with offset: 0mm = 1420 (dry), 100mm = 4095 (full scale)
    const normalized = Math.max(0, Math.min(100, depthMm));
    const counts = Math.round(1420 + (normalized / 100) * (4095 - 1420));
    return Math.max(0, Math.min(4095, counts));
  }

  function adcCountsToVoltage(counts) {
    // 12-bit SAR ADC at 3.3V reference (11dB attenuation)
    return ((counts / 4095) * 3.3).toFixed(3);
  }

  function updateEsp32View() {
    const depth = telemetryState.esp32.currentDepthMm;
    const counts = telemetryState.esp32.rawAdcCounts;
    const volts = telemetryState.esp32.voltageVolts;

    // Filtered depth via 10-sample moving median
    const medianDepth = calculateMedian(telemetryState.esp32.debounceSamples);

    let stateText = 'Nominal (< 40mm)';
    let stateClass = 'metric-value--cool';
    let queueText = '0 alerts queued';

    if (medianDepth >= 70) {
      stateText = 'Critical Alert (> 70mm)';
      stateClass = 'metric-value--amber';
      queueText = 'WhatsApp alert broadcast active';
      telemetryState.esp32.status = 'CRITICAL';
    } else if (medianDepth >= 40) {
      stateText = 'Warning (40 - 70mm)';
      stateClass = 'metric-value--amber';
      queueText = '1 municipal advisory queued';
      telemetryState.esp32.status = 'WARNING';
    } else {
      telemetryState.esp32.status = 'NOMINAL';
    }

    // Update Hero elements
    const heroDepth = document.getElementById('hero-esp32-depth');
    if (heroDepth) heroDepth.textContent = depth.toFixed(1);

    const heroCounts = document.getElementById('hero-esp32-counts');
    if (heroCounts) heroCounts.textContent = counts;

    const heroVolts = document.getElementById('hero-esp32-volts');
    if (heroVolts) heroVolts.textContent = volts;

    const heroStatus = document.getElementById('hero-esp32-status');
    if (heroStatus) {
      heroStatus.textContent = stateText;
      heroStatus.className = `metric-value ${stateClass}`;
    }

    // Update Workbench Sandboxes if present
    const benchDepthVal = document.getElementById('bench-depth-val');
    if (benchDepthVal) benchDepthVal.textContent = `${depth.toFixed(1)} mm`;

    const benchStateTag = document.getElementById('bench-state-tag');
    if (benchStateTag) benchStateTag.textContent = stateText;

    const benchQueueTag = document.getElementById('bench-queue-tag');
    if (benchQueueTag) benchQueueTag.textContent = queueText;

    // Update Debounce Buffer indicator cells
    const bufferContainer = document.getElementById('debounce-buffer-cells');
    if (bufferContainer) {
      const cells = bufferContainer.querySelectorAll('.buffer-cell');
      telemetryState.esp32.debounceSamples.forEach((val, idx) => {
        if (cells[idx]) {
          cells[idx].className = 'buffer-cell' + (val >= 70 ? ' buffer-cell--bad' : val >= 40 ? ' buffer-cell--warn' : ' buffer-cell--ok');
          cells[idx].title = `Sample ${idx + 1}: ${val.toFixed(1)}mm`;
        }
      });
    }
  }

  function setSimulatedWaterDepth(depthMm, logSource) {
    telemetryState.esp32.currentDepthMm = depthMm;
    telemetryState.esp32.rawAdcCounts = depthToAdcCounts(depthMm);
    telemetryState.esp32.voltageVolts = adcCountsToVoltage(telemetryState.esp32.rawAdcCounts);

    // Push into debounce sliding buffer
    telemetryState.esp32.debounceSamples.shift();
    telemetryState.esp32.debounceSamples.push(depthMm);

    updateEsp32View();

    if (logSource) {
      appendTerminalLog(
        'hero-terminal',
        'esp32/adc34',
        `GPIO 34 raw ${telemetryState.esp32.rawAdcCounts} to depth ${depthMm.toFixed(1)}mm (${telemetryState.esp32.voltageVolts}V)`
      );
    }
  }

  function injectTransientNoiseSpike() {
    // Injects a single extreme spike (92mm) to demonstrate 10-sample moving median filter rejection
    appendTerminalLog(
      'hero-terminal',
      'esp32/adc34',
      'NOISE SPIKE: Single sample 92.4mm (ADC 3940) ingested on GPIO 34',
      'actor'
    );

    // Push single spike into buffer
    telemetryState.esp32.debounceSamples.shift();
    telemetryState.esp32.debounceSamples.push(92.4);
    updateEsp32View();

    setTimeout(() => {
      // Return to nominal baseline
      telemetryState.esp32.debounceSamples.shift();
      telemetryState.esp32.debounceSamples.push(24.2);
      updateEsp32View();

      appendTerminalLog(
        'hero-terminal',
        'fastapi/filter',
        'DEBOUNCE FILTER: 10-sample moving median window discarded transient spike. Status preserved: NOMINAL.',
        'ok'
      );
    }, 400);
  }

  function triggerEmergencyInundation() {
    appendTerminalLog(
      'hero-terminal',
      'esp32/adc34',
      'CRITICAL: Water level sustained above 75.0mm for 10 consecutive readings.',
      'actor'
    );

    // Fill buffer with critical readings
    telemetryState.esp32.debounceSamples = [78, 79, 82, 80, 84, 83, 85, 82, 84, 86];
    setSimulatedWaterDepth(82.0, false);

    setTimeout(() => {
      appendTerminalLog(
        'hero-terminal',
        'whatsapp/cloud-api',
        'DISPATCH BROADCAST: Meta WhatsApp Cloud API webhooks sent to registered residents (GPS: 28.7041 N, 77.1025 E).',
        'ok'
      );
    }, 300);
  }

  // =========================================================================
  // 4. Android Media3 Audio Engine & 16-Band Spectrum
  // =========================================================================
  function switchTrack(trackIndex) {
    if (trackIndex < 0 || trackIndex >= telemetryState.media3.tracks.length) return;
    telemetryState.media3.activeTrackIndex = trackIndex;
    const track = telemetryState.media3.tracks[trackIndex];

    const trackTitle = document.getElementById('media3-track-title');
    if (trackTitle) trackTitle.textContent = track.title;

    const trackArtist = document.getElementById('media3-track-artist');
    if (trackArtist) trackArtist.textContent = track.artist;

    const trackFormat = document.getElementById('media3-track-format');
    if (trackFormat) trackFormat.textContent = track.format;

    // Update Swatches
    const swatchContainer = document.getElementById('media3-swatches');
    if (swatchContainer) {
      swatchContainer.innerHTML = '';
      Object.entries(track.swatches).forEach(([name, hex]) => {
        const item = document.createElement('div');
        item.className = 'swatch-pill';

        const dot = document.createElement('span');
        dot.className = 'swatch-dot';
        dot.style.backgroundColor = hex;

        const label = document.createElement('span');
        label.className = 'swatch-label';
        label.textContent = `${name.replace(/([A-Z])/g, ' $1').toLowerCase()}: ${hex}`;

        item.appendChild(dot);
        item.appendChild(label);
        swatchContainer.appendChild(item);
      });
    }

    // Update Track Button Active States
    const trackBtns = document.querySelectorAll('.track-select-btn');
    trackBtns.forEach((btn, idx) => {
      if (idx === trackIndex) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });

    appendTerminalLog(
      'hero-terminal',
      'media3/session',
      `Track transition to "${track.title}" by ${track.artist}. Octree 16-bin Palette re-quantized.`,
      'cool'
    );
  }

  function renderSpectrumBars(timestamp) {
    const barsContainer = document.getElementById('spectrum-visualizer');
    if (!barsContainer) return;

    const bands = telemetryState.media3.spectrumBands;
    const bars = barsContainer.querySelectorAll('.spectrum-bar');

    for (let i = 0; i < bands; i++) {
      const bar = bars[i];
      if (!bar) continue;

      // Harmonic sine wave generator
      const freq = 0.003;
      const wave = Math.sin(timestamp * freq + i * 0.45) * 0.5 + 0.5;
      const heightPx = Math.round(4 + wave * 24); // Height between 4px and 28px (fits inside 30px content box)

      bar.style.height = `${heightPx}px`;
    }
  }

  // =========================================================================
  // 5. Two-Stage DCF Financial Valuation Engine
  // =========================================================================
  function calculateDcf() {
    const fcf0 = telemetryState.dcf.baseFcfMillions;
    const g = telemetryState.dcf.growthRatePct / 100;
    const wacc = telemetryState.dcf.discountRateWaccPct / 100;
    const gTerm = telemetryState.dcf.terminalGrowthPct / 100;
    const netDebt = telemetryState.dcf.netDebtMillions;
    const shares = telemetryState.dcf.sharesDilutedMillions;
    const marketPrice = telemetryState.dcf.currentMarketPrice;

    // Mathematical safety check: Gordon Growth requires WACC > g_term
    if (wacc <= gTerm) {
      telemetryState.dcf.pvExplicitHorizon = 0;
      telemetryState.dcf.pvTerminalValue = 0;
      telemetryState.dcf.enterpriseValueBillions = 0;
      telemetryState.dcf.intrinsicValuePerShare = 0;
      telemetryState.dcf.marginOfSafetyPct = -100;
      telemetryState.dcf.valuationStatus = 'INVALID (WACC <= g_term)';
      updateDcfView(true);
      return;
    }

    // Stage 1: Explicit 5-year discrete high growth
    let explicitPvTotal = 0;
    let finalYearFcf = fcf0;

    for (let t = 1; t <= 5; t++) {
      const fcfT = fcf0 * Math.pow(1 + g, t);
      const discountFactor = Math.pow(1 + wacc, t);
      explicitPvTotal += fcfT / discountFactor;
      if (t === 5) finalYearFcf = fcfT;
    }

    // Stage 2: Perpetual Gordon Growth Terminal Value at Year 5
    const terminalValueYear5 = (finalYearFcf * (1 + gTerm)) / (wacc - gTerm);
    const pvTerminalValue = terminalValueYear5 / Math.pow(1 + wacc, 5);

    // Total Enterprise Value & Equity Value
    const enterpriseValueTotal = explicitPvTotal + pvTerminalValue; // in Millions
    const equityValue = enterpriseValueTotal - netDebt;
    const intrinsicValuePerShare = equityValue / shares;
    const marginOfSafety = ((intrinsicValuePerShare - marketPrice) / marketPrice) * 100;

    telemetryState.dcf.pvExplicitHorizon = explicitPvTotal;
    telemetryState.dcf.pvTerminalValue = pvTerminalValue;
    telemetryState.dcf.enterpriseValueBillions = (enterpriseValueTotal / 1000).toFixed(2);
    telemetryState.dcf.intrinsicValuePerShare = intrinsicValuePerShare.toFixed(2);
    telemetryState.dcf.marginOfSafetyPct = marginOfSafety.toFixed(1);
    telemetryState.dcf.valuationStatus = marginOfSafety >= 0 ? 'UNDERVALUED' : 'OVERVALUED';

    updateDcfView(false);
  }

  function updateDcfView(isInvalid) {
    const evElem = document.getElementById('dcf-ev-val');
    const priceElem = document.getElementById('dcf-price-val');
    const mosElem = document.getElementById('dcf-mos-val');
    const statusElem = document.getElementById('dcf-status-tag');
    const pvExpElem = document.getElementById('dcf-pv-explicit');
    const pvTermElem = document.getElementById('dcf-pv-terminal');

    if (isInvalid) {
      if (evElem) evElem.textContent = 'Divergent';
      if (priceElem) priceElem.textContent = 'N/A';
      if (mosElem) mosElem.textContent = 'N/A';
      if (statusElem) {
        statusElem.textContent = 'Invalid: WACC <= g_term';
        statusElem.className = 'metric-value metric-value--amber';
      }
      return;
    }

    if (evElem) evElem.textContent = `$${telemetryState.dcf.enterpriseValueBillions}B`;
    if (priceElem) priceElem.textContent = `$${telemetryState.dcf.intrinsicValuePerShare}`;

    if (mosElem) {
      const sign = telemetryState.dcf.marginOfSafetyPct >= 0 ? '+' : '';
      mosElem.textContent = `${sign}${telemetryState.dcf.marginOfSafetyPct}%`;
    }

    if (statusElem) {
      statusElem.textContent = `${telemetryState.dcf.valuationStatus} (${telemetryState.dcf.marginOfSafetyPct}%)`;
      statusElem.className = telemetryState.dcf.marginOfSafetyPct >= 0 ? 'metric-value metric-value--cool' : 'metric-value metric-value--amber';
    }

    if (pvExpElem) pvExpElem.textContent = `$${Math.round(telemetryState.dcf.pvExplicitHorizon)}M`;
    if (pvTermElem) pvTermElem.textContent = `$${Math.round(telemetryState.dcf.pvTerminalValue)}M`;

    // Sliders Readouts
    const waccReadout = document.getElementById('dcf-wacc-readout');
    if (waccReadout) waccReadout.textContent = `${telemetryState.dcf.discountRateWaccPct.toFixed(1)}%`;

    const gTermReadout = document.getElementById('dcf-gterm-readout');
    if (gTermReadout) gTermReadout.textContent = `${telemetryState.dcf.terminalGrowthPct.toFixed(1)}%`;

    const cagrReadout = document.getElementById('dcf-cagr-readout');
    if (cagrReadout) cagrReadout.textContent = `${telemetryState.dcf.growthRatePct.toFixed(1)}%`;
  }

  // =========================================================================
  // 6. Tab Navigation & Keyboard Routing
  // =========================================================================
  function switchDomainTab(domainId) {
    telemetryState.activeDomain = domainId;

    const tabs = document.querySelectorAll('[role="tab"]');
    const panels = document.querySelectorAll('[role="tabpanel"]');

    tabs.forEach((tab) => {
      const targetDomain = tab.getAttribute('data-domain');
      const isSelected = targetDomain === domainId;
      tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
      if (isSelected) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    panels.forEach((panel) => {
      const panelDomain = panel.getAttribute('data-domain');
      if (panelDomain === domainId) {
        panel.removeAttribute('hidden');
      } else {
        panel.setAttribute('hidden', 'true');
      }
    });

    appendTerminalLog(
      'hero-terminal',
      'console/workspace',
      `Active telemetry domain switched to ${domainId.toUpperCase()}.`,
      'cool'
    );
  }

  // =========================================================================
  // 7. Technical Index Filtering
  // =========================================================================
  function filterAuditIndex(category) {
    const rows = document.querySelectorAll('.index-table-row');
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach((btn) => {
      const target = btn.getAttribute('data-filter');
      if (target === category) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });

    rows.forEach((row) => {
      const rowCategory = row.getAttribute('data-category');
      if (category === 'all' || rowCategory === category) {
        row.removeAttribute('hidden');
      } else {
        row.setAttribute('hidden', 'true');
      }
    });
  }

  // =========================================================================
  // 8. Animation Loop & Tick Dispatcher
  // =========================================================================
  let lastTickTime = 0;
  let animFrameId = null;

  function telemetryLoop(currentTime) {
    if (!lastTickTime) lastTickTime = currentTime;
    const delta = currentTime - lastTickTime;

    // Render 16-band spectrum if Media3 panel is visible
    if (telemetryState.activeDomain === 'media3' && !telemetryState.isStreamPaused) {
      renderSpectrumBars(currentTime);
    }

    // Low-frequency periodic telemetry updates (every 2500ms)
    if (delta > 2500 && !telemetryState.isStreamPaused) {
      lastTickTime = currentTime;

      // Small jitter around nominal depth for live feeling
      if (telemetryState.esp32.status === 'NOMINAL') {
        const jitter = (Math.random() - 0.5) * 0.8;
        const newDepth = Math.max(22, Math.min(27, telemetryState.esp32.currentDepthMm + jitter));
        setSimulatedWaterDepth(newDepth, false);
      }
    }

    animFrameId = requestAnimationFrame(telemetryLoop);
  }

  // =========================================================================
  // 9. Initializer & Event Listeners
  // =========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Views
    updateEsp32View();
    calculateDcf();
    switchTrack(0);

    // 2. Tab Switchers
    const tabBtns = document.querySelectorAll('[role="tab"]');
    tabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const domain = btn.getAttribute('data-domain');
        if (domain) switchDomainTab(domain);
      });
    });

    // 3. ESP32 Sliders & Controls
    const depthSlider = document.getElementById('hero-depth-slider');
    if (depthSlider) {
      depthSlider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        setSimulatedWaterDepth(val, true);
      });
    }

    const spikeBtn = document.getElementById('hero-btn-spike');
    if (spikeBtn) {
      spikeBtn.addEventListener('click', () => {
        injectTransientNoiseSpike();
      });
    }

    const floodBtn = document.getElementById('hero-btn-flood');
    if (floodBtn) {
      floodBtn.addEventListener('click', () => {
        triggerEmergencyInundation();
      });
    }

    // 4. Media3 Track Switchers
    const trackBtns = document.querySelectorAll('.track-select-btn');
    trackBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const trackIdx = parseInt(btn.getAttribute('data-track-index'), 10);
        if (!isNaN(trackIdx)) switchTrack(trackIdx);
      });
    });

    // 5. DCF Parameter Sliders
    const waccSlider = document.getElementById('dcf-wacc-slider');
    if (waccSlider) {
      waccSlider.addEventListener('input', (e) => {
        telemetryState.dcf.discountRateWaccPct = parseFloat(e.target.value);
        calculateDcf();
      });
    }

    const gTermSlider = document.getElementById('dcf-gterm-slider');
    if (gTermSlider) {
      gTermSlider.addEventListener('input', (e) => {
        telemetryState.dcf.terminalGrowthPct = parseFloat(e.target.value);
        calculateDcf();
      });
    }

    const cagrSlider = document.getElementById('dcf-cagr-slider');
    if (cagrSlider) {
      cagrSlider.addEventListener('input', (e) => {
        telemetryState.dcf.growthRatePct = parseFloat(e.target.value);
        calculateDcf();
      });
    }

    // 6. Audit Index Filter Buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-filter');
        if (cat) filterAuditIndex(cat);
      });
    });

    // 7. Keyboard Navigation (1 for ESP32, 2 for Media3, 3 for DCF, Space for pause stream)
    window.addEventListener('keydown', (e) => {
      // Ignore if typing inside input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;

      if (e.key === '1') {
        switchDomainTab('esp32');
      } else if (e.key === '2') {
        switchDomainTab('media3');
      } else if (e.key === '3') {
        switchDomainTab('dcf');
      } else if (e.code === 'Space') {
        e.preventDefault();
        telemetryState.isStreamPaused = !telemetryState.isStreamPaused;
        const statusText = telemetryState.isStreamPaused ? 'PAUSED' : 'RESUMED';
        appendTerminalLog('hero-terminal', 'stream/clock', `Telemetry live tick ${statusText}.`, 'cool');
      }
    });

    // 8. Start requestAnimationFrame Loop
    animFrameId = requestAnimationFrame(telemetryLoop);
  });
})();
