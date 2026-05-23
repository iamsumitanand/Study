// motivation.js — confetti, milestone toasts, quiz score tracking

(function () {

  // ── Chapter → part map ───────────────────────────────────
  const CHAPTERS = {
    1: ['gradient-descent','linear-regression','logistic-regression','decision-trees','svm','k-means','pca','bias-variance','regularization','evaluation-metrics'],
    2: ['perceptron','mlp','activation-functions','backpropagation','optimizers','weight-init','batch-norm'],
    3: ['cnn','rnn','lstm-gru','transformers','transfer-learning'],
    4: ['autoencoders','gans','diffusion-models','llms','fine-tuning-rlhf'],
    5: ['rag','mcp','agentic-ai','n8n','prompt-engineering'],
  };

  // ── Milestone messages ───────────────────────────────────
  const CHAPTER_MILESTONES = {
    'gradient-descent':   'You now understand the engine behind every AI model ever trained.',
    'backpropagation':    'You understand how neural networks actually learn. Most people never get this far.',
    'transformers':       'You understand how ChatGPT processes your words.',
    'llms':               'Large language models are no longer a black box to you.',
    'fine-tuning-rlhf':   'You understand how raw models become useful assistants.',
    'rag':                'You know how AI systems ground their answers in real data.',
  };

  const PART_MILESTONES = {
    1: 'Part 1 complete. You can read an ML paper and follow the math.',
    2: 'Part 2 complete. You understand how neural networks think.',
    3: 'Part 3 complete. Deep learning is yours.',
    4: 'Part 4 complete. You understand how generative AI is built.',
    5: 'All 27 chapters complete. You understand AI from first principles. That\'s rare.',
  };

  // ── Confetti ─────────────────────────────────────────────
  function launchConfetti() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const COLORS = ['#f0a500','#58a6ff','#3fb950','#f85149','#e0c070','#ffffff'];
    const cx = canvas.width / 2;
    const particles = Array.from({ length: 130 }, () => ({
      x:        cx + (Math.random() - 0.5) * canvas.width * 0.5,
      y:        canvas.height * 0.42,
      vx:       (Math.random() - 0.5) * 13,
      vy:       -(Math.random() * 10 + 4),
      size:     Math.random() * 7 + 3,
      color:    COLORS[Math.floor(Math.random() * COLORS.length)],
      rot:      Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.25,
      shape:    Math.random() > 0.45 ? 'rect' : 'circle',
      alpha:    1,
    }));

    let start = null;
    function frame(ts) {
      if (!start) start = ts;
      const elapsed = ts - start;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach(p => {
        p.x   += p.vx;
        p.y   += p.vy;
        p.vy  += 0.38;
        p.rot += p.rotSpeed;
        if (elapsed > 1000) p.alpha = Math.max(0, p.alpha - 0.018);
        if (p.alpha > 0.01) alive = true;
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 3.5, p.size, p.size / 3.5);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });
      if (alive && elapsed < 4500) requestAnimationFrame(frame);
      else canvas.remove();
    }
    requestAnimationFrame(frame);
  }

  // ── Milestone toast ───────────────────────────────────────
  function showToast(message) {
    const prev = document.getElementById('milestone-toast');
    if (prev) prev.remove();
    const toast = document.createElement('div');
    toast.id = 'milestone-toast';
    toast.className = 'milestone-toast';
    toast.innerHTML = `<span class="toast-icon">✦</span><span class="toast-msg">${message}</span>`;
    document.body.appendChild(toast);
    requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('toast-visible')));
    setTimeout(() => {
      toast.classList.remove('toast-visible');
      setTimeout(() => toast.remove(), 500);
    }, 5000);
  }

  // ── localStorage helpers ─────────────────────────────────
  function getRead() {
    try { return JSON.parse(localStorage.getItem('study_read') || '[]'); } catch(e) { return []; }
  }

  function getQuizAnswered(slug) {
    try { return JSON.parse(localStorage.getItem('study_quiz_' + slug) || '[]'); } catch(e) { return []; }
  }

  function getTotalQuizScore() {
    let total = 0;
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith('study_quiz_')) {
          total += JSON.parse(localStorage.getItem(k) || '[]').length;
        }
      }
    } catch(e) {}
    return total;
  }

  // ── Main hooks ────────────────────────────────────────────

  // Call from chapter page after marking a chapter read
  function onChapterRead(slug) {
    try {
      const read = getRead();
      const isNew = !read.includes(slug);
      if (!isNew) return;
      read.push(slug);
      localStorage.setItem('study_read', JSON.stringify(read));

      launchConfetti();

      // Chapter milestone?
      const chapterMsg = CHAPTER_MILESTONES[slug];

      // Part milestone?
      let partMsg = null;
      for (const [part, chapters] of Object.entries(CHAPTERS)) {
        if (chapters.includes(slug)) {
          const allDone = chapters.every(c => read.includes(c));
          if (allDone) partMsg = PART_MILESTONES[part];
          break;
        }
      }

      // Show part milestone first if both fire, then chapter after delay
      if (partMsg) {
        showToast(partMsg);
      } else if (chapterMsg) {
        showToast(chapterMsg);
      }
    } catch(e) {}
  }

  // Call from chapter quiz when a question is revealed for the first time
  function onQuizAnswered(slug, idx) {
    try {
      const answered = getQuizAnswered(slug);
      if (!answered.includes(idx)) {
        answered.push(idx);
        localStorage.setItem('study_quiz_' + slug, JSON.stringify(answered));
      }
      return { chapter: answered.length, total: getTotalQuizScore() };
    } catch(e) { return { chapter: 0, total: 0 }; }
  }

  // ── Public API ────────────────────────────────────────────
  window.StudyMotivation = {
    onChapterRead,
    onQuizAnswered,
    getTotalQuizScore,
    getQuizAnswered,
    launchConfetti,
    showToast,
  };

})();
