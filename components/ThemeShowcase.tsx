"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import TextScramble from "./TextScramble";

const themes = [
  {
    name: "Default",
    tagline: "Classic Flavortown, cleaner.",
    description:
      "Keeps the original Flavortown vibe while improving readability, spacing, and contrast.",
    bg: "#FFF8F0",
    surface: "#FAF3EB",
    text: "#3B2314",
    textMuted: "#8B6B4A",
    accent: "#e85464",
    border: "#E8D5C0",
    cardBg: "#FFFFFF",
    accentDots: ["#e85464"],
    image: "/default.png",
  },
  {
    name: "Catppuccin",
    tagline: "Soothing pastels, deep focus.",
    description:
      "Dark base with lavender and mauve pastels from the Catppuccin palette. Two accent tones that play off each other \u2014 easy on the eyes at 2am.",
    bg: "#1e1e2e",
    surface: "#313244",
    text: "#cdd6f4",
    textMuted: "#6c7086",
    accent: "#cba6f7",
    accentSecondary: "#b4befe",
    border: "#45475a",
    cardBg: "#313244",
    accentDots: ["#cba6f7", "#b4befe"],
    image: "/catpuccinmauve.png",
    imageSecondary: "/catpuccinlavender.png",
  },
  {
    name: "Oceanic",
    tagline: "Deep sea, clear mind.",
    description:
      "Cool ocean blues and sharp cyan highlights on a midnight canvas. Feels like coding from a submarine \u2014 in a good way.",
    bg: "#0a1628",
    surface: "#102a4c",
    text: "#e8f7fc",
    textMuted: "#5ba3c5",
    accent: "#22d3ee",
    border: "#1a3a5c",
    cardBg: "#102a4c",
    accentDots: ["#22d3ee"],
    image: "/oceanic.png",
  },
  {
    name: "Overcooked",
    tagline: "Fiery intensity, bold moves.",
    description:
      "Burns hot with deep reds and amber. For the people who set their terminal to Solarized Dark and thought it wasn\u2019t dramatic enough.",
    bg: "#1a0f0f",
    surface: "#4a1818",
    text: "#fff5f5",
    textMuted: "#fc8181",
    accent: "#ed8936",
    border: "#742a2a",
    cardBg: "#2b1212",
    accentDots: ["#ed8936"],
    image: "/overcooked.png",
  },
  {
    name: "Custom",
    tagline: "Your rules, your palette.",
    description:
      "Pick any accent color, tweak the surfaces, make it yours. Full control over every token \u2014 because taste is personal.",
    bg: "#1a1a2e",
    surface: "#2a2a3e",
    text: "#e0e0e0",
    textMuted: "#888899",
    accent: "#ff6b9d",
    border: "#3a3a4e",
    cardBg: "#2a2a3e",
    accentDots: ["#ff6b9d"],
    image: "/custom.png",
  },
];

