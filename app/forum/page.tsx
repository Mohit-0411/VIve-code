import { createClient } from 'next-sanity'
import { revalidatePath } from 'next/cache'

const readClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

async function getForumPosts() {
  return readClient.fetch(
    `*[_type == "forumPost"] | order(createdAt desc) {
      _id,
      title,
      author,
      category,
      content,
      createdAt
    }`
  )
}

export default async function ForumPage() {
  const posts = await getForumPosts()

  async function createPost(formData: FormData) {
    'use server'

    const title = formData.get('title') as string
    const author = formData.get('author') as string
    const category = formData.get('category') as string
    const content = formData.get('content') as string

    if (!title || !author || !content) return

    await writeClient.create({
      _type: 'forumPost',
      title,
      author,
      category: category || 'Poetry',
      content,
      createdAt: new Date().toISOString(),
    })

    revalidatePath('/forum')
  }

  return (
    <main className="min-h-screen bg-stone-950 text-stone-100 pt-28 px-6 max-w-4xl mx-auto pb-16">
      <p className="text-amber-400 text-sm tracking-widest uppercase mb-2">Community Corner</p>
      <h1 className="text-5xl font-bold mb-4">Poetry & Stories</h1>
      <p className="text-stone-400 mb-12">
        Share your creative writings with fellow literary enthusiasts.
      </p>

      {/* Submission Form */}
      <section className="bg-stone-900 border border-stone-800 rounded-2xl p-6 mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-amber-400">Publish Your Work</h2>
        <form action={createPost} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-stone-400 mb-1">Title</label>
              <input
                type="text"
                name="title"
                required
                placeholder="Title of your work"
                className="w-full bg-stone-950 border border-stone-800 rounded-lg p-3 text-stone-100 focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-sm text-stone-400 mb-1">Author</label>
              <input
                type="text"
                name="author"
                required
                placeholder="Your name or alias"
                className="w-full bg-stone-950 border border-stone-800 rounded-lg p-3 text-stone-100 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-stone-400 mb-1">Category</label>
            <select
              name="category"
              className="w-full bg-stone-950 border border-stone-800 rounded-lg p-3 text-stone-100 focus:outline-none focus:border-amber-400"
            >
              <option value="Poetry">Poetry</option>
              <option value="Story">Story</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-stone-400 mb-1">Content</label>
            <textarea
              name="content"
              rows={6}
              required
              placeholder="Write your poem or story..."
              className="w-full bg-stone-950 border border-stone-800 rounded-lg p-3 text-stone-100 focus:outline-none focus:border-amber-400 whitespace-pre-wrap"
            />
          </div>

          <button
            type="submit"
            className="self-start bg-amber-400 text-stone-950 font-semibold px-6 py-3 rounded-lg hover:bg-amber-300 transition mt-2"
          >
            Submit Post
          </button>
        </form>
      </section>

      {/* Posts List */}
      <section>
        <h2 className="text-3xl font-bold mb-8">Recent Contributions</h2>
        <div className="flex flex-col gap-6">
          {posts.length === 0 && (
            <p className="text-stone-500">No submissions yet. Be the first to share your work!</p>
          )}
          {posts.map((post: any) => (
            <article
              key={post._id}
              className="border border-stone-800 bg-stone-950 rounded-xl p-6 hover:border-stone-700 transition"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-amber-400 text-xs uppercase tracking-widest font-semibold">
                  {post.category ?? 'Poetry'}
                </span>
                {post.createdAt && (
                  <span className="text-stone-500 text-xs">
                    {new Date(post.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-semibold text-stone-100 mb-1">{post.title}</h3>
              <p className="text-stone-400 text-sm mb-4">By {post.author}</p>
              <p className="text-stone-300 whitespace-pre-line leading-relaxed">{post.content}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}