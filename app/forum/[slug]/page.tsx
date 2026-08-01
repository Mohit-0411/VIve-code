import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, User, Clock, Tag, Sparkles } from 'lucide-react'
import { currentUser } from '@clerk/nextjs/server'
import { getLikesCount, getComments } from '@/app/actions/forum'
import ForumInteractivity from '@/components/ForumInteractivity'

export const revalidate = 0

async function getForumPost(slug: string) {
  return await client.fetch(
    `*[_type in ["forum", "forumPost", "post"] && (slug.current == $slug || _id == $slug)][0]{
      _id,
      title,
      content,
      body,
      category,
      tags,
      _createdAt,
      createdAt,
      author->{
        name,
        role,
        "image": coalesce(image, photo)
      },
      "authorName": authorName
    }`,
    { slug }
  )
}

export default async function ForumPostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const slug = params?.slug

  if (!slug) notFound()

  // Fetch Sanity Post & Current Clerk User simultaneously
  const [post, user] = await Promise.all([
    getForumPost(slug),
    currentUser()
  ])

  if (!post) notFound()

  // Use Sanity _id (or fallback to slug) for Redis storage
  const postId = post._id || slug
  
  // Fetch real-time likes and comments from Upstash Redis
  const initialLikes = await getLikesCount(postId)
  const initialComments = await getComments(postId)

  const authorName = post.author?.name || post.authorName || 'Anonymous'
  const authorImage = post.author?.image ? urlFor(post.author.image).url() : null
  const postDate = post.createdAt || post._createdAt
  const postBody = post.content || post.body

  // Prepare fallback user details for Clerk
  const currentUserId = user?.id || 'anonymous'
  const currentUserName = user?.firstName
    ? `${user.firstName} ${user.lastName || ''}`.trim()
    : user?.username || 'Club Member'

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 pt-28 pb-20 px-6 max-w-4xl mx-auto">
      {/* Back Navigation */}
      <Link
        href="/forum"
        className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Forum
      </Link>

      {/* Main Post Card */}
      <article className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        {/* Header Info */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 dark:border-stone-800 pb-6">
          <div className="flex items-center gap-3">
            {/* Author Avatar */}
            <div className="w-12 h-12 rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shrink-0 flex items-center justify-center">
              {authorImage ? (
                <img
                  src={authorImage}
                  alt={authorName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-6 h-6 text-stone-400" />
              )}
            </div>

            <div>
              <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base">
                {authorName}
              </h3>
              {postDate && (
                <p className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  {new Date(postDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              )}
            </div>
          </div>

          {post.category && (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              {post.category}
            </span>
          )}
        </div>

        {/* Post Title */}
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100">
          {post.title}
        </h1>

        {/* Post Body Content */}
        <div className="text-stone-700 dark:text-stone-300 leading-relaxed text-base whitespace-pre-line border-l-2 border-amber-500/60 pl-4 py-1">
          {typeof postBody === 'string'
            ? postBody
            : 'No text content available for this discussion.'}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {post.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400"
              >
                <Tag className="w-3 h-3 text-amber-500" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Interactive Likes & Comments Powered by Upstash Redis */}
        <div className="pt-4 border-t border-stone-100 dark:border-stone-800">
          <ForumInteractivity
            postId={postId}
            userId={currentUserId}
            userName={currentUserName}
            initialLikes={initialLikes}
            initialComments={initialComments}
          />
        </div>
      </article>
    </main>
  )
}