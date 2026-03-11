import DocsToc from "@/components/docs/DocsToc";

const toc = [
  { id: "weird-stats", label: "Weird stats" },
  { id: "payout-cache", label: "Payout cache reset" }
];

export default function TroubleshootingPage() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_220px] gap-6">
      <article className="max-w-[900px] rounded-3xl border p-6 md:p-8" style={{ backgroundColor: "var(--theme-card-bg)", borderColor: "var(--theme-border)" }}>
        <span
          className="text-xs font-bold uppercase tracking-[0.2em]"
          style={{ color: "var(--theme-accent)", fontFamily: "var(--font-heading)" }}
        >
          Help
        </span>
        <h1
          className="mt-3 text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter"
          style={{ color: "var(--theme-text)", fontFamily: "var(--font-heading)" }}
        >
          Troubleshooting
        </h1>

        <div className="mt-8 space-y-4 text-sm md:text-[15px]" style={{ color: "var(--theme-text-muted)" }}>
          <section id="weird-stats" className="scroll-mt-28 rounded-2xl border p-4 md:p-5" style={{ backgroundColor: "var(--theme-surface)", borderColor: "var(--theme-border)" }}>
            <h2 className="text-xl font-bold" style={{ color: "var(--theme-text)", fontFamily: "var(--font-heading)" }}>
              Weird stats
            </h2>
            <p className="mt-2">If cookies/h, payout percentile, or estimated payout suddenly looks unrealistic, it is usually stale payout cache data.</p>
            <p className="mt-2">First hard refresh the Flavortown tab. If numbers are still off, clear payout-related cache keys and reload.</p>
          </section>

          <section id="payout-cache" className="scroll-mt-28 rounded-2xl border p-4 md:p-5" style={{ backgroundColor: "var(--theme-surface)", borderColor: "var(--theme-border)" }}>
            <h2 className="text-xl font-bold" style={{ color: "var(--theme-text)", fontFamily: "var(--font-heading)" }}>
              Payout cache reset
            </h2>
            <p className="mt-2">Open browser devtools console on Flavortown and run:</p>
            <pre className="mt-2 rounded-xl border p-3 text-xs overflow-x-auto" style={{ backgroundColor: "var(--theme-card-bg)", borderColor: "var(--theme-border)", color: "var(--theme-text)" }}>
{`localStorage.removeItem("flavortown_ship_payouts_v2");
localStorage.removeItem("flavortown_ship_minutes");
localStorage.removeItem("flavortown_project_unshipped");`}
            </pre>
            <p className="mt-2">Then reload the page so FT Utils rebuilds payout and ship-time caches from fresh data.</p>
          </section>
        </div>
      </article>

      <DocsToc items={toc} />
    </div>
  );
}
