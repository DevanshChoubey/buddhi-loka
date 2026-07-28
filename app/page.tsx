"use client"

import { useState, useRef, type FormEvent } from "react"
import Link from "next/link"
import Image from "next/image"
import { BrainCircuit } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FeaturedCard } from "@/components/blog-cards"

export default function Home() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const newsletterRef = useRef<HTMLElement>(null)

  const scrollToNewsletter = () => {
    newsletterRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    setTimeout(() => {
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter.",
      })
      setEmail("")
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen">
      <SiteHeader active="/" />

      <main className="container mx-auto px-4">
        <section className="grid items-center gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:py-24">
          <div>
            <div className="glass-panel mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px] text-[rgb(var(--gm-glass-tint)/0.75)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--gm-grad-2)] shadow-[0_0_8px_var(--gm-grad-2)]" />
              New: weekly research digest
            </div>
            <h1 className="font-display mb-5 text-[38px] font-bold leading-[1.08] tracking-tight md:text-[58px]">
              Exploring the Frontiers of <span className="text-gradient">Artificial Intelligence</span>
            </h1>
            <p className="mb-8 max-w-[480px] text-[17px] leading-relaxed text-[rgb(var(--gm-glass-tint)/0.6)]">
              Deep insights into AI, GenAI, Computer Vision, and Deep Learning — distilled from research papers into
              clear, practical reading.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/articles/"
                className="btn-primary-glass rounded-[14px] px-6 py-3.5 text-[15px] font-semibold transition-all"
              >
                Latest Articles
              </Link>
              <button
                onClick={scrollToNewsletter}
                className="btn-ghost-glass rounded-[14px] px-6 py-3.5 text-[15px] font-semibold transition-all"
              >
                Join Newsletter
              </button>
            </div>
          </div>

          <div className="relative aspect-[4/5] min-w-[280px] overflow-hidden rounded-[28px] border border-[rgb(var(--gm-glass-tint)/0.2)] shadow-[0_1px_0_rgb(var(--gm-glass-tint)/0.3)_inset]">
            <Image
              src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&h=1000&auto=format&fit=crop"
              alt="AI visualization"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--gm-grad-1)]/35 via-[color:var(--gm-grad-2)]/15 to-black/40" />
            <div className="glass-panel absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-2xl px-4.5 py-3.5 text-[13px]">
              <div
                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[10px] text-[15px]"
                style={{ background: "linear-gradient(135deg, var(--gm-grad-1), var(--gm-grad-2))" }}
              >
                🧠
              </div>
              <div>
                <div className="font-semibold">142 articles</div>
                <div className="text-xs text-[rgb(var(--gm-glass-tint)/0.5)]">Updated weekly</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="mb-9 flex items-baseline justify-between">
            <h2 className="font-display text-[30px] font-bold tracking-tight">Featured Stories</h2>
            <Link
              href="/articles/"
              className="text-sm font-medium text-[rgb(var(--gm-glass-tint)/0.55)] transition-colors hover:text-[color:var(--gm-grad-2)]"
            >
              View all →
            </Link>
          </div>

          <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
            <FeaturedCard
              title="Why We Format Chats: System, User, Assistant"
              description="Discover how NASA's communication protocols inspired modern chat formatting in LLMs."
              image="https://images.unsplash.com/photo-1541873676-a18131494184?q=80&w=600&h=750&auto=format&fit=crop"
              date="Nov 9, 2025"
              category="AI Research"
              icon={<BrainCircuit className="h-4 w-4" />}
              slug="chat-format-attention"
            />
          </div>
        </section>

        <section ref={newsletterRef} id="newsletter" className="py-12">
          <div
            className="relative overflow-hidden rounded-[32px] border border-[rgb(var(--gm-glass-tint)/0.14)] px-7 py-14 text-center shadow-[0_1px_0_rgb(var(--gm-glass-tint)/0.2)_inset,0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-[28px] backdrop-saturate-[180%] md:px-14"
            style={{
              background:
                "linear-gradient(155deg, color-mix(in srgb, var(--gm-grad-1) 14%, transparent), color-mix(in srgb, var(--gm-grad-2) 6%, transparent))",
            }}
          >
            <h2 className="font-display mb-3.5 text-[30px] font-bold tracking-tight">
              Stay Updated with Latest AI Insights
            </h2>
            <p className="mx-auto mb-7 max-w-[460px] text-[15px] leading-relaxed text-[rgb(var(--gm-glass-tint)/0.6)]">
              Subscribe to receive cutting-edge research, tutorials, and industry news delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="mx-auto flex max-w-[440px] flex-col gap-2.5 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 rounded-[14px] border border-[rgb(var(--gm-glass-tint)/0.16)] bg-[rgb(var(--gm-glass-tint)/0.08)] px-5 py-3.5 text-sm text-[color:var(--gm-fg)] placeholder:text-[rgb(var(--gm-glass-tint)/0.35)] outline-none backdrop-blur-[10px] transition-all focus:border-[rgb(var(--gm-glass-tint)/0.35)] focus:bg-[rgb(var(--gm-glass-tint)/0.12)]"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary-glass whitespace-nowrap rounded-[14px] px-7 py-3.5 text-sm font-semibold transition-all"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
