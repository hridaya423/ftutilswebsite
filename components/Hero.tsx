"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { primeExtensionStats } from "@/lib/extension-stats-client";
import MagneticButton from "./MagneticButton";
import TextScramble from "./TextScramble";
import { CaretRight } from "@phosphor-icons/react";
import {
  SiGooglechrome,
  SiFirefoxbrowser,
  SiSafari,
  SiBrave,
  SiGithub,
} from "@icons-pack/react-simple-icons";

export default function Hero() {
  const chromeStoreUrl =
    "https://chromewebstore.google.com/detail/flavortown-utils/fdacgialppflhglkinbiapaenfahhjge";
  const firefoxAddonsUrl =
    "https://addons.mozilla.org/en-US/firefox/addon/flavortown-utils/";

  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const headlineWord1Ref = useRef<HTMLSpanElement>(null);
  const headlineWord2Ref = useRef<HTMLSpanElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const cta1Ref = useRef<HTMLDivElement>(null);
  const cta2Ref = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const [primaryInstall, setPrimaryInstall] = useState({
    label: "Install for Chrome",
    href: chromeStoreUrl,
    external: true,
  });

  useEffect(() => {
    primeExtensionStats();

    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes("firefox")) {
      setPrimaryInstall({
        label: "Install for Firefox",
        href: firefoxAddonsUrl,
        external: true,
      });
      return;
    }
    if (ua.includes("safari") && !ua.includes("chrome")) {
      setPrimaryInstall({
        label: "Install for Safari",
        href: "/docs/how-to-download#safari",
        external: false,
      });
      return;
    }
    setPrimaryInstall({
      label: "Install for Chrome",
      href: chromeStoreUrl,
      external: true,
    });
  }, [chromeStoreUrl, firefoxAddonsUrl]);

  useGSAP(
    () => {
      if (
        !sectionRef.current ||
        !pinRef.current ||
        !headlineWord1Ref.current ||
        !headlineWord2Ref.current
      )
        return;

      const entrance = gsap.timeline({ delay: 0.1 });

      entrance.from(
        headlineWord1Ref.current,
        { y: 40, opacity: 0, duration: 0.6, ease: "power3.out" },
        0.15
      );
      entrance.from(
        headlineWord2Ref.current,
        { y: 50, opacity: 0, duration: 0.7, ease: "power3.out" },
        0.25
      );

      entrance.from(
        sublineRef.current,
        { y: 25, opacity: 0, duration: 0.5, ease: "power2.out" },
        0.4
      );

      entrance.from(
        cta1Ref.current,
        { y: 20, opacity: 0, duration: 0.4, ease: "power2.out" },
        0.55
      );
      entrance.from(
        cta2Ref.current,
        { y: 20, opacity: 0, duration: 0.4, ease: "power2.out" },
        0.65
      );

      const badgeEls = gsap.utils.toArray(
        badgesRef.current?.querySelectorAll("[data-browser-badge]") ?? []
      );
      badgeEls.forEach((badge, i) => {
        entrance.from(
          badge as HTMLElement,
          { y: 10, opacity: 0, duration: 0.3, ease: "power2.out" },
          0.7 + i * 0.04
        );
      });

      const contentWrapper =
        pinRef.current?.querySelector(".hero-content-grid");

      const exit = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%",
          pin: pinRef.current,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      exit.to(
        contentWrapper,
        {
          scale: 0.92,
          y: -60,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
        },
        0.5
      );

    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ backgroundColor: "var(--theme-bg)" }}
    >
      <div
        ref={pinRef}
        className="min-h-[100dvh] flex items-center overflow-hidden"
        style={{ backgroundColor: "var(--theme-bg)" }}
      >
        <div className="hero-content-grid max-w-[1000px] mx-auto px-6 md:px-12 w-full pt-24 pb-16 will-change-transform">
          <div className="relative z-10 text-center mx-auto">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95]"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--theme-text)",
              }}
            >
              <span
                ref={headlineWord1Ref}
                className="block will-change-transform"
              >
                Flavortown,
              </span>
              <span
                ref={headlineWord2Ref}
                className="block will-change-transform"
                style={{ color: "var(--theme-accent)" }}
              >
                <TextScramble text="supercharged." speed={25} />
              </span>
            </h1>

            <p
              ref={sublineRef}
              className="mt-6 text-lg md:text-xl leading-relaxed max-w-[42ch] mx-auto will-change-transform"
              style={{ color: "var(--theme-text-muted)" }}
            >
              Built-in shots.so integration, inline devlogging, and an inline
              screenshot editor to save time on every update. Five themes that
              actually look good. Built by an active Flavortown user.
            </p>

            <div
              className="flex flex-wrap justify-center items-center gap-4 mt-10 will-change-transform"
            >
              <div ref={cta1Ref} className="will-change-transform">
                <MagneticButton
                  as="a"
                  href={primaryInstall.href}
                  {...(primaryInstall.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  strength={0.02}
                >
                  <span
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-base font-bold transition-colors duration-200"
                    style={{
                      backgroundColor: "var(--theme-accent)",
                      color: "var(--theme-bg)",
                      fontFamily: "var(--font-heading)",
                      boxShadow: "0 6px 22px -10px var(--theme-accent)",
                    }}
                  >
                    {primaryInstall.label}
                    <CaretRight size={16} weight="bold" />
                  </span>
                </MagneticButton>
              </div>

              <div ref={cta2Ref} className="will-change-transform">
                <MagneticButton
                  as="a"
                  href="https://github.com/hridaya423/flavortownutils"
                  target="_blank"
                  rel="noopener noreferrer"
                  strength={0.02}
                >
                  <span
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-base font-bold border-2 transition-colors duration-200"
                    style={{
                      borderColor: "var(--theme-border)",
                      color: "var(--theme-text)",
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    <SiGithub size={18} color="currentColor" />
                    View Source
                  </span>
                </MagneticButton>
              </div>
            </div>

            <div
              ref={badgesRef}
              className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 mt-8 will-change-transform"
            >
                {[
                  { name: "Chrome", icon: SiGooglechrome, color: "#4285F4" },
                  { name: "Firefox", icon: SiFirefoxbrowser, color: "#FF7139" },
                  { name: "Safari", icon: SiSafari, color: "#006CFF" },
                  { name: "Brave", icon: SiBrave, color: "#FB542B" },
                  { name: "...and many more" },
                ].map((browser) => (
                  <div
                    key={browser.name}
                    data-browser-badge
                    className="flex items-center gap-1.5 text-xs font-medium opacity-50"
                    style={{ color: "var(--theme-text)" }}
                  >
                    {browser.icon ? <browser.icon size={14} color={browser.color} /> : null}
                    {browser.name}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
