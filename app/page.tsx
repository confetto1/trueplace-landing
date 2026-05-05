'use client';

import { useEffect } from 'react';
import Image from 'next/image';

function AbstractCircuit() {
  // Four long lines crossing the canvas (2 vertical + 2 horizontal),
  // forming a # pattern with pin terminals at the 8 outer ends.
  type V = { x: number; delay: number; reverse?: boolean };
  type H = { y: number; delay: number; reverse?: boolean };

  const verticals: V[] = [
    { x: 170, delay: 0.0 },
    { x: 230, delay: 1.4, reverse: true },
  ];
  const horizontals: H[] = [
    { y: 170, delay: 0.7 },
    { y: 230, delay: 2.1, reverse: true },
  ];

  const renderPin = (cx: number, cy: number, key: string) => (
    <g key={key}>
      <circle cx={cx} cy={cy} r="9" fill="url(#pin-glow)" />
      <circle cx={cx} cy={cy} r="4.5" fill="#fcfaf6" stroke="rgba(176,74,42,0.55)" strokeWidth="1.25" />
      <circle cx={cx} cy={cy} r="1.6" fill="rgba(176,74,42,0.85)" />
    </g>
  );

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[320px]">
      {/* Soft ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(176,74,42,0.10), transparent 65%)',
        }}
        aria-hidden
      />

      <svg viewBox="0 0 400 400" className="relative h-full w-full">
        <defs>
          <radialGradient id="pin-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="rgba(176,74,42,0.55)" />
            <stop offset="100%" stopColor="rgba(176,74,42,0)" />
          </radialGradient>
        </defs>

        {/* Vertical lines */}
        {verticals.map((t, i) => (
          <line
            key={`v-${i}`}
            x1={t.x}
            y1={50}
            x2={t.x}
            y2={350}
            stroke="rgba(176,74,42,0.32)"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
        ))}

        {/* Horizontal lines */}
        {horizontals.map((t, i) => (
          <line
            key={`h-${i}`}
            x1={50}
            y1={t.y}
            x2={350}
            y2={t.y}
            stroke="rgba(176,74,42,0.32)"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
        ))}

        {/* Pin terminals — 8 outer ends */}
        {verticals.flatMap((t, i) => [
          renderPin(t.x, 50,  `v-pin-${i}-top`),
          renderPin(t.x, 350, `v-pin-${i}-bot`),
        ])}
        {horizontals.flatMap((t, i) => [
          renderPin(50,  t.y, `h-pin-${i}-l`),
          renderPin(350, t.y, `h-pin-${i}-r`),
        ])}

        {/* Pulses on verticals */}
        {verticals.map((t, i) => {
          const from = t.reverse ? 350 : 50;
          const to = t.reverse ? 50 : 350;
          return (
            <circle key={`v-pulse-${i}`} r="3" cx={t.x} fill="#b04a2a" style={{ filter: 'drop-shadow(0 0 6px rgba(176,74,42,0.6))' }}>
              <animate attributeName="cy" values={`${from};${to}`} dur="6.5s" repeatCount="indefinite" begin={`${t.delay}s`} />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="6.5s" repeatCount="indefinite" begin={`${t.delay}s`} />
            </circle>
          );
        })}

        {/* Pulses on horizontals */}
        {horizontals.map((t, i) => {
          const from = t.reverse ? 350 : 50;
          const to = t.reverse ? 50 : 350;
          return (
            <circle key={`h-pulse-${i}`} r="3" cy={t.y} fill="#b04a2a" style={{ filter: 'drop-shadow(0 0 6px rgba(176,74,42,0.6))' }}>
              <animate attributeName="cx" values={`${from};${to}`} dur="7s" repeatCount="indefinite" begin={`${t.delay}s`} />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="7s" repeatCount="indefinite" begin={`${t.delay}s`} />
            </circle>
          );
        })}
      </svg>
    </div>
  );
}

