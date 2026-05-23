# ML Study Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a local ML study site — a shared design system plus the Gradient Descent chapter as the gold-standard template for all future chapters.

**Architecture:** Multi-file, no build step. `style.css` and `animations.js` are shared assets loaded by all chapters via relative paths. `index.html` is the curriculum hub. `chapters/gradient-descent.html` is the first complete chapter. Open any file directly in a browser.

**Tech Stack:** Vanilla HTML5, CSS3, JavaScript (ES6+), Canvas API. No frameworks, no npm, no build step. Google Fonts (Inter, JetBrains Mono) loaded via CDN link tag.

---

### Task 1: Shared Design System (`style.css`)

**Files:**
- Create: `style.css`

This file defines every reusable visual element: color variables, typography, layout containers, math callout cards, quiz card expand/collapse, animation canvas wrapper, slider controls, and the chapter nav header.

- [ ] **Step 1: Create `style.css` with CSS variables and base reset**

```css
/* style.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:        #0d1117;
  --bg-card:   #161b22;
  --bg-hover:  #1c2128;
  --text:      #e6edf3;
  --text-muted:#8b949e;
  --accent:    #f0a500;
  --accent-dim:#a06800;
  --border:    #30363d;
  --white:     #ffffff;
  --blue:      #58a6ff;
  --red:       #f85149;
  --green:     #3fb950;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --radius:    8px;
  --max-width: 820px;
}

html { font-size: 16px; scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  line-height: 1.7;
  min-height: 100vh;
}
```

- [ ] **Step 2: Add typography and container styles**

Append to `style.css`:

```css
/* Typography */
h1 { font-size: 2.4rem; font-weight: 700; color: var(--white); line-height: 1.2; }
h2 { font-size: 1.8rem; font-weight: 600; color: var(--white); line-height: 1.3; margin-bottom: 0.5rem; }
h3 { font-size: 1.25rem; font-weight: 600; color: var(--accent); margin-bottom: 0.4rem; }
h4 { font-size: 1rem; font-weight: 600; color: var(--text); margin-bottom: 0.3rem; }
p  { margin-bottom: 1rem; }
a  { color: var(--accent); text-decoration: none; }
a:hover { text-decoration: underline; }

code, .mono {
  font-family: var(--font-mono);
  background: var(--bg-card);
  padding: 0.15em 0.4em;
  border-radius: 4px;
  font-size: 0.9em;
  color: var(--blue);
}

/* Layout */
.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 1.5rem;
}

.page-header {
  border-bottom: 1px solid var(--border);
  padding: 1.5rem 0;
  margin-bottom: 3rem;
}

.page-header .breadcrumb {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
}

.page-header .breadcrumb a { color: var(--text-muted); }
.page-header .breadcrumb a:hover { color: var(--accent); }

.section {
  margin-bottom: 3.5rem;
}

.section-label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 0.75rem;
}
```

- [ ] **Step 3: Add math callout, inline label, and formula styles**

Append to `style.css`:

```css
/* Math callout block */
.math-block {
  background: var(--bg-card);
  border-left: 3px solid var(--accent);
  border-radius: 0 var(--radius) var(--radius) 0;
  padding: 1.25rem 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--font-mono);
}

.math-block .math-label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 0.5rem;
}

.math-block .formula {
  font-size: 1.15rem;
  color: var(--white);
  margin-bottom: 0.75rem;
}

.math-block .symbol-table {
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 0.25rem 1rem;
  font-size: 0.88rem;
  color: var(--text-muted);
}

.math-block .symbol-table .sym { color: var(--blue); }

/* Step-through worked example */
.worked-example {
  background: var(--bg-card);
  border-radius: var(--radius);
  padding: 1.25rem 1.5rem;
  margin: 1.5rem 0;
  border: 1px solid var(--border);
}

.worked-example .step {
  display: flex;
  gap: 1rem;
  align-items: baseline;
  margin-bottom: 0.6rem;
  font-size: 0.95rem;
}

.worked-example .step-num {
  color: var(--accent);
  font-weight: 600;
  font-family: var(--font-mono);
  min-width: 1.5rem;
}

.worked-example .step-text { color: var(--text); }
.worked-example .step-math { color: var(--blue); font-family: var(--font-mono); }

/* Highlight box (used for key insight callouts) */
.insight-box {
  background: linear-gradient(135deg, #1a1f0a 0%, #0d1117 100%);
  border: 1px solid var(--accent-dim);
  border-radius: var(--radius);
  padding: 1.25rem 1.5rem;
  margin: 1.5rem 0;
  font-style: italic;
  color: var(--text);
}

.insight-box::before {
  content: '💡';
  margin-right: 0.5rem;
}
```

- [ ] **Step 4: Add animation canvas wrapper and slider styles**

Append to `style.css`:

```css
/* Animation canvas wrapper */
.animation-wrapper {
  background: var(--bg-card);
  border-radius: var(--radius);
  border: 1px solid var(--border);
  padding: 1.5rem;
  margin: 1.5rem 0;
  text-align: center;
}

.animation-wrapper canvas {
  display: block;
  margin: 0 auto;
  cursor: crosshair;
  border-radius: 4px;
}

.animation-caption {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-top: 0.75rem;
  font-style: italic;
}

/* Controls / playground */
.playground {
  background: var(--bg-card);
  border-radius: var(--radius);
  border: 1px solid var(--border);
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.control-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.control-label {
  font-size: 0.88rem;
  color: var(--text-muted);
  min-width: 160px;
}

.control-value {
  font-family: var(--font-mono);
  color: var(--accent);
  font-size: 0.9rem;
  min-width: 50px;
}

input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  height: 4px;
  border-radius: 2px;
  background: var(--border);
  outline: none;
  flex: 1;
  min-width: 120px;
  cursor: pointer;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--accent);
  cursor: pointer;
  border: 2px solid var(--bg);
}

input[type="range"]::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--accent);
  cursor: pointer;
  border: 2px solid var(--bg);
}

.btn {
  background: var(--accent);
  color: var(--bg);
  border: none;
  padding: 0.5rem 1.25rem;
  border-radius: var(--radius);
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s;
}

.btn:hover { opacity: 0.85; }
.btn.secondary {
  background: transparent;
  color: var(--accent);
  border: 1px solid var(--accent);
}
```

- [ ] **Step 5: Add misconceptions list, summary list, and quiz card styles**

Append to `style.css`:

