import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Badge from '@/components/Badge'
import { Calendar, MapPin, ArrowLeft, Ticket, User, Clock } from 'lucide-react'

export const revalidate = 0

async function getEvent(slug: string) {
  return await client.fetch(
    `*[_type == "event" && slug.current == $slug][0]{
      _id,
      title,
      date,
      location,
      category,
      excerpt,
      description,
      image,
      speaker->{
        name,
        role,
        photo,
        "slug": slug.current
      },
      "slug": slug.current
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

  const eventDate = event.date ? new Date(event.date) : null
  const formattedDate = eventDate
    ? eventDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Date TBA'

  const formattedTime = eventDate
    ? eventDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : null

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 pt-28 pb-20 px-6 max-w-5xl mx-auto">
      {/* Back Link */}
      <Link
        href="/events"
        className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Events
      </Link>

      <div className="space-y-8">
        {/* Banner Image */}
        <div className="relative rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900 shadow-sm">
          {event.image ? (
            <div className="relative h-72 md:h-96 w-full">
              <img
                src={urlFor(event.image).url()}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
            </div>
          ) : (
            <div className="h-48 md:h-64 bg-gradient-to-br from-amber-500/20 via-rose-500/20 to-purple-500/20 flex items-center justify-center">
              <span className="text-stone-400 text-sm">No Banner Image</span>
            </div>
          )}

          {/* Category Badge Overlay */}
          {event.category && (
            <div className="absolute top-6 left-6">
              <Badge category={event.category} />
            </div>
          )}
        </div>

        {/* Detail Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Description */}
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
              {event.title}
            </h1>

            {event.excerpt && (
              <p className="text-lg text-stone-600 dark:text-stone-300 font-medium leading-relaxed">
                {event.excerpt}
              </p>
            )}

            {/* Description Body */}
            <div className="pt-6 border-t border-stone-200 dark:border-stone-800/80">
              <h2 className="text-xl font-bold mb-4 text-stone-800 dark:text-stone-200">
                About the Event
              </h2>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed whitespace-pre-line text-base">
                {event.description || event.excerpt || 'No detailed description available for this event yet.'}
              </p>
            </div>

            {/* Speaker Card */}
            {event.speaker && (
              <div className="pt-6 border-t border-stone-200 dark:border-stone-800/80">
                <h2 className="text-xl font-bold mb-4">Featured Speaker</h2>
                <Link
                  href={`/speakers/${event.speaker.slug}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-500/50 transition-all group"
                >
                  {event.speaker.photo ? (
                    <img
                      src={urlFor(event.speaker.photo).url()}
                      alt={event.speaker.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                      <User className="w-6 h-6" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-500 transition-colors">
                      {event.speaker.name}
                    </h3>
                    {event.speaker.role && (
                      <p className="text-xs text-rose-500 dark:text-rose-400 font-semibold uppercase tracking-wider">
                        {event.speaker.role}
                      </p>
                    )}
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar Info Box */}
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 space-y-6 shadow-sm">
              <h3 className="text-lg font-bold border-b border-stone-100 dark:border-stone-800 pb-3">
                Event Logistics
              </h3>

              <div className="space-y-4">
                {/* Date */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
                      Date
                    </span>
                    <span className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                      {formattedDate}
                    </span>
                  </div>
                </div>

                {/* Time */}
                {formattedTime && (
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
                        Time
                      </span>
                      <span className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                        {formattedTime}
                      </span>
                    </div>
                  </div>
                )}

                {/* Location */}
                {event.location && (
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
                        Location
                      </span>
                      <span className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                        {event.location}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-stone-100 dark:border-stone-800">
                <Link
                  href={`/events/${slug}/register`}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-semibold shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all text-center cursor-pointer"
                >
                  <Ticket className="w-4 h-4" />
                  Register for Event
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}