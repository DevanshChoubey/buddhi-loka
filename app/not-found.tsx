import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="glass mx-auto max-w-md rounded-[28px] px-8 py-10 text-center">
        <h1 className="font-display mb-4 text-4xl font-bold">404 - Page Not Found</h1>
        <p className="mb-8 text-[rgb(var(--gm-glass-tint)/0.6)]">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/" className="btn-primary-glass inline-block rounded-[14px] px-6 py-3 text-sm font-semibold">
          Return Home
        </Link>
      </div>
    </div>
  )
}
