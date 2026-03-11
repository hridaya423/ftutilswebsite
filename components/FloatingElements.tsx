"use client";

import { useRef, forwardRef, useImperativeHandle, memo, useEffect } from "react";


export interface FloatingElementsHandle {
  container: HTMLDivElement | null;
  getBrowser: () => HTMLDivElement | null | undefined;
  getOverlay: () => HTMLDivElement | null | undefined;
  getFloatingCards: () => NodeListOf<Element> | undefined;
  getGlow: () => HTMLDivElement | null | undefined;
}

const FloatingElements = memo(
  forwardRef<FloatingElementsHandle>(function HeroBrowserMockupInner(_, ref) {
    const containerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      container: containerRef.current,
      getBrowser: () =>
        containerRef.current?.querySelector("[data-browser]") as HTMLDivElement | null,
      getOverlay: () =>
        containerRef.current?.querySelector("[data-overlay]") as HTMLDivElement | null,
      getFloatingCards: () =>
        containerRef.current?.querySelectorAll("[data-float-card]"),
      getGlow: () =>
        containerRef.current?.querySelector("[data-glow]") as HTMLDivElement | null,
    }));

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const cards = container.querySelectorAll("[data-float-card]");
      const depths = [0.03, -0.02, 0.04, -0.025]; // Different depths per card

      const onMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const cx = (e.clientX - rect.left) / rect.width - 0.5;
        const cy = (e.clientY - rect.top) / rect.height - 0.5;

        cards.forEach((card, i) => {
          const d = depths[i % depths.length];
          const el = card as HTMLElement;
          el.style.transform = `translate(${cx * d * 1000}px, ${cy * d * 1000}px) ${el.dataset.baseTransform || ""}`;
        });
      };

      window.addEventListener("mousemove", onMouseMove);
      return () => window.removeEventListener("mousemove", onMouseMove);
    }, []);

    return (
      <div
        ref={containerRef}
        className="relative w-full"
        style={{ maxWidth: "540px", perspective: "1200px" }}
      >
        <div
          data-glow
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full pointer-events-none"
          style={{
            backgroundColor: "var(--theme-accent)",
            opacity: 0.06,
            filter: "blur(80px)",
          }}
        />

        <div
          data-browser
          className="relative rounded-2xl border overflow-hidden will-change-transform"
          style={{
            backgroundColor: "var(--theme-surface)",
            borderColor: "var(--theme-border)",
            boxShadow:
              "0 32px 80px -20px rgba(0,0,0,0.25), 0 0 0 1px var(--theme-border)",
          }}
        >
          <div
            className="flex items-center gap-2 px-4 py-3 border-b"
            style={{ borderColor: "var(--theme-border)" }}
          >
            <div className="flex items-center gap-1.5">
              <span
                className="w-[10px] h-[10px] rounded-full"
                style={{ backgroundColor: "#FF5F57" }}
              />
              <span
                className="w-[10px] h-[10px] rounded-full"
                style={{ backgroundColor: "#FEBC2E" }}
              />
              <span
                className="w-[10px] h-[10px] rounded-full"
                style={{ backgroundColor: "#28C840" }}
              />
            </div>
            <div
              className="flex-1 mx-4 rounded-md px-3 py-1 text-[10px] font-mono text-center"
              style={{
                backgroundColor: "var(--theme-bg)",
                color: "var(--theme-text-muted)",
              }}
            >
              flavortown.app/projects/my-saas
            </div>
            <div className="w-[50px]" />
          </div>

          <div
            className="relative p-4"
            style={{
              backgroundColor: "var(--theme-bg)",
              minHeight: "280px",
            }}
          >
            <div className="space-y-3 opacity-30">
              <div className="flex items-center gap-3 pb-3 border-b" style={{ borderColor: "var(--theme-border)" }}>
                <div
                  className="w-6 h-6 rounded-md"
                  style={{ backgroundColor: "var(--theme-accent)" }}
                />
                <div className="flex gap-4">
                  {["Overview", "Stats", "Devlogs"].map((t) => (
                    <span
                      key={t}
                      className="text-[9px] font-medium"
                      style={{
                        color: "var(--theme-text-muted)",
                        fontFamily: "var(--font-heading)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <div
                  className="h-4 rounded w-3/4"
                  style={{ backgroundColor: "var(--theme-border)" }}
                />
                <div
                  className="h-3 rounded w-1/2"
                  style={{ backgroundColor: "var(--theme-border)" }}
                />
                <div className="flex gap-2 mt-3">
                  <div
                    className="h-16 rounded-lg flex-1"
                    style={{ backgroundColor: "var(--theme-surface)" }}
                  />
                  <div
                    className="h-16 rounded-lg flex-1"
                    style={{ backgroundColor: "var(--theme-surface)" }}
                  />
                </div>
              </div>
            </div>

            <div
              data-overlay
              className="absolute inset-0 flex items-start justify-center pt-8"
              style={{
                backgroundColor: "color-mix(in srgb, var(--theme-bg) 60%, transparent)",
                backdropFilter: "blur(4px)",
              }}
            >
              <div
                className="w-[85%] rounded-xl border overflow-hidden"
                style={{
                  backgroundColor: "var(--theme-surface)",
                  borderColor: "var(--theme-border)",
                  boxShadow: "0 20px 60px -15px rgba(0,0,0,0.3)",
                }}
              >
                <div
                  className="flex items-center gap-3 px-4 py-2.5 border-b"
                  style={{ borderColor: "var(--theme-border)" }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    style={{ color: "var(--theme-text-muted)", flexShrink: 0 }}
                  >
                    <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <span
                    className="text-[11px] flex-1"
                    style={{
                      color: "var(--theme-text)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    Set theme to Catppuccin
                    <span
                      className="inline-block w-[1.5px] h-3 ml-0.5 align-middle"
                      style={{
                        backgroundColor: "var(--theme-accent)",
                        animation: "heroBlink 1s infinite",
                      }}
                    />
                  </span>
                  <kbd
                    className="px-1.5 py-0.5 rounded text-[8px] font-mono border"
                    style={{
                      borderColor: "var(--theme-border)",
                      color: "var(--theme-text-muted)",
                    }}
                  >
                    Esc
                  </kbd>
                </div>

                <div className="p-1.5 space-y-0.5">
                  {[
                    { icon: "palette", text: "Set theme to Catppuccin", active: true },
                    { icon: "palette", text: "Set theme to Oceanic", active: false },
                    { icon: "palette", text: "Set theme to Overcooked", active: false },
                    { icon: "palette", text: "Set theme to Custom", active: false },
                  ].map((cmd) => (
                    <div
                      key={cmd.text}
                      className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[10px]"
                      style={{
                        backgroundColor: cmd.active
                          ? "color-mix(in srgb, var(--theme-accent) 12%, transparent)"
                          : "transparent",
                        color: cmd.active
                          ? "var(--theme-accent)"
                          : "var(--theme-text-muted)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1" />
                        <circle cx="5" cy="6" r="1" fill="currentColor" />
                        <circle cx="7" cy="5" r="1" fill="currentColor" />
                        <circle cx="9" cy="6" r="1" fill="currentColor" />
                      </svg>
                      {cmd.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>


        <div
          data-float-card
          data-base-transform="rotate(3deg)"
          className="absolute -top-4 -right-6 w-[140px] rounded-xl border p-3 will-change-transform"
          style={{
            backgroundColor: "var(--theme-card-bg)",
            borderColor: "var(--theme-border)",
            boxShadow: "0 12px 40px -8px rgba(0,0,0,0.2)",
            opacity: 0,
            transform: "rotate(3deg)",
          }}
        >
          <span
            className="text-[9px] font-bold block mb-2"
            style={{
              color: "var(--theme-text-muted)",
              fontFamily: "var(--font-heading)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Active Theme
          </span>
          <div className="flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: "#cba6f7" }}
            />
            <span
              className="w-3 h-3 rounded-full opacity-40"
              style={{ backgroundColor: "#22d3ee" }}
            />
            <span
              className="w-3 h-3 rounded-full opacity-40"
              style={{ backgroundColor: "#ed8936" }}
            />
            <span
              className="w-3 h-3 rounded-full opacity-40"
              style={{ backgroundColor: "#ff6b9d" }}
            />
          </div>
        </div>

        <div
          data-float-card
          data-base-transform="rotate(-2deg)"
          className="absolute -bottom-6 -left-8 w-[150px] rounded-xl border p-3 will-change-transform"
          style={{
            backgroundColor: "var(--theme-card-bg)",
            borderColor: "var(--theme-border)",
            boxShadow: "0 12px 40px -8px rgba(0,0,0,0.2)",
            opacity: 0,
            transform: "rotate(-2deg)",
          }}
        >
          <span
            className="text-[9px] font-bold block mb-2"
            style={{
              color: "var(--theme-text-muted)",
              fontFamily: "var(--font-heading)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Ship Streak
          </span>
          <div className="flex items-end gap-[3px]">
            {[40, 65, 30, 80, 55, 90, 45].map((h, i) => (
              <div
                key={i}
                className="w-[12px] rounded-sm"
                style={{
                  height: `${h * 0.28}px`,
                  backgroundColor:
                    i === 5
                      ? "var(--theme-accent)"
                      : "color-mix(in srgb, var(--theme-accent) 30%, var(--theme-surface))",
                }}
              />
            ))}
          </div>
        </div>

        <div
          data-float-card
          data-base-transform="rotate(-1deg)"
          className="absolute -top-8 -left-4 w-[120px] rounded-xl border p-3 will-change-transform"
          style={{
            backgroundColor: "var(--theme-card-bg)",
            borderColor: "var(--theme-border)",
            boxShadow: "0 12px 40px -8px rgba(0,0,0,0.2)",
            opacity: 0,
            transform: "rotate(-1deg)",
          }}
        >
          <span
            className="text-[9px] font-bold block mb-2"
            style={{
              color: "var(--theme-text-muted)",
              fontFamily: "var(--font-heading)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Activity
          </span>
          <div className="grid grid-cols-7 gap-[2px]">
            {Array.from({ length: 28 }, (_, i) => {
              const v = ((i * 7 + 3) % 11) / 10;
              return (
                <div
                  key={i}
                  className="aspect-square rounded-[2px]"
                  style={{
                    backgroundColor:
                      v > 0.7
                        ? "var(--theme-accent)"
                        : v > 0.4
                        ? "color-mix(in srgb, var(--theme-accent) 40%, var(--theme-surface))"
                        : "var(--theme-surface)",
                  }}
                />
              );
            })}
          </div>
        </div>

        <div
          data-float-card
          data-base-transform="rotate(2deg)"
          className="absolute -bottom-3 -right-4 w-[130px] rounded-xl border p-3 will-change-transform"
          style={{
            backgroundColor: "var(--theme-card-bg)",
            borderColor: "var(--theme-border)",
            boxShadow: "0 12px 40px -8px rgba(0,0,0,0.2)",
            opacity: 0,
            transform: "rotate(2deg)",
          }}
        >
          <span
            className="text-[9px] font-bold block mb-1.5"
            style={{
              color: "var(--theme-text-muted)",
              fontFamily: "var(--font-heading)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Quick Action
          </span>
          <div className="flex items-center gap-1.5">
            <kbd
              className="px-1.5 py-0.5 rounded text-[9px] font-mono border"
              style={{
                borderColor: "var(--theme-border)",
                color: "var(--theme-text)",
                backgroundColor: "var(--theme-surface)",
              }}
            >
              Ctrl
            </kbd>
            <span
              className="text-[9px]"
              style={{ color: "var(--theme-text-muted)" }}
            >
              +
            </span>
            <kbd
              className="px-1.5 py-0.5 rounded text-[9px] font-mono border"
              style={{
                borderColor: "var(--theme-accent)",
                color: "var(--theme-accent)",
                backgroundColor: "color-mix(in srgb, var(--theme-accent) 8%, var(--theme-surface))",
              }}
            >
              K
            </kbd>
          </div>
        </div>

        <style jsx>{`
          @keyframes heroBlink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
        `}</style>
      </div>
    );
  })
);

FloatingElements.displayName = "FloatingElements";
export default FloatingElements;
