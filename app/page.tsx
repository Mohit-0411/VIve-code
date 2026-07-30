import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 bg-radial-glow pt-36 px-8 max-w-5xl mx-auto text-center">
      
      {/* Decorative Accent Pill */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-sm font-medium mb-8">
        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
        Celebrating Literature & Culture
      </div>

      {/* Vibrant Gradient Title */}
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
        Welcome to{' '}
        <span className="bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 bg-clip-text text-transparent">
          Sahityik
        </span>
      </h1>

      <p className="text-lg md:text-xl text-stone-600 dark:text-stone-400 max-w-2xl mx-auto mb-10 leading-relaxed">
        Discover inspiring literary events, meet renowned authors, and engage in meaningful discussions across our vibrant creative community.
      </p>

      {/* Colorful Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/events"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-semibold shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-105 transition-all"
        >
          Explore Events
        </Link>
        <Link
          href="/speakers"
          className="px-6 py-3 rounded-xl bg-stone-200 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 text-stone-800 dark:text-stone-200 font-semibold hover:border-amber-500 transition-all"
        >
          Meet Speakers
        </Link>
      </div>
    </div>
  )
}