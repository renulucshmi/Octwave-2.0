"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";

type Prize = {
  title: string;
  amount: string;
  sub?: string;
  highlight?: boolean;
};

const championPrize: Prize = {
  title: "Champions",
  amount: " LKR 50,000",
  sub: "First Place",
  highlight: true,
};

const runnerUpPrizes: Prize[] = [
  { title: "First Runner Up", amount: " LKR 30,000", sub: "Second Place" },
  { title: "Second Runners Up", amount: " LKR 20,000", sub: "Third Place" },
];

function useStaggerReveal(selector: string, root?: HTMLElement | null) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const items = Array.from(el.querySelectorAll(selector));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            items.forEach((item, index) => {
              (item as HTMLElement).style.transitionDelay = `${index * 90}ms`;
              item.classList.add("prize-reveal");
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2, root: root ?? null }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [selector, root]);

  return containerRef;
}

export default function PrizeSection({
  title = "Prizes & Recognition",
}: {
  title?: string;
}) {
  const containerRef = useStaggerReveal("[data-prize-item]");

  return (
    <section id="prizes" className="section pb-16" ref={containerRef as any}>
      <style jsx>{`
        .prize-card {
          position: relative;
          transform: translateY(16px) scale(0.98);
          opacity: 0;
          transition: transform 600ms cubic-bezier(0.2, 0.8, 0.2, 1),
            opacity 600ms ease, box-shadow 400ms ease;
        }
        .prize-reveal.prize-card {
          transform: translateY(0) scale(1);
          opacity: 1;
        }
        .prize-card:hover {
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
        }
        .shine {
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }
        .shine::before {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: 16px;
          background: conic-gradient(
            from 120deg,
            var(--octwave-from),
            var(--octwave-to),
            var(--octwave-from)
          );
          filter: blur(18px);
          opacity: 0.18;
          z-index: -1;
        }
        .shine::after {
          content: "";
          position: absolute;
          inset: -200% -50%;
          background: linear-gradient(
            120deg,
            transparent 40%,
            rgba(255, 255, 255, 0.25) 50%,
            transparent 60%
          );
          transform: rotate(10deg) translateX(-60%);
        }
        .shine:hover::after {
          transition: transform 900ms cubic-bezier(0.2, 0.8, 0.2, 1);
          transform: rotate(10deg) translateX(60%);
        }
        .bg-layer {
          position: absolute;
          inset: 0;
          border-radius: 12px;
          background: linear-gradient(
            135deg,
            rgba(102, 126, 234, 0.12),
            rgba(118, 75, 162, 0.12)
          );
          pointer-events: none;
        }
        .bg-grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(
            rgba(255, 255, 255, 0.08) 1px,
            transparent 1px
          );
          background-size: 14px 14px;
          opacity: 0.4;
          border-radius: 12px;
          pointer-events: none;
        }
        .badge-pop {
          transform: translateY(4px);
          opacity: 0;
          transition: transform 500ms cubic-bezier(0.2, 0.8, 0.2, 1),
            opacity 500ms ease;
        }
        .prize-reveal .badge-pop {
          transform: translateY(0);
          opacity: 1;
        }
        .champion-card {
          background: linear-gradient(
            135deg,
            rgba(102, 126, 234, 0.15),
            rgba(118, 75, 162, 0.15)
          );
          border: 2px solid var(--octwave-from);
        }
        .certificate-card {
          /* subtle octwave-tinted background */
          background: linear-gradient(135deg, rgba(59,130,246,0.04), rgba(102,126,234,0.04));
          border: 1px solid rgba(59,130,246,0.06);
        }
        .participant-card {
          /* match theme and look of other prize cards */
          background: linear-gradient(135deg, rgba(102,126,234,0.06), rgba(118,75,162,0.04));
          border: 1px solid rgba(139,92,246,0.06);
        }
      `}</style>

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold octwave-gradient-text mb-4 text-center">
        {title}
      </h2>

      <div className="space-y-8">
        {/* Champion Section */}
        <div className="flex justify-center">
          <div
            data-prize-item
            className="prize-card champion-card card p-8 shine group rounded-2xl backdrop-blur max-w-sm w-full text-center"
          >
            <div className="bg-layer" />
            <div className="bg-grid" />

            <div className="flex justify-center mb-4">
              <span className="badge-pop inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold bg-gradient-to-r from-yellow-400/20 to-orange-500/20 text-yellow-600 dark:text-yellow-400 ring-2 ring-yellow-400/40">
                🏆 Champions
              </span>
            </div>

            <p className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[var(--octwave-from)] to-[var(--octwave-to)] mb-2">
              {championPrize.amount}
            </p>
            <p className="text-sm text-black/70 dark:text-white/70">
              {championPrize.sub}
            </p>

            <div className="mt-6 h-px bg-gradient-to-r from-transparent via-[var(--octwave-from)]/30 to-transparent" />

            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-black/60 dark:text-white/60">
              <span className="inline-block h-3 w-3 rounded-full bg-gradient-to-r from-[var(--octwave-from)] to-[var(--octwave-to)]" />
              Grand Prize Winner
            </div>
          </div>
        </div>

        {/* Runner-ups Section */}
        <div className="grid gap-4 sm:grid-cols-2 max-w-2xl mx-auto">
          {runnerUpPrizes.map((prize, index) => (
            <div
              key={prize.title}
              data-prize-item
              className="prize-card card p-6 shine group rounded-xl border border-white/10 dark:border-white/10 bg-white/60 dark:bg-black/40 backdrop-blur hover:ring-1 hover:ring-[var(--octwave-to)]/30"
            >
              <div className="bg-layer" />
              <div className="bg-grid" />

              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-black/70 dark:text-white/70">
                  {prize.title}
                </p>
                <span className="text-lg">{index === 0 ? "🥈" : "🥉"}</span>
              </div>

              <p className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[var(--octwave-from)] to-[var(--octwave-to)]">
                {prize.amount}
              </p>
              <p className="mt-1 text-xs text-black/60 dark:text-white/60">
                {prize.sub}
              </p>

              <div className="mt-4 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent dark:via-white/10" />

              <div className="mt-3 flex items-center gap-2 text-xs text-black/60 dark:text-white/60">
                <span className="inline-block h-2 w-2 rounded-full bg-[var(--octwave-from)]/70 group-hover:bg-[var(--octwave-to)]/70 transition-colors" />
                Awarded at Finale
              </div>
            </div>
          ))}
        </div>

        {/* Certificates Section */}
        <div className="grid gap-4 sm:grid-cols-2 max-w-3xl mx-auto">
          <div
            data-prize-item
            className="prize-card certificate-card card p-6 rounded-xl backdrop-blur text-center shine"
          >
            <div className="bg-layer" />
            <div className="flex items-center justify-center mb-3">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-[var(--octwave-from)] to-[var(--octwave-to)] text-white shadow-md">🏅</span>
            </div>
            <h3 className="text-lg font-semibold octwave-gradient-text mb-2">
              Finalists
            </h3>
            <p className="text-sm text-black/70 dark:text-white/70 mb-3">
              Physical Certificates
            </p>
            <p className="text-xs text-black/60 dark:text-white/60">
              All teams reaching the final round receive printed certificates
            </p>
          </div>

          <div
            data-prize-item
            className="prize-card participant-card card p-6 rounded-xl shine backdrop-blur text-center"
          >
            <div className="bg-layer" />
            <div className="flex items-center justify-center mb-3">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-[var(--octwave-to)] to-[var(--octwave-from)] text-white shadow-md">📜</span>
            </div>
            <h3 className="text-lg font-semibold octwave-gradient-text mb-2">
              All Participants
            </h3>
            <p className="text-sm text-black/70 dark:text-white/70 mb-3">
              Digital Certificates
            </p>
            <p className="text-xs text-black/60 dark:text-white/60">
              Every registered participant gets a digital certificate of
              participation
            </p>
          </div>
        </div>
      </div>

      <div className="relative mt-6">
        <div
          className="pointer-events-none absolute -inset-x-6 -top-6 -bottom-6 opacity-30 blur-2xl"
          aria-hidden
        >
          <div className="h-full w-full bg-gradient-to-tr from-[var(--octwave-from)]/20 via-transparent to-[var(--octwave-to)]/20" />
        </div>
      </div>
    </section>
  );
}
