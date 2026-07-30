'use server'

import { writeClient } from '@/sanity/lib/writeClient'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createForumPost(prevState: any, formData: FormData) {
  const title = formData.get('title') as string
  const author = formData.get('author') as string
  const category = formData.get('category') as string
  const content = formData.get('content') as string

  if (!title || !author || !content) {
    return { success: false, error: 'Please fill in all required fields.' }
  }

  // Generate a URL-friendly slug from the title
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')

  try {
    await writeClient.create({
      _type: 'forumPost',
      title,
      author,
      category: category || 'General',
      content,
      likes: 0,
      repliesCount: 0,
      slug: {
        _type: 'slug',
        current: `${slug}-${Date.now().toString().slice(-4)}`,
      },
    })

    revalidatePath('/forum')
  } catch (err) {
    console.error('Error creating forum post:', err)
    return { success: false, error: 'Failed to publish post. Please try again.' }
  }

  // Redirect back to main forum page on success
  redirect('/forum')
}