```css
/* Misconceptions */
.misconceptions-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.misconceptions-list li {
  background: var(--bg-card);
  border-left: 3px solid var(--red);
  border-radius: 0 var(--radius) var(--radius) 0;
  padding: 0.9rem 1.25rem;
  margin-bottom: 0.75rem;
}

.misconceptions-list li .myth {
  font-weight: 600;
  color: var(--red);
  margin-bottom: 0.25rem;
}

.misconceptions-list li .truth { color: var(--text); font-size: 0.95rem; }

/* Summary bullets */
.summary-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.summary-list li {
  display: flex;
  gap: 0.75rem;
  align-items: baseline;
  padding: 0.6rem 0;
  border-bottom: 1px solid var(--border);
  font-size: 0.95rem;
}

.summary-list li:last-child { border-bottom: none; }

.summary-list li::before {
  content: '→';
  color: var(--accent);
  font-weight: 700;
  flex-shrink: 0;
}

/* Quiz cards */
.quiz-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.quiz-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  transition: border-color 0.2s;
}

.quiz-card:hover { border-color: var(--accent-dim); }

.quiz-card.revealed { border-color: var(--green); }

.quiz-question {
  padding: 1rem 1.25rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  user-select: none;
}

.quiz-question .q-num {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-muted);
  flex-shrink: 0;
}

.quiz-question .q-text {
  flex: 1;
  font-size: 0.95rem;
  color: var(--text);
}

.quiz-question .q-toggle {
  font-size: 0.75rem;
  color: var(--text-muted);
  flex-shrink: 0;
  transition: transform 0.2s;
}

.quiz-card.revealed .q-toggle {
  transform: rotate(180deg);
  color: var(--green);
}

.quiz-answer {
  display: none;
  padding: 0 1.25rem 1rem 1.25rem;
  border-top: 1px solid var(--border);
  font-size: 0.92rem;
  color: var(--text);
  background: #0d1f0d;
  line-height: 1.6;
}

.quiz-card.revealed .quiz-answer { display: block; }

.quiz-answer strong { color: var(--green); }

/* Progress tracker (top of quiz section) */
.quiz-progress {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 1rem;
  font-family: var(--font-mono);
}

/* Index page cards */
.curriculum-section {
  margin-bottom: 3rem;
}

.curriculum-section h2 {
  color: var(--accent);
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border);
}

.topic-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 0.75rem;
}

.topic-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1rem 1.25rem;
  transition: border-color 0.2s, background 0.2s;
}

.topic-card.available {
  cursor: pointer;
  border-color: var(--accent-dim);
}

.topic-card.available:hover {
  background: var(--bg-hover);
  border-color: var(--accent);
}

.topic-card.locked {
  opacity: 0.4;
  cursor: not-allowed;
}

.topic-card .topic-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--white);
  margin-bottom: 0.2rem;
}

.topic-card .topic-status {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.topic-card.available .topic-status { color: var(--green); }
```

- [ ] **Step 6: Open `index.html` (not yet created) in browser to verify fonts load**

Skip for now — verify after Task 3 (index.html) is built.

- [ ] **Step 7: Commit**

```bash
cd ~/Projects/study
git add style.css
git commit -m "feat: add shared design system (style.css)"
```

---

### Task 2: Shared Animation Utilities (`animations.js`)

**Files:**
- Create: `animations.js`

This file exports utility functions used by chapter animation canvases: easing functions, a `drawLossCurve` function (parabola on canvas), a `GradientDescentAnimation` class (ball, gradient arrow, step history), and a `drawArrow` helper.

- [ ] **Step 1: Create `animations.js` with easing and arrow utilities**

```js
// animations.js

/**
 * Easing: smooth step (0→1 over t 0→1)
 */
function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

/**
 * Linearly interpolate between a and b by t (0–1)
 */
function lerp(a, b, t) { return a + (b - a) * t; }

/**
 * Draw an arrow from (x1,y1) to (x2,y2) on a canvas context.
 * color: CSS color string
 * headSize: arrowhead size in px (default 10)
 */
function drawArrow(ctx, x1, y1, x2, y2, color = '#58a6ff', headSize = 10) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  // arrowhead
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(
    x2 - headSize * Math.cos(angle - Math.PI / 6),
    y2 - headSize * Math.sin(angle - Math.PI / 6)
  );
  ctx.lineTo(
    x2 - headSize * Math.cos(angle + Math.PI / 6),
    y2 - headSize * Math.sin(angle + Math.PI / 6)
  );
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}
```

- [ ] **Step 2: Add `LossCurve` class — draws and manages the parabola**

Append to `animations.js`:

```js
/**
 * LossCurve
 * Draws a parabola L(w) = (w - wMin)^2 + minLoss on a canvas.
 * Provides coordinate conversion between "w-space" and canvas pixels.
 *
 * Usage:
 *   const lc = new LossCurve(canvas, { wMin: 2, minLoss: 0.1, wRange: [-1, 5] })
 *   lc.draw(ctx)
 *   const {cx, cy} = lc.toCanvas(w)   // w → pixel coords
 *   const w = lc.toW(cx)              // pixel x → w
 */
class LossCurve {
  /**
   * @param {HTMLCanvasElement} canvas
   * @param {object} opts
   *   wMin     - w value at the minimum (default 2)
   *   minLoss  - loss value at the minimum (default 0.05)
   *   wRange   - [wLow, wHigh] visible w range (default [-1, 5])
   *   padding  - canvas padding in px (default 40)
   */
  constructor(canvas, opts = {}) {
    this.canvas = canvas;
    this.wMin    = opts.wMin    ?? 2;
    this.minLoss = opts.minLoss ?? 0.05;
    this.wLow    = (opts.wRange ?? [-1, 5])[0];
    this.wHigh   = (opts.wRange ?? [-1, 5])[1];
    this.pad     = opts.padding ?? 40;
  }

  /** Compute loss at w */
  loss(w) {
    return Math.pow(w - this.wMin, 2) + this.minLoss;
  }

  /** Max loss in the visible range (for y-axis scaling) */
  get maxLoss() {
    return Math.max(this.loss(this.wLow), this.loss(this.wHigh));
  }

  /** Convert w → canvas pixel {cx, cy} */
  toCanvas(w) {
    const { canvas, pad, wLow, wHigh } = this;
    const W = canvas.width  - 2 * pad;
    const H = canvas.height - 2 * pad;
    const cx = pad + ((w - wLow) / (wHigh - wLow)) * W;
    const cy = pad + H - ((this.loss(w) - this.minLoss) / (this.maxLoss - this.minLoss)) * H;
    return { cx, cy };
  }

  /** Convert canvas pixel x → w */
  toW(cx) {
    const { canvas, pad, wLow, wHigh } = this;
    const W = canvas.width - 2 * pad;
    return wLow + ((cx - pad) / W) * (wHigh - wLow);
  }

  /** Draw the loss curve and axes on ctx */
  draw(ctx) {
    const { canvas, pad, wLow, wHigh } = this;
    const W = canvas.width;
    const H = canvas.height;

    // Background
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#161b22';
    ctx.fillRect(0, 0, W, H);

    // Axes
    ctx.strokeStyle = '#30363d';
    ctx.lineWidth = 1;
    ctx.beginPath();
    // x-axis (bottom)
    ctx.moveTo(pad, H - pad);
    ctx.lineTo(W - pad, H - pad);
    // y-axis (left)
    ctx.moveTo(pad, pad);
    ctx.lineTo(pad, H - pad);
    ctx.stroke();

    // Axis labels
    ctx.fillStyle = '#8b949e';
    ctx.font = '12px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('w  (parameter)', W / 2, H - 6);
    ctx.save();
    ctx.translate(12, H / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Loss L(w)', 0, 0);
    ctx.restore();

    // Curve
    ctx.beginPath();
    ctx.strokeStyle = '#f0a500';
    ctx.lineWidth = 2.5;
    const steps = 200;
    for (let i = 0; i <= steps; i++) {
      const w = wLow + (i / steps) * (wHigh - wLow);
      const { cx, cy } = this.toCanvas(w);
      i === 0 ? ctx.moveTo(cx, cy) : ctx.lineTo(cx, cy);
    }
    ctx.stroke();

    // Minimum marker
    const { cx: minX, cy: minY } = this.toCanvas(this.wMin);
    ctx.beginPath();
    ctx.arc(minX, minY, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#3fb950';
    ctx.fill();
    ctx.fillStyle = '#3fb950';
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('minimum', minX + 8, minY + 4);
  }
}
```

