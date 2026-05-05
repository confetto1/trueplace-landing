'use client';

import { useEffect, type ReactNode } from 'react';
import Image from 'next/image';

function LiveDot() {
  return (
    <span className="relative inline-flex h-1.5 w-1.5">
      <span className="absolute inset-0 rounded-full bg-[color:var(--color-accent)] live-dot" />
    </span>
  );
}

function Waveform() {
  const heights = [10, 18, 26, 14, 22, 30, 16, 24, 12, 28, 18, 22, 14, 26, 12];
  return (
    <div className="mt-3 flex h-7 items-center gap-[3px]">
      {heights.map((h, i) => (
        <span
          key={i}
          className="wave-bar w-[2.5px] rounded-full bg-[color:var(--color-accent)]/50"
          style={{ height: `${h}px`, animationDelay: `${i * 0.07}s` }}
        />
      ))}
    </div>
  );
}

function CascadeCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`flex w-[300px] shrink-0 flex-col rounded-xl border border-[color:var(--color-line)] bg-white/85 p-4 shadow-[0_2px_8px_rgba(20,17,15,0.04)] backdrop-blur ${className}`}
    >
      {children}
    </div>
  );
}

function TranscriptCard({ text }: { text: string }) {
  return (
    <CascadeCard>
      <div className="flex items-center gap-2">
        <LiveDot />
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[color:var(--color-mute)]">
          Live transcript
        </span>
      </div>
      <p className="mt-3 line-clamp-3 text-[13px] leading-relaxed text-[color:var(--color-ink-soft)]">
        &ldquo;{text}&rdquo;
      </p>
      <Waveform />
    </CascadeCard>
  );
}

function QuestionCard({ tag, q }: { tag: string; q: string }) {
  return (
    <CascadeCard>
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-accent)]">
        {tag}
      </span>
      <p className="mt-3 font-serif text-[18px] leading-snug tracking-[-0.01em] text-[color:var(--color-ink)]">
        {q}
      </p>
    </CascadeCard>
  );
}

function ScoreCard({ label, score }: { label: string; score: number }) {
  const pct = score / 5;
  return (
    <CascadeCard>
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-medium text-[color:var(--color-ink-soft)]">{label}</span>
        <span className="font-mono text-[11px] text-[color:var(--color-mute)]">scored</span>
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="font-serif text-[28px] leading-none text-[color:var(--color-ink)]">
          {score.toFixed(1)}
        </span>
        <span className="font-mono text-[11px] text-[color:var(--color-mute)]">/ 5.0</span>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[color:var(--color-line)]">
        <div
          className="score-fill h-full rounded-full bg-[color:var(--color-accent)]"
          style={{ ['--score' as string]: pct, width: '100%' }}
        />
      </div>
    </CascadeCard>
  );
}

function VerticalCard({ name, kind }: { name: string; kind: 'medical' | 'consulting' | 'finance' }) {
  const icon =
    kind === 'medical' ? (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ) : kind === 'consulting' ? (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 3v18" />
      </svg>
    ) : (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M14 7h7v7" />
      </svg>
    );
  return (
    <CascadeCard className="!w-auto !flex-row !items-center !gap-3 !p-3 !pr-5">
      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent)]">
        {icon}
      </span>
      <div className="flex flex-col">
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[color:var(--color-mute)]">
          Vertical
        </span>
        <span className="text-[13px] font-medium text-[color:var(--color-ink)]">{name}</span>
      </div>
    </CascadeCard>
  );
}

