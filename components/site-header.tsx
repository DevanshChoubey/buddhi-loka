"use client"

import Link from "next/link"

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/articles/", label: "Articles" },
  { href: "/topics/", label: "Topics" },
  { href: "/about/", label: "About" },
]

export function SiteHeader({ active }: { active?: string }) {
  return (
    <header className="sticky top-0 z-[100] py-5">
      <div className="container mx-auto px-4">
        <div className="glass-nav flex items-center justify-between rounded-full py-3 pl-6 pr-3">
          <Link href="/" className="font-display text-lg font-bold tracking-tight">
            Buddhi<span className="text-[color:var(--gm-grad-1)]">Loka</span>
          </Link>
          <nav className="hidden items-center gap-1.5 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active === link.href
                    ? "bg-[rgb(var(--gm-glass-tint)/0.1)] text-[color:var(--gm-fg)]"
                    : "text-[rgb(var(--gm-glass-tint)/0.65)] hover:bg-[rgb(var(--gm-glass-tint)/0.08)] hover:text-[color:var(--gm-fg)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/#newsletter"
            className="btn-primary-glass rounded-full px-5 py-2.5 text-sm font-semibold transition-all"
          >
            Subscribe
          </Link>
        </div>
      </div>
    </header>
  )
}