- [ ] **Step 3: Add `GradientDescentAnimation` class**

Append to `animations.js`:

```js
/**
 * GradientDescentAnimation
 * Manages an animated ball rolling down a LossCurve with gradient arrows.
 * Supports: draggable start position, configurable learning rate,
 *           step-by-step animation, path history.
 *
 * Usage:
 *   const anim = new GradientDescentAnimation(canvas, { learningRate: 0.3 })
 *   anim.setStart(w)        // set starting w position
 *   anim.run()              // begin stepping animation
 *   anim.reset()            // go back to start
 *   canvas.onclick = (e) => anim.handleClick(e)
 */
class GradientDescentAnimation {
  constructor(canvas, opts = {}) {
    this.canvas = canvas;
    this.ctx    = canvas.getContext('2d');
    this.curve  = new LossCurve(canvas, opts.curveOpts);
    this.lr     = opts.learningRate ?? 0.3;
    this.maxSteps = opts.maxSteps ?? 30;
    this.animSpeed = opts.animSpeed ?? 800; // ms per step

    this.w          = opts.startW ?? 4.5;
    this.startW     = this.w;
    this.history    = [this.w];
    this.stepIdx    = 0;
    this.running    = false;
    this._frameId   = null;
    this._stepTimer = null;

    // Drag state
    this._dragging  = false;

    this._render();
  }

  /** Gradient of the loss curve at w: d/dw [(w - wMin)^2] = 2(w - wMin) */
  _gradient(w) { return 2 * (w - this.curve.wMin); }

  setLearningRate(lr) { this.lr = lr; }

  setStart(w) {
    this.w = w;
    this.startW = w;
    this.history = [w];
    this.stepIdx = 0;
    this.running = false;
    clearTimeout(this._stepTimer);
    this._render();
  }

  reset() { this.setStart(this.startW); }

  run() {
    if (this.running) return;
    this.running = true;
    this._scheduleStep();
  }

  _scheduleStep() {
    if (!this.running) return;
    const grad = this._gradient(this.w);
    const nextW = this.w - this.lr * grad;
    const close = Math.abs(nextW - this.curve.wMin) < 0.01;
    const tooMany = this.history.length >= this.maxSteps;

    if (close || tooMany) {
      this.w = this.curve.wMin;
      this.history.push(this.w);
      this.running = false;
      this._render();
      return;
    }

    // Animate smooth transition w → nextW over animSpeed ms
    const startW = this.w;
    const endW   = nextW;
    const start  = performance.now();
    const dur    = this.animSpeed;

    const frame = (now) => {
      const t = Math.min((now - start) / dur, 1);
      this.w = lerp(startW, endW, easeInOut(t));
      this._render();
      if (t < 1) {
        this._frameId = requestAnimationFrame(frame);
      } else {
        this.w = endW;
        this.history.push(endW);
        this._render();
        this._stepTimer = setTimeout(() => this._scheduleStep(), 200);
      }
    };
    this._frameId = requestAnimationFrame(frame);
  }

  _render() {
    const { ctx, canvas, curve, w, history } = this;

    // Draw base curve
    curve.draw(ctx);

    // Draw path history (faint trail)
    if (history.length > 1) {
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(240,165,0,0.25)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 4]);
      for (let i = 0; i < history.length; i++) {
        const { cx, cy } = curve.toCanvas(history[i]);
        i === 0 ? ctx.moveTo(cx, cy) : ctx.lineTo(cx, cy);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw gradient arrow
    const grad = this._gradient(w);
    const { cx: bx, cy: by } = curve.toCanvas(w);
    // Arrow length proportional to gradient magnitude, capped
    const arrowLen = Math.min(Math.abs(grad) * 18, 70);
    const arrowDir = grad > 0 ? 1 : -1; // positive grad → move left
    // Draw horizontal arrow showing gradient direction on the w axis
    const ax2 = bx + arrowDir * arrowLen;
    const ay2 = by;
    // Color: blue (small gradient) → red (large gradient)
    const intensity = Math.min(Math.abs(grad) / 4, 1);
    const r = Math.round(lerp(88,  248, intensity));
    const g = Math.round(lerp(166, 81,  intensity));
    const b = Math.round(lerp(255, 73,  intensity));
    drawArrow(ctx, bx, by, ax2, ay2, `rgb(${r},${g},${b})`, 9);

    // Draw ball
    ctx.beginPath();
    ctx.arc(bx, by, 9, 0, Math.PI * 2);
    ctx.fillStyle = '#f0a500';
    ctx.shadowBlur = 12;
    ctx.shadowColor = '#f0a500';
    ctx.fill();
    ctx.shadowBlur = 0;

    // Info: current w, gradient, loss
    ctx.fillStyle = '#8b949e';
    ctx.font = '11px JetBrains Mono, monospace';
    ctx.textAlign = 'left';
    const lossVal = curve.loss(w).toFixed(4);
    const gradVal = grad.toFixed(4);
    const wVal    = w.toFixed(4);
    ctx.fillText(`w = ${wVal}   grad = ${gradVal}   loss = ${lossVal}`, canvas.width / 2 - 130, canvas.height - 10);
  }

  /** Handle canvas click: set start position to clicked w */
  handleClick(e) {
    if (this.running) return;
    const rect = this.canvas.getBoundingClientRect();
    const cx = (e.clientX - rect.left) * (this.canvas.width / rect.width);
    const w  = this.curve.toW(cx);
    if (w >= this.curve.wLow && w <= this.curve.wHigh) {
      this.setStart(w);
    }
  }
}
```