function AIPortrait() {
  return (
    <svg
      viewBox="0 0 170 200"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="ai-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4e4d4" />
          <stop offset="100%" stopColor="#e2c2a4" />
        </linearGradient>
        <radialGradient id="ai-glow" cx="0.5" cy="0.45" r="0.6">
          <stop offset="0%" stopColor="#fff8ef" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#fff8ef" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ai-suit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a2820" />
          <stop offset="100%" stopColor="#1f1410" />
        </linearGradient>
        <linearGradient id="ai-skin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ecc8a4" />
          <stop offset="100%" stopColor="#d4a47e" />
        </linearGradient>
        <linearGradient id="ai-hair" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3d2a1c" />
          <stop offset="100%" stopColor="#251710" />
        </linearGradient>
      </defs>

      <rect width="170" height="200" fill="url(#ai-bg)" />
      <ellipse cx="85" cy="100" rx="80" ry="70" fill="url(#ai-glow)" />

      {/* Suit / shoulders */}
      <path d="M -5 205 L -5 178 Q 22 148 56 148 Q 65 168 85 168 Q 105 168 114 148 Q 148 148 175 178 L 175 205 Z" fill="url(#ai-suit)" />

      {/* Shirt v-collar */}
      <path d="M 73 148 L 85 168 L 97 148 L 92 148 L 85 158 L 78 148 Z" fill="#f5f1ea" />

      {/* Neck */}
      <path d="M 76 130 Q 76 146 85 152 Q 94 146 94 130 Z" fill="url(#ai-skin)" />
      <path d="M 76 134 Q 76 142 85 146 Q 94 142 94 134 Z" fill="#000" opacity="0.08" />

      {/* Head */}
      <ellipse cx="85" cy="98" rx="33" ry="39" fill="url(#ai-skin)" />

      {/* Hair (short, professional) */}
      <path d="M 52 92 Q 52 58 85 54 Q 118 58 118 92 Q 116 76 106 70 Q 96 66 85 66 Q 74 66 64 70 Q 54 76 52 92 Z" fill="url(#ai-hair)" />
      <path d="M 53 90 Q 60 84 70 84 Q 65 90 60 96" fill="url(#ai-hair)" />

      {/* Eyebrows */}
      <path d="M 69 87 Q 74 85 79 87" stroke="#2a1810" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <path d="M 91 87 Q 96 85 101 87" stroke="#2a1810" strokeWidth="1.6" strokeLinecap="round" fill="none" />

      {/* Eyes */}
      <ellipse cx="74" cy="94" rx="2.4" ry="2.6" fill="#1a0d08" />
      <ellipse cx="96" cy="94" rx="2.4" ry="2.6" fill="#1a0d08" />
      <ellipse cx="74.7" cy="93.3" rx="0.7" ry="0.8" fill="#fff" />
      <ellipse cx="96.7" cy="93.3" rx="0.7" ry="0.8" fill="#fff" />

      {/* Nose */}
      <path d="M 85 100 Q 83 108 85 112 Q 87 110 85 108" stroke="#000" strokeWidth="0.6" opacity="0.18" fill="none" />

      {/* Smile */}
      <path d="M 77 118 Q 85 124 93 118" stroke="#5a2f1e" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <path d="M 78 118 Q 85 121 92 118" stroke="#a86a4f" strokeWidth="0.7" strokeLinecap="round" fill="none" opacity="0.6" />
    </svg>
  );
}

