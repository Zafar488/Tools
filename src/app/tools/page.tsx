import Link from "next/link";
import { tools, categories } from "@/lib/tools-registry";

export const metadata = {
  title: "All Tools",
  description: "Browse all free online tools — unit converter, currency converter, QR generator, password generator, age calculator, health calculators, and image toolkit.",
};

export default function ToolsPage() {
  return (
    <div className="max-container section-padding py-8 sm:py-12">
      <nav className="breadcrumb mb-6">
        <Link href="/">Home</Link><span>/</span>
        <span className="text-slate-900 dark:text-white">All Tools</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-display-lg font-bold text-slate-900 dark:text-white">All Tools</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-2xl">
          {tools.length} free tools — all private, all instant, no account required.
        </p>
      </div>

      {categories.map((cat) => {
        const catTools = tools.filter((t) => t.category === cat.id);
        if (catTools.length === 0) return null;
        return (
          <div key={cat.id} className="mb-12">
            <div className="flex items-center gap-2 mb-5">
              <span className="text-xl">{cat.icon}</span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">{cat.name}</h2>
              <span className="ml-1 text-xs text-slate-400">({catTools.length})</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {catTools.map((tool) => (
                <Link key={tool.slug} href={`/tools/${tool.slug}`} className="tool-card group">
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-xl dark:bg-brand-950/50">{tool.icon}</span>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{tool.name}</h3>
                      <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{tool.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
