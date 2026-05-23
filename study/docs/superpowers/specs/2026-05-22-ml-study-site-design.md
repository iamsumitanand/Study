# ML Study Site — Design Spec
**Date:** 2026-05-22  
**Status:** Approved

---

## Goal

A local, self-contained study website covering the full ML-to-GenAI curriculum. Inspired by 3Blue1Brown: dark elegant aesthetic, plain-English math, custom animations for key concepts, and interactive playgrounds. The primary goal is concept clarity and retention — not just exposure to material.

---

## Curriculum Scope

The full curriculum, in order:

**Part 1 — Basic ML**
- Gradient Descent ← first chapter (gold standard template)
- Linear Regression
- Logistic Regression
- Decision Trees & Random Forests
- Support Vector Machines
- K-Means Clustering
- PCA & Dimensionality Reduction
- Bias-Variance Tradeoff
- Regularization (L1, L2, Dropout)
- Evaluation Metrics (Precision, Recall, AUC, etc.)

**Part 2 — Neural Networks**
- The Perceptron
- Multi-Layer Perceptrons (MLP)
- Activation Functions
- Backpropagation
- Optimizers (SGD, Adam, RMSProp, etc.)
- Weight Initialization
- Batch Normalization

**Part 3 — Deep Learning**
- Convolutional Neural Networks (CNN)
- Recurrent Neural Networks (RNN)
- LSTMs & GRUs
- Transformers & Attention
- Transfer Learning

**Part 4 — Generative AI**
- Autoencoders & VAEs
- GANs
- Diffusion Models
- Large Language Models (LLMs)
- Fine-tuning & RLHF

**Part 5 — Modern GenAI**
- Retrieval-Augmented Generation (RAG)
- Model Context Protocol (MCP)
- Agentic AI & Tool Use
- N8N & Workflow Automation
- Prompt Engineering

---

## Project Structure

```
~/Projects/study/
├── index.html              # Hub — curriculum map, chapter picker
├── style.css               # Shared design system
├── animations.js           # Shared canvas/SVG animation utilities
└── chapters/
    ├── gradient-descent.html
    ├── linear-regression.html
    └── ... (one file per topic)
```

No build step. No framework. Open directly in browser. Each chapter is a standalone HTML file that links to shared `style.css` and `animations.js` via relative paths.

---

## Index Page (`index.html`)

A visual curriculum roadmap. Five sections (one per Part), each containing topic cards arranged in a grid. Cards link to their chapter file. 

- **Completed chapters:** full color, gold border, clickable
- **Future chapters:** muted/greyed, still visible to show the full journey
- Header: site title + subtitle ("From Gradient Descent to Generative AI")
- No login, no state, no backend

---

## Chapter Structure

Every chapter follows this exact 8-part layout:

1. **Hook** — One punchy sentence. Stakes the claim. Makes the reader feel why this topic matters before anything else.

2. **The Intuition** — Plain English only. No formulas. Build a concrete mental model using analogy and everyday language. This section must stand alone — a reader who skips everything else should leave with something.

3. **The "Aha" Animation** — A custom canvas or SVG animation for the single most important visual idea in the chapter. For Gradient Descent: an interactive loss curve with a rolling ball. This is the 3b1b moment — it should make something click that words can't.

4. **The Math — Built Up Slowly**
   - Step 1: Plain English statement of what the formula is computing
   - Step 2: The actual formula with every symbol labeled inline, immediately after each symbol appears
   - Step 3: A fully worked numeric example — real numbers, no variables, walk through the arithmetic

5. **Interactive Playground** — Sliders, inputs, or controls that let the reader experiment. Parameters change live output. For Gradient Descent: learning rate and starting position sliders with live loss curve updates.

6. **Common Misconceptions** — 3–5 bullet points. Each one names a specific wrong belief, then explains exactly why it's wrong. Precise, sharp, no padding.

7. **Summary** — Exactly 5 bullet points. Each is one tight sentence capturing a core idea. Designed to be re-read before an interview or exam.

8. **10 Quiz Questions** — Mix of conceptual gotchas and math traps (roughly 6 conceptual, 4 math). Click to reveal answer. The answer explains *why*, not just what. Questions are designed to expose the specific misconceptions people carry about this topic.

---

## Visual Style

| Element | Value |
|---|---|
| Background | `#0d1117` (deep dark navy) |
| Card/panel background | `#161b22` |
| Primary text | `#e6edf3` |
| Headings | `#ffffff` |
| Accent / highlight | `#f0a500` (warm gold) |
| Math callout border | `#f0a500` left border, `#161b22` background |
| Body font | Inter (Google Fonts) |
| Math / code font | JetBrains Mono |
| Animation accent | Gold ball, blue-to-red gradient arrows |
| Animation framerate | 60fps canvas, eased transitions |
| Quiz cards | Collapsed by default, smooth CSS expand on click |

Overall feel: high-quality textbook that is alive. Dark like a blackboard. Gold like chalk on a 3b1b video.

---

## Animation Philosophy

- **Hybrid approach:** Key "aha moment" concepts get a full custom canvas animation. Supporting concepts use interactive controls (sliders, inputs).
- The test for a full animation: "Would seeing this move make it click in a way that a static diagram wouldn't?" If yes, animate.
- Animations are interactive where possible — drag, click, adjust. Passive animations play once and stop; interactive ones wait for user input.
- No third-party animation libraries. Vanilla Canvas API + CSS transitions only, so files remain self-contained.

---

## Math Explanation Style

**Notation introduced gradually (Approach B):**

1. Plain English version first — what is this computing, in human terms
2. The formula — shown once, with every symbol defined inline immediately after it appears
3. Numeric example — substitute real numbers and walk through the arithmetic step by step

The goal: a reader should finish the math section knowing what the formula says, what each symbol means, and having seen it work on real numbers. They should not need to look anything up.

---

## Quiz Design

- 10 questions per chapter
- Mix: ~6 conceptual gotchas, ~4 math/reasoning traps
- Format: question visible, answer hidden behind a "Reveal" toggle
- Answer format: 2–4 sentences. State the answer, then explain the *why*. If the question targets a common misconception, name it explicitly.
- Questions are designed to be hard enough that getting one wrong feels like a useful discovery, not a trick.

---

## First Deliverable

Build the Gradient Descent chapter (`chapters/gradient-descent.html`) to full quality, plus the shared assets (`style.css`, `animations.js`) and the hub (`index.html`). This chapter is the gold standard — every subsequent chapter replicates its structure and style exactly.

The Gradient Descent chapter specifically must include:
- The rolling ball on a loss curve animation (draggable start position)
- A learning rate slider that shows overshooting vs. slow convergence live
- The full derivation of the update rule: `w = w - α * (dL/dw)`, built up from plain English
- A worked numeric example computing one step of gradient descent by hand
- 10 quiz questions targeting the specific misconceptions people have about gradient descent (local minima, learning rate effects, saddle points, etc.)
