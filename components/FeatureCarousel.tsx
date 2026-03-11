"use client";

import { useRef, memo } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const features = [
  {
    title: "Activity Heatmap",
    desc: "Track ship streaks and active days at a glance",
    icon: "zap",
  },
  {
    title: "Kitchen Dashboard",
    desc: "Project graph and stats in one clean view",
    icon: "grid",
  },
  {
    title: "Project Stats",
    desc: "Cookies per hour, payout percentile, and vote estimates",
    icon: "bar",
  },
  {
    title: "Category Breakdown",
    desc: "Average stars by category for faster iteration",
    icon: "trophy",
  },
  {
    title: "Command Palette",
    desc: "Navigate, theme switch, and create devlogs from Ctrl+K",
    icon: "search",
  },
  {
    title: "Inline Devlogging",
    desc: "Write devlogs directly in project page context",
    icon: "file",
  },
  {
    title: "Inline Version History",
    desc: "Review and restore recent devlog edits quickly",
    icon: "scroll",
  },
  {
    title: "Markdown Editor",
    desc: "Built-in editor with smoother writing and formatting flow",
    icon: "file",
  },
  {
    title: "One-Click Changelog",
    desc: "Generate changelogs with branch and format controls",
    icon: "rocket",
  },
  {
    title: "Shots.so Integration",
    desc: "Stylize attachments with smart aspect ratio picking",
    icon: "camera",
  },
  {
    title: "Screenshot Editor",
    desc: "Edit and share screenshots without leaving workflow",
    icon: "camera",
  },
  {
    title: "Search Projects",
    desc: "Find projects quickly with in-page search",
    icon: "search",
  },
  {
    title: "Shop Upgrades",
    desc: "See item accessories and richer goal stats",
    icon: "grid",
  },
  {
    title: "Priority Goals",
    desc: "Set priorities with cumulative and individual progress",
    icon: "trophy",
  },
  {
    title: "Projected Progress",
    desc: "Forecast goal completion using unshipped hours",
    icon: "bar",
  },
  {
    title: "Ship Efficiency Graph",
    desc: "Visualize your output trends over time",
    icon: "bar",
  },
  {
    title: "Estimated Payouts",
    desc: "See expected payout signals earlier",
    icon: "bar",
  },
  {
    title: "Doomscroll Devlogs",
    desc: "Browse community devlogs in a continuous feed",
    icon: "scroll",
  },
  {
    title: "Speed Read Devlogs",
    desc: "Read devlogs at 2x to 5x speed with RSVP mode",
    icon: "zap",
  },
  {
    title: "Auto Achievement Claim",
    desc: "Claim achievements automatically as you hit milestones",
    icon: "trophy",
  },
  {
    title: "Device Sync",
    desc: "Sync goals and settings across your devices",
    icon: "cloud",
  },
  {
    title: "Repo + Demo Finder",
    desc: "Auto-detect project repo and demo links",
    icon: "link",
  },
  {
    title: "Voting Feedback Feed",
    desc: "See real comments from flavortown-share-votes",
    icon: "trophy",
  },
  {
    title: "TODO + Slack Sync",
    desc: "Keep TODOs aligned with Slack updates",
    icon: "link",
  },
  {
    title: "Total Project Stats",
    desc: "Get full-project numbers in one place",
    icon: "grid",
  },
];

const icons: Record<string, React.ReactNode> = {
  zap: <path d="M9 1L4 9h4L7 15l5-8H8l1-6z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" fill="none" />,
  trophy: <><path d="M4 2h8v4c0 2.5-1.8 4-4 4S4 8.5 4 6V2z" stroke="currentColor" strokeWidth="1.2" fill="none" /><path d="M6 13h4M8 10v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></>,
  grid: <><rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none" /><rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none" /><rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none" /><rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none" /></>,
  rocket: <path d="M8 14s-2-2-2-6c0-3 2-6 2-6s2 3 2 6c0 4-2 6-2 6zM5 10L3 12M11 10l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />,
  link: <><path d="M6 8h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /><path d="M9 5h1.5a3 3 0 010 6H9M7 5H5.5a3 3 0 000 6H7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></>,
  cloud: <path d="M5 14h6a3 3 0 001-5.83A4 4 0 004 9a3 3 0 001 5z" stroke="currentColor" strokeWidth="1.2" fill="none" />,
  file: <path d="M5 2h4l3 3v8H5V2zM9 2v3h3" stroke="currentColor" strokeWidth="1.2" fill="none" />,
  search: <><circle cx="7" cy="7" r="4" stroke="currentColor" strokeWidth="1.2" fill="none" /><path d="M10 10l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>,
  bar: <path d="M4 13V8M8 13V4M12 13V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />,
  camera: <><rect x="2" y="5" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2" fill="none" /><circle cx="8" cy="9" r="2" stroke="currentColor" strokeWidth="1.2" fill="none" /><path d="M6 5L7 3h2l1 2" stroke="currentColor" strokeWidth="1.2" /></>,
  scroll: <path d="M4 2v12M4 2h6c1 0 2 1 2 2s-1 2-2 2H4M4 14h6c1 0 2-1 2-2s-1-2-2-2H4" stroke="currentColor" strokeWidth="1.2" fill="none" />,
  shield: <path d="M8 2L3 5v4c0 3.5 2.5 5.5 5 6.5 2.5-1 5-3 5-6.5V5L8 2z" stroke="currentColor" strokeWidth="1.2" fill="none" />,
};

function FeatureCarouselInner() {
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!trackRef.current) return;

    const track = trackRef.current;
    const totalWidth = track.scrollWidth / 2;

    gsap.to(track, {
      x: -totalWidth,
      duration: 40,
      ease: "none",
      repeat: -1,
    });
  });

  const allItems = [...features, ...features];

  return (
    <div className="overflow-hidden relative">
      <div
        className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{
          background: `linear-gradient(to right, var(--theme-card-bg), transparent)`,
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{
          background: `linear-gradient(to left, var(--theme-card-bg), transparent)`,
        }}
      />

      <div
        ref={trackRef}
        className="flex gap-4 will-change-transform"
        onMouseEnter={() => {
          if (trackRef.current) {
            gsap.to(trackRef.current, { timeScale: 0, duration: 0.5 });
          }
        }}
        onMouseLeave={() => {
          if (trackRef.current) {
            gsap.to(trackRef.current, { timeScale: 1, duration: 0.5 });
          }
        }}
      >
        {allItems.map((feature, i) => (
          <div
            key={`${feature.title}-${i}`}
            className="flex-shrink-0 w-[220px] p-4 rounded-xl border transition-colors duration-200"
            style={{
              background: "var(--theme-surface)",
              borderColor: "var(--theme-border)",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="mb-3"
              style={{ color: "var(--theme-accent)" }}
            >
              {icons[feature.icon]}
            </svg>
            <h4
              className="text-sm font-bold tracking-tight"
              style={{
                color: "var(--theme-text)",
                fontFamily: "var(--font-heading)",
              }}
            >
              {feature.title}
            </h4>
            <p
              className="text-[11px] mt-1 leading-relaxed"
              style={{ color: "var(--theme-text-muted)" }}
            >
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const FeatureCarousel = memo(FeatureCarouselInner);
export default FeatureCarousel;
