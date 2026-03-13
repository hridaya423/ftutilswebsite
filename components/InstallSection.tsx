"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import MagneticButton from "./MagneticButton";
import {
  DownloadSimple,
  CaretRight,
} from "@phosphor-icons/react";
import {
  SiGooglechrome,
  SiFirefoxbrowser,
  SiSafari,
  SiBrave,
  SiArc,
  SiOpera,
  SiOperagx,
  SiLibrewolf,
  SiZenbrowser,
} from "@icons-pack/react-simple-icons";

interface BrowserCard {
  href: string;
}

const chromiumCompanions = [
  { name: "Brave", icon: SiBrave, color: "#FB542B" },
  { name: "Arc", icon: SiArc, color: "#FCBFBD" },
  { name: "Opera", icon: SiOpera, color: "#FF1B2D" },
  { name: "Opera GX", icon: SiOperagx, color: "#EE2950" },
];

const firefoxCompanions = [
  { name: "Zen", icon: SiZenbrowser, color: "#8B5CF6" },
  { name: "LibreWolf", icon: SiLibrewolf, color: "#00ACFF" },
];

const browsers: BrowserCard[] = [
  {
    href: "https://chromewebstore.google.com/detail/flavortown-utils/fdacgialppflhglkinbiapaenfahhjge",
  },
  {
    href: "https://addons.mozilla.org/en-US/firefox/addon/flavortown-utils/",
  },
  {
    href: "/docs/how-to-download#safari",
  },
];

