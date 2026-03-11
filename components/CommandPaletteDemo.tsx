"use client";

import { useRef, useEffect, useState, memo } from "react";

const commands = [
  { icon: "palette", text: "Set theme to Catppuccin" },
  { icon: "file", text: "Generate changelog" },
  { icon: "chart", text: "Toggle inline devlogging" },
  { icon: "key", text: "Set GitHub API key" },
  { icon: "camera", text: "Take screenshot" },
  { icon: "zap", text: "Speed reader mode" },
  { icon: "search", text: "Explore projects" },
  { icon: "trophy", text: "View achievements" },
];

function CommandPaletteDemoInner({ active = true }: { active?: boolean }) {
  const [currentCmd, setCurrentCmd] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [started, setStarted] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (active && !started) {
      setStarted(true);
      setIsTyping(true);
    }
  }, [active, started]);

  useEffect(() => {
    if (!started) return;

    const cmd = commands[currentCmd];
    let charIndex = 0;

    const typeChar = () => {
      if (charIndex <= cmd.text.length) {
        setTypedText(cmd.text.slice(0, charIndex));
        charIndex++;
        timeoutRef.current = window.setTimeout(typeChar, 40 + Math.random() * 30);
      } else {
        setIsTyping(false);
        timeoutRef.current = window.setTimeout(() => {
          setIsTyping(true);
          setTypedText("");
          setCurrentCmd((prev) => (prev + 1) % commands.length);
        }, 2000);
      }
    };

    timeoutRef.current = window.setTimeout(typeChar, 500);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentCmd, started]);

  const iconMap: Record<string, React.ReactNode> = {
    palette: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1" />
        <circle cx="5" cy="6" r="1" fill="currentColor" />
        <circle cx="7" cy="5" r="1" fill="currentColor" />
        <circle cx="9" cy="6" r="1" fill="currentColor" />
      </svg>
    ),
    file: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M4 2h4l3 3v7H4V2z" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
    chart: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M3 11V7M7 11V4M11 11V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    key: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="5" cy="7" r="2.5" stroke="currentColor" strokeWidth="1" />
        <path d="M7 7h5M10 5v2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
    camera: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="1" y="4" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1" />
        <circle cx="7" cy="8" r="2" stroke="currentColor" strokeWidth="1" />
        <path d="M5 4L6 2h2l1 2" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
    zap: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M8 1L3 8h4l-1 5 5-7H7l1-5z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
      </svg>
    ),
    search: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1" />
        <path d="M9 9l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    trophy: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M4 2h6v4c0 2-1.5 3-3 3S4 8 4 6V2z" stroke="currentColor" strokeWidth="1" />
        <path d="M4 3H2v2c0 1 1 2 2 2M10 3h2v2c0 1-1 2-2 2" stroke="currentColor" strokeWidth="1" />
        <path d="M5 12h4M7 9v3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  };

  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{
        background: "var(--theme-surface)",
        borderColor: "var(--theme-border)",
      }}
    >
      <div
        className="flex items-center gap-3 px-4 py-3 border-b"
        style={{ borderColor: "var(--theme-border)" }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          style={{ color: "var(--theme-text-muted)", flexShrink: 0 }}
        >
          <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span
          className="text-sm font-mono flex-1"
          style={{ color: "var(--theme-text)" }}
        >
          {typedText}
          <span
            className="inline-block w-[2px] h-4 ml-0.5 align-middle"
            style={{
              background: "var(--theme-accent)",
              animation: "blink 1s infinite",
            }}
          />
        </span>
      </div>

      <div className="p-2 space-y-0.5">
        {commands.slice(0, 5).map((cmd, i) => (
          <div
            key={cmd.text}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-colors duration-200"
            style={{
              backgroundColor:
                i === currentCmd % 5
                  ? "color-mix(in srgb, var(--theme-accent) 10%, transparent)"
                  : "transparent",
              color:
                i === currentCmd % 5
                  ? "var(--theme-accent)"
                  : "var(--theme-text-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            {iconMap[cmd.icon] || iconMap.search}
            <span>{cmd.text}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

const CommandPaletteDemo = memo(CommandPaletteDemoInner);
export default CommandPaletteDemo;