- [ ] **Step 4: Commit**

```bash
cd ~/Projects/study
git add animations.js
git commit -m "feat: add shared animation utilities (animations.js)"
```

---

### Task 3: Curriculum Hub (`index.html`)

**Files:**
- Create: `index.html`

The homepage. Shows the full curriculum as a visual roadmap with 5 sections. Gradient Descent is the only "available" (clickable) chapter — everything else is locked/greyed. No JavaScript needed for this page.

- [ ] **Step 1: Create `index.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ML Study — From Gradient Descent to Generative AI</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">

    <header class="page-header" style="text-align:center; border-bottom: none; padding: 3rem 0 2rem;">
      <p class="section-label">Study Reference</p>
      <h1>From Gradient Descent<br>to Generative AI</h1>
      <p style="color:var(--text-muted); margin-top:0.75rem; font-size:1.05rem;">
        Precise, visual, interactive. One concept at a time.
      </p>
    </header>

    <!-- Part 1: Basic ML -->
    <div class="curriculum-section">
      <h2>Part 1 — Basic Machine Learning</h2>
      <div class="topic-grid">
        <a class="topic-card available" href="chapters/gradient-descent.html">
          <div class="topic-title">Gradient Descent</div>
          <div class="topic-status">✓ Available</div>
        </a>
        <div class="topic-card locked"><div class="topic-title">Linear Regression</div><div class="topic-status">Coming soon</div></div>
        <div class="topic-card locked"><div class="topic-title">Logistic Regression</div><div class="topic-status">Coming soon</div></div>
        <div class="topic-card locked"><div class="topic-title">Decision Trees &amp; Random Forests</div><div class="topic-status">Coming soon</div></div>
        <div class="topic-card locked"><div class="topic-title">Support Vector Machines</div><div class="topic-status">Coming soon</div></div>
        <div class="topic-card locked"><div class="topic-title">K-Means Clustering</div><div class="topic-status">Coming soon</div></div>
        <div class="topic-card locked"><div class="topic-title">PCA &amp; Dimensionality Reduction</div><div class="topic-status">Coming soon</div></div>
        <div class="topic-card locked"><div class="topic-title">Bias-Variance Tradeoff</div><div class="topic-status">Coming soon</div></div>
        <div class="topic-card locked"><div class="topic-title">Regularization (L1, L2, Dropout)</div><div class="topic-status">Coming soon</div></div>
        <div class="topic-card locked"><div class="topic-title">Evaluation Metrics</div><div class="topic-status">Coming soon</div></div>
      </div>
    </div>

    <!-- Part 2: Neural Networks -->
    <div class="curriculum-section">
      <h2>Part 2 — Neural Networks</h2>
      <div class="topic-grid">
        <div class="topic-card locked"><div class="topic-title">The Perceptron</div><div class="topic-status">Coming soon</div></div>
        <div class="topic-card locked"><div class="topic-title">Multi-Layer Perceptrons</div><div class="topic-status">Coming soon</div></div>
        <div class="topic-card locked"><div class="topic-title">Activation Functions</div><div class="topic-status">Coming soon</div></div>
        <div class="topic-card locked"><div class="topic-title">Backpropagation</div><div class="topic-status">Coming soon</div></div>
        <div class="topic-card locked"><div class="topic-title">Optimizers (SGD, Adam, RMSProp)</div><div class="topic-status">Coming soon</div></div>
        <div class="topic-card locked"><div class="topic-title">Weight Initialization</div><div class="topic-status">Coming soon</div></div>
        <div class="topic-card locked"><div class="topic-title">Batch Normalization</div><div class="topic-status">Coming soon</div></div>
      </div>
    </div>

    <!-- Part 3: Deep Learning -->
    <div class="curriculum-section">
      <h2>Part 3 — Deep Learning</h2>
      <div class="topic-grid">
        <div class="topic-card locked"><div class="topic-title">Convolutional Neural Networks</div><div class="topic-status">Coming soon</div></div>
        <div class="topic-card locked"><div class="topic-title">Recurrent Neural Networks</div><div class="topic-status">Coming soon</div></div>
        <div class="topic-card locked"><div class="topic-title">LSTMs &amp; GRUs</div><div class="topic-status">Coming soon</div></div>
        <div class="topic-card locked"><div class="topic-title">Transformers &amp; Attention</div><div class="topic-status">Coming soon</div></div>
        <div class="topic-card locked"><div class="topic-title">Transfer Learning</div><div class="topic-status">Coming soon</div></div>
      </div>
    </div>

    <!-- Part 4: Generative AI -->
    <div class="curriculum-section">
      <h2>Part 4 — Generative AI</h2>
      <div class="topic-grid">
        <div class="topic-card locked"><div class="topic-title">Autoencoders &amp; VAEs</div><div class="topic-status">Coming soon</div></div>
        <div class="topic-card locked"><div class="topic-title">GANs</div><div class="topic-status">Coming soon</div></div>
        <div class="topic-card locked"><div class="topic-title">Diffusion Models</div><div class="topic-status">Coming soon</div></div>
        <div class="topic-card locked"><div class="topic-title">Large Language Models</div><div class="topic-status">Coming soon</div></div>
        <div class="topic-card locked"><div class="topic-title">Fine-tuning &amp; RLHF</div><div class="topic-status">Coming soon</div></div>
      </div>
    </div>

    <!-- Part 5: Modern GenAI -->
    <div class="curriculum-section">
      <h2>Part 5 — Modern GenAI</h2>
      <div class="topic-grid">
        <div class="topic-card locked"><div class="topic-title">Retrieval-Augmented Generation (RAG)</div><div class="topic-status">Coming soon</div></div>
        <div class="topic-card locked"><div class="topic-title">Model Context Protocol (MCP)</div><div class="topic-status">Coming soon</div></div>
        <div class="topic-card locked"><div class="topic-title">Agentic AI &amp; Tool Use</div><div class="topic-status">Coming soon</div></div>
        <div class="topic-card locked"><div class="topic-title">N8N &amp; Workflow Automation</div><div class="topic-status">Coming soon</div></div>
        <div class="topic-card locked"><div class="topic-title">Prompt Engineering</div><div class="topic-status">Coming soon</div></div>
      </div>
    </div>

    <footer style="text-align:center; padding: 2rem 0; color:var(--text-muted); font-size:0.85rem; border-top: 1px solid var(--border); margin-top: 2rem;">
      Personal study reference · Local only
    </footer>

  </div>
</body>
</html>
```

