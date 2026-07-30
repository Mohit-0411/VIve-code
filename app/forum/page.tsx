import { client } from '@/sanity/lib/client'
import Link from 'next/link'
import Badge from '@/components/Badge'
import { MessageSquare, Heart, PlusCircle, User, Sparkles } from 'lucide-react'

export const revalidate = 0

async function getForumPosts() {
  return await client.fetch(`
    *[_type == "forumPost"] | order(_createdAt desc){
      _id,
      title,
      author,
      category,
      content,
      likes,
      repliesCount,
      _createdAt,
      "slug": slug.current
    }
  `)
}

export default async function ForumPage() {
  const posts = await getForumPosts()

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 pt-28 pb-20 px-6 max-w-5xl mx-auto">
      {/* Forum Banner Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500/10 via-purple-500/10 to-rose-500/10 border border-stone-200 dark:border-stone-800 p-8 md:p-10 mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Community Discussions
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Literary <span className="bg-gradient-to-r from-amber-500 to-rose-500 bg-clip-text text-transparent">Forum</span>
            </h1>
            <p className="text-stone-600 dark:text-stone-400 text-sm md:text-base mt-2 max-w-lg">
              Exchange insights, ask questions, share book reviews, and connect with fellow literature enthusiasts.
            </p>
          </div>

          <Link
            href="/forum/new"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-semibold shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 hover:scale-105 transition-all whitespace-nowrap"
          >
            <PlusCircle className="w-5 h-5" />
            Start Discussion
          </Link>
        </div>
      </div>

      {/* Discussion Feed */}
      <div className="space-y-4">
        {posts.map((post: any) => {
          const postDate = post._createdAt ? new Date(post._createdAt) : null
          const formattedDate = postDate
            ? postDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })
            : 'Recently'

          return (
            <Link
              key={post._id}
              href={`/forum/${post.slug || post._id}`}
              className="group block bg-white dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800/80 rounded-2xl p-6 transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/5 hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                {/* Author Details */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 p-[2px]">
                    <div className="w-full h-full bg-stone-100 dark:bg-stone-900 rounded-full flex items-center justify-center text-stone-700 dark:text-stone-300">
                      <User className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-stone-800 dark:text-stone-200">
                      {post.author || 'Anonymous Writer'}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      {formattedDate}
                    </p>
                  </div>
                </div>

                {/* Category Pill */}
                {post.category && <Badge category={post.category} />}
              </div>

              {/* Title & Content Preview */}
              <h2 className="text-lg font-bold mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                {post.title}
              </h2>
              {post.content && (
                <p className="text-sm text-stone-600 dark:text-stone-400 line-clamp-2 mb-4 leading-relaxed">
                  {post.content}
                </p>
              )}

              {/* Stats Footer */}
              <div className="flex items-center gap-6 pt-3 border-t border-stone-100 dark:border-stone-800/60 text-xs font-medium text-stone-500 dark:text-stone-400">
                <div className="flex items-center gap-1.5 hover:text-rose-500 transition-colors">
                  <Heart className="w-4 h-4 text-rose-500/80" />
                  <span>{post.likes || 0} Likes</span>
                </div>
                <div className="flex items-center gap-1.5 hover:text-amber-500 transition-colors">
                  <MessageSquare className="w-4 h-4 text-amber-500/80" />
                  <span>{post.repliesCount || 0} Replies</span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}