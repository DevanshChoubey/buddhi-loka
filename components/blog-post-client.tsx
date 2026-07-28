"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, BrainCircuit, Clock, Share2, Twitter, Facebook, Linkedin } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useEffect } from "react"

interface RelatedPost {
  title: string
  category: string
  image: string
  slug: string
}

interface BlogPostData {
  title: string
  date: string
  author: string
  category: string
  readTime: string
  image: string
  content: string
  relatedPosts: RelatedPost[]
}

interface BlogPostClientProps {
  post: BlogPostData | null | undefined
  slug: string
}

export default function BlogPostClient({ post, slug }: BlogPostClientProps) {
  const { toast } = useToast()

  useEffect(() => {
    if (!post) {
      toast({
        title: "Post loading error",
        description: "There was an issue loading the blog post content.",
        variant: "destructive",
      })
    }
  }, [post, toast])

  if (!post) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p>Loading post...</p>
      </div>
    )
  }

  const handleShare = (platform: string) => {
    const url = window.location.href
    const text = `Check out this article: ${post.title}`
    let shareUrl = ""

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
        break
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
      default:
        navigator.clipboard.writeText(url)
        toast({
          title: "Link copied",
          description: "The article link has been copied to your clipboard.",
        })
        return
    }
    if (shareUrl) {
      window.open(shareUrl, "_blank")
    }
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/articles/"
          className="mb-8 inline-flex items-center text-sm text-[rgb(var(--gm-glass-tint)/0.6)] transition-colors hover:text-[color:var(--gm-fg)]"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to articles
        </Link>

        <div className="mb-4 flex items-center gap-2 text-sm font-medium text-[color:var(--gm-grad-1)]">
          <BrainCircuit className="h-5 w-5" />
          <span>{post.category}</span>
        </div>

        <h1 className="font-display mb-6 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">{post.title}</h1>

        <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-[rgb(var(--gm-glass-tint)/0.55)]">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{post.readTime}</span>
          </div>
          <div>{post.date}</div>
          <div>By {post.author}</div>
        </div>

        <div className="relative mb-8 h-[300px] overflow-hidden rounded-[22px] border border-[rgb(var(--gm-glass-tint)/0.12)] md:h-[440px]">
          <Image src={post.image || "/placeholder.svg"} alt="Article hero image" fill className="object-cover" priority />
        </div>

        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            <ShareButton onClick={() => handleShare("twitter")}>
              <Twitter className="h-4 w-4" /> Share
            </ShareButton>
            <ShareButton onClick={() => handleShare("facebook")}>
              <Facebook className="h-4 w-4" /> Share
            </ShareButton>
            <ShareButton onClick={() => handleShare("linkedin")}>
              <Linkedin className="h-4 w-4" /> Share
            </ShareButton>
          </div>
          <ShareButton onClick={() => handleShare("clipboard")}>
            <Share2 className="h-4 w-4" /> Share
          </ShareButton>
        </div>

        <article className="prose prose-invert max-w-none [--tw-prose-body:rgb(var(--gm-glass-tint)/0.75)] [--tw-prose-headings:var(--gm-fg)] [--tw-prose-links:var(--gm-grad-2)] [--tw-prose-bold:var(--gm-fg)]">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        {post.relatedPosts.length > 0 && (
        <div className="mt-12 border-t border-[rgb(var(--gm-glass-tint)/0.1)] pt-8">
          <h3 className="font-display mb-6 text-xl font-bold">Related Articles</h3>
          <div className="grid gap-5 md:grid-cols-2">
            {post.relatedPosts.map((relatedPost) => (
              <Link href={`/blog/${relatedPost.slug}/`} key={relatedPost.slug} className="group glass-card block overflow-hidden rounded-[18px]">
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={relatedPost.image || "/placeholder.svg"}
                    alt={`${relatedPost.title} thumbnail`}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <div className="mb-2 flex items-center gap-2 text-xs font-medium text-[color:var(--gm-grad-1)]">
                    <BrainCircuit className="h-4 w-4" />
                    <span>{relatedPost.category}</span>
                  </div>
                  <h3 className="font-medium transition-colors group-hover:text-[color:var(--gm-grad-1)]">
                    {relatedPost.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
        )}
      </div>
    </main>
  )
}

function ShareButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="btn-ghost-glass flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all"
    >
      {children}
    </button>
  )
}
