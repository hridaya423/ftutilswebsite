import DocsToc from "@/components/docs/DocsToc";

const groups = [
  {
    id: "core-workflow",
    title: "Core workflow",
    items: [
      "Inline devlog posting directly in project page",
      "Inline devlog editing",
      "Inline version history",
      "Built-in markdown editor",
      "One-click changelog generation with branch and format options",
      "Ctrl+K command palette",
      "Auto-find repo and demo links",
    ],
  },
  {
    id: "stats-analytics",
    title: "Stats and analytics",
    items: [
      "Payout percentile, cookies/h, devlog frequency, and cookies",
      "Vote estimation average stars",
      "Average stars across each category",
      "Total project stats",
      "Kitchen dashboard graph and stats",
      "Estimated payouts",
      "Ship efficiency graph",
      "Activity heatmap",
      "Balance history in lb",
    ],
  },
  {
    id: "themes-visuals",
    title: "Themes and visuals",
    items: [
      "Catppuccin and Oceanic themes",
      "Custom theme color controls",
      "Images do not crop in devlogs",
      "shots.so integration for stylized attachments",
      "Automatic aspect ratio picking",
      "Two-image layout support",
      "Screenshot editor",
    ],
  },
  {
    id: "shop-admin",
    title: "Shop, goals, and admin",
    items: [
      "Shop accessories preview without opening order page",
      "Better goal UI with priority goals",
      "Cumulative and individual progress tracking",
      "Projected progress from unshipped hours",
      "Goal time estimates from average efficiency",
      "Admin UI improvements",
      "Extra admin stats and deduction calculator",
    ],
  },
  {
    id: "automation-qol",
    title: "Automation and quality of life",
    items: [
      "Auto achievement claim",
      "Project search bar",
      "Doomscroll devlogs",
      "Speed read devlogs",
      "Sync goals/settings across devices",
      "Vote feedback from #flavortown-share-votes",
      "TODOs with Slack sync",
    ],
  },
];

const toc = groups.map((group) => ({ id: group.id, label: group.title }));

export default function AllFeaturesPage() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_220px] gap-6">
      <article className="max-w-[900px] rounded-3xl border p-6 md:p-8" style={{ backgroundColor: "var(--theme-card-bg)", borderColor: "var(--theme-border)" }}>
        <span
          className="text-xs font-bold uppercase tracking-[0.2em]"
          style={{ color: "var(--theme-accent)", fontFamily: "var(--font-heading)" }}
        >
          Reference
        </span>
        <h1
          className="mt-3 text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter"
          style={{ color: "var(--theme-text)", fontFamily: "var(--font-heading)" }}
        >
          All features
        </h1>

        <div className="mt-8 space-y-4 md:space-y-5">
          {groups.map((group) => (
            <section
              key={group.id}
              id={group.id}
              className="scroll-mt-28 rounded-2xl border p-4 md:p-5"
              style={{ backgroundColor: "var(--theme-surface)", borderColor: "var(--theme-border)" }}
            >
              <h2 className="text-xl font-bold capitalize" style={{ color: "var(--theme-text)", fontFamily: "var(--font-heading)" }}>
                {group.title}
              </h2>
              <ul className="mt-2 space-y-1.5 text-sm" style={{ color: "var(--theme-text-muted)" }}>
                {group.items.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </article>

      <DocsToc items={toc} />
    </div>
  );
}
