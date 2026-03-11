"use client";

import { usePathname } from "next/navigation";

const navGroups = [
  {
    title: "Get started",
    items: [
      { label: "How to download", href: "/docs/how-to-download" },
      { label: "Troubleshooting", href: "/docs/troubleshooting" },
      { label: "All features", href: "/docs/all-features" },
    ],
  },
];

function isActive(pathname: string, href: string) {
  return pathname === href;
}

export default function DocsSidebar() {
  const pathname = usePathname();

  return (
    <div className="sticky top-24 h-[calc(100vh-6.5rem)] overflow-y-auto px-4 py-6">
      {navGroups.map((group) => (
        <div key={group.title} className="mb-2 last:mb-0">
          <p
            className="px-2 pb-2 text-[11px] font-bold uppercase tracking-[0.16em]"
            style={{ color: "var(--theme-text-muted)", fontFamily: "var(--font-heading)" }}
          >
            {group.title}
          </p>

          <div className="space-y-1">
            {group.items.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <div key={item.href}>
                  <a
                    href={item.href}
                    className="block rounded-lg border px-3 py-2 text-sm font-medium transition-colors"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: active ? "var(--theme-text)" : "var(--theme-text-muted)",
                      backgroundColor: active
                        ? "color-mix(in srgb, var(--theme-accent) 10%, var(--theme-surface))"
                        : "transparent",
                      borderColor: active ? "var(--theme-border)" : "transparent",
                    }}
                  >
                    {item.label}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
