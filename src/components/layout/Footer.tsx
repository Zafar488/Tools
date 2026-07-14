import Link from "next/link";
import { tools, categories, SITE_NAME } from "@/lib/tools-registry";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:bg-slate-900 dark:border-slate-800">
      <div className="max-container section-padding py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-lg">
              <span>🛠️</span>
              <span className="bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
                {SITE_NAME}
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Free online tools for everyone. Fast, private, no account required.
            </p>
          </div>

          {/* Tools by category */}
          {categories.slice(0, 2).map((cat) => (
            <div key={cat.id}>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                {cat.icon} {cat.name}
              </h3>
              <ul className="space-y-2">
                {tools.filter((t) => t.category === cat.id).map((tool) => (
                  <li key={tool.slug}>
                    <Link
                      href={`/tools/${tool.slug}`}
                      className="text-sm text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                    >
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* More tools + links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">More Tools</h3>
            <ul className="space-y-2">
              {tools.filter((t) => !["converters"].includes(t.category)).map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="text-sm text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-brand-500 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-brand-500 transition-colors">Terms of Service</Link>
            <Link href="/about" className="hover:text-brand-500 transition-colors">About</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
