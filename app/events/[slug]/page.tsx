import { client } from '@/sanity/lib/client'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const revalidate = 0

// Helper to format ISO timestamp into human-readable date
function formatDate(dateString?: string) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

async function getEvent(slug: string) {
  return await client.fetch(
    `*[_type == "event" && slug.current == $slug][0]{
      "name": coalesce(name, title, 'Untitled Event'),
      "category": coalesce(category, eventType, 'POETRY'),
      date,
      "location": coalesce(location, ''),
      description
    }`,
    { slug }
  )
}

export default async function EventDetailPage(props: any) {
  const params = await props.params
  const slug = params?.slug

  if (!slug) notFound()

  const event = await getEvent(slug)

  if (!event) notFound()

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-16 px-8 max-w-3xl mx-auto">
      <Link href="/events" className="text-yellow-500 text-sm hover:underline mb-6 inline-block">
        ← Back to Events
      </Link>

      <span className="block text-yellow-500 text-xs font-semibold uppercase tracking-widest mb-2">
        {event.category}
      </span>
      
      <h1 className="text-4xl font-bold mb-4">{event.name}</h1>

      <div className="flex gap-6 text-gray-400 text-sm border-y border-zinc-800 py-4 mb-6">
        {event.date && <span>📅 {formatDate(event.date)}</span>}
        {event.location && <span>📍 {event.location}</span>}
      </div>

      <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-line">
        {event.description || 'No detailed description available for this event yet.'}
      </p>
    </div>
  )
}