export default function InstallSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const chromeCardRef = useRef<HTMLDivElement>(null);
  const firefoxCardRef = useRef<HTMLDivElement>(null);
  const safariCardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.set(headlineRef.current, { x: -80, opacity: 0 });
      gsap.set(subtitleRef.current, { y: 30, opacity: 0 });
      gsap.set(chromeCardRef.current, { y: 100, opacity: 0, rotateX: -15 });
      gsap.set(firefoxCardRef.current, { y: 100, opacity: 0, rotateX: -15 });
      gsap.set(safariCardRef.current, { y: 100, opacity: 0, rotateX: -15 });

      const isMobile = window.innerWidth < 768;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: pinRef.current,
          scrub: 1,
          start: "top top",
          end: isMobile ? "+=100%" : "+=150%",
          anticipatePin: 1,
        },
      });

      tl.to(
        headlineRef.current,
        {
          x: 0,
          opacity: 1,
          duration: 0.2,
          ease: "power3.out",
        },
        0
      );

      tl.to(
        subtitleRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.18,
          ease: "power2.out",
        },
        0.12
      );

      tl.to(
        chromeCardRef.current,
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.25,
          ease: "power3.out",
        },
        0.25
      );

      tl.to(
        firefoxCardRef.current,
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.22,
          ease: "power3.out",
        },
        0.38
      );

      tl.to(
        safariCardRef.current,
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.22,
          ease: "power3.out",
        },
        0.48
      );

    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="install" className="relative">
      <div
        ref={pinRef}
        className="min-h-[100dvh] flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: "var(--theme-bg)" }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to bottom, var(--theme-bg), transparent)",
          }}
        />

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full py-20">
          <div className="mb-16 md:mb-24 max-w-2xl">
            <div ref={headlineRef}>
              <span
                className="text-xs font-bold uppercase tracking-[0.2em] block mb-4"
                style={{
                  color: "var(--theme-accent)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                Installation
              </span>
               <h2
                 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05]"
                 style={{
                   fontFamily: "var(--font-heading)",
                   color: "var(--theme-text)",
                 }}
               >
                  Supercharge your
                  <br />
                  <span style={{ color: "var(--theme-accent)" }}>
                    Flavortown experience.
                  </span>
                </h2>
              </div>
              <div ref={subtitleRef}>
                <p
                  className="mt-6 text-lg leading-relaxed max-w-[48ch]"
                  style={{ color: "var(--theme-text-muted)" }}
                >
                  Pick your browser and get the full Flavortown experience
                  immediately. <span style={{ color: "var(--theme-accent)" }}>In seconds.</span>
                </p>
              </div>
            </div>

          <div
            ref={cardsRef}
            className="grid grid-cols-1 lg:grid-cols-12 gap-5"
            style={{
              perspective: "1200px",
              transformStyle: "preserve-3d",
            }}
          >
            <div
              ref={chromeCardRef}
              data-install-card
              className="lg:col-span-7 rounded-[2rem] border overflow-hidden relative group"
              style={{
                backgroundColor: "var(--theme-card-bg)",
                borderColor: "var(--theme-accent)",
                transformOrigin: "bottom center",
              }}
            >
              <div
                className="absolute inset-0 opacity-[0.06] pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 30% 20%, var(--theme-accent), transparent 70%)",
                }}
              />

              <div className="relative p-8 md:p-10 lg:p-12 flex flex-col justify-between min-h-[360px]">
                <div className="flex items-start justify-between">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: "var(--theme-surface)" }}
                  >
                    <SiGooglechrome size={36} color="#4285F4" />
                  </div>
                  <div className="flex flex-wrap justify-end gap-2 max-w-[270px]">
                    {chromiumCompanions.map((browser) => (
                      <span
                        key={browser.name}
                        title={browser.name}
                        aria-label={browser.name}
                        className="w-8 h-8 rounded-lg border flex items-center justify-center"
                        style={{
                          borderColor: "var(--theme-border)",
                          backgroundColor: "var(--theme-surface)",
                        }}
                      >
                        <browser.icon size={14} color={browser.color} />
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <h3
                    className="text-2xl md:text-3xl font-black tracking-tight"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--theme-text)",
                    }}
                  >
                    Google Chrome
                  </h3>
                  <p
                    className="mt-2 text-sm leading-relaxed max-w-[38ch]"
                    style={{ color: "var(--theme-text-muted)" }}
                  >
                    Our primary platform. Full feature parity, optimized
                    performance, and automatic updates through the Chrome Web
                    Store.
                  </p>

                </div>

                <div className="mt-8">
                  <MagneticButton
                    as="a"
                    href={browsers[0].href}
                    target="_blank"
                    rel="noopener noreferrer"
                    strength={0.02}
                  >
                    <span
                      className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-base font-bold transition-colors duration-200"
                      style={{
                        backgroundColor: "var(--theme-accent)",
                        color: "var(--theme-bg)",
                        fontFamily: "var(--font-heading)",
                        boxShadow: "0 8px 32px -8px var(--theme-accent)",
                      }}
                    >
                      <DownloadSimple size={16} weight="bold" />
                      Add to Chrome
                      <CaretRight size={16} weight="bold" />
                    </span>
                  </MagneticButton>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 gap-5">
              <div
                ref={firefoxCardRef}
                data-install-card
                className="rounded-[2rem] border overflow-hidden relative group"
                style={{
                  backgroundColor: "var(--theme-card-bg)",
                  borderColor: "var(--theme-border)",
                  transformOrigin: "bottom center",
                }}
              >
                <div className="p-7 md:p-8 flex flex-col">
                  <div className="flex items-start justify-between">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: "var(--theme-surface)" }}
                    >
                      <SiFirefoxbrowser size={28} color="#FF7139" />
                    </div>
                    <div className="flex items-center gap-2">
                      {firefoxCompanions.map((browser) => (
                        <span
                          key={browser.name}
                          title={browser.name}
                          aria-label={browser.name}
                          className="w-7 h-7 rounded-lg border flex items-center justify-center"
                          style={{
                            borderColor: "var(--theme-border)",
                            backgroundColor: "var(--theme-surface)",
                          }}
                        >
                          <browser.icon size={12} color={browser.color} />
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5">
                    <h3
                      className="text-xl font-black tracking-tight"
                      style={{
                        fontFamily: "var(--font-heading)",
                        color: "var(--theme-text)",
                      }}
                    >
                      Firefox
                    </h3>
                    <p
                      className="mt-1.5 text-sm leading-relaxed"
                      style={{ color: "var(--theme-text-muted)" }}
                    >
                      Full extension support with native Firefox Add-ons
                      integration.
                    </p>
                  </div>

                  <div className="mt-6">
                    <MagneticButton
                      as="a"
                      href={browsers[1].href}
                      target="_blank"
                      rel="noopener noreferrer"
                      strength={0.02}
                    >
                      <span
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold border-2 transition-colors duration-200"
                        style={{
                          borderColor: "var(--theme-border)",
                          color: "var(--theme-text)",
                          fontFamily: "var(--font-heading)",
                        }}
                      >
                        <DownloadSimple size={16} weight="bold" />
                        Add to Firefox
                      </span>
                    </MagneticButton>
                  </div>
                </div>
              </div>

              <div
                ref={safariCardRef}
                data-install-card
                className="rounded-[2rem] border overflow-hidden relative group"
                style={{
                  backgroundColor: "var(--theme-card-bg)",
                  borderColor: "var(--theme-border)",
                  transformOrigin: "bottom center",
                }}
              >
                <div
                  className="absolute inset-0 opacity-[0.03] pointer-events-none"
                  style={{
                    background:
                      "repeating-linear-gradient(135deg, var(--theme-text) 0px, transparent 1px, transparent 12px, var(--theme-text) 13px)",
                  }}
                />

                <div className="relative p-7 md:p-8 flex flex-col">
                  <div className="flex items-start justify-between">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: "var(--theme-surface)" }}
                    >
                      <SiSafari size={28} color="#006CFF" />
                    </div>
                  </div>

                  <div className="mt-5">
                    <h3
                      className="text-xl font-black tracking-tight"
                      style={{
                        fontFamily: "var(--font-heading)",
                        color: "var(--theme-text)",
                      }}
                    >
                      Safari
                    </h3>
                    <p
                      className="mt-1.5 text-sm leading-relaxed"
                      style={{ color: "var(--theme-text-muted)" }}
                    >
                      As of right now, we cannot support Apple Web Store
                      distribution. Use the manual Safari instructions in docs.
                    </p>
                  </div>

                  <div className="mt-6">
                    <MagneticButton
                      as="a"
                      href={browsers[2].href}
                      strength={0.02}
                    >
                      <span
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold border-2 transition-colors duration-200"
                        style={{
                          borderColor: "var(--theme-border)",
                          color: "var(--theme-text-muted)",
                          fontFamily: "var(--font-heading)",
                        }}
                      >
                        <CaretRight size={16} weight="bold" />
                        See instructions
                      </span>
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
