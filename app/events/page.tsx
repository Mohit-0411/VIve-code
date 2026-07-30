import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'
import Badge from '@/components/Badge'
import { Calendar, MapPin, ArrowRight, Sparkles } from 'lucide-react'

export const revalidate = 0

async function getEvents() {
  return await client.fetch(`
    *[_type == "event"] | order(date desc) {
      _id,
      title,
      date,
      location,
      category,
      excerpt,
      image,
      "slug": slug.current
    }
  `)
}

export default async function EventsPage() {
  const events = await getEvents()

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 pt-28 pb-20 px-6 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="max-w-2xl mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          Literary Gatherings
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Explore Events
        </h1>
        <p className="text-stone-600 dark:text-stone-400 text-base leading-relaxed">
          Join literary discussions, poetry sessions, book launches, and workshops organized by Sahityik.
        </p>
      </div>

      {/* Events Grid */}
      {events && events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event: any) => {
            const eventDate = event.date ? new Date(event.date) : null
            const formattedDate = eventDate
              ? eventDate.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })
              : 'TBA'

            return (
              <div
                key={event._id}
                className="group relative bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Event Thumbnail */}
                  <div className="relative h-48 w-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                    {event.image ? (
                      <img
                        src={urlFor(event.image).url()}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-amber-500/10 via-rose-500/10 to-purple-500/10 flex items-center justify-center text-stone-400 text-xs font-semibold">
                        No Banner Image
                      </div>
                    )}

                    {event.category && (
                      <div className="absolute top-4 left-4">
                        <Badge category={event.category} />
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-3">
                    <h2 className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100 group-hover:text-amber-500 transition-colors line-clamp-1">
                      {event.title}
                    </h2>

                    {event.excerpt && (
                      <p className="text-stone-600 dark:text-stone-400 text-sm line-clamp-2 leading-relaxed">
                        {event.excerpt}
                      </p>
                    )}
                  </div>
                </div>

                {/* Footer Info & Action */}
                <div className="p-6 pt-0 space-y-4">
                  <div className="flex items-center justify-between text-xs text-stone-500 border-t border-stone-100 dark:border-stone-800/80 pt-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-500" />
                      <span>{formattedDate}</span>
                    </div>

                    {event.location && (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-rose-500" />
                        <span className="truncate max-w-[120px]">{event.location}</span>
                      </div>
                    )}
                  </div>

                  <Link
                    href={`/events/${event.slug}`}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-semibold text-sm group-hover:bg-amber-500 group-hover:text-white transition-all cursor-pointer"
                  >
                    View Event Details
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800">
          <p className="text-stone-500">No events found in Sanity studio yet.</p>
        </div>
      )}
    </div>
  )
}