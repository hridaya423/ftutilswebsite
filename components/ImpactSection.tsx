"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ArrowRight } from "@phosphor-icons/react";

const enhancements = [
  { before: "Click through menus", after: "Ctrl+K command palette" },
  { before: "Basic project stats", after: "Full stats dashboard" },
  { before: "One default look", after: "5 handcrafted themes" },
  { before: "Manual changelogs", after: "One-click changelog gen" },
];

const valueProps = [
  {
    metric: "10x",
    headline: "faster navigation",
    detail: "Ctrl+K palette gets you anywhere without leaving your keyboard",
  },
  {
    metric: "1-click",
    headline: "devlogs + changelogs",
    detail: "Inline devlogging with markdown editing and one-click changelog generation",
  },
  {
    metric: "25+",
    headline: "QoL features",
    detail: "Themes, heatmaps, screenshots, stats all baked into one extension",
  },
];

export default function ImpactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLSpanElement>(null);

  const enhContainerRef = useRef<HTMLDivElement>(null);
  const enhItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const strikethroughRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const afterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const answerRef = useRef<HTMLDivElement>(null);
  const valuePropRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (!sectionRef.current || !pinRef.current) return;

      gsap.set(enhContainerRef.current, { opacity: 0 });
      gsap.set(answerRef.current, { opacity: 0 });

      const isMobile = window.innerWidth < 768;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: isMobile ? "+=220%" : "+=380%",
          pin: pinRef.current,
          scrub: 1,
        },
      });

      tl.from(
        headlineRef.current,
        { y: 60, opacity: 0, duration: 0.08 },
        0
      ).from(
        subheadRef.current,
        { y: 30, opacity: 0, duration: 0.06 },
        0.04
      );


      tl.to(
        headlineRef.current,
        { y: -40, opacity: 0, duration: 0.05 },
        0.15
      ).to(
        subheadRef.current,
        { y: -30, opacity: 0, duration: 0.04 },
        0.15
      );

      tl.to(
        enhContainerRef.current,
        { opacity: 1, duration: 0.03 },
        0.19
      );

      enhancements.forEach((_, i) => {
        const itemStart = 0.22 + i * 0.10;
        const strikeStart = itemStart + 0.04;
        const afterStart = strikeStart + 0.03;

        const item = enhItemRefs.current[i];
        const strike = strikethroughRefs.current[i];
        const after = afterRefs.current[i];

        if (item) {
          tl.from(item, { x: -40, opacity: 0, duration: 0.03 }, itemStart);
        }

        if (strike) {
          tl.to(
            strike,
            { scaleX: 1, duration: 0.03, ease: "power2.inOut" },
            strikeStart
          );
        }

        if (item) {
          tl.to(item, { opacity: 0.35, duration: 0.02 }, strikeStart + 0.025);
        }

        if (after) {
          tl.from(
            after,
            { x: 30, opacity: 0, duration: 0.03, ease: "power2.out" },
            afterStart
          );
        }
      });


      tl.to(
        enhContainerRef.current,
        { opacity: 0, y: -30, duration: 0.05 },
        0.60
      );

      tl.to(
        answerRef.current,
        { opacity: 1, duration: 0.04 },
        0.64
      );
      tl.from(
        answerRef.current,
        { scale: 0.9, duration: 0.08, ease: "power3.out" },
        0.64
      );

      valuePropRefs.current.forEach((el, i) => {
        if (el) {
          gsap.set(el, { y: 30, opacity: 0 });
          tl.to(
            el,
            { y: 0, opacity: 1, duration: 0.06, ease: "power2.out" },
            0.72 + i * 0.04
          );
        }
      });

      tl.to(
        contentRef.current,
        { y: -60, opacity: 0, duration: 0.12, ease: "power2.in" },
        0.88
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative">
      <div
        ref={pinRef}
        className="min-h-[100dvh] flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: "var(--theme-bg)" }}
      >
        <div
          ref={contentRef}
          className="relative max-w-[800px] w-full mx-auto px-6 md:px-12 will-change-transform"
        >
          <h2
            ref={headlineRef}
            className="absolute inset-x-0 top-1/2 -translate-y-[70%] text-center will-change-transform"
          >
            <span
              className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.05]"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--theme-text)",
              }}
            >
              Flavortown is good.
            </span>
            <span
              ref={subheadRef}
              className="block mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05] will-change-transform"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--theme-accent)",
              }}
            >
              Now imagine it supercharged.
            </span>
          </h2>

          <div
            ref={enhContainerRef}
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-5 sm:gap-6 md:gap-8 will-change-transform"
          >
            {enhancements.map((item, i) => (
              <div
                key={item.before}
                ref={(el) => {
                  enhItemRefs.current[i] = el;
                }}
                className="relative flex items-center gap-6 will-change-transform"
              >
                <span className="relative inline-block">
                  <span
                    className="text-lg sm:text-xl md:text-2xl font-medium tracking-tight"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: "var(--theme-text)",
                    }}
                  >
                    {item.before}
                  </span>
                  <span
                    ref={(el) => {
                      strikethroughRefs.current[i] = el;
                    }}
                    className="absolute left-0 top-1/2 w-full will-change-transform pointer-events-none"
                    style={{
                      height: "2px",
                      backgroundColor: "var(--theme-accent)",
                      transform: "scaleX(0)",
                      transformOrigin: "left",
                    }}
                    aria-hidden="true"
                  />
                </span>

                <span
                  ref={(el) => {
                    afterRefs.current[i] = el;
                  }}
                  className="flex items-center gap-2 will-change-transform"
                >
                  <ArrowRight
                    size={16}
                    weight="bold"
                    style={{ color: "var(--theme-accent)" }}
                    aria-hidden="true"
                  />
                  <span
                    className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--theme-accent)",
                    }}
                  >
                    {item.after}
                  </span>
                </span>
              </div>
            ))}
          </div>

          <div
            ref={answerRef}
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center will-change-transform"
          >
             <h3
               className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-center"
               style={{
                 fontFamily: "var(--font-heading)",
                 color: "var(--theme-text)",
               }}
             >
               That&apos;s Flavortown Utils.
               <br />
                <span style={{ color: "var(--theme-accent)" }}>25+ features.</span>
              </h3>

            <div className="relative mt-12 sm:mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-[720px]">
              {valueProps.map((prop, i) => (
                <div
                  key={prop.headline}
                  ref={(el) => {
                    valuePropRefs.current[i] = el;
                  }}
                  className="rounded-[1.25rem] border p-5 will-change-transform"
                  style={{
                    backgroundColor: "var(--theme-card-bg)",
                    borderColor: "var(--theme-border)",
                    boxShadow: "0 4px 24px -8px rgba(0,0,0,0.08)",
                  }}
                >
                  <span
                    className="text-2xl sm:text-3xl font-black tracking-tighter block"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--theme-accent)",
                    }}
                  >
                    {prop.metric}
                  </span>
                  <span
                    className="text-sm font-bold tracking-tight block mt-1"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--theme-text)",
                    }}
                  >
                    {prop.headline}
                  </span>
                  <span
                    className="text-xs leading-relaxed block mt-2"
                    style={{ color: "var(--theme-text-muted)" }}
                  >
                    {prop.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
