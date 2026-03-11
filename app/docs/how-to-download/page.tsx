import DocsToc from "@/components/docs/DocsToc";

const toc = [
  {
    id: "installation",
    label: "Installation",
    children: [
      { id: "chrome", label: "Chrome" },
      { id: "firefox", label: "Firefox" },
      { id: "safari", label: "Safari" },
    ],
  },
];

export default function HowToDownloadPage() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_220px] gap-6">
      <article className="max-w-[900px] rounded-3xl border p-6 md:p-8" style={{ backgroundColor: "var(--theme-card-bg)", borderColor: "var(--theme-border)" }}>
        <span
          className="text-xs font-bold uppercase tracking-[0.2em]"
          style={{ color: "var(--theme-accent)", fontFamily: "var(--font-heading)" }}
        >
          Installation
        </span>
        <h1
          className="mt-3 text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter"
          style={{ color: "var(--theme-text)", fontFamily: "var(--font-heading)" }}
        >
          How to download
        </h1>
        <p className="mt-4 text-sm md:text-[15px]" style={{ color: "var(--theme-text-muted)" }}>
          Chrome and Firefox are one-click installs. Safari is supported through the manual developer flow.
        </p>

        <section id="installation" className="scroll-mt-28 mt-8 space-y-4">
          <section id="chrome" className="scroll-mt-28 rounded-2xl border p-4 md:p-5" style={{ backgroundColor: "var(--theme-surface)", borderColor: "var(--theme-border)" }}>
            <h2 className="text-xl font-bold" style={{ color: "var(--theme-text)", fontFamily: "var(--font-heading)" }}>
              Chrome
            </h2>
            <ol className="mt-2 text-sm space-y-1.5 list-decimal list-inside" style={{ color: "var(--theme-text-muted)" }}>
              <li>
                Open the <a href="https://chromewebstore.google.com/detail/flavortown-utils/fdacgialppflhglkinbiapaenfahhjge" target="_blank" rel="noopener noreferrer" style={{ color: "var(--theme-accent)" }}>Chrome Web Store listing</a>.
              </li>
              <li>Click Add to Chrome.</li>
              <li>Confirm permissions and pin the extension.</li>
            </ol>
          </section>

          <section id="firefox" className="scroll-mt-28 rounded-2xl border p-4 md:p-5" style={{ backgroundColor: "var(--theme-surface)", borderColor: "var(--theme-border)" }}>
            <h2 className="text-xl font-bold" style={{ color: "var(--theme-text)", fontFamily: "var(--font-heading)" }}>
              Firefox
            </h2>
            <ol className="mt-2 text-sm space-y-1.5 list-decimal list-inside" style={{ color: "var(--theme-text-muted)" }}>
              <li>
                Open the <a href="https://addons.mozilla.org/en-US/firefox/addon/flavortown-utils/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--theme-accent)" }}>Mozilla Add-ons listing</a>.
              </li>
              <li>Click Add to Firefox.</li>
              <li>Confirm and keep it pinned for quick access.</li>
            </ol>
          </section>

          <section id="safari" className="scroll-mt-28 rounded-2xl border p-4 md:p-5" style={{ backgroundColor: "var(--theme-surface)", borderColor: "var(--theme-border)" }}>
            <h2 className="text-xl font-bold" style={{ color: "var(--theme-text)", fontFamily: "var(--font-heading)" }}>
              Safari (manual developer install)
            </h2>
            <ol className="mt-2 text-sm space-y-1.5 list-decimal list-inside" style={{ color: "var(--theme-text-muted)" }}>
              <li>Download and unzip the Safari-compatible extension build.</li>
              <li>Open Safari and go to Settings, then enable web developer features.</li>
              <li>Open the Developer tab and allow unsigned extensions.</li>
              <li>Use Add temporary extension and select the unzipped folder.</li>
            </ol>
          </section>
        </section>
      </article>

      <DocsToc items={toc} />
    </div>
  );
}
