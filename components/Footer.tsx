"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { ArrowUpRight, Heart } from "@phosphor-icons/react";
import { SiGithub } from "@icons-pack/react-simple-icons";

const footerLinks = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Themes", href: "#themes" },
      { label: "Install", href: "#install" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Docs", href: "#docs" },
      {
        label: "GitHub",
        href: "https://github.com/hridaya423/flavortownutils",
        external: true,
      },
    ],
  },
] as const;

const MARQUEE_TEXT = "FLAVORTOWN UTILS";
const MARQUEE_SEPARATOR = "\u00A0\u00A0\u2022\u00A0\u00A0"; // space bullet space
const MARQUEE_REPEAT = 8;

function buildMarqueeString(): string {
  return Array.from({ length: MARQUEE_REPEAT })
    .map(() => MARQUEE_TEXT)
    .join(MARQUEE_SEPARATOR);
}


const COLORS = {
  bg: "#1A1315",
  surface: "#231B1E",
  text: "#F6ECEE",
  muted: "#A88A90",
  border: "rgba(168, 138, 144, 0.16)",
  borderHover: "rgba(168, 138, 144, 0.32)",
} as const;

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (marqueeTrackRef.current) {
        const track = marqueeTrackRef.current;
        const totalWidth = track.scrollWidth / 2;

        const marqueeTween = gsap.to(track, {
          x: -totalWidth,
          duration: 30,
          ease: "none",
          repeat: -1,
        });

        ScrollTrigger.create({
          trigger: track,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const velocity = Math.abs(self.getVelocity());
            const speedMultiplier = gsap.utils.clamp(1, 3, 1 + velocity / 2000);
            gsap.to(marqueeTween, {
              timeScale: speedMultiplier,
              duration: 0.3,
              ease: "power2.out",
              overwrite: true,
            });
          },
        });
      }

      if (linksRef.current) {
        const columns = linksRef.current.querySelectorAll("[data-footer-col]");
        gsap.from(columns, {
          y: 40,
          opacity: 0,
          stagger: 0.05,
          duration: 0.5,
          scrollTrigger: {
            trigger: linksRef.current,
            start: "top 85%",
            end: "top 60%",
            scrub: 1,
          },
        });
      }

      if (bottomRef.current) {
        gsap.from(bottomRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.3,
          scrollTrigger: {
            trigger: bottomRef.current,
            start: "top 95%",
            end: "top 80%",
            scrub: 1,
          },
        });
      }
    },
    { scope: footerRef }
  );

  const marqueeContent = buildMarqueeString();

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden"
      style={{ background: COLORS.bg }}
    >
      <div
        className="relative py-8 overflow-hidden select-none"
        style={{ borderBottom: `1px solid ${COLORS.border}` }}
        aria-hidden="true"
      >
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(to right, ${COLORS.bg}, transparent)`,
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(to left, ${COLORS.bg}, transparent)`,
          }}
        />

        <div
          ref={marqueeTrackRef}
          className="flex whitespace-nowrap will-change-transform"
        >
          {[0, 1].map((i) => (
            <span
              key={i}
              className="text-[clamp(3rem,8vw,6rem)] font-black tracking-tighter leading-none shrink-0 px-4"
              style={{
                fontFamily: "var(--font-heading)",
                color: COLORS.text,
                opacity: 0.06,
                WebkitTextStroke: `1px ${COLORS.muted}`,
              }}
            >
              {marqueeContent}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div
          ref={linksRef}
          className="grid grid-cols-2 sm:grid-cols-2 gap-y-12 gap-x-8 md:gap-x-16 py-16 md:py-20"
          style={{ borderBottom: `1px solid ${COLORS.border}` }}
        >
          {footerLinks.map((group) => (
            <div key={group.heading} data-footer-col>
              <h3
                className="text-xs font-bold tracking-[0.15em] uppercase mb-5"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: COLORS.muted,
                }}
              >
                {group.heading}
              </h3>
              <ul className="space-y-3.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...("external" in link && link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group/link inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-200"
                      style={{ color: COLORS.text }}
                    >
                      {"external" in link && link.external && (
                        <SiGithub size={13} color="currentColor" className="opacity-60 group-hover/link:opacity-100 transition-opacity duration-200" />
                      )}
                      {link.label}
                      {"external" in link && link.external && (
                        <ArrowUpRight size={12} weight="bold" className="opacity-40 transition-all duration-200 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          ref={bottomRef}
          className="flex items-center py-8"
        >
          <div
            className="flex items-center gap-2 text-sm"
            style={{ color: COLORS.muted }}
          >
            <span>Built with</span>
            <Heart size={14} weight="fill" style={{ color: "var(--theme-accent)" }} />
            <span>by Hridya</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
