import Link from "next/link";
import { tools, categories, SITE_NAME } from "@/lib/tools-registry";

export const metadata = {
  title: `${SITE_NAME} — Free Online Tools`,
  description: "Free online tools — convert units, generate QR codes, check passwords, calculate BMI, and more. Fast, private, no sign-up required.",
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="max-container section-padding py-20 sm:py-28 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700 mb-6 dark:bg-brand-950/50 dark:border-brand-800 dark:text-brand-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500" />
            </span>
            100% Free &middot; No Sign-up &middot; Private
          </div>
          <h1 className="text-display-xl font-extrabold text-slate-900 dark:text-white max-w-4xl mx-auto">
            Every tool you need,{" "}
            <span className="text-brand-600 dark:text-brand-400">
              right in your browser
            </span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Convert units, generate QR codes, check passwords, calculate health
            metrics, and process images — all free, all private, all instant.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/tools" className="btn-primary text-base px-8 py-3.5">
              Explore All Tools
            </Link>
            <Link
              href="#tools-grid"
              className="btn-secondary text-base px-8 py-3.5"
            >
              See What&apos;s Available
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-b dark:border-slate-800">
        <div className="max-container section-padding py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { icon: "🔒", label: "Client-Side Processing", sub: "Data never leaves your device" },
              { icon: "⚡", label: "Instant Results", sub: "No waiting, no loading" },
              { icon: "🌍", label: "Works Everywhere", sub: "Desktop, tablet, mobile" },
              { icon: "♿", label: "Accessible", sub: "WCAG 2.2 AA compliant" },
            ].map((badge) => (
              <div key={badge.label} className="space-y-1">
                <div className="text-2xl">{badge.icon}</div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">
                  {badge.label}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {badge.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools-grid" className="scroll-mt-20">
        <div className="max-container section-padding py-16 sm:py-20">
          <div className="text-center mb-14">
            <h2 className="text-display-md font-bold text-slate-900 dark:text-white">
              Powerful tools, zero complexity
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
              Pick a category or jump straight to the tool you need.
            </p>
          </div>

          {categories.map((cat) => {
            const catTools = tools.filter((t) => t.category === cat.id);
            if (catTools.length === 0) return null;
            return (
              <div key={cat.id} id={cat.id} className="mb-14 scroll-mt-20">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">{cat.icon}</span>
                  <h3 className="text-display-sm font-bold text-slate-900 dark:text-white">
                    {cat.name}
                  </h3>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {catTools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="tool-card group"
                    >
                      <div className="flex items-start gap-4">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-2xl dark:bg-brand-950/50">
                          {tool.icon}
                        </span>
                        <div className="min-w-0">
                          <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                            {tool.name}
                          </h4>
                          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                            {tool.description}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {tool.features.slice(0, 3).map((feat) => (
                          <span
                            key={feat}
                            className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300"
                          >
                            {feat}
                          </span>
                        ))}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-600 dark:bg-brand-700">
        <div className="max-container section-padding py-14 text-center">
          <h2 className="text-display-sm font-bold text-white">
            Start using tools — no account needed
          </h2>
          <p className="mt-3 text-brand-100 max-w-lg mx-auto">
            Every tool runs entirely in your browser. Your data stays on your
            device. Always free.
          </p>
          <Link
            href="/tools"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-brand-700 hover:bg-brand-50 transition-colors"
          >
            Browse All Tools &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
