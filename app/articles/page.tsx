import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ArticleCard } from "@/components/blog-cards"

const articles = [
  {
    title: "Why We Format Chats: System, User, Assistant—and What Apollo 13 Taught Us",
    description:
      "Discover how NASA's communication protocols inspired modern chat formatting in LLMs, and why special tokens like <SYS>, <USR>, and <AST> are critical for attention routing and training.",
    category: "AI Research",
    date: "November 9, 2025",
    slug: "chat-format-attention",
    image: "https://images.unsplash.com/photo-1541873676-a18131494184?q=80&w=600&h=400&auto=format&fit=crop",
  },
]

export default function ArticlesPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader active="/articles/" />

      <main className="container mx-auto px-4 py-14">
        <h1 className="font-display mb-9 text-4xl font-bold tracking-tight">All Articles</h1>
        <div className="grid gap-5 [grid-template-columns:repeat(auto-fill,minmax(290px,1fr))]">
          {articles.map((article) => (
            <ArticleCard key={article.slug} {...article} />
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