- [ ] **Step 2: Open `index.html` in browser and verify**

```bash
open ~/Projects/study/index.html
```

Check: dark background, gold accent on Part labels, green "Available" badge on Gradient Descent card, all other cards muted. Click Gradient Descent — 404 is fine at this point (chapter not built yet).

- [ ] **Step 3: Commit**

```bash
cd ~/Projects/study
git add index.html
git commit -m "feat: add curriculum hub (index.html)"
```

---

### Task 4: Gradient Descent Chapter (`chapters/gradient-descent.html`)

**Files:**
- Create: `chapters/gradient-descent.html`

The full first chapter. All 8 sections. Custom canvas animation using `GradientDescentAnimation` from `animations.js`. Interactive playground with learning rate and start-position sliders. 10 quiz questions.

- [ ] **Step 1: Create the chapter file — shell, header, hook, and intuition sections**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gradient Descent — ML Study</title>
  <link rel="stylesheet" href="../style.css">
</head>
<body>
<div class="container">

  <!-- Nav -->
  <header class="page-header">
    <div class="breadcrumb"><a href="../index.html">← Back to curriculum</a></div>
    <p class="section-label">Part 1 · Basic Machine Learning</p>
    <h1>Gradient Descent</h1>
    <p style="color:var(--text-muted); font-size:1.05rem; margin-top:0.5rem;">
      The algorithm that trains every AI model you've ever heard of.
    </p>
  </header>

  <!-- 1. Hook -->
  <div class="section">
    <div class="insight-box" style="font-style:normal; font-size:1.05rem; line-height:1.8;">
      GPT-4, Stable Diffusion, AlphaGo, your spam filter — they were all trained using one idea.
      Not different ideas for each. The same one. It's called <strong style="color:var(--accent)">Gradient Descent</strong>,
      and once you understand it, you understand the engine inside almost all of modern AI.
    </div>
  </div>

  <!-- 2. Intuition -->
  <div class="section">
    <p class="section-label">The Intuition</p>
    <h2>A blindfolded hiker trying to find the valley</h2>
    <p>
      Imagine you're blindfolded on a hilly landscape and your goal is to reach the lowest point —
      the valley floor. You can't see anything, but you can feel the slope of the ground under your feet.
    </p>
    <p>
      Your strategy: take a small step in whatever direction feels downhill. Then stop.
      Feel the slope again. Take another small step downhill. Repeat.
    </p>
    <p>
      Eventually, if the landscape is well-behaved, you'll reach the bottom.
    </p>
    <p>
      That's gradient descent. In a machine learning model:
    </p>
    <ul style="margin: 0.5rem 0 1rem 1.5rem; line-height:2;">
      <li>The <strong style="color:var(--accent)">landscape</strong> is the <em>loss function</em> — a measure of how wrong the model is.</li>
      <li>Your <strong style="color:var(--accent)">position</strong> is the model's current <em>parameter</em> (e.g., a weight <code>w</code>).</li>
      <li>The <strong style="color:var(--accent)">slope</strong> at your position is the <em>gradient</em> — it tells you which direction makes the loss go up.</li>
      <li>The <strong style="color:var(--accent)">step size</strong> is the <em>learning rate</em> — how far you move each time.</li>
    </ul>
    <p>
      The model adjusts its parameters step by step, each time nudging them slightly in the direction
      that reduces the loss. After thousands or millions of steps, the model's parameters settle
      at values that make it perform well.
    </p>
  </div>
```

- [ ] **Step 2: Add the "Aha" animation section**

Append inside `<div class="container">`, after the intuition section:

```html
  <!-- 3. The Aha Animation -->
  <div class="section">
    <p class="section-label">The Animation</p>
    <h2>Watch it happen</h2>
    <p>
      Below is the loss curve for a single parameter <code>w</code>.
      The gold ball is the model's current position. The arrow shows the gradient — which direction and how steeply the loss is increasing at that point.
    </p>
    <p style="color:var(--text-muted); font-size:0.9rem;">
      Click anywhere on the curve to set a starting position, then press <strong>Run</strong>.
    </p>

    <div class="animation-wrapper">
      <canvas id="gdCanvas" width="720" height="320" style="max-width:100%;"></canvas>
      <div class="animation-caption">
        Arrow color: <span style="color:#58a6ff">blue</span> = small gradient (gentle slope) →
        <span style="color:#f85149">red</span> = large gradient (steep slope)
      </div>
    </div>

    <div class="playground" style="margin-top:0;">
      <div class="control-row">
        <span class="control-label">Learning rate (α)</span>
        <input type="range" id="lrSlider" min="0.05" max="0.95" step="0.05" value="0.3">
        <span class="control-value" id="lrValue">0.30</span>
      </div>
      <div class="control-row">
        <button class="btn" id="runBtn">▶ Run</button>
        <button class="btn secondary" id="resetBtn">↺ Reset</button>
        <span style="font-size:0.85rem; color:var(--text-muted); margin-left:0.5rem;">
          Or click the canvas to pick a start position
        </span>
      </div>
    </div>
  </div>
