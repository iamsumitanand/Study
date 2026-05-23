// animations.js

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function lerp(a, b, t) { return a + (b - a) * t; }

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

class LossCurve {
  constructor(canvas, opts = {}) {
    this.canvas = canvas;
    this.wMin    = opts.wMin    ?? 2;
    this.minLoss = opts.minLoss ?? 0.05;
    this.wLow    = (opts.wRange ?? [-1, 5])[0];
    this.wHigh   = (opts.wRange ?? [-1, 5])[1];
    this.pad     = opts.padding ?? 55;
  }

  loss(w) {
    return Math.pow(w - this.wMin, 2) + this.minLoss;
  }

  get maxLoss() {
    return Math.max(this.loss(this.wLow), this.loss(this.wHigh));
  }

  toCanvas(w) {
    const { canvas, pad, wLow, wHigh } = this;
    const W = canvas.width  - 2 * pad;
    const H = canvas.height - 2 * pad;
    const cx = pad + ((w - wLow) / (wHigh - wLow)) * W;
    const lossRange = this.maxLoss - this.minLoss;
    const cy = lossRange === 0
      ? pad + H / 2
      : pad + H - ((this.loss(w) - this.minLoss) / lossRange) * H;
    return { cx, cy };
  }

  toW(cx) {
    const { canvas, pad, wLow, wHigh } = this;
    const W = canvas.width - 2 * pad;
    return wLow + ((cx - pad) / W) * (wHigh - wLow);
  }

  draw(ctx) {
    const { canvas, pad, wLow, wHigh } = this;
    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--canvas-bg').trim() || '#161b22';
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = '#30363d';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad, H - pad);
    ctx.lineTo(W - pad, H - pad);
    ctx.moveTo(pad, pad);
    ctx.lineTo(pad, H - pad);
    ctx.stroke();

    ctx.fillStyle = '#8b949e';
    ctx.font = '12px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('w  (parameter)', W / 2, H - 20);
    ctx.save();
    ctx.translate(14, H / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Loss L(w)', 0, 0);
    ctx.restore();

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

    const { cx: minX, cy: minY } = this.toCanvas(this.wMin);
    ctx.beginPath();
    ctx.arc(minX, minY, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#3fb950';
    ctx.fill();
    ctx.fillStyle = '#3fb950';
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('minimum', minX, minY - 12);
  }
}

class GradientDescentAnimation {
  constructor(canvas, opts = {}) {
    this.canvas = canvas;
    this.ctx    = canvas.getContext('2d');
    this.curve  = new LossCurve(canvas, opts.curveOpts);
    this.lr     = opts.learningRate ?? 0.3;
    this.maxSteps = opts.maxSteps ?? 30;
    this.animSpeed = opts.animSpeed ?? 800;

    this.w          = opts.startW ?? 4.5;
    this.startW     = this.w;
    this.history    = [this.w];
    this.stepIdx    = 0;
    this.running    = false;
    this._frameId   = null;
    this._stepTimer = null;
    this._dragging  = false;

    this._render();
  }

  _gradient(w) { return 2 * (w - this.curve.wMin); }

  setLearningRate(lr) { this.lr = lr; }

  setStart(w) {
    cancelAnimationFrame(this._frameId);
    this._frameId = null;
    clearTimeout(this._stepTimer);
    this._stepTimer = null;
    this.w = w;
    this.startW = w;
    this.history = [w];
    this.stepIdx = 0;
    this.running = false;
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
    const diverging = Math.abs(nextW - this.curve.wMin) > Math.abs(this.w - this.curve.wMin) * 1.5;

    if (close) {
      this.w = this.curve.wMin;
      this.history.push(this.w);
      this.running = false;
      this._render();
      return;
    }
    if (diverging || tooMany) {
      this.running = false;
      this._render();
      return;
    }

    const startW = this.w;
    const endW   = nextW;
    const start  = performance.now();
    const dur    = this.animSpeed;

    const frame = (now) => {
      if (!this.running) return;   // guard against reset mid-animation
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

    curve.draw(ctx);

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

    const grad = this._gradient(w);
    const { cx: bx, cy: by } = curve.toCanvas(w);
    const arrowLen = Math.min(Math.abs(grad) * 18, 70);
    const arrowDir = grad > 0 ? 1 : -1; // positive grad → arrow points right (gradient direction = steepest ascent)
    const ax2 = bx + arrowDir * arrowLen;
    const ay2 = by;
    const intensity = Math.min(Math.abs(grad) / 4, 1);
    const r = Math.round(lerp(88,  248, intensity));
    const g = Math.round(lerp(166, 81,  intensity));
    const b = Math.round(lerp(255, 73,  intensity));
    drawArrow(ctx, bx, by, ax2, ay2, `rgb(${r},${g},${b})`, 9);

    ctx.beginPath();
    ctx.arc(bx, by, 9, 0, Math.PI * 2);
    ctx.fillStyle = '#f0a500';
    ctx.shadowBlur = 12;
    ctx.shadowColor = '#f0a500';
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.shadowColor = 'transparent';

    ctx.fillStyle = '#8b949e';
    ctx.font = '11px JetBrains Mono, monospace';
    ctx.textAlign = 'left';
    const lossVal = curve.loss(w).toFixed(4);
    const gradVal = grad.toFixed(4);
    const wVal    = w.toFixed(4);
    ctx.fillText(`w = ${wVal}   grad = ${gradVal}   loss = ${lossVal}`, canvas.width / 2 - 150, canvas.height - 6);
  }

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
