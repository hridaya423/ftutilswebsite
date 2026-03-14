"use client";

import { useRef, useState, useCallback } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface FaqItem {
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    question: "How do I install Flavortown Utils?",
    answer:
      "Head to the Chrome Web Store (or Firefox Add-ons) and search for \"Flavortown Utils.\" Click Install, grant the requested permissions, and the extension icon will appear in your toolbar. Pin it for quick access - you're ready to go in under 30 seconds.",
  },
  {
    question: "Which browsers are supported?",
    answer:
      "Chrome and Firefox are fully supported. Safari support is available through manual developer installation (not listed on the Safari web store yet). See the docs page for the Safari setup steps.",
  },
  {
    question: "How do I switch themes?",
    answer:
      "Open the extension popup and click the palette icon in the top-right corner, or press Ctrl+K (Cmd+K on Mac) to open the Command Palette and type \"theme.\" Choose from five hand-tuned themes - changes apply instantly with zero page reload.",
  },
  {
    question: "How do I switch from Spicetown?",
    answer:
      "We support Spicetown to Flavortown Utils migration with data compatibility. Install Flavortown Utils, open the extension popup, and click \"Import from Spicetown\" to bring your data over.",
  },

  {
    question: "How do I use the Command Palette?",
    answer:
      "Press Ctrl+K (Cmd+K on Mac) anywhere on Flavortown. Start typing to fuzzy-search across features, themes, navigation shortcuts, and recent projects. Arrow keys to navigate, Enter to select, Esc to dismiss. It's the fastest way to do anything.",
  },
  {
    question: "Is my data synced across devices?",
    answer:
      "Yes - when you're signed into the same browser profile, your settings, themes, and preferences sync automatically via the browser's built-in sync engine. No account or extra setup needed.",
  },
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{
        transform: open ? "rotate(45deg)" : "rotate(0deg)",
        transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        flexShrink: 0,
      }}
    >
      <path
        d="M10 4V16M4 10H16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}


interface AccordionItemProps {
  item: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ item, index, isOpen, onToggle }: AccordionItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const animateOpen = useCallback(() => {
    const content = contentRef.current;
    const inner = innerRef.current;
    if (!content || !inner) return;

    const naturalHeight = inner.offsetHeight;
    gsap.to(content, {
      height: naturalHeight,
      duration: 0.45,
      ease: "power3.inOut",
    });
    gsap.to(inner, {
      autoAlpha: 1,
      y: 0,
      duration: 0.35,
      delay: 0.1,
      ease: "power3.out",
    });
  }, []);

  const animateClose = useCallback(() => {
    const content = contentRef.current;
    const inner = innerRef.current;
    if (!content || !inner) return;

    gsap.to(inner, {
      autoAlpha: 0,
      y: -8,
      duration: 0.25,
      ease: "power2.in",
    });
    gsap.to(content, {
      height: 0,
      duration: 0.4,
      delay: 0.05,
      ease: "power3.inOut",
    });
  }, []);

  const handleToggle = useCallback(() => {
    if (isOpen) {
      animateClose();
    } else {
      animateOpen();
    }
    onToggle();
  }, [isOpen, onToggle, animateOpen, animateClose]);

  return (
    <div
      data-faq
      className="rounded-[1.25rem] border overflow-hidden"
      style={{
        backgroundColor: "var(--theme-card-bg)",
        borderColor: "var(--theme-border)",
        boxShadow: "0 2px 24px -4px rgba(0,0,0,0.06)",
      }}
    >
      <button
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-content-${index}`}
        id={`faq-trigger-${index}`}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 md:px-8 md:py-6 text-left cursor-pointer group"
        style={{ backgroundColor: "transparent" }}
      >
        <span
          className="text-[15px] md:text-base font-semibold tracking-tight leading-snug"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--theme-text)",
          }}
        >
          {item.question}
        </span>
        <span
          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
          style={{
            backgroundColor: isOpen
              ? "var(--theme-accent)"
              : "var(--theme-surface)",
            color: isOpen ? "var(--theme-bg)" : "var(--theme-text-muted)",
            transition: "background-color 0.3s, color 0.3s",
          }}
        >
          <ChevronIcon open={isOpen} />
        </span>
      </button>

      <div
        ref={contentRef}
        id={`faq-content-${index}`}
        role="region"
        aria-labelledby={`faq-trigger-${index}`}
        style={{ height: 0, overflow: "hidden" }}
      >
        <div
          ref={innerRef}
          className="px-6 pb-5 md:px-8 md:pb-6"
          style={{
            opacity: 0,
            visibility: "hidden",
            transform: "translateY(-8px)",
          }}
        >
          <p
            className="text-sm md:text-[15px] leading-relaxed"
            style={{ color: "var(--theme-text-muted)" }}
          >
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}


export default function DocsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const faqColumnRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useGSAP(
    () => {
      gsap.set(titleRef.current, { x: -60, opacity: 0 });
      gsap.set(descRef.current, { x: -40, opacity: 0 });
      gsap.set(ctaRef.current, { y: 20, opacity: 0 });

      const faqCards =
        faqColumnRef.current?.querySelectorAll("[data-faq]");
      if (faqCards) {
        faqCards.forEach((card) => {
          gsap.set(card, { y: 60, opacity: 0, rotateX: -8 });
        });
      }

      const headingTl = gsap.timeline({
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          end: "top 45%",
          scrub: 1,
        },
      });

      headingTl
        .to(
          titleRef.current,
          { x: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
          0
        )
        .to(
          descRef.current,
          { x: 0, opacity: 1, duration: 0.35, ease: "power2.out" },
          0.15
        )
        .to(
          ctaRef.current,
          { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" },
          0.3
        );

      if (faqCards) {
        faqCards.forEach((card, i) => {
          gsap.to(card, {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              end: "top 65%",
              scrub: 1,
            },
            delay: i * 0.02,
          });
        });
      }
    },
    { scope: sectionRef }
  );

  const handleToggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <section
      ref={sectionRef}
      id="docs"
      className="relative py-32 md:py-40 overflow-hidden"
      style={{ backgroundColor: "var(--theme-surface)" }}
    >
      <div
        className="absolute top-0 inset-x-0 h-40 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, var(--theme-bg), var(--theme-surface))",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <div ref={headingRef} className="lg:sticky lg:top-32">
              <h2
                ref={titleRef}
                className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter leading-[1.05]"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--theme-text)",
                }}
              >
                Got questions?
                <br />
                <span style={{ color: "var(--theme-accent)" }}>Here are answers.</span>
              </h2>

              <p
                ref={descRef}
                className="mt-5 text-base md:text-lg leading-relaxed max-w-md"
                style={{ color: "var(--theme-text-muted)" }}
              >
                Everything you need to get started with Flavortown Utils
              </p>

              <a
                ref={ctaRef}
                href="/docs"
                className="inline-flex items-center gap-2 mt-8 text-sm font-semibold group"
                style={{
                  color: "var(--theme-accent)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                <span className="border-b border-current pb-0.5">
                  Browse full docs
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className="group-hover:translate-x-1 transition-transform duration-200"
                >
                  <path
                    d="M3 8H13M9 4L13 8L9 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div
            ref={faqColumnRef}
            className="lg:col-span-7 flex flex-col gap-3"
            style={{ perspective: "1000px" }}
          >
            {faqItems.map((item, i) => (
              <AccordionItem
                key={i}
                item={item}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => handleToggle(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