```

- [ ] **Step 3: Add the Math section**

Append inside `<div class="container">`:

```html
  <!-- 4. The Math -->
  <div class="section">
    <p class="section-label">The Math — Built Up Slowly</p>
    <h2>The update rule</h2>

    <p><strong>Step 1 — What are we computing, in plain English?</strong></p>
    <p>
      We want to nudge the parameter <code>w</code> slightly in the direction that reduces the loss.
      The gradient tells us the direction that <em>increases</em> the loss, so we move in the <em>opposite</em> direction.
      How far we move is controlled by the learning rate <code>α</code> (alpha).
    </p>

    <div class="math-block">
      <div class="math-label">The Update Rule</div>
      <div class="formula">w  =  w  −  α · (dL/dw)</div>
      <div class="symbol-table">
        <span class="sym">w</span>       <span>the parameter we're adjusting (e.g., a weight in the model)</span>
        <span class="sym">α</span>       <span>learning rate — how big a step we take each time (a small positive number, like 0.01)</span>
        <span class="sym">dL/dw</span>  <span>the gradient — how much the loss L changes when we increase w by a tiny bit. "d" just means "a tiny change in."</span>
        <span class="sym">L</span>       <span>the loss — a single number measuring how wrong the model currently is</span>
      </div>
    </div>

    <p><strong>Step 2 — Where does the gradient come from?</strong></p>
    <p>
      For our simple example, the loss is <code>L(w) = (w − 2)²</code>.
      This is just a parabola — it's minimized when <code>w = 2</code>.
      The gradient (slope) of this loss is: <code>dL/dw = 2(w − 2)</code>.
      That's it. Two times the distance from the minimum.
    </p>

    <p><strong>Step 3 — A worked numeric example</strong></p>
    <p>
      Let's say our model starts at <code>w = 4</code> with learning rate <code>α = 0.3</code>.
      Here is one full step of gradient descent:
    </p>

    <div class="worked-example">
      <div class="step">
        <span class="step-num">1.</span>
        <span class="step-text">Compute the current loss: &nbsp;</span>
        <span class="step-math">L(4) = (4 − 2)² = 4</span>
      </div>
      <div class="step">
        <span class="step-num">2.</span>
        <span class="step-text">Compute the gradient at w = 4: &nbsp;</span>
        <span class="step-math">dL/dw = 2 × (4 − 2) = 4</span>
      </div>
      <div class="step">
        <span class="step-num">3.</span>
        <span class="step-text">Take the step: &nbsp;</span>
        <span class="step-math">w_new = 4 − 0.3 × 4 = 4 − 1.2 = 2.8</span>
      </div>
      <div class="step">
        <span class="step-num">4.</span>
        <span class="step-text">New loss: &nbsp;</span>
        <span class="step-math">L(2.8) = (2.8 − 2)² = 0.64 &nbsp; (down from 4 ✓)</span>
      </div>
      <div class="step" style="margin-top:0.5rem; padding-top:0.5rem; border-top:1px solid var(--border);">
        <span class="step-num">→</span>
        <span class="step-text">Repeat until loss stops decreasing. Each step gets us closer to w = 2.</span>
      </div>
    </div>
  </div>
```

- [ ] **Step 4: Add Interactive Playground section**

Append inside `<div class="container">`:

```html
  <!-- 5. Interactive Playground -->
  <div class="section">
    <p class="section-label">Interactive Playground</p>
    <h2>Feel the learning rate</h2>
    <p>
      The learning rate is the most important hyperparameter in gradient descent.
      Too small and training takes forever. Too large and it overshoots the minimum and diverges.
      Move the slider below and watch what happens.
    </p>

    <div class="playground">
      <div class="control-row">
        <span class="control-label">Learning rate (α)</span>
        <input type="range" id="playLrSlider" min="0.05" max="1.2" step="0.05" value="0.3">
        <span class="control-value" id="playLrValue">0.30</span>
      </div>
      <div class="control-row">
        <span class="control-label">Start position (w)</span>
        <input type="range" id="playStartSlider" min="-0.8" max="4.8" step="0.1" value="4.5">
        <span class="control-value" id="playStartValue">4.50</span>
      </div>
      <div class="control-row">
        <button class="btn" id="playRunBtn">▶ Run</button>
        <button class="btn secondary" id="playResetBtn">↺ Reset</button>
      </div>
      <div class="animation-wrapper" style="margin-top:1rem;">
        <canvas id="playCanvas" width="720" height="280" style="max-width:100%;"></canvas>
        <div class="animation-caption" id="playCaption">
          Try α = 0.05 (slow crawl) · α = 0.3 (smooth) · α = 1.05 (overshoots) · α = 1.2 (diverges)
        </div>
      </div>
    </div>
  </div>
