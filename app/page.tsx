import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import {
  Sparkles,
  Calendar,
  MapPin,
  ArrowRight,
  BookOpen,
  Theater,
  GraduationCap,
  MessageSquare,
} from 'lucide-react'

export const revalidate = 0

async function getHomeData() {
  const events = await client.fetch(
    `*[_type == "event"] | order(date asc)[0..2]{
      _id,
      title,
      date,
      venue,
      location,
      "bannerImage": coalesce(bannerImage, image),
      "slug": slug.current
    }`
  )

  const forumPosts = await client.fetch(
    `*[_type in ["forum", "forumPost", "post"]] | order(_createdAt desc)[0..2]{
      _id,
      title,
      category,
      "slug": slug.current,
      author->{ name }
    }`
  )

  return { events, forumPosts }
}

export default async function HomePage() {
  const { events, forumPosts } = await getHomeData()

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Top Academic Banner */}
      <div className="bg-blue-950 text-blue-100 py-2.5 px-4 text-xs md:text-sm text-center border-b border-blue-800/50 font-medium">
        <span className="opacity-80">Affiliated to Purbanchal University — </span>
        <strong className="text-white font-semibold">
          GOMENDRA MULTIPLE COLLEGE
        </strong>
        <span className="opacity-80"> | Birtamode-4, Jhapa</span>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1b2668] via-[#233180] to-[#1a235c] text-white pt-20 pb-28 px-6 border-b border-blue-900">
        {/* Background Watermark Alpha Glow */}
        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center overflow-hidden">
          <span className="text-[20vw] font-serif font-black text-white select-none leading-none tracking-widest">
            साहित्य
          </span>
        </div>

        <div className="max-w-5xl mx-auto relative z-10 text-center space-y-8">
          {/* Faculty Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-100 text-xs md:text-sm font-semibold shadow-inner">
            <GraduationCap className="w-4 h-4 text-amber-300" />
            <span>
              Organized by <strong className="text-white">B. Tech in AI FACULTY</strong>
            </span>
          </div>

          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tight drop-shadow-md">
              साहित्यिक
            </h1>
            <p className="text-xl md:text-2xl italic font-serif text-blue-200 tracking-wide">
              &ldquo;Where Words Take Center Stage&rdquo;
            </p>
          </div>

          {/* Event Categories Bar */}
          <div className="pt-2">
            <div className="inline-flex flex-wrap items-center justify-center gap-3 md:gap-6 px-6 py-3 rounded-2xl bg-white/10 border border-white/15 text-white font-bold text-xs md:text-sm tracking-wider uppercase backdrop-blur-sm shadow-lg">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-300" /> Poetry
              </span>
              <span className="text-blue-400">•</span>
              <span className="flex items-center gap-1.5">
                <Theater className="w-4 h-4 text-blue-300" /> Storytelling
              </span>
            </div>
          </div>

          {/* Action CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/events"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-[#1b2668] font-extrabold shadow-xl hover:bg-blue-50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              Explore Events
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/forum"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-900/60 border border-blue-400/30 text-white font-bold hover:bg-blue-800/80 transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Community Forum
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <main className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Categories Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 hover:border-blue-500 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Poetry</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Express emotion and cadence through verses. Join fellow poets on stage.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 hover:border-blue-500 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold">
              <Theater className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Storytelling</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Captivate audiences with powerful narratives and immersive storytelling.
            </p>
          </div>
        </section>

        {/* Featured Events Section */}
        <section className="space-y-8">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
                Upcoming Events
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Discover schedule details and register to participate.
              </p>
            </div>
            <Link
              href="/events"
              className="text-sm font-bold text-blue-700 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {events && events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {events.map((event: any) => {
                const imgUrl = event.bannerImage ? urlFor(event.bannerImage).url() : null
                const eventDate = event.date
                  ? new Date(event.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : 'TBA'

                return (
                  <Link
                    key={event._id}
                    href={`/events/${event.slug}`}
                    className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-blue-500 shadow-sm hover:shadow-md transition-all flex flex-col"
                  >
                    <div className="h-44 bg-blue-900 relative overflow-hidden">
                      {imgUrl ? (
                        <img
                          src={imgUrl}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-900 to-indigo-950 flex items-center justify-center">
                          <Sparkles className="w-8 h-8 text-blue-300/40" />
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <h3 className="font-extrabold text-lg text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                        {event.title}
                      </h3>
                      <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-blue-600" />
                          <span>{eventDate}</span>
                        </div>
                        {(event.venue || event.location) && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-blue-600" />
                            <span>{event.venue || event.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-slate-500 text-sm">
              No upcoming events posted yet. Check back soon!
            </div>
          )}
        </section>

        {/* Community Discussions Preview */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Recent Forum Discussions
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Engage in discussions around literature and creative writing.
              </p>
            </div>
            <Link
              href="/forum"
              className="text-sm font-bold text-blue-700 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              Go to Forum <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {forumPosts && forumPosts.length > 0 ? (
              forumPosts.map((post: any) => (
                <Link
                  key={post._id}
                  href={`/forum/${post.slug}`}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-colors space-y-2 flex flex-col justify-between"
                >
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm line-clamp-2">
                    {post.title}
                  </h4>
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span>{post.author?.name || 'Anonymous'}</span>
                    {post.category && (
                      <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-medium">
                        {post.category}
                      </span>
                    )}
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-3 p-6 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-500 text-sm">
                No discussions yet. Be the first to start a topic!
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}