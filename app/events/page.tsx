import Link from 'next/link'
import { client } from '@/sanity/lib/client'

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

async function getEvents() {
  return await client.fetch(`*[_type == "event"]{
    _id,
    "name": coalesce(name, title, 'Untitled Event'),
    "category": coalesce(category, eventType, 'POETRY'),
    date,
    "location": coalesce(location, ''),
    "slug": coalesce(slug.current, '')
  }`)
}

export default async function EventsPage() {
  const events = await getEvents()

  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-16 px-8 max-w-4xl mx-auto">
      <p className="text-yellow-500 text-xs font-semibold uppercase tracking-widest mb-1">
        WHAT'S ON
      </p>
      <h1 className="text-4xl font-bold mb-8">Events</h1>

      <div className="flex flex-col gap-4 max-w-2xl">
        {events.map((event: any) => (
          <Link 
            key={event._id} 
            href={event.slug ? `/events/${event.slug}` : '#'} 
            className="block bg-zinc-950 border border-zinc-800 p-6 rounded-2xl hover:border-zinc-700 transition"
          >
            <p className="text-yellow-500 text-xs uppercase font-semibold tracking-wider mb-2">
              {event.category}
            </p>
            <h2 className="text-2xl font-bold mb-3">{event.name}</h2>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              {event.date && <span>📅 {formatDate(event.date)}</span>}
              {event.location && <span>📍 {event.location}</span>}
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}