```

- [ ] **Step 5: Add Misconceptions, Summary, and Quiz sections**

Append inside `<div class="container">`:

```html
  <!-- 6. Misconceptions -->
  <div class="section">
    <p class="section-label">Common Misconceptions</p>
    <h2>Things people get wrong</h2>
    <ul class="misconceptions-list">
      <li>
        <div class="myth">Gradient descent always finds the best solution.</div>
        <div class="truth">It finds a <em>local</em> minimum — the nearest valley — not necessarily the global one. For convex problems (like linear regression), local = global. For deep neural networks, there are many local minima, but in practice most are "good enough."</div>
      </li>
      <li>
        <div class="myth">A smaller learning rate is always safer.</div>
        <div class="truth">Too small and training takes exponentially longer, and you risk getting stuck in a bad local minimum before converging. There is an optimal range, not a monotone relationship.</div>
      </li>
      <li>
        <div class="myth">The gradient tells you where to go.</div>
        <div class="truth">The gradient tells you the direction of <em>steepest increase</em> in loss. You move in the <em>opposite</em> direction. The gradient is not a destination — it's a slope reading.</div>
      </li>
      <li>
        <div class="myth">Gradient descent uses the full dataset each step.</div>
        <div class="truth">That's batch gradient descent — one specific variant. In practice, stochastic gradient descent (SGD) uses one sample per step, and mini-batch GD uses a small batch. Most modern training uses mini-batches of 32–512 samples.</div>
      </li>
      <li>
        <div class="myth">Gradient descent is the same as backpropagation.</div>
        <div class="truth">Backpropagation is the algorithm for <em>computing</em> the gradients efficiently. Gradient descent is the algorithm that <em>uses</em> those gradients to update the weights. They work together but are distinct ideas.</div>
      </li>
    </ul>
  </div>

  <!-- 7. Summary -->
  <div class="section">
    <p class="section-label">Summary</p>
    <h2>The five things to remember</h2>
    <ul class="summary-list">
      <li>Gradient descent minimizes a loss function by repeatedly moving parameters in the direction opposite to the gradient.</li>
      <li>The gradient is the slope of the loss at the current parameter value — it points toward steepest increase, so we subtract it.</li>
      <li>The learning rate controls step size: too small = slow, too large = overshoots or diverges.</li>
      <li>For non-convex problems (neural networks), gradient descent finds a local minimum — not necessarily the global one.</li>
      <li>Backpropagation computes the gradients; gradient descent uses them. They are different algorithms that work together.</li>
    </ul>
  </div>

  <!-- 8. Quiz -->
  <div class="section">
    <p class="section-label">Test Your Understanding</p>
    <h2>10 Questions</h2>
    <p class="quiz-progress" id="quizProgress">0 / 10 revealed</p>
    <div class="quiz-grid" id="quizGrid">

      <div class="quiz-card" data-idx="0">
        <div class="quiz-question" onclick="toggleQuiz(this)">
          <span class="q-num">01</span>
          <span class="q-text">You double the learning rate. The model starts overshooting the minimum every step. What should you try instead of just halving it back?</span>
          <span class="q-toggle">▼</span>
        </div>
        <div class="quiz-answer">
          <strong>Use a learning rate schedule (decay).</strong> Start with the higher rate for faster early progress, then reduce it as training approaches convergence. Simply halving returns you to the original problem of slow convergence. Schedules like cosine annealing or step decay give you the best of both worlds.
        </div>
      </div>

      <div class="quiz-card" data-idx="1">
        <div class="quiz-question" onclick="toggleQuiz(this)">
          <span class="q-num">02</span>
          <span class="q-text">If the gradient at the current point is zero, gradient descent stops moving. Does that mean the model has found the best possible solution?</span>
          <span class="q-toggle">▼</span>
        </div>
        <div class="quiz-answer">
          <strong>Not necessarily.</strong> A gradient of zero means you're at a <em>critical point</em> — which could be a local minimum, a local maximum, or a saddle point. In high-dimensional spaces (neural networks), saddle points are far more common than local minima and can trap training. This is why momentum-based optimizers like Adam are preferred — they can escape shallow saddle points.
        </div>
      </div>

      <div class="quiz-card" data-idx="2">
        <div class="quiz-question" onclick="toggleQuiz(this)">
          <span class="q-num">03</span>
          <span class="q-text">Starting from w = 3.0, loss L(w) = (w−2)², learning rate α = 0.4. What is w after exactly one step?</span>
          <span class="q-toggle">▼</span>
        </div>
        <div class="quiz-answer">
          <strong>w = 2.2.</strong> Gradient at w=3: dL/dw = 2(3−2) = 2. Update: w = 3 − 0.4 × 2 = 3 − 0.8 = 2.2. Loss drops from (3−2)²=1 to (2.2−2)²=0.04.
        </div>
      </div>

      <div class="quiz-card" data-idx="3">
        <div class="quiz-question" onclick="toggleQuiz(this)">
          <span class="q-num">04</span>
          <span class="q-text">Two models train on identical data. Model A uses batch gradient descent (full dataset per step). Model B uses stochastic gradient descent (one sample per step). Model B converges first. Why?</span>
          <span class="q-toggle">▼</span>
        </div>
        <div class="quiz-answer">
          <strong>Model B takes more steps per unit of time, even though each step is noisier.</strong> Batch GD computes an exact gradient but needs the full dataset each time — expensive. SGD's noisy gradient estimate is computed from one sample and is cheap, so you can take many more steps per second. The noise can also help escape shallow local minima. The tradeoff: SGD's path is jagged, batch GD's is smooth.
        </div>
      </div>

      <div class="quiz-card" data-idx="4">
        <div class="quiz-question" onclick="toggleQuiz(this)">
          <span class="q-num">05</span>
          <span class="q-text">The loss is not decreasing after many steps, but the gradient is not zero either. What are two possible causes?</span>
          <span class="q-toggle">▼</span>
        </div>
        <div class="quiz-answer">
          <strong>1. Learning rate is too large</strong> — each step overshoots and the loss oscillates instead of decreasing. <strong>2. The model is stuck in a flat region</strong> (vanishing gradients) — the gradient is technically non-zero but so tiny that weight updates are negligible. Both look like "not decreasing" but need opposite fixes: decrease α for the first, change architecture or initialization for the second.
        </div>
      </div>

      <div class="quiz-card" data-idx="5">
        <div class="quiz-question" onclick="toggleQuiz(this)">
          <span class="q-num">06</span>
          <span class="q-text">Is it possible for gradient descent to increase the loss on a given step? When does this happen?</span>
          <span class="q-toggle">▼</span>
        </div>
        <div class="quiz-answer">
          <strong>Yes — when the learning rate is too large.</strong> The gradient points downhill locally, but a big step can "jump over" the minimum and land on the other side at a higher point. With a large enough learning rate, each step increases the loss further (divergence). This is why the learning rate must be tuned: the gradient only guarantees a downhill direction for infinitesimally small steps; for finite steps, overshooting is always possible.
        </div>
      </div>

      <div class="quiz-card" data-idx="6">
        <div class="quiz-question" onclick="toggleQuiz(this)">
          <span class="q-num">07</span>
          <span class="q-text">You normalize all input features to [0,1] before training. Why does this help gradient descent specifically?</span>
          <span class="q-toggle">▼</span>
        </div>
        <div class="quiz-answer">
          <strong>It makes the loss landscape more symmetric, so one learning rate works for all parameters.</strong> Without normalization, a feature with range [0, 10000] and one with range [0, 1] produce gradients of vastly different magnitudes. The optimal learning rate for one parameter would be catastrophic for the other. Normalization balances the gradients so a single α works reasonably well across all dimensions — the loss surface goes from an elongated ellipse to something closer to a circle.
        </div>
      </div>

      <div class="quiz-card" data-idx="7">
        <div class="quiz-question" onclick="toggleQuiz(this)">
          <span class="q-num">08</span>
          <span class="q-text">Starting at w = 0.5, L(w) = (w−2)², α = 0.3. After one step, is the gradient larger or smaller in magnitude than before?</span>
          <span class="q-toggle">▼</span>
        </div>
        <div class="quiz-answer">
          <strong>Smaller.</strong> At w=0.5: gradient = 2(0.5−2) = −3. Step: w = 0.5 − 0.3×(−3) = 0.5 + 0.9 = 1.4. At w=1.4: gradient = 2(1.4−2) = −1.2. The magnitude drops from 3 to 1.2 because we moved closer to the minimum (w=2). On a quadratic loss, gradient magnitude is proportional to distance from the minimum — each step brings you closer, so each subsequent gradient is smaller.
        </div>
      </div>

      <div class="quiz-card" data-idx="8">
        <div class="quiz-question" onclick="toggleQuiz(this)">
          <span class="q-num">09</span>
          <span class="q-text">Backpropagation is often called "the algorithm that trains neural networks." Is this accurate?</span>
          <span class="q-toggle">▼</span>
        </div>
        <div class="quiz-answer">
          <strong>Only half accurate.</strong> Backpropagation computes the gradients of the loss with respect to every weight in the network efficiently using the chain rule. But it doesn't update anything — that's gradient descent's job. Saying backprop trains networks is like saying "measuring the slope" climbs a mountain. You need both: backprop to compute gradients, gradient descent to use them.
        </div>
      </div>

      <div class="quiz-card" data-idx="9">
        <div class="quiz-question" onclick="toggleQuiz(this)">
          <span class="q-num">10</span>
          <span class="q-text">A model trained with gradient descent achieves 99% training accuracy but 60% test accuracy. Is the gradient descent working correctly?</span>
          <span class="q-toggle">▼</span>
        </div>
        <div class="quiz-answer">
          <strong>Yes — gradient descent is working exactly as designed. The problem is overfitting, not optimization.</strong> Gradient descent minimizes the training loss, and it did that well (99% training accuracy). The gap with test accuracy means the model memorized the training data instead of learning generalizable patterns. Gradient descent has no concept of generalization — that's handled by regularization, dropout, early stopping, and dataset size. This is a model/data problem, not an optimization problem.
        </div>
      </div>

    </div>
  </div>

