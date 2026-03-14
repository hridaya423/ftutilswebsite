"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { getCachedExtensionStats, primeExtensionStats } from "@/lib/extension-stats-client";

const devScreenshots = [
  { src: "/feedback/Screenshot 2026-03-10 at 20.07.43.png", width: 382, height: 130, alt: "fireentity (FT dev): i love ft utils!!" },
  { src: "/feedback/Screenshot 2026-03-10 at 20.25.14.png", width: 532, height: 236, alt: "cskartikey (FT dev): this is awesome!" },
  { src: "/feedback/Screenshot 2026-03-10 at 20.32.16.png", width: 490, height: 90, alt: "Cyteon (FT dev): ik, cause i switched to ft utils" },
];

const communityScreenshots = [
  { src: "/feedback/Screenshot 2026-03-11 at 18.29.03.png", width: 2192, height: 324, alt: "Flavortown Utils web store review screenshot" },
  { src: "/feedback/Screenshot 2026-03-11 at 18.29.11.png", width: 2192, height: 324, alt: "Flavortown Utils web store review screenshot" },
  { src: "/feedback/Screenshot 2026-03-11 at 18.29.17.png", width: 2192, height: 324, alt: "Flavortown Utils web store review screenshot" },
  { src: "/feedback/Screenshot 2026-03-11 at 18.29.42.png", width: 1030, height: 272, alt: "Flavortown Utils web store review screenshot" },
  { src: "/feedback/Screenshot 2026-03-10 at 20.29.17.png", width: 1000, height: 228, alt: "@rupnil.codes: BROO LMFAOOO I AM USING THIS NOW - Ofc its awesome and phenomenal!!!" },
  { src: "/feedback/Screenshot 2026-03-10 at 20.27.59.png", width: 1004, height: 212, alt: "@TruthEntity: Flavortown utils is a really powerful tool, which I am currently using as well. It is just really really good." },
  { src: "/feedback/Screenshot 2026-03-10 at 20.29.08.png", width: 988, height: 222, alt: "@Lordseriousspig: Extremely well made project and adds soo many great features that I have personally been using. Good luck!" },
  { src: "/feedback/Screenshot 2026-03-10 at 20.28.14.png", width: 984, height: 206, alt: "@Scutoid: After that one flavortown extension, there have been an influx of flavortown extensions. I think this extension is fulfilled with Flavortown Utils quite easily" },
  { src: "/feedback/Screenshot 2026-03-10 at 20.29.02.png", width: 998, height: 168, alt: "@Kubik: damn! That's really good! The visual presentation is crazy" },
  { src: "/feedback/Screenshot 2026-03-10 at 20.28.25.png", width: 1006, height: 174, alt: "@evanssidhu: i already use this everyday this is an amazing extension (11/10) so great job" },
  { src: "/feedback/Screenshot 2026-03-10 at 20.24.42.png", width: 900, height: 484, alt: "chefpenguino: love this, i'm gonna have to try - nok: wooo!! that's crazy that's amazing" },
  { src: "/feedback/Screenshot 2026-03-10 at 19.58.21.png", width: 552, height: 84, alt: "zesty plutonium: done, thanks for making FT Utils i love it!" },
  { src: "/feedback/Screenshot 2026-03-10 at 20.27.48.png", width: 480, height: 236, alt: "@shaikhsamir8442: Very nice look, keep it up" },
  { src: "/feedback/Screenshot 2026-03-10 at 19.57.46.png", width: 462, height: 130, alt: "Keyboard1000n17: ft utils better tho" },
  { src: "/feedback/Screenshot 2026-03-10 at 20.19.27.png", width: 492, height: 142, alt: "nirvaannn: thank you - the extension is great!" },
  { src: "/feedback/Screenshot 2026-03-10 at 20.24.03.png", width: 534, height: 234, alt: "Afonso: very cool!" },
  { src: "/feedback/Screenshot 2026-03-10 at 19.58.02.png", width: 552, height: 76, alt: "Gizzy The DB Breaker: where the gist is ft utils better" },
  { src: "/feedback/Screenshot 2026-03-10 at 20.03.30.png", width: 564, height: 84, alt: "thirtyseven: can confirm ft utils is great" },
  { src: "/feedback/Screenshot 2026-03-10 at 19.57.16.png", width: 434, height: 88, alt: "SeradedStripes: ft utils >>" },
  { src: "/feedback/Screenshot 2026-03-10 at 20.08.57.png", width: 328, height: 54, alt: "ft-utils clearly is superior" },
];

function formatSignedNumber(value: number): string {
  const rounded = Math.round(Number(value) || 0);
  return rounded > 0 ? `+${rounded}` : String(rounded);
}