export default function ThemeShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [activeTheme, setActiveTheme] = useState(0);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const totalThemes = themes.length;
      const isMobile = window.innerWidth < 768;
      const scrollMultiplier = isMobile ? 60 : 100;

      const imageEls =
        section.querySelectorAll<HTMLElement>("[data-theme-image]");
      const images = Array.from(imageEls);
      const catLavender = section.querySelector<HTMLElement>(
        "[data-catppuccin-lavender]"
      );

      images.forEach((img, i) => {
        gsap.set(img, {
          opacity: i === 0 ? 1 : 0,
          scale: i === 0 ? 1 : 1.06,
        });
      });
      if (catLavender) {
        gsap.set(catLavender, { opacity: 0, scale: 1.06 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${totalThemes * scrollMultiplier}%`,
          pin: pinRef.current,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const index = Math.min(
              Math.floor(progress * totalThemes),
              totalThemes - 1
            );
            setActiveTheme(index);
          },
        },
      });

      themes.forEach((theme, i) => {
        if (i === 0) return;

        const position = i / totalThemes;
        const segDur = 1 / totalThemes;
        const transStart = position - segDur * 0.4;
        const transDur = segDur * 0.5;

        tl.to(
          images[i - 1],
          {
            opacity: 0,
            scale: 0.96,
            duration: transDur,
            ease: "power3.inOut",
          },
          transStart
        );

        if (i === 2 && catLavender) {
          tl.to(
            catLavender,
            {
              opacity: 0,
              scale: 0.96,
              duration: transDur,
              ease: "power3.inOut",
            },
            transStart
          );
        }

        tl.fromTo(
          images[i],
          { opacity: 0, scale: 1.06 },
          {
            opacity: 1,
            scale: 1,
            duration: transDur,
            ease: "power3.inOut",
          },
          transStart + transDur * 0.2
        );

        tl.to(
          document.documentElement,
          {
            "--theme-bg": theme.bg,
            "--theme-surface": theme.surface,
            "--theme-text": theme.text,
            "--theme-text-muted": theme.textMuted,
            "--theme-accent": theme.accent,
            "--theme-border": theme.border,
            "--theme-card-bg": theme.cardBg,
            duration: transDur,
            ease: "power2.inOut",
          },
          transStart
        );

        if (theme.accentSecondary && catLavender) {
          const cycleToLav = position + segDur * 0.15;
          const cycleDur = segDur * 0.35;

          tl.to(
            images[i],
            { opacity: 0, duration: cycleDur, ease: "power2.inOut" },
            cycleToLav
          );
          tl.fromTo(
            catLavender,
            { opacity: 0, scale: 1.02 },
            {
              opacity: 1,
              scale: 1,
              duration: cycleDur,
              ease: "power2.inOut",
            },
            cycleToLav
          );
          tl.to(
            document.documentElement,
            {
              "--theme-accent": theme.accentSecondary,
              duration: cycleDur,
              ease: "power2.inOut",
            },
            cycleToLav
          );
        }
      });

      tl.to(
        document.documentElement,
        {
          "--theme-bg": themes[0].bg,
          "--theme-surface": themes[0].surface,
          "--theme-text": themes[0].text,
          "--theme-text-muted": themes[0].textMuted,
          "--theme-accent": themes[0].accent,
          "--theme-border": themes[0].border,
          "--theme-card-bg": themes[0].cardBg,
          duration: 0.12,
          ease: "power2.inOut",
        },
        0.95
      );

      gsap.from(imageWrapRef.current, {
        scale: 0.9,
        opacity: 0,
        y: 40,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
        },
      });
    },
    { scope: sectionRef }
  );

  const current = themes[activeTheme];

  return (
    <section ref={sectionRef} id="themes" className="relative">
      <div
        ref={pinRef}
        className="min-h-[100dvh] flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: "var(--theme-bg)" }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative z-10">
            <div className="mb-6">
              <span
                className="text-xs font-bold uppercase tracking-[0.2em]"
                style={{
                  color: "var(--theme-accent)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                {themes.length} Themes
              </span>
            </div>

            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-[0.95] mb-4"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--theme-text)",
              }}
            >
              <TextScramble
                text={current.name}
                speed={20}
                key={current.name}
              />
            </h2>

            <p
              className="text-xl md:text-2xl font-semibold mb-4"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--theme-accent)",
              }}
            >
              {current.tagline}
            </p>

            <p
              className="text-base leading-relaxed max-w-[50ch]"
              style={{ color: "var(--theme-text-muted)" }}
            >
              {current.description}
            </p>

            <div className="flex items-center gap-3 mt-10">
              {themes.map((theme, i) => (
                <div
                  key={theme.name}
                  className="relative flex items-center justify-center"
                >
                  {theme.accentDots.length > 1 ? (
                    <div
                      className="w-8 h-8 rounded-full border-2 overflow-hidden transition-all duration-500"
                      style={{
                        background:
                          i === 1
                            ? `radial-gradient(circle at 35% 30%, ${theme.accentDots[0]}, ${theme.accentDots[1]})`
                            : `linear-gradient(135deg, ${theme.accentDots[0]} 50%, ${theme.accentDots[1]} 50%)`,
                        borderColor:
                          i === activeTheme
                            ? "var(--theme-text)"
                            : "transparent",
                        transform:
                          i === activeTheme ? "scale(1.25)" : "scale(1)",
                      }}
                    />
                  ) : (
                    <div
                      className="w-8 h-8 rounded-full border-2 transition-all duration-500"
                      style={{
                        backgroundColor: theme.accent,
                        borderColor:
                          i === activeTheme
                            ? "var(--theme-text)"
                            : "transparent",
                        transform:
                          i === activeTheme ? "scale(1.25)" : "scale(1)",
                      }}
                    />
                  )}
                  {i === activeTheme && (
                    <span
                      className="absolute -bottom-6 text-[10px] font-bold tracking-tight whitespace-nowrap"
                      style={{
                        color: "var(--theme-text)",
                        fontFamily: "var(--font-heading)",
                      }}
                    >
                      {theme.name}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div
              className="flex items-center gap-5 mt-12 transition-all duration-500"
              style={{
                opacity: activeTheme === 1 ? 1 : 0,
                transform:
                  activeTheme === 1 ? "translateY(0)" : "translateY(4px)",
                pointerEvents: activeTheme === 1 ? "auto" : "none",
              }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: "#cba6f7" }}
                />
                <span
                  className="text-xs font-bold tracking-tight"
                  style={{
                    color: "#cba6f7",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  Mauve
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: "#b4befe" }}
                />
                <span
                  className="text-xs font-bold tracking-tight"
                  style={{
                    color: "#b4befe",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  Lavender
                </span>
              </div>
            </div>
          </div>

          <div
            ref={imageWrapRef}
            className="relative flex justify-center"
            style={{ perspective: "1200px" }}
          >
            <div
              ref={glowRef}
              className="absolute -inset-8 rounded-full blur-[80px] opacity-[0.15] pointer-events-none"
              style={{ backgroundColor: "var(--theme-accent)" }}
            />

            <div
              className="relative w-full max-w-[600px] rounded-2xl overflow-hidden border"
              style={{
                borderColor: "var(--theme-border)",
                boxShadow:
                  "0 30px 80px -20px rgba(0,0,0,0.35), 0 0 0 1px var(--theme-border), 0 0 60px -20px var(--theme-accent)",
              }}
            >
              <div className="relative">
                {themes.map((theme, i) => (
                  <div
                    key={theme.name}
                    data-theme-image
                    className={`${i === 0 ? "relative" : "absolute inset-0"} will-change-transform`}
                  >
                    <Image
                      src={theme.image}
                      alt={`${theme.name} theme`}
                      width={1728}
                      height={1075}
                      className="w-full h-auto block"
                      sizes="(max-width: 768px) 90vw, 600px"
                      quality={90}
                      priority={i <= 1}
                    />
                  </div>
                ))}

                <div
                  data-catppuccin-lavender
                  className="absolute inset-0 will-change-transform"
                >
                  <Image
                    src="/catpuccinlavender.png"
                    alt="Catppuccin Lavender theme"
                    width={1728}
                    height={1075}
                    className="w-full h-auto block"
                    sizes="(max-width: 768px) 90vw, 600px"
                    quality={90}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
