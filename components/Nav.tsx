"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import MagneticButton from "./MagneticButton";
import { SiGithub } from "@icons-pack/react-simple-icons";

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: "body",
      start: "80px top",
      onEnter: () => setIsScrolled(true),
      onLeaveBack: () => setIsScrolled(false),
    });
  });

  const navLinks = [
    { label: "Features", href: isHome ? "#features" : "/#features" },
    { label: "Themes", href: isHome ? "#themes" : "/#themes" },
    { label: "Install", href: isHome ? "#install" : "/#install" },
    { label: "Docs", href: "/docs" },
  ];

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? "bg-[var(--theme-bg)]/90 backdrop-blur-xl border-b border-[var(--theme-border)]/50 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
        <a
          href={isHome ? "#" : "/"}
          className="flex items-center gap-3 group"
        >
          <Image
            src="/icon128.png"
            alt="Flavortown Utils"
            width={32}
            height={32}
            className="rounded-lg transition-transform duration-300 group-hover:scale-110"
          />
          <span
            className="font-bold text-sm tracking-tight hidden sm:block"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--theme-text)",
            }}
          >
            Flavortown Utils
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium transition-colors duration-200 hover:opacity-100 opacity-60"
              style={{
                color: "var(--theme-text)",
                fontFamily: "var(--font-heading)",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <MagneticButton
            as="a"
            href="https://github.com/hridaya423/flavortownutils"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex"
            strength={0.2}
          >
            <span
              className="inline-flex items-center gap-1.5 text-sm font-medium opacity-60 hover:opacity-100 transition-opacity"
              style={{ color: "var(--theme-text)", fontFamily: "var(--font-heading)" }}
            >
              <SiGithub size={16} color="currentColor" />
              GitHub
            </span>
          </MagneticButton>
          <MagneticButton
            as="a"
            href={isHome ? "#install" : "/#install"}
            strength={0.15}
          >
            <span
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 active:scale-[0.98] active:-translate-y-[1px]"
              style={{
                background: "var(--theme-accent)",
                color: "var(--theme-bg)",
                fontFamily: "var(--font-heading)",
              }}
            >
              Install
            </span>
          </MagneticButton>
        </div>
      </div>
    </nav>
  );
}
