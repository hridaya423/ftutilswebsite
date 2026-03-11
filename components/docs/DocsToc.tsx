"use client";

import { useEffect, useState } from "react";

type TocItem = {
  id: string;
  label: string;
  children?: TocItem[];
};

export default function DocsToc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState("");

  const flatIds = items.flatMap((item) => [item.id, ...(item.children?.map((child) => child.id) ?? [])]);

  useEffect(() => {
    const updateHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) setActiveId(hash);
    };

    updateHash();
    window.addEventListener("hashchange", updateHash);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: [0.15, 0.35, 0.6],
      }
    );

    flatIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("hashchange", updateHash);
      observer.disconnect();
    };
  }, [flatIds]);

  return (
    <aside className="hidden xl:block">
      <div
        className="sticky top-28 rounded-2xl border p-4 shadow-[0_6px_24px_-14px_rgba(0,0,0,0.14)]"
        style={{ backgroundColor: "var(--theme-card-bg)", borderColor: "var(--theme-border)" }}
      >
        <p
          className="text-[11px] font-bold uppercase tracking-[0.16em] mb-3"
          style={{ color: "var(--theme-text-muted)", fontFamily: "var(--font-heading)" }}
        >
          On this page
        </p>
        <nav className="space-y-1 border-l pl-2" style={{ borderColor: "var(--theme-border)" }}>
          {items.map((item) => (
            <div key={item.id}>
              <a
                href={`#${item.id}`}
                className="block rounded-md px-2 py-1.5 text-sm transition-colors"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: activeId === item.id ? "var(--theme-accent)" : "var(--theme-text-muted)",
                  backgroundColor:
                    activeId === item.id
                      ? "color-mix(in srgb, var(--theme-accent) 10%, transparent)"
                      : "transparent",
                }}
              >
                {item.label}
              </a>
              {item.children ? (
                <div className="ml-3 mt-1 border-l pl-2" style={{ borderColor: "var(--theme-border)" }}>
                  {item.children.map((child) => (
                    <a
                      key={child.id}
                      href={`#${child.id}`}
                      className="block rounded-md px-2 py-1.5 text-xs transition-colors"
                      style={{
                        fontFamily: "var(--font-heading)",
                        color: activeId === child.id ? "var(--theme-accent)" : "var(--theme-text-muted)",
                        backgroundColor:
                          activeId === child.id
                            ? "color-mix(in srgb, var(--theme-accent) 8%, transparent)"
                            : "transparent",
                      }}
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
