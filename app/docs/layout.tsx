import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import DocsSidebar from "@/components/docs/DocsSidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="min-h-screen pt-30 pb-20" style={{ backgroundColor: "var(--theme-surface)" }}>
        <div className="max-w-[1440px] mx-auto px-0 md:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)]">
            <aside className="hidden lg:block min-h-[calc(100vh-7rem)] border-r" style={{ borderColor: "var(--theme-border)" }}>
              <DocsSidebar />
            </aside>
            <div className="px-6 md:px-10 lg:px-12">{children}</div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
