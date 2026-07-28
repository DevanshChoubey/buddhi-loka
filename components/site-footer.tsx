import type React from "react"
import Link from "next/link"
import { Github, Linkedin, Mail, Rss, Twitter } from "lucide-react"

const TOPICS = ["Artificial Intelligence", "Generative AI", "Computer Vision", "Deep Learning", "Machine Learning"]
const RESOURCES = ["Tutorials", "Research Papers", "Code Samples", "Datasets", "Tools"]

export function SiteFooter() {
  return (
    <footer className="py-16">
      <div className="container mx-auto px-4">
        <div className="glass rounded-[28px] p-8 md:p-12">
          <div className="mb-9 grid gap-10 md:grid-cols-4">
            <div className="md:col-span-1">
              <Link href="/" className="font-display text-lg font-bold tracking-tight">
                Buddhi<span className="text-[color:var(--gm-grad-1)]">Loka</span>
              </Link>
              <p className="mt-4 text-sm leading-relaxed text-[rgb(var(--gm-glass-tint)/0.55)]">
                Exploring the cutting edge of artificial intelligence and machine learning with in-depth analysis and
                insights.
              </p>
              <div className="mt-4 flex gap-2.5">
                <SocialLink label="Twitter">
                  <Twitter className="h-4 w-4" />
                </SocialLink>
                <SocialLink label="GitHub">
                  <Github className="h-4 w-4" />
                </SocialLink>
                <SocialLink label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </SocialLink>
                <SocialLink label="RSS">
                  <Rss className="h-4 w-4" />
                </SocialLink>
              </div>
            </div>
            <FooterColumn title="Topics" items={TOPICS} />
            <FooterColumn title="Resources" items={RESOURCES} />
            <div>
              <h3 className="mb-4 text-sm font-semibold text-[rgb(var(--gm-glass-tint)/0.85)]">Contact</h3>
              <p className="flex items-center gap-2 text-sm text-[rgb(var(--gm-glass-tint)/0.5)]">
                <Mail className="h-4 w-4" />
                devansh.choubey@outlook.com
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--gm-glass-tint)/0.5)]">
                Available for collaborations and inquiries.
              </p>
            </div>
          </div>
          <div className="border-t border-[rgb(var(--gm-glass-tint)/0.08)] pt-6 text-center text-xs text-[rgb(var(--gm-glass-tint)/0.35)]">
            © {new Date().getFullYear()} Buddhi Loka. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold text-[rgb(var(--gm-glass-tint)/0.85)]">{title}</h3>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item}>
            <Link
              href="#"
              className="text-sm text-[rgb(var(--gm-glass-tint)/0.5)] transition-colors hover:text-[color:var(--gm-grad-2)]"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SocialLink({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Link
      href="#"
      title={label}
      className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-[rgb(var(--gm-glass-tint)/0.12)] bg-[rgb(var(--gm-glass-tint)/0.06)] transition-all hover:-translate-y-0.5 hover:bg-[rgb(var(--gm-glass-tint)/0.14)]"
    >
      {children}
    </Link>
  )
}