function YouPortrait() {
  return (
    <svg
      viewBox="0 0 48 56"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="you-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dde4ee" />
          <stop offset="100%" stopColor="#bcc7d6" />
        </linearGradient>
        <linearGradient id="you-skin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8c0a0" />
          <stop offset="100%" stopColor="#cf9c78" />
        </linearGradient>
      </defs>
      <rect width="48" height="56" fill="url(#you-bg)" />
      <path d="M 0 56 L 0 50 Q 10 39 24 39 Q 38 39 48 50 L 48 56 Z" fill="#3a4756" />
      <ellipse cx="24" cy="24" rx="11" ry="13" fill="url(#you-skin)" />
      <path d="M 13 23 Q 13 11 24 9 Q 35 11 35 23 Q 32 17 27 16 Q 23 15.5 21 16 Q 16 17 13 23 Z" fill="#1d1611" />
      <ellipse cx="20.5" cy="24" rx="0.9" ry="1.1" fill="#1a0d08" />
      <ellipse cx="27.5" cy="24" rx="0.9" ry="1.1" fill="#1a0d08" />
      <path d="M 21 30 Q 24 32 27 30" stroke="#5a2f1e" strokeWidth="0.7" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function SorenoPreview() {
  return (
    <div className="relative h-44 overflow-hidden bg-gradient-to-br from-[#0c1620] via-[#1a2632] to-[#252f3b]">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />
      {/* Glow */}
      <div className="absolute -top-12 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-[color:var(--color-accent)] opacity-20 blur-3xl" />

      {/* Header */}
      <div className="relative flex items-center justify-between px-5 pt-5">
        <div className="flex items-center gap-2">
          <span className="relative inline-flex h-1.5 w-1.5">
            <span className="absolute inset-0 rounded-full bg-[color:var(--color-accent)] live-dot" />
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/75">
            Profitability case
          </span>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/45">
          Round 2
        </span>
      </div>

      {/* Issue tree */}
      <div className="relative mt-3 flex flex-col items-center">
        <div className="rounded-md border border-white/15 bg-white/8 px-3 py-1 font-mono text-[11px] text-white/90 backdrop-blur">
          Profit
        </div>
        <svg width="200" height="16" className="opacity-30">
          <path
            d="M 100 0 L 100 8 L 50 8 L 50 16 M 100 8 L 150 8 L 150 16"
            stroke="white"
            strokeWidth="1"
            fill="none"
          />
        </svg>
        <div className="flex gap-12">
          <div className="flex items-center gap-1 rounded-md border border-white/15 bg-white/8 px-2.5 py-1 font-mono text-[10px] text-white/85 backdrop-blur">
            Revenue <span className="text-[color:var(--color-accent)]">↑</span>
          </div>
          <div className="flex items-center gap-1 rounded-md border border-white/15 bg-white/8 px-2.5 py-1 font-mono text-[10px] text-white/85 backdrop-blur">
            Cost <span className="text-[color:var(--color-accent)]">↓</span>
          </div>
        </div>
        <svg width="200" height="14" className="opacity-30">
          <path
            d="M 50 0 L 50 7 L 28 7 L 28 14 M 50 7 L 72 7 L 72 14 M 150 0 L 150 7 L 128 7 L 128 14 M 150 7 L 172 7 L 172 14"
            stroke="white"
            strokeWidth="1"
            fill="none"
          />
        </svg>
        <div className="flex gap-1.5">
          {['Price', 'Vol', 'Fixed', 'Var'].map((label) => (
            <span
              key={label}
              className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[9px] text-white/65"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ConfettoPreview() {
  return (
    <div className="relative h-44 overflow-hidden bg-gradient-to-br from-[#4a3fc4] via-[#6354da] to-[#8678e3]">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />
      {/* Glow */}
      <div className="absolute -bottom-10 right-0 h-44 w-44 rounded-full bg-white opacity-20 blur-3xl" />

      {/* Header */}
      <div className="relative flex items-center justify-between px-5 pt-5">
        <div className="flex items-center gap-2">
          <span className="relative inline-flex h-1.5 w-1.5">
            <span className="absolute inset-0 rounded-full bg-white live-dot" />
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/85">
            MMI · Ethics
          </span>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/55">
          Q4 of 8
        </span>
      </div>

      {/* Question card */}
      <div className="relative mx-5 mt-4 rounded-lg border border-white/20 bg-white/15 p-3 backdrop-blur-sm">
        <p className="font-serif text-[12px] leading-snug text-white">
          “A patient refuses life-saving treatment. How do you respond?”
        </p>
      </div>

      {/* Score bars */}
      <div className="relative mx-5 mt-3 space-y-1.5">
        {[
          { label: 'Empathy', score: 0.96 },
          { label: 'Reasoning', score: 0.84 },
          { label: 'Communication', score: 0.92 },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <span className="w-[78px] font-mono text-[9px] uppercase tracking-[0.12em] text-white/75">
              {s.label}
            </span>
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/15">
              <div
                className="score-fill h-full rounded-full bg-white"
                style={{ ['--score' as string]: s.score, width: '100%' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LiveInterviewMockup() {
  const transcript = [
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
          <LiveDot />
          <span className="font-mono text-[11px] tabular-nums text-[color:var(--color-mute)]">
            00:14:32
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="grid gap-px bg-[color:var(--color-line-soft)] md:grid-cols-[280px_1fr_240px]">
        {/* Avatar — video feed of the AI interviewer */}
        <div className="flex flex-col items-center justify-center bg-[color:var(--color-cream)] px-6 py-8">
          <div className="relative">
            {/* Pulsing rings around the frame */}
            <span className="frame-ring" style={{ animationDelay: '0s' }} />
            <span className="frame-ring" style={{ animationDelay: '1.05s' }} />
            <span className="frame-ring" style={{ animationDelay: '2.1s' }} />

            {/* Video feed frame */}
            <div className="relative h-[200px] w-[170px] overflow-hidden rounded-2xl border border-[color:var(--color-line)] shadow-[0_10px_30px_-10px_rgba(20,17,15,0.25)]">
              <AIPortrait />

              {/* AI badge */}
              <div className="absolute left-2.5 top-2.5 flex items-center gap-1.5 rounded-md bg-black/45 px-2 py-1 backdrop-blur-sm">
                <span className="relative inline-flex h-1.5 w-1.5">
                  <span className="absolute inset-0 rounded-full bg-[color:var(--color-accent)] live-dot" />
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white">AI Avatar</span>
              </div>

              {/* Bottom name strip */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent px-3 pb-2 pt-6">
                <p className="text-[12px] font-medium text-white">Interviewer</p>
                <p className="font-mono text-[9px] uppercase text-white/85">
                  <span className="speaking-pulse">speaking</span>
                </p>
              </div>
            </div>

            {/* Picture-in-picture — "you" feed */}
            <div className="absolute -bottom-3 -right-3 h-14 w-12 overflow-hidden rounded-lg border border-white/80 bg-[color:var(--color-paper)] shadow-md">
              <YouPortrait />
              <div className="absolute inset-x-0 bottom-0 px-1 pb-0.5">
                <p className="font-mono text-[7px] uppercase tracking-[0.16em] text-white/90">You</p>
              </div>
            </div>
          </div>

          {/* Waveform under feed */}
          <div className="mt-6 flex h-5 items-center gap-[3px]">
            {[10, 18, 12, 22, 8, 20, 14, 24, 10, 16, 12].map((h, i) => (
              <span
                key={i}
                className="wave-bar w-[2.5px] rounded-full bg-[color:var(--color-accent)]/60"
                style={{ height: `${h}px`, animationDelay: `${i * 0.07}s` }}
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
              <div
                key={i}
                className="transcript-line flex gap-3"
                style={{ animationDelay: `${i * 0.18}s` }}
              >
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

function InterviewCascade() {
  const row1: ReactNode[] = [
    <TranscriptCard key="t1" text="Walk me through how you'd size the U.S. coffee market in five minutes." />,
    <ScoreCard key="s1" label="Communication" score={4.7} />,
    <QuestionCard key="q1" tag="MMI · Q4" q="Tell me about a time you challenged authority." />,
    <VerticalCard key="v1" name="Medical school MMI" kind="medical" />,
    <TranscriptCard key="t2" text="If you had three more minutes, what would you add to your answer?" />,
    <ScoreCard key="s2" label="Clinical reasoning" score={4.5} />,
    <QuestionCard key="q2" tag="CASE · Round 2" q="Your client is losing share. Where would you start?" />,
    <VerticalCard key="v2" name="Management consulting" kind="consulting" />,
  ];
  const row2: ReactNode[] = [
    <QuestionCard key="q3" tag="PANEL · Q1" q="Why this specialty, and why now?" />,
    <TranscriptCard key="t3" text="I'd structure the problem into three buckets: revenue, cost, and competitive dynamics…" />,
    <ScoreCard key="s3" label="Frameworks" score={4.8} />,
    <VerticalCard key="v3" name="Investment banking" kind="finance" />,
    <QuestionCard key="q4" tag="MMI · Q7" q="A patient refuses life-saving treatment. What do you do?" />,
    <ScoreCard key="s4" label="Empathy" score={4.9} />,
    <TranscriptCard key="t4" text="Let me revise the assumption — the demand side is more elastic than I first thought." />,
    <VerticalCard key="v4" name="Residency match" kind="medical" />,
  ];
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-y-2 left-0 right-0" aria-hidden />
      <div className="space-y-4 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="overflow-hidden">
          <div className="marquee marquee-slow">
            {[...row1, ...row1].map((c, i) => (
              <div key={i} className="shrink-0">
                {c}
              </div>
            ))}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="marquee marquee-reverse">
            {[...row2, ...row2].map((c, i) => (
              <div key={i} className="shrink-0">
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const verticals = [
  'Medical school MMI',
  'Management consulting',
  'Investment banking',
  'Residency match',
  'Dental school',
  'PA school',
  'Nurse practitioner',
  'Strategy & operations',
  'Veterinary school',
  'CRNA',
  'Healthcare panel',
  'Case interviews',
];

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
      {/* Announcement bar */}
      <div className="relative z-50 bg-[color:var(--color-accent)] text-white shimmer">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-center px-6 text-[13px] sm:px-8">
          <span className="opacity-95">
            Confetto AI is the <span className="font-mono">#1</span> platform for medical school interview prep
          </span>
          <span className="ml-2 opacity-80">→</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-40 border-b border-[color:var(--color-line-soft)] bg-[color:var(--color-cream)]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8">
          <a href="#" className="flex items-center gap-2.5">
            <Image
              src="/trueplace-icon.png"
              alt="Trueplace"
              width={26}
              height={26}
              className="h-[26px] w-[26px] object-contain"
              priority
            />
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
              className="inline-flex items-center gap-3 rounded-full border border-[color:var(--color-line)] bg-white py-2 pl-4 pr-5 text-[14px] text-[color:var(--color-ink-soft)] shadow-[0_1px_2px_rgba(20,17,15,0.04)] transition hover:border-[color:var(--color-ink)]/20"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-[4px] bg-[#ff6600] font-sans text-[14px] font-bold leading-none text-white">
                Y
              </span>
              <span>Backed by <span className="font-medium text-[color:var(--color-ink)]">Y Combinator</span></span>
            </a>
          </div>
          <h1 className="font-serif text-[48px] font-normal leading-[1.02] tracking-[-0.02em] text-[color:var(--color-ink)] sm:text-[72px] md:text-[92px] md:leading-[0.98]">
            <span className="hero-rise delay-1 inline-block">AI interviews,</span>
            <br />
            <span className="accent-word font-mono text-[color:var(--color-accent)]" style={{ fontWeight: 500, letterSpacing: '-0.04em' }}>
              perfected
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
            <div className="product-card fade-up relative flex flex-col overflow-hidden rounded-2xl border border-[color:var(--color-line)] bg-white/70 p-8 backdrop-blur sm:p-10">
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
                A live voice AI that drills candidates on market sizing, profitability, and structuring cases — with instant, partner-grade feedback.
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
            <div className="product-card fade-up relative flex flex-col overflow-hidden rounded-2xl border border-[color:var(--color-line)] bg-white/70 p-8 backdrop-blur sm:p-10">
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
                The trusted interviewer for the next <span className="italic text-[color:var(--color-accent)]">generation</span> of doctors.
              </h3>
              <p className="mt-5 flex-1 text-[15px] leading-relaxed text-[color:var(--color-mute)]">
                Mock MMI and panel interviews for medical, dental, PA, nursing, and residency applicants — with rubric-aligned, AI-scored feedback.
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
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <div className="grid items-start gap-16 md:grid-cols-[1fr_1.4fr]">
            <div className="fade-up">
              <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-[color:var(--color-accent)]">
                About Trueplace
              </p>
            </div>
            <div className="fade-up space-y-6">
              <h2 className="font-serif text-[36px] font-normal leading-[1.15] tracking-[-0.01em] sm:text-[44px]">
                We believe the interview deserves better than a <span className="italic text-[color:var(--color-accent)]">coin flip</span>.
              </h2>
              <p className="text-[16px] leading-relaxed text-[color:var(--color-mute)]">
                Trueplace builds the AI interview infrastructure that high-stakes industries have always needed — voice-native, expert-aligned, and obsessively tuned for one job at a time.
              </p>
              <p className="text-[16px] leading-relaxed text-[color:var(--color-mute)]">
                Each product we ship is a vertical bet on a single career path: consulting, medicine, and more to come. Every candidate that practices with us walks into the room sharper than they walked out of the last one.
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
              href="mailto:hello@trueplace.ai"
              className="group inline-flex items-center gap-2 rounded-md bg-[color:var(--color-ink)] px-6 py-3 text-[14px] font-medium text-white transition hover:bg-[color:var(--color-accent)]"
            >
              <span className="font-mono text-[14px]">hello@trueplace.ai</span>
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
            <Image
              src="/trueplace-icon.png"
              alt="Trueplace"
              width={22}
              height={22}
              className="h-[22px] w-[22px] object-contain"
            />
            <span className="text-sm font-semibold tracking-tight">Trueplace</span>
            <span className="ml-3 font-mono text-[11px] text-[color:var(--color-mute)]">© {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-8 text-[14px] text-[color:var(--color-mute)]">
            <a href="https://soreno.ai" target="_blank" rel="noreferrer" className="transition hover:text-[color:var(--color-ink)]">Soreno AI</a>
            <a href="https://confetto.ai" target="_blank" rel="noreferrer" className="transition hover:text-[color:var(--color-ink)]">Confetto AI</a>
            <a href="mailto:hello@trueplace.ai" className="transition hover:text-[color:var(--color-ink)]">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