type LiveStats = {
  percentMoreThanSecond: number;
  usageMultiplierVsSecond: number;
  weeklyUserDeltaVsSecond: number;
};

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const devRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const multiplierRef = useRef<HTMLDivElement>(null);
  const deltaRef = useRef<HTMLDivElement>(null);
  const latestStatsRef = useRef<LiveStats | null>(null);

  const [liveStats, setLiveStats] = useState<LiveStats | null>(() => {
    const warm = getCachedExtensionStats();
    if (!warm) return null;
    return {
      percentMoreThanSecond: Number(warm.percentMoreThanSecond),
      usageMultiplierVsSecond: Number(warm.usageMultiplierVsSecond),
      weeklyUserDeltaVsSecond: Number(warm.weeklyUserDeltaVsSecond),
    };
  });

  useEffect(() => {
    latestStatsRef.current = liveStats;
  }, [liveStats]);

  useEffect(() => {
    let mounted = true;

    const loadStats = async () => {
      const warm = getCachedExtensionStats();
      if (warm && mounted) {
        setLiveStats({
          percentMoreThanSecond: Number(warm.percentMoreThanSecond),
          usageMultiplierVsSecond: Number(warm.usageMultiplierVsSecond),
          weeklyUserDeltaVsSecond: Number(warm.weeklyUserDeltaVsSecond),
        });
      }

      try {
        const data = await primeExtensionStats({ force: true });
        if (!data) return;
        if (!mounted) return;

        const percent = Number(data.percentMoreThanSecond);
        const multiplier = Number(data.usageMultiplierVsSecond);
        const delta = Number(data.weeklyUserDeltaVsSecond);

        if (!Number.isFinite(percent) || !Number.isFinite(multiplier) || !Number.isFinite(delta)) return;

        setLiveStats({
          percentMoreThanSecond: percent,
          usageMultiplierVsSecond: multiplier,
          weeklyUserDeltaVsSecond: delta,
        });
      } catch {
      }
    };

    loadStats();

    return () => {
      mounted = false;
    };
  }, []);

  useGSAP(
    () => {
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { x: -36, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headlineRef.current,
              start: "top 92%",
              once: true,
            },
          }
        );
      }

      const devCards = devRef.current?.querySelectorAll("[data-dev-card]");
      if (devCards) {
        devCards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { y: 24, opacity: 0, scale: 0.98 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.55,
              ease: "power3.out",
              delay: i * 0.05,
              scrollTrigger: {
                trigger: card,
                start: "top 94%",
                once: true,
              },
            }
          );
        });
      }

      const cards = gridRef.current?.querySelectorAll("[data-testimonial-card]");
      if (cards) {
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { y: 42, opacity: 0, rotateX: 4 },
            {
              y: 0,
              opacity: 1,
              rotateX: 0,
              duration: 0.6,
              ease: "power3.out",
              delay: i * 0.025,
              scrollTrigger: {
                trigger: card,
                start: "top 96%",
                once: true,
              },
            }
          );
        });
      }

      if (socialRef.current) {
        const targets = latestStatsRef.current;
        const percentCounter = { val: 0 };
        const multiplierCounter = { val: 0 };
        const deltaCounter = { val: 0 };

        if (targets) {
          gsap.to(percentCounter, {
            val: targets.percentMoreThanSecond,
            duration: 1.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: socialRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
              once: true,
            },
            onUpdate: () => {
              if (percentRef.current) {
                percentRef.current.textContent = Math.round(percentCounter.val).toString();
              }
            },
          });

          gsap.to(multiplierCounter, {
            val: targets.usageMultiplierVsSecond,
            duration: 1.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: socialRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
              once: true,
            },
            onUpdate: () => {
              if (multiplierRef.current) {
                multiplierRef.current.textContent = `${multiplierCounter.val.toFixed(1)}x`;
              }
            },
          });

          gsap.to(deltaCounter, {
            val: targets.weeklyUserDeltaVsSecond,
            duration: 1.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: socialRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
              once: true,
            },
            onUpdate: () => {
              if (deltaRef.current) {
                deltaRef.current.textContent = formatSignedNumber(deltaCounter.val);
              }
            },
          });
        }

        gsap.from(socialRef.current, {
          y: 28,
          opacity: 0,
          duration: 0.55,
          ease: "power3.out",
          scrollTrigger: {
            trigger: socialRef.current,
            start: "top 92%",
            once: true,
          },
        });
      }
    },
    { scope: sectionRef, dependencies: [] }
  );

  useEffect(() => {
    if (!liveStats) {
      if (percentRef.current) percentRef.current.textContent = "--";
      if (multiplierRef.current) multiplierRef.current.textContent = "--";
      if (deltaRef.current) deltaRef.current.textContent = "--";
      return;
    }

    if (percentRef.current) percentRef.current.textContent = String(Math.round(liveStats.percentMoreThanSecond));
    if (multiplierRef.current) multiplierRef.current.textContent = `${liveStats.usageMultiplierVsSecond.toFixed(1)}x`;
    if (deltaRef.current) deltaRef.current.textContent = formatSignedNumber(liveStats.weeklyUserDeltaVsSecond);
  }, [liveStats]);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-44 overflow-hidden"
      style={{ backgroundColor: "var(--theme-bg)" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, var(--theme-bg), transparent)" }}
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div ref={headlineRef} className="mb-16 md:mb-24">
          <span
            className="text-xs font-bold uppercase tracking-[0.2em] block mb-4"
            style={{ color: "var(--theme-accent)", fontFamily: "var(--font-heading)" }}
          >
            Hear it from other people!
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-end">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter leading-[1.05]"
              style={{ fontFamily: "var(--font-heading)", color: "var(--theme-text)" }}
            >
              Loved by fellow builders.
              <br />
              <span style={{ color: "var(--theme-accent)" }}>Proof from real Flavortown users.</span>
            </h2>
          </div>
        </div>

        <div ref={devRef} className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span
              className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] px-3 py-1.5 rounded-full border"
              style={{
                color: "var(--theme-accent)",
                borderColor: "var(--theme-accent)",
                backgroundColor: "color-mix(in srgb, var(--theme-accent) 8%, transparent)",
                fontFamily: "var(--font-heading)",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              From the devs
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
            {devScreenshots.map((shot) => (
              <div
                key={shot.src}
                data-dev-card
                className="will-change-transform"
              >
                <div
                  className="rounded-2xl border overflow-hidden p-4 md:p-5 transition-colors duration-500 relative"
                  style={{
                    backgroundColor: "var(--theme-card-bg)",
                    borderColor: "var(--theme-accent)",
                    boxShadow: "0 0 24px -6px color-mix(in srgb, var(--theme-accent) 20%, transparent), 0 8px 40px -12px rgba(0,0,0,0.08)",
                  }}
                >
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                    className="w-full h-auto block rounded-lg"
                    sizes="(max-width: 640px) 90vw, 30vw"
                    quality={95}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={gridRef}
          className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-5 space-y-4 md:space-y-5"
          style={{ perspective: "1200px" }}
        >
          {communityScreenshots.map((shot) => (
            <div
              key={shot.src}
              data-testimonial-card
              className="break-inside-avoid will-change-transform"
            >
              <div
                className="rounded-2xl border overflow-hidden p-4 md:p-5 transition-colors duration-500"
                style={{
                  backgroundColor: "var(--theme-card-bg)",
                  borderColor: "var(--theme-border)",
                  boxShadow: "0 8px 40px -12px rgba(0,0,0,0.08), 0 2px 12px -4px rgba(0,0,0,0.04)",
                }}
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={shot.width}
                  height={shot.height}
                  className="w-full h-auto block rounded-lg"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                  quality={95}
                />
              </div>
            </div>
          ))}
        </div>

        <div ref={socialRef} className="mt-16 md:mt-24 flex flex-col items-center gap-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-[860px]">
            <div
              className="rounded-2xl border p-5 text-center"
              style={{
                backgroundColor: "var(--theme-card-bg)",
                borderColor: "var(--theme-border)",
              }}
            >
              <div className="flex items-baseline justify-center gap-0.5">
                <span
                  ref={percentRef}
                  className="text-4xl sm:text-5xl font-black tracking-tighter tabular-nums"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--theme-accent)",
                  }}
                >
                  --
                </span>
                <span
                  className="text-2xl sm:text-3xl font-black tracking-tighter"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--theme-accent)",
                  }}
                >
                  %
                </span>
              </div>
              <p className="text-xs mt-1" style={{ color: "var(--theme-text-muted)" }}>
                more users than #2
              </p>
            </div>

            <div
              className="rounded-2xl border p-5 text-center"
              style={{
                backgroundColor: "var(--theme-card-bg)",
                borderColor: "var(--theme-border)",
              }}
            >
              <div
                className="text-4xl sm:text-5xl font-black tracking-tighter"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--theme-accent)",
                }}
                ref={multiplierRef}
              >
                --
              </div>
              <p className="text-xs mt-1" style={{ color: "var(--theme-text-muted)" }}>
                usage multiplier vs #2
              </p>
            </div>

            <div
              className="rounded-2xl border p-5 text-center"
              style={{
                backgroundColor: "var(--theme-card-bg)",
                borderColor: "var(--theme-border)",
              }}
            >
              <div
                className="text-4xl sm:text-5xl font-black tracking-tighter"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--theme-accent)",
                }}
                ref={deltaRef}
              >
                --
              </div>
              <p className="text-xs mt-1" style={{ color: "var(--theme-text-muted)" }}>
                more weekly users
              </p>
            </div>
          </div>

          <div
            className="relative w-full max-w-[900px] rounded-2xl overflow-hidden border"
            style={{
              borderColor: "var(--theme-border)",
              boxShadow: "0 8px 40px -12px rgba(0,0,0,0.12)",
            }}
          >
            <Image
              src="/users.jpg"
              alt="Flavortown Utils leads with 200 weekly users compared to other extensions"
              width={2258}
              height={778}
              className="w-full h-auto block"
              sizes="(max-width: 768px) 95vw, 900px"
              quality={90}
            />
          </div>
          <p className="text-[11px] -mt-5 text-center" style={{ color: "var(--theme-text-muted)", opacity: 0.75 }}>
            Live usage numbers are fetched in real time; the screenshot below may be older.
          </p>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to top, var(--theme-bg), transparent)" }}
        aria-hidden="true"
      />
    </section>
  );
}
