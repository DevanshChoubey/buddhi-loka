import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader active="/about/" />

      <main className="container mx-auto px-4 py-14">
        <div className="glass mx-auto max-w-3xl rounded-[28px] p-8 md:p-12">
          <h1 className="font-display mb-8 text-4xl font-bold tracking-tight">About Buddhi Loka</h1>

          <div className="prose prose-invert max-w-none [--tw-prose-body:rgb(var(--gm-glass-tint)/0.75)] [--tw-prose-headings:var(--gm-fg)] [--tw-prose-links:var(--gm-grad-2)] [--tw-prose-bold:var(--gm-fg)]">
            <p className="text-xl leading-relaxed text-[rgb(var(--gm-glass-tint)/0.75)]">
              Welcome to Buddhi Loka, the personal blog of Devansh Choubey. This space is dedicated to exploring the
              frontiers of artificial intelligence, with a focus on recent advancements in AI, GenAI, Computer
              Vision, and Deep Learning.
            </p>

            <h2>Our Mission</h2>
            <p>
              My mission is to provide insightful, accessible, and cutting-edge content about the rapidly evolving
              field of artificial intelligence. I aim to bridge the gap between technical research and practical
              applications, making complex AI concepts understandable to a wider audience.
            </p>

            <h2>What We Cover</h2>
            <p>This blog focuses on several key areas in the AI landscape:</p>

            <ul>
              <li>
                <strong>Generative AI</strong>: From GANs to diffusion models, we explore how AI is creating
                increasingly realistic content across various media.
              </li>
              <li>
                <strong>Computer Vision</strong>: We delve into how machines perceive and understand visual
                information, and how this technology is transforming industries.
              </li>
              <li>
                <strong>Deep Learning</strong>: We examine the architectures, techniques, and applications that are
                pushing the boundaries of what AI can achieve.
              </li>
              <li>
                <strong>AI Ethics</strong>: We discuss the ethical implications of AI development and deployment,
                advocating for responsible innovation.
              </li>
            </ul>

            <h2>About the Author</h2>
            <p>
              Buddhi Loka is written and maintained by me, Devansh Choubey, an AI researcher, engineer, and enthusiast
              passionate about the potential of artificial intelligence to transform our world for the better.
            </p>

            <h2>Contact</h2>
            <p>
              Have a question, suggestion, or want to collaborate? I'd love to hear from you! Reach out at{" "}
              <a href="mailto:devansh.choubey@outlook.com">devansh.choubey@outlook.com</a>.
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
