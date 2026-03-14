"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import TiltCard from "./TiltCard";
import CommandPaletteDemo from "./CommandPaletteDemo";
import HeatmapDemo from "./HeatmapDemo";
import FeatureCarousel from "./FeatureCarousel";

export default function BentoFeatures() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  const [cmdVisible, setCmdVisible] = useState(false);
  const [heatmapVisible, setHeatmapVisible] = useState(false);

  const editorCardRef = useRef<HTMLDivElement>(null);
  const votingCardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const row1Cards = sectionRef.current.querySelectorAll(
        '[data-bento-row="1"]'
      );
      const row2Cards = sectionRef.current.querySelectorAll(
        '[data-bento-row="2"]'
      );
      const row3Cards = sectionRef.current.querySelectorAll(
        '[data-bento-row="3"]'
      );
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 10%",
          scrub: 1,
          onEnter: () => {
            setCmdVisible(true);
            setHeatmapVisible(true);
          },
        },
      });

      tl.from(
        headlineRef.current,
        { y: 60, opacity: 0, duration: 0.15, ease: "power3.out" },
        0
      );

      row1Cards.forEach((card, i) => {
        tl.from(
          card,
          {
            y: 100,
            opacity: 0,
            scale: 0.93,
            rotateX: 5,
            duration: 0.2,
            ease: "power3.out",
          },
          0.12 + i * 0.06
        );
      });

      row2Cards.forEach((card, i) => {
        tl.from(
          card,
          {
            y: 100,
            opacity: 0,
            scale: 0.93,
            rotateX: 5,
            duration: 0.2,
            ease: "power3.out",
          },
          0.28 + i * 0.05
        );
      });

      row3Cards.forEach((card) => {
        tl.from(
          card,
          {
            y: 80,
            opacity: 0,
            scale: 0.95,
            rotateX: 3,
            duration: 0.2,
            ease: "power3.out",
          },
          0.48
        );
      });


      if (editorCardRef.current) {
        const codeLines = editorCardRef.current.querySelectorAll("[data-code-line]");
        ScrollTrigger.create({
          trigger: editorCardRef.current,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.fromTo(
              codeLines,
              { opacity: 0, x: -12 },
              {
                opacity: 1,
                x: 0,
                duration: 0.4,
                stagger: 0.08,
                ease: "power2.out",
              }
            );
          },
        });
      }

      if (votingCardRef.current) {
        const stars = votingCardRef.current.querySelectorAll("[data-star]");
        const scoreEl = votingCardRef.current.querySelector("[data-score]");
        const voteBars = votingCardRef.current.querySelectorAll("[data-vote-bar]");
        ScrollTrigger.create({
          trigger: votingCardRef.current,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.fromTo(
              stars,
              { scale: 0, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                duration: 0.3,
                stagger: 0.1,
                ease: "back.out(2)",
              }
            );
            if (scoreEl) {
              const scoreState = { value: 0 };
              gsap.fromTo(
                scoreState,
                { value: 0 },
                {
                  value: 8.46,
                  duration: 1.2,
                  ease: "power2.out",
                  onUpdate: () => {
                    scoreEl.textContent = `${scoreState.value.toFixed(2)}/9`;
                  },
                  delay: 0.3,
                }
              );
            }

            const filledStars = Math.round(8.46);
            stars.forEach((starEl, index) => {
              const starNode = starEl as SVGElement;
              const starPath = starNode.querySelector("path");
              const isFilled = index < filledStars;
              starNode.style.color = isFilled ? "var(--theme-accent)" : "var(--theme-text-muted)";
              if (starPath) {
                starPath.setAttribute("fill", isFilled ? "currentColor" : "none");
              }
            });

            gsap.fromTo(
              voteBars,
              { scaleX: 0 },
              {
                scaleX: 1,
                duration: 0.6,
                stagger: 0.08,
                ease: "power2.out",
                delay: 0.4,
              }
            );
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative py-32 md:py-40"
      style={{ background: "var(--theme-bg)", "--theme-accent": "#E8963A" } as React.CSSProperties}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div ref={headlineRef} className="mb-16 md:mb-20 will-change-transform">
          <span
            className="text-xs font-bold uppercase tracking-[0.2em] block mb-4"
            style={{
              color: "#e85464",
              fontFamily: "var(--font-heading)",
            }}
          >
            Feature Arsenal
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter leading-[1.05]"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--theme-text)",
            }}
          >
            Everything you need.
            <br />
            <span style={{ color: "#e85464" }}>
              Nothing you don&apos;t.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          <TiltCard
            className="md:col-span-2 rounded-[2rem] border overflow-hidden"
            intensity={4}
          >
            <div
              data-bento
              data-bento-row="1"
              className="h-full p-6 md:p-8 will-change-transform"
              style={{
                background: "var(--theme-card-bg)",
                borderColor: "var(--theme-border)",
              }}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3
                    className="text-lg font-bold tracking-tight"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--theme-text)",
                    }}
                  >
                    Command Palette
                  </h3>
                  <p
                    className="text-sm mt-1"
                    style={{ color: "var(--theme-text-muted)" }}
                  >
                    Ctrl+K to access any feature instantly
                  </p>
                </div>
                <kbd
                  className="px-2 py-1 rounded-lg text-[11px] font-mono font-medium border"
                  style={{
                    borderColor: "var(--theme-border)",
                    color: "var(--theme-text-muted)",
                    background: "var(--theme-surface)",
                  }}
                >
                  Ctrl+K
                </kbd>
              </div>
              <CommandPaletteDemo active={cmdVisible} />
            </div>
          </TiltCard>

          <TiltCard
            className="rounded-[2rem] border overflow-hidden"
            intensity={6}
          >
            <div
              data-bento
              data-bento-row="1"
              className="h-full p-6 md:p-8 flex flex-col will-change-transform"
              style={{
                background: "var(--theme-card-bg)",
                borderColor: "var(--theme-border)",
              }}
            >
              <h3
                className="text-lg font-bold tracking-tight"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--theme-text)",
                }}
              >
                Activity Heatmap
              </h3>
              <p
                className="text-sm mt-1 mb-6"
                style={{ color: "var(--theme-text-muted)" }}
              >
                Visualize your ship streak
              </p>
              <div className="flex-1 flex items-center justify-center">
                <HeatmapDemo active={heatmapVisible} />
              </div>
            </div>
          </TiltCard>

          <TiltCard
            className="rounded-[2rem] border overflow-hidden"
            intensity={5}
          >
            <div
              ref={editorCardRef}
              data-bento
              data-bento-row="2"
              className="h-full p-6 md:p-8 will-change-transform"
              style={{
                background: "var(--theme-card-bg)",
                borderColor: "var(--theme-border)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "var(--theme-surface)" }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  style={{ color: "var(--theme-accent)" }}
                >
                  <path
                    d="M4 5h12M4 10h8M4 15h10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3
                className="text-lg font-bold tracking-tight"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--theme-text)",
                }}
              >
                Markdown Editor
              </h3>
              <p
                className="text-sm mt-1 mb-4"
                style={{ color: "var(--theme-text-muted)" }}
              >
                Write, preview, and publish devlogs with syntax highlighting and live preview.
              </p>
              <div
                className="rounded-xl overflow-hidden border"
                style={{ background: "var(--theme-surface)", borderColor: "var(--theme-border)" }}
              >
                <div
                  className="flex items-center gap-2 px-3 py-2 border-b"
                  style={{ borderColor: "var(--theme-border)" }}
                >
                  {["B", "I", "H1", "{ }"].map((btn) => (
                    <span
                      key={btn}
                      className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded"
                      style={{
                        backgroundColor: "var(--theme-card-bg)",
                        color: "var(--theme-text-muted)",
                      }}
                    >
                      {btn}
                    </span>
                  ))}
                </div>
                <div className="p-3 space-y-1.5 font-mono text-[10px]">
                  {[
                    { num: 1, parts: [{ t: "# ", c: "accent" }, { t: "Ship Log v3.3", c: "text" }] },
                    { num: 2, parts: [{ t: "", c: "text" }] },
                    { num: 3, parts: [{ t: "## ", c: "accent" }, { t: "New Features", c: "text" }] },
                    { num: 4, parts: [{ t: "- ", c: "muted" }, { t: "Added theme switching", c: "text" }] },
                    { num: 5, parts: [{ t: "- ", c: "muted" }, { t: "Command palette (", c: "text" }, { t: "Ctrl+K", c: "accent" }, { t: ")", c: "text" }] },
                    { num: 6, parts: [{ t: "- ", c: "muted" }, { t: "Heatmap visualization", c: "text" }] },
                    { num: 7, parts: [{ t: "", c: "text" }] },
                    { num: 8, parts: [{ t: "- ", c: "muted" }, { t: "Ship streak: ", c: "text" }, { t: "42 days", c: "accent" }] },
                    { num: 9, parts: [{ t: "- ", c: "muted" }, { t: "Payout percentile: ", c: "text" }, { t: "Top 2.38%", c: "accent" }] },
                  ].map((line) => (
                    <div
                      key={line.num}
                      data-code-line
                      className="flex items-center gap-2 opacity-0"
                    >
                      <span style={{ color: "var(--theme-text-muted)", opacity: 0.3, minWidth: 14, textAlign: "right" }}>
                        {line.num}
                      </span>
                      <span>
                        {line.parts.map((part, pi) => (
                          <span
                            key={pi}
                            style={{
                              color:
                                part.c === "accent"
                                  ? "var(--theme-accent)"
                                  : part.c === "muted"
                                  ? "var(--theme-text-muted)"
                                  : "var(--theme-text)",
                            }}
                          >
                            {part.t}
                          </span>
                        ))}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TiltCard>

          <TiltCard
            className="rounded-[2rem] border overflow-hidden"
            intensity={5}
          >
            <div
              data-bento
              data-bento-row="2"
              className="h-full p-6 md:p-8 will-change-transform"
              style={{
                background: "var(--theme-card-bg)",
                borderColor: "var(--theme-border)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "var(--theme-surface)" }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  style={{ color: "var(--theme-accent)" }}
                >
                  <path
                    d="M3 15L7 5L11 12L15 3L17 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3
                className="text-lg font-bold tracking-tight"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--theme-text)",
                }}
              >
                Inline Devlogging
              </h3>
              <p
                className="text-sm mt-1 mb-4"
                style={{ color: "var(--theme-text-muted)" }}
              >
                Write and edit inline without context-switching: inline devlogging,
                inline editing, and inline version history. Faster updates, less
                friction.
              </p>
              <div className="rounded-xl border p-4 space-y-2" style={{ background: "var(--theme-surface)", borderColor: "var(--theme-border)" }}>
                {[
                  "Inline devlogging in the same flow",
                  "Inline editing with instant save",
                  "Inline version history for quick rollback",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: "var(--theme-accent)" }}
                    />
                    <span className="text-[11px] leading-relaxed" style={{ color: "var(--theme-text-muted)" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </TiltCard>

          <TiltCard
            className="rounded-[2rem] border overflow-hidden"
            intensity={5}
          >
            <div
              ref={votingCardRef}
              data-bento
              data-bento-row="2"
              className="h-full min-h-[390px] p-6 md:p-8 will-change-transform"
              style={{
                background: "var(--theme-card-bg)",
                borderColor: "var(--theme-border)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "var(--theme-surface)" }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  style={{ color: "var(--theme-accent)" }}
                >
                  <path
                    d="M10 2L12.5 7.5L18 8.5L14 12.5L15 18L10 15.5L5 18L6 12.5L2 8.5L7.5 7.5L10 2Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3
                className="text-lg font-bold tracking-tight"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--theme-text)",
                }}
              >
                Voting System
              </h3>
              <p
                className="text-sm mt-1 mb-4"
                style={{ color: "var(--theme-text-muted)" }}
              >
                Cookies/h, average stars, percentile, and category breakdowns
                all in one place.
              </p>
              <div
                className="rounded-xl border p-4"
                style={{ background: "var(--theme-surface)", borderColor: "var(--theme-border)" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((star) => (
                      <svg
                        key={star}
                        data-star
                        width="14"
                        height="14"
                        viewBox="0 0 18 18"
                        style={{
                          color: "var(--theme-text-muted)",
                          opacity: 0,
                        }}
                      >
                        <path
                          d="M9 2L11 6.5L16 7.2L12.5 10.5L13.3 15.5L9 13.2L4.7 15.5L5.5 10.5L2 7.2L7 6.5L9 2Z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ))}
                  </div>
                   <span
                     data-score
                     className="text-xl font-bold font-mono"
                     style={{ color: "var(--theme-text)" }}
                   >
                     0.00/9
                   </span>
                </div>
                <div className="space-y-2">
                  {[
                    { label: "Originality", stars: 8.3 },
                    { label: "Technical", stars: 9.0 },
                    { label: "Usability", stars: 7.5 },
                    { label: "Story", stars: 9.0 },
                  ].map((cat) => (
                    <div key={cat.label} className="flex items-center gap-2">
                      <span
                        className="text-[9px] font-mono w-14 text-right"
                        style={{ color: "var(--theme-text-muted)" }}
                      >
                        {cat.label}
                      </span>
                      <div
                        className="flex-1 h-1.5 rounded-full overflow-hidden"
                        style={{ background: "var(--theme-card-bg)" }}
                      >
                        <div
                          data-vote-bar
                          className="h-full rounded-full origin-left"
                          style={{
                            width: `${(cat.stars / 9) * 100}%`,
                            backgroundColor: "var(--theme-accent)",
                            transform: "scaleX(0)",
                          }}
                        />
                      </div>
                      <span
                        className="text-[9px] font-mono w-10"
                        style={{ color: "var(--theme-text-muted)" }}
                      >
                         {cat.stars.toFixed(1)}/9
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between text-[10px] font-mono" style={{ color: "var(--theme-text-muted)" }}>
                  <span>Cookies/h 28.5</span>
                  <span>Top 2.38%</span>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>

        <div className="mt-5">
          <TiltCard className="rounded-[2rem] border overflow-hidden" intensity={3}>
            <div
              data-bento
              data-bento-row="3"
              className="p-6 md:p-8 will-change-transform"
              style={{
                background: "var(--theme-card-bg)",
                borderColor: "var(--theme-border)",
              }}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3
                    className="text-lg font-bold tracking-tight"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--theme-text)",
                    }}
                  >
                    And so much more
                  </h3>
                  <p
                    className="text-sm mt-1"
                    style={{ color: "var(--theme-text-muted)" }}
                  >
                    Every feature designed to make Flavortown better
                  </p>
                </div>
              </div>
              <FeatureCarousel />
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
