import Link from "next/link"
import Image from "next/image"
import type React from "react"

interface FeaturedCardProps {
  title: string
  description: string
  image: string
  date: string
  category: string
  icon: React.ReactNode
  slug?: string
}

export function FeaturedCard({ title, description, image, date, category, icon, slug = "" }: FeaturedCardProps) {
  return (
    <Link href={`/blog/${slug}/`} className="group relative block aspect-[4/5] overflow-hidden rounded-3xl">
      <Image
        src={image || "/placeholder.svg"}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent from-30% to-black/90" />
      <div className="glass-panel absolute inset-x-3.5 bottom-3.5 rounded-2xl p-5 transition-all duration-500 ease-out group-hover:bg-[rgb(var(--gm-glass-tint)/0.14)]">
        <div className="mb-2.5 inline-flex items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-wide text-[rgb(var(--gm-glass-tint)/0.75)]">
          {icon}
          {category}
        </div>
        <h3 className="font-display mb-2 text-[19px] font-semibold leading-snug">{title}</h3>
        <p className="max-h-0 overflow-hidden text-[13px] leading-relaxed text-[rgb(var(--gm-glass-tint)/0.55)] opacity-0 transition-all duration-500 ease-out group-hover:mb-2.5 group-hover:max-h-24 group-hover:opacity-100">
          {description}
        </p>
        <div className="mt-2.5 flex items-center justify-between text-xs text-[rgb(var(--gm-glass-tint)/0.4)]">
          <span>{date}</span>
          <span className="text-[color:var(--gm-grad-2)]">Read more →</span>
        </div>
      </div>
    </Link>
  )
}

interface ArticleCardProps {
  title: string
  description: string
  category: string
  date: string
  slug?: string
  image: string
}

export function ArticleCard({ title, description, category, date, slug = "", image }: ArticleCardProps) {
  return (
    <Link href={`/blog/${slug}/`} className="group glass-card block overflow-hidden rounded-[22px]">
      <div className="relative h-[170px] w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={`${title} thumbnail`}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <span className="mb-3 inline-flex rounded-lg border border-[color:var(--gm-grad-1)]/30 bg-[color:var(--gm-grad-1)]/[0.18] px-2.5 py-1 text-[10.5px] font-bold tracking-wide text-[color:var(--gm-grad-1)]">
          {category.toUpperCase()}
        </span>
        <h3 className="font-display mb-2 text-[16.5px] font-semibold leading-snug">{title}</h3>
        <p className="mb-3.5 line-clamp-2 text-[13px] leading-relaxed text-[rgb(var(--gm-glass-tint)/0.5)]">
          {description}
        </p>
        <div className="flex items-center justify-between border-t border-[rgb(var(--gm-glass-tint)/0.08)] pt-3 text-xs text-[rgb(var(--gm-glass-tint)/0.35)]">
          <span>{date}</span>
          <span className="text-[color:var(--gm-grad-2)]">Read →</span>
        </div>
      </div>
    </Link>
  )
}
