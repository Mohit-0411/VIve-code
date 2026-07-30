import { client } from '@/sanity/lib/client'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Ticket, Calendar } from 'lucide-react'
import RegisterForm from '@/components/RegisterForm'

export const revalidate = 0

async function getEvent(slug: string) {
  return await client.fetch(
    `*[_type == "event" && slug.current == $slug][0]{ _id, title, date, location }`,
    { slug }
  )
}

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (!slug) notFound()

  const event = await getEvent(slug)
  if (!event) notFound()

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 pt-28 pb-20 px-6 max-w-2xl mx-auto">
      <Link
        href={`/events/${slug}`}
        className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 dark:text-stone-400 hover:text-amber-500 transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Event Details
      </Link>

      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-8 shadow-xl">
        <div className="mb-8 border-b border-stone-100 dark:border-stone-800 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold mb-3">
            <Ticket className="w-3.5 h-3.5" />
            Event Pass
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Register for {event.title}</h1>
          {event.date && (
            <p className="text-xs text-stone-500 flex items-center gap-1.5 mt-2">
              <Calendar className="w-3.5 h-3.5 text-amber-500" />
              {new Date(event.date).toLocaleDateString('en-US', { dateStyle: 'full' })}
            </p>
          )}
        </div>

        {/* Client Form Component */}
        <RegisterForm eventId={event._id} eventTitle={event.title} />
      </div>
    </div>
  )
}