</div><!-- end .container -->
```

- [ ] **Step 6: Add the closing script tag with all JavaScript**

Append just before `</body>`:

```html
<script src="../animations.js"></script>
<script>
// --- Animation canvas (section 3) ---
const gdCanvas = document.getElementById('gdCanvas');
const gdAnim   = new GradientDescentAnimation(gdCanvas, {
  learningRate: 0.3,
  startW: 4.5,
  animSpeed: 600,
});
gdCanvas.addEventListener('click', (e) => { gdAnim.handleClick(e); });

const lrSlider = document.getElementById('lrSlider');
const lrValue  = document.getElementById('lrValue');
lrSlider.addEventListener('input', () => {
  const v = parseFloat(lrSlider.value);
  lrValue.textContent = v.toFixed(2);
  gdAnim.setLearningRate(v);
  gdAnim.reset();
});

document.getElementById('runBtn').addEventListener('click', () => gdAnim.run());
document.getElementById('resetBtn').addEventListener('click', () => gdAnim.reset());

// --- Playground canvas (section 5) ---
const playCanvas = document.getElementById('playCanvas');
const playAnim   = new GradientDescentAnimation(playCanvas, {
  learningRate: 0.3,
  startW: 4.5,
  animSpeed: 500,
});

const playLrSlider    = document.getElementById('playLrSlider');
const playLrValue     = document.getElementById('playLrValue');
const playStartSlider = document.getElementById('playStartSlider');
const playStartValue  = document.getElementById('playStartValue');
const playCaption     = document.getElementById('playCaption');

function updatePlayCaption(lr) {
  if (lr <= 0.1)       playCaption.textContent = `α = ${lr.toFixed(2)} — very slow crawl. Will converge, but takes many steps.`;
  else if (lr <= 0.5)  playCaption.textContent = `α = ${lr.toFixed(2)} — smooth convergence. This is the sweet spot.`;
  else if (lr <= 0.95) playCaption.textContent = `α = ${lr.toFixed(2)} — overshooting. Notice it bounces before settling.`;
  else                  playCaption.textContent = `α = ${lr.toFixed(2)} — diverging! Each step makes things worse.`;
}

playLrSlider.addEventListener('input', () => {
  const v = parseFloat(playLrSlider.value);
  playLrValue.textContent = v.toFixed(2);
  playAnim.setLearningRate(v);
  playAnim.reset();
  updatePlayCaption(v);
});

playStartSlider.addEventListener('input', () => {
  const v = parseFloat(playStartSlider.value);
  playStartValue.textContent = v.toFixed(2);
  playAnim.setStart(v);
});

document.getElementById('playRunBtn').addEventListener('click',   () => playAnim.run());
document.getElementById('playResetBtn').addEventListener('click', () => playAnim.reset());

// --- Quiz ---
let revealed = 0;
function toggleQuiz(questionEl) {
  const card = questionEl.closest('.quiz-card');
  const wasRevealed = card.classList.contains('revealed');
  card.classList.toggle('revealed');
  revealed += wasRevealed ? -1 : 1;
  document.getElementById('quizProgress').textContent = `${revealed} / 10 revealed`;
}
</script>
</body>
</html>
```

- [ ] **Step 7: Open the chapter in browser and verify all sections**

```bash
open ~/Projects/study/chapters/gradient-descent.html
```

Verify in order:
1. Dark background, gold accents, breadcrumb "← Back to curriculum" links correctly
2. Animation canvas renders loss curve — gold parabola on dark background
3. Click canvas → ball moves to clicked position
4. Press Run → ball animates down to minimum with gradient arrow
5. Learning rate slider → changing value resets and shows effect on next run
6. Playground section: same behavior, caption updates with plain-English description of what's happening
7. Misconceptions: red left border on each item
8. Summary: 5 bullets with gold arrows
9. Quiz: all 10 questions collapsed, click to reveal answer, counter updates

- [ ] **Step 8: Commit**

```bash
cd ~/Projects/study
git add chapters/gradient-descent.html
git commit -m "feat: add Gradient Descent chapter — first complete chapter template"
```

---

## Self-Review Against Spec

**Spec coverage check:**

| Spec requirement | Covered in |
|---|---|
| Multi-file, shared CSS/JS, no build step | Task 1 (style.css), Task 2 (animations.js), structure |
| Index hub with curriculum roadmap, 5 parts | Task 3 |
| Locked/available states on topic cards | Task 3 step 1 |
| Chapter: 8-section structure (hook through quiz) | Task 4 |
| "Aha" animation — rolling ball, draggable start | Task 2 (GradientDescentAnimation), Task 4 step 2 |
| Learning rate slider with live visual feedback | Task 4 step 4 |
| Math built up in 3 steps (plain English → formula → numeric) | Task 4 step 3 |
| Every symbol in formula defined inline | Task 4 step 3 math-block |
| Misconceptions section (5 items) | Task 4 step 5 |
| Summary (5 bullets) | Task 4 step 5 |
| 10 quiz questions, click-to-reveal, mix of conceptual + math | Task 4 step 5 |
| Gradient arrows blue-to-red by magnitude | Task 2 step 3 (_render method) |
| Ball trail history | Task 2 step 3 |
| Dark navy + gold accent visual style | Task 1 (CSS variables) |
| Inter + JetBrains Mono fonts | Task 1 step 1 |
| Project at ~/Projects/study/ | Task 3 step 1 (index.html path) |

**Placeholder scan:** No TBDs or TODOs found. All code blocks are complete.

**Type consistency:** `GradientDescentAnimation`, `LossCurve`, `drawArrow`, `easeInOut`, `lerp` — names consistent across Task 2 definition and Task 4 usage. Canvas IDs (`gdCanvas`, `playCanvas`) match between HTML and JS.
