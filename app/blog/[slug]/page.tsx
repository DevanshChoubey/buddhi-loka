import BlogPostClient from "@/components/blog-post-client"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { notFound } from "next/navigation"
import { blogPosts, type BlogPosts } from "@/data/blog-posts"

// Function to generate static paths for blog posts
export async function generateStaticParams() {
  const slugs = Object.keys(blogPosts)
  return slugs.map((slug) => ({
    slug,
  }))
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params

  const typedBlogPosts: BlogPosts = blogPosts
  const post = typedBlogPosts[slug]

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <BlogPostClient post={post} slug={slug} />
      <SiteFooter />
    </div>
  )
}