function LiveInterviewMockup({ compact = false }: { compact?: boolean }) {
  const transcript = compact
    ? [
        { speaker: 'AI', text: 'Walk me through how you’d approach the case.' },
        { speaker: 'You', text: 'I’d clarify the goal — revenue, share, or margin?' },
        { speaker: 'AI', text: 'Margin. What are the levers?' },
      ]
    : [
        { speaker: 'AI', text: 'Walk me through how you’d approach the case.' },
        { speaker: 'You', text: 'I’d start by clarifying the goal — is the client optimizing for revenue, market share, or margin?' },
        { speaker: 'AI', text: 'Good. Assume margin. What are the levers?' },
        { speaker: 'You', text: 'Three buckets: pricing, mix, and unit economics…' },
      ];
  const scores = [
    { label: 'Structure', score: 4.8 },
    { label: 'Communication', score: 4.6 },
    { label: 'Frameworks', score: 4.7 },
    { label: 'Confidence', score: 4.4 },
  ];
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[color:var(--color-line)] bg-white/80 shadow-[0_30px_80px_-40px_rgba(20,17,15,0.18)] backdrop-blur">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-[color:var(--color-line-soft)] px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[color:var(--color-line)]" />
            <span className="h-2 w-2 rounded-full bg-[color:var(--color-line)]" />
            <span className="h-2 w-2 rounded-full bg-[color:var(--color-line)]" />
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-mute)]">
            trueplace · live session
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative inline-flex h-1.5 w-1.5">
            <span className="absolute inset-0 rounded-full bg-[color:var(--color-accent)] live-dot" />
          </span>
          <span className="font-mono text-[11px] tabular-nums text-[color:var(--color-mute)]">
            00:14:32
          </span>
        </div>
      </div>

      {/* Body */}
      <div className={`grid gap-px bg-[color:var(--color-line-soft)] ${compact ? 'grid-cols-1' : 'md:grid-cols-[280px_1fr_240px]'}`}>
        {/* Avatar */}
        <div className={`flex flex-col items-center justify-center bg-[color:var(--color-cream)] px-6 ${compact ? 'py-7' : 'py-10'}`}>
          <div className={`relative flex items-center justify-center ${compact ? 'h-24 w-24' : 'h-28 w-28'}`}>
            <span className="absolute inset-0 rounded-full border border-[color:var(--color-accent)]/40 avatar-ring" style={{ animationDelay: '0s' }} />
            <span className="absolute inset-0 rounded-full border border-[color:var(--color-accent)]/40 avatar-ring" style={{ animationDelay: '1.05s' }} />
            <span className="absolute inset-0 rounded-full border border-[color:var(--color-accent)]/40 avatar-ring" style={{ animationDelay: '2.1s' }} />
            <span className={`relative flex items-center justify-center rounded-full bg-gradient-to-br from-[color:var(--color-accent)] to-[#7a2c14] text-white shadow-[inset_0_-8px_20px_rgba(0,0,0,0.15)] ${compact ? 'h-16 w-16' : 'h-20 w-20'}`}>
              <svg width={compact ? 22 : 28} height={compact ? 22 : 28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="12" cy="9" r="3.5" />
                <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" />
              </svg>
            </span>
          </div>
          <p className="mt-5 font-serif text-[18px] leading-tight text-[color:var(--color-ink)]">
            Interviewer
          </p>
          <p className="mt-1 font-mono text-[10px] uppercase text-[color:var(--color-mute)]">
            <span className="speaking-pulse">speaking</span>
          </p>
          <div className="mt-4 flex h-6 items-center gap-[3px]">
            {[12, 22, 14, 26, 10, 24, 16, 28, 12, 20].map((h, i) => (
              <span
                key={i}
                className="wave-bar w-[3px] rounded-full bg-[color:var(--color-accent)]/60"
                style={{ height: `${h}px`, animationDelay: `${i * 0.08}s` }}
              />
            ))}
          </div>
        </div>

        {/* Transcript */}
        <div className="flex flex-col bg-[color:var(--color-cream)] px-6 py-7">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--color-mute)]">
              Live transcript
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--color-mute)]">
              MMI · Round 1
            </span>
          </div>
          <div className="mt-5 space-y-4">
            {transcript.map((line, i) => (
              <div key={i} className="transcript-line flex gap-3" style={{ animationDelay: `${i * 0.18}s` }}>
                <span
                  className={`mt-[3px] flex h-5 shrink-0 items-center rounded-md px-1.5 font-mono text-[9px] uppercase tracking-[0.14em] ${
                    line.speaker === 'AI'
                      ? 'bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent)]'
                      : 'bg-[color:var(--color-line-soft)] text-[color:var(--color-ink-soft)]'
                  }`}
                >
                  {line.speaker}
                </span>
                <p className="text-[13.5px] leading-relaxed text-[color:var(--color-ink-soft)]">
                  {line.text}
                  {i === transcript.length - 1 && (
                    <span className="cursor-blink ml-0.5 inline-block h-3 w-[2px] translate-y-0.5 bg-[color:var(--color-accent)]" />
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Score panel */}
        <div className="flex flex-col bg-[color:var(--color-cream)] px-6 py-7">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--color-mute)]">
            Live scoring
          </span>
          <div className="mt-5 space-y-4">
            {scores.map((s) => (
              <div key={s.label}>
                <div className="flex items-baseline justify-between">
                  <span className="text-[12px] text-[color:var(--color-ink-soft)]">{s.label}</span>
                  <span className="score-tick font-mono text-[12px] tabular-nums text-[color:var(--color-ink)]">
                    {s.score.toFixed(1)}
                  </span>
                </div>
                <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-[color:var(--color-line)]">
                  <div
                    className="score-fill h-full rounded-full bg-[color:var(--color-accent)]"
                    style={{ ['--score' as string]: s.score / 5, width: '100%' }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 border-t border-[color:var(--color-line-soft)] pt-5">
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--color-mute)]">
                Overall
              </span>
              <span className="score-tick font-serif text-[26px] leading-none text-[color:var(--color-ink)]">
                4.6
                <span className="font-mono text-[11px] text-[color:var(--color-mute)]">/5</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom data-flow shimmer */}
      <div className="relative h-[2px] w-full overflow-hidden bg-[color:var(--color-line-soft)]">
        <div className="absolute inset-0 flow-shimmer opacity-70" />
      </div>
    </div>
  );
}

function TrueplaceMark({ size = 26 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 26 26"
      fill="currentColor"
      aria-hidden
      className="text-[color:var(--color-accent)]"
    >
      <rect x="0" y="0" width="11" height="11" rx="1.5" />
      <rect x="15" y="0" width="11" height="11" rx="1.5" />
      <rect x="0" y="15" width="11" height="11" rx="1.5" />
      <rect x="15" y="15" width="11" height="11" rx="1.5" />
    </svg>
  );
}

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
    );
    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-[color:var(--color-cream)] text-[color:var(--color-ink)]">
      {/* Nav */}
      <nav className="sticky top-0 z-40 border-b border-[color:var(--color-line-soft)] bg-[color:var(--color-cream)]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8">
          <a href="#" className="flex items-center gap-2.5">
            <TrueplaceMark size={26} />
            <span className="text-[15px] font-semibold tracking-tight">Trueplace</span>
          </a>
          <div className="hidden items-center gap-9 md:flex">
            <a href="#products" className="text-[14px] text-[color:var(--color-ink-soft)]/80 transition hover:text-[color:var(--color-ink)]">
              Products
            </a>
            <a href="#about" className="text-[14px] text-[color:var(--color-ink-soft)]/80 transition hover:text-[color:var(--color-ink)]">
              About
            </a>
            <a href="#platform" className="text-[14px] text-[color:var(--color-ink-soft)]/80 transition hover:text-[color:var(--color-ink)]">
              Platform
            </a>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center rounded-md border border-[color:var(--color-ink)] px-4 py-1.5 text-[13px] font-medium text-[color:var(--color-ink)] transition hover:bg-[color:var(--color-ink)] hover:text-white"
          >
            Contact
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="relative mx-auto max-w-6xl px-6 text-center sm:px-8">
          <div className="hero-rise mb-8 flex justify-center">
            <a
              href="https://www.ycombinator.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-[color:var(--color-line)] bg-white py-2 pl-5 pr-5 text-[14px] text-[color:var(--color-ink-soft)] shadow-[0_1px_2px_rgba(20,17,15,0.04)] transition hover:border-[color:var(--color-ink)]/20"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-[4px] bg-[#ff6600] font-sans text-[14px] font-bold leading-none text-white">
                Y
              </span>
              <span>Backed by <span className="font-medium text-[color:var(--color-ink)]">Y Combinator</span></span>
            </a>
          </div>
          <h1 className="font-serif text-[48px] font-normal leading-[1.02] tracking-[-0.02em] text-[color:var(--color-ink)] sm:text-[72px] md:text-[92px] md:leading-[0.98]">
            <span className="hero-rise delay-1 inline-block">AI-native</span>
            <br />
            <span className="accent-word font-mono text-[color:var(--color-accent)]" style={{ fontWeight: 500, letterSpacing: '-0.04em' }}>
              preparation
            </span>
            <span className="hero-rise delay-3 inline-block font-serif text-[color:var(--color-accent)]">.</span>
          </h1>

          <p className="hero-rise delay-3 mx-auto mt-8 max-w-2xl text-[17px] leading-relaxed text-[color:var(--color-mute)] sm:text-[18px]">
            Trueplace is the company building <span className="font-medium text-[color:var(--color-ink)]">real-time AI interviewers</span> to prepare the <span className="font-medium text-[color:var(--color-ink)]">leaders of tomorrow</span>.
          </p>

          <div className="hero-rise delay-4 mt-10 flex items-center justify-center gap-3">
            <a
              href="#products"
              className="group inline-flex items-center gap-2 rounded-md bg-[color:var(--color-accent)] px-5 py-2.5 text-[14px] font-medium text-white transition hover:bg-[color:var(--color-ink)]"
            >
              Explore our products
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition group-hover:translate-x-0.5">
                <path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#about"
              className="inline-flex items-center rounded-md border border-[color:var(--color-line)] bg-transparent px-5 py-2.5 text-[14px] font-medium text-[color:var(--color-ink)] transition hover:border-[color:var(--color-ink)]"
            >
              About Trueplace
            </a>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="fade-up font-mono text-[12px] uppercase tracking-[0.18em] text-[color:var(--color-accent)]">
              Our products
            </p>
            <h2 className="fade-up mt-5 font-serif text-[40px] font-normal leading-[1.05] tracking-[-0.015em] sm:text-[56px]">
              Two platforms.
              <br />
              <span className="italic text-[color:var(--color-mute)]">One mission.</span>
            </h2>
            <p className="fade-up mt-6 text-[16px] leading-relaxed text-[color:var(--color-mute)]">
              Real-time AI interviewers preparing candidates for the moments their careers turn on.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {/* Soreno */}
            <div className="product-card fade-up relative flex flex-col overflow-hidden rounded-2xl border border-[rgba(176,74,42,0.35)] bg-white/70 p-8 shadow-[0_24px_60px_-28px_rgba(20,17,15,0.18)] backdrop-blur sm:p-10">
              <div className="flex h-12 items-center justify-between">
                <Image
                  src="/soreno-logo.png"
                  alt="Soreno"
                  width={180}
                  height={32}
                  className="h-7 w-auto object-contain"
                />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-mute)]">Consulting</span>
              </div>
              <h3 className="mt-10 font-serif text-[26px] font-normal leading-[1.15] tracking-[-0.01em] sm:text-[30px]">
                The trusted interviewer for the next <span className="italic text-[color:var(--color-accent)]">generation</span> of strategy.
              </h3>
              <p className="mt-5 flex-1 text-[15px] leading-relaxed text-[color:var(--color-mute)]">
                A real-time AI that prepares candidates for consulting, strategy, and product management.
              </p>
              <div className="mt-10">
                <a
                  href="https://soreno.ai"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-md bg-[color:var(--color-accent)] px-5 py-2.5 text-[14px] font-medium text-white transition hover:bg-[color:var(--color-ink)]"
                >
                  Visit Soreno
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition group-hover:translate-x-0.5">
                    <path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Confetto */}
            <div className="product-card fade-up relative flex flex-col overflow-hidden rounded-2xl border border-[rgba(176,74,42,0.35)] bg-white/70 p-8 shadow-[0_24px_60px_-28px_rgba(20,17,15,0.18)] backdrop-blur sm:p-10">
              <div className="flex h-12 items-center justify-between">
                <Image
                  src="/confetto-logo.png"
                  alt="Confetto"
                  width={200}
                  height={48}
                  className="h-12 w-auto object-contain"
                />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-mute)]">Healthcare</span>
              </div>
              <h3 className="mt-10 font-serif text-[26px] font-normal leading-[1.15] tracking-[-0.01em] sm:text-[30px]">
                The trusted interviewer for the next <span className="italic text-[color:var(--color-accent)]">generation</span> of healthcare.
              </h3>
              <p className="mt-5 flex-1 text-[15px] leading-relaxed text-[color:var(--color-mute)]">
                A real-time AI to prepare for interviews in medical, dental, PA, nursing, and residency.
              </p>
              <div className="mt-10">
                <a
                  href="https://confetto.ai"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-md bg-[color:var(--color-accent)] px-5 py-2.5 text-[14px] font-medium text-white transition hover:bg-[color:var(--color-ink)]"
                >
                  Visit Confetto
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition group-hover:translate-x-0.5">
                    <path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="dotted-divider" />
      </div>

      {/* Technology */}
      <section id="platform" className="py-28 sm:py-36">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="fade-up font-mono text-[12px] uppercase tracking-[0.18em] text-[color:var(--color-accent)]">
              The technology
            </p>
            <h2 className="fade-up mt-5 font-serif text-[40px] font-normal leading-[1.05] tracking-[-0.015em] sm:text-[56px]">
              A real-time AI avatar that talks back —{' '}
              <span className="italic text-[color:var(--color-accent)]">like a real interviewer</span>.
            </h2>
            <p className="fade-up mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-[color:var(--color-mute)]">
              Trueplace platforms run on a unified AI interviewer engine: ultra-realistic conversation, dynamic follow-ups,
              calibrated rubric scoring, and full video analysis of how candidates actually present.
            </p>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-line)] sm:grid-cols-2 lg:grid-cols-4">
            <div className="fade-up flex flex-col gap-3 bg-[color:var(--color-cream)] p-7">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent)]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
                </svg>
              </div>
              <h3 className="font-serif text-[22px] leading-tight tracking-[-0.01em]">
                Real-time AI <span className="italic text-[color:var(--color-accent)]">avatar</span>
              </h3>
              <p className="text-[14px] leading-relaxed text-[color:var(--color-mute)]">
                A real-time conversation with natural pacing — over a live voice and video session.
              </p>
            </div>

            <div className="fade-up flex flex-col gap-3 bg-[color:var(--color-cream)] p-7">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent)]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </div>
              <h3 className="font-serif text-[22px] leading-tight tracking-[-0.01em]">
                Dynamic <span className="italic text-[color:var(--color-accent)]">follow-ups</span>
              </h3>
              <p className="text-[14px] leading-relaxed text-[color:var(--color-mute)]">
                Highly contextual conversations that flow and pivot exactly like the room you&apos;re preparing for.
              </p>
            </div>

            <div className="fade-up flex flex-col gap-3 bg-[color:var(--color-cream)] p-7">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent)]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3h18v18H3z" />
                  <path d="M3 9h18M9 3v18" />
                </svg>
              </div>
              <h3 className="font-serif text-[22px] leading-tight tracking-[-0.01em]">
                Calibrated <span className="italic text-[color:var(--color-accent)]">rubric</span>
              </h3>
              <p className="text-[14px] leading-relaxed text-[color:var(--color-mute)]">
                Every answer is scored against the same rubric an admissions panel or interview partner uses — calibrated against thousands of real evaluations.
              </p>
            </div>

            <div className="fade-up flex flex-col gap-3 bg-[color:var(--color-cream)] p-7">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent)]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="6" width="14" height="12" rx="2" />
                  <path d="m22 8-6 4 6 4z" />
                </svg>
              </div>
              <h3 className="font-serif text-[22px] leading-tight tracking-[-0.01em]">
                Video <span className="italic text-[color:var(--color-accent)]">analysis</span>
              </h3>
              <p className="text-[14px] leading-relaxed text-[color:var(--color-mute)]">
                Tone, pacing, eye contact, and delivery — analyzed frame by frame, surfaced as the specific habits that make or break a real interview.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="dotted-divider" />
      </div>

      {/* About */}
      <section id="about" className="py-28 sm:py-36">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <div className="grid items-center gap-12 md:grid-cols-[1fr_1.6fr] md:gap-16">
            <div className="fade-up">
              <AbstractCircuit />
            </div>
            <div className="fade-up space-y-6">
              <p className="font-mono text-[14px] uppercase tracking-[0.18em] text-[color:var(--color-accent)]">
                About Trueplace
              </p>
              <h2 className="font-serif text-[44px] font-normal leading-[1.05] tracking-[-0.015em] sm:text-[60px]">
                We believe
                <br />
                AI is a <span className="italic text-[color:var(--color-accent)]">superpower</span>
                <br />
                in preparation.
              </h2>
              <p className="max-w-xl text-[17px] leading-relaxed text-[color:var(--color-mute)]">
                Trueplace builds the AI that prepares you for your career.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="dotted-divider" />
      </div>

      {/* CTA */}
      <section id="contact" className="py-28 sm:py-36">
        <div className="mx-auto max-w-3xl px-6 text-center sm:px-8">
          <h2 className="fade-up font-serif text-[44px] font-normal leading-[1.05] tracking-[-0.015em] sm:text-[60px]">
            Build with <span className="italic text-[color:var(--color-accent)]">us</span>.
          </h2>
          <p className="fade-up mx-auto mt-5 max-w-lg text-[16px] leading-relaxed text-[color:var(--color-mute)]">
            Have any questions? We&apos;d love to hear from you.
          </p>
          <div className="fade-up mt-10">
            <a
              href="mailto:hello@trueplace.ca"
              className="group inline-flex items-center gap-2 rounded-md bg-[color:var(--color-ink)] px-6 py-3 text-[14px] font-medium text-white transition hover:bg-[color:var(--color-accent)]"
            >
              <span className="text-[14px]">hello@trueplace.ca</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition group-hover:translate-x-0.5">
                <path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[color:var(--color-line-soft)] py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 sm:px-8 md:flex-row md:items-center">
          <div className="flex items-center gap-2.5">
            <TrueplaceMark size={22} />
            <span className="text-sm font-semibold tracking-tight">Trueplace</span>
            <span className="ml-3 font-mono text-[11px] text-[color:var(--color-mute)]">© {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-8 text-[14px] text-[color:var(--color-mute)]">
            <a href="https://soreno.ai" target="_blank" rel="noreferrer" className="transition hover:text-[color:var(--color-ink)]">Soreno AI</a>
            <a href="https://confetto.ai" target="_blank" rel="noreferrer" className="transition hover:text-[color:var(--color-ink)]">Confetto AI</a>
            <a href="mailto:hello@trueplace.ca" className="transition hover:text-[color:var(--color-ink)]">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
