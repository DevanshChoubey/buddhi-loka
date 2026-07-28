import Link from "next/link"
import { BrainCircuit, Cpu, Eye } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const topics = [
  {
    title: "Generative AI",
    description: "Explore the latest advancements in generative AI models, including GANs, diffusion models, and more.",
    icon: <BrainCircuit className="h-5 w-5" />,
    count: 12,
    slug: "generative-ai",
  },
  {
    title: "Computer Vision",
    description:
      "Discover how AI is revolutionizing image and video analysis, object detection, and scene understanding.",
    icon: <Eye className="h-5 w-5" />,
    count: 8,
    slug: "computer-vision",
  },
  {
    title: "Deep Learning",
    description: "Learn about neural network architectures, training techniques, and applications in various domains.",
    icon: <Cpu className="h-5 w-5" />,
    count: 15,
    slug: "deep-learning",
  },
  {
    title: "AI Ethics",
    description: "Examine the ethical implications of AI development and deployment in society.",
    icon: <BrainCircuit className="h-5 w-5" />,
    count: 6,
    slug: "ai-ethics",
  },
  {
    title: "Natural Language Processing",
    description: "Explore how AI understands, generates, and interacts with human language.",
    icon: <BrainCircuit className="h-5 w-5" />,
    count: 9,
    slug: "nlp",
  },
  {
    title: "AI Research",
    description: "Stay updated with the latest research papers, breakthroughs, and academic developments in AI.",
    icon: <BrainCircuit className="h-5 w-5" />,
    count: 11,
    slug: "ai-research",
  },
]

export default function TopicsPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader active="/topics/" />

      <main className="container mx-auto px-4 py-14">
        <h1 className="font-display mb-9 text-4xl font-bold tracking-tight">Topics</h1>
        <div className="grid gap-5 [grid-template-columns:repeat(auto-fill,minmax(290px,1fr))]">
          {topics.map((topic) => (
            <Link href="/articles" key={topic.slug} className="group glass-card block rounded-[22px] p-6">
              <div className="mb-5 flex items-center justify-between">
                <div className="rounded-xl bg-[color:var(--gm-grad-1)]/[0.14] p-3 text-[color:var(--gm-grad-1)]">
                  {topic.icon}
                </div>
                <div className="rounded-full bg-[rgb(var(--gm-glass-tint)/0.08)] px-3 py-1 text-sm text-[rgb(var(--gm-glass-tint)/0.7)]">
                  {topic.count} articles
                </div>
              </div>
              <h3 className="font-display mb-2 text-xl font-semibold transition-colors group-hover:text-[color:var(--gm-grad-1)]">
                {topic.title}
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-[rgb(var(--gm-glass-tint)/0.55)]">{topic.description}</p>
              <span className="text-sm font-medium text-[color:var(--gm-grad-2)]">View articles →</span>
            </Link>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
