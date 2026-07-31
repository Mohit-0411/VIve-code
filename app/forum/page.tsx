import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import {
  Sparkles,
  BookOpen,
  Theater,
  GraduationCap,
  MessageSquare,
  PlusCircle,
  Clock,
  User,
  Tag,
  ArrowRight,
} from 'lucide-react'

export const revalidate = 0

async function getForumPosts() {
  const posts = await client.fetch(
    `*[_type in ["forum", "forumPost", "post"]] | order(_createdAt desc){
      _id,
      title,
      content,
      body,
      category,
      _createdAt,
      "slug": slug.current,
      author->{ name, image }
    }`
  )
  return posts
}

export default async function ForumPage() {
  const posts = await getForumPosts()

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

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1b2668] via-[#233180] to-[#1a235c] text-white pt-16 pb-20 px-6 border-b border-blue-900">
        {/* Background Watermark */}
        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center overflow-hidden">
          <span className="text-[22vw] font-serif font-black text-white select-none leading-none tracking-widest">
            साहित्य
          </span>
        </div>

        <div className="max-w-5xl mx-auto relative z-10 text-center space-y-6">
          {/* Faculty Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-100 text-xs md:text-sm font-semibold shadow-inner">
            <GraduationCap className="w-4 h-4 text-amber-300" />
            <span>
              Organized by <strong className="text-white">B. Tech in AI FACULTY</strong>
            </span>
          </div>

          {/* Page Title */}
          <div className="space-y-2">
            <h1 className="text-5xl sm:text-7xl font-black tracking-tight drop-shadow-md">
              साहित्यिक <span className="font-sans font-extrabold text-blue-200">Forum</span>
            </h1>
            <p className="text-lg md:text-xl font-serif text-blue-100 italic">
              &ldquo;Where Words Take Center Stage&rdquo;
            </p>
          </div>

          {/* Active Categories Bar */}
          <div className="pt-2">
            <div className="inline-flex items-center justify-center gap-4 px-6 py-2.5 rounded-2xl bg-white/10 border border-white/15 text-white font-bold text-xs md:text-sm tracking-wider uppercase backdrop-blur-sm">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-300" /> Poetry
              </span>
              <span className="text-blue-400">•</span>
              <span className="flex items-center gap-1.5">
                <Theater className="w-4 h-4 text-blue-300" /> Storytelling
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Forum Section */}
      <main className="max-w-6xl mx-auto px-6 py-14 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
              Community Discussions
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Share poetry, prose, literature reviews, and creative writing feedback.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-xs font-bold px-3 py-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
              {posts ? posts.length : 0} Topic{posts?.length === 1 ? '' : 's'}
            </div>
            <Link
              href="/forum/new"
              className="px-5 py-2.5 rounded-xl bg-[#1b2668] hover:bg-[#233180] text-white font-bold text-xs md:text-sm transition-all shadow-md flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4 text-blue-300" />
              New Discussion
            </Link>
          </div>
        </div>

        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: any) => {
              const postDate = post._createdAt
                ? new Date(post._createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : ''

              const excerpt = typeof post.content === 'string'
                ? post.content
                : post.body
                ? 'Click to read full discussion thread...'
                : 'Join the conversation on this topic.'

              return (
                <Link
                  key={post._id}
                  href={`/forum/${post.slug}`}
                  className="group bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 hover:border-blue-500 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    {/* Header meta */}
                    <div className="flex items-center justify-between text-xs font-medium">
                      {post.category ? (
                        <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold border border-blue-100 dark:border-blue-900 flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {post.category}
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold">
                          General
                        </span>
                      )}

                      {postDate && (
                        <span className="text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-blue-600" />
                          {postDate}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-extrabold text-lg text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                      {excerpt}
                    </p>
                  </div>

                  {/* Footer Author & CTA */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 flex items-center justify-center font-bold">
                        <User className="w-3.5 h-3.5" />
                      </div>
                      <span className="truncate max-w-[120px]">
                        {post.author?.name || 'Community Member'}
                      </span>
                    </div>

                    <span className="text-blue-700 dark:text-blue-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Read Thread <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
            <MessageSquare className="w-10 h-10 text-blue-600 mx-auto opacity-40" />
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                No Forum Discussions Yet
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                Start the conversation! Share your poems, thoughts, or storytelling ideas with the community.
              </p>
            </div>
            <Link
              href="/forum/new"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1b2668] hover:bg-[#233180] text-white font-bold text-sm transition-all shadow-md"
            >
              <PlusCircle className="w-4 h-4 text-blue-300" />
              Create First Topic
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}