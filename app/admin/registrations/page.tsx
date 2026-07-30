import { client } from '@/sanity/lib/client'
import Link from 'next/link'
import {
  Users,
  Calendar,
  Mail,
  Phone,
  Ticket,
  ArrowLeft,
  Clock,
  Sparkles,
} from 'lucide-react'

export const revalidate = 0 // Ensure real-time registration data on every page reload

interface Registration {
  _id: string
  name: string
  email: string
  phone?: string
  _createdAt: string
  event?: {
    _id: string
    title: string
    slug: string
    date?: string
  }
}

async function getRegistrations(): Promise<Registration[]> {
  return await client.fetch(
    `*[_type == "registration"] | order(_createdAt desc){
      _id,
      name,
      email,
      phone,
      _createdAt,
      event->{
        _id,
        title,
        "slug": slug.current,
        date
      }
    }`
  )
}

export default async function AdminRegistrationsPage() {
  const registrations = await getRegistrations()

  // Quick analytics metrics
  const totalRegistrations = registrations.length
  const uniqueEvents = new Set(
    registrations.map((r) => r.event?._id).filter(Boolean)
  ).size

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 pt-28 pb-20 px-6 max-w-7xl mx-auto">
      {/* Navigation & Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-6">
        <div>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors mb-3 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Events
          </Link>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Event Registrations
          </h1>
          <p className="text-stone-600 dark:text-stone-400 text-sm mt-1">
            Manage and view all user event sign-ups in real time.
          </p>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
              Total Registrations
            </span>
            <span className="text-2xl font-black text-stone-900 dark:text-stone-100">
              {totalRegistrations}
            </span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
            <Ticket className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
              Active Events
            </span>
            <span className="text-2xl font-black text-stone-900 dark:text-stone-100">
              {uniqueEvents}
            </span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex items-center gap-4 sm:col-span-2 lg:col-span-1">
          <div className="p-3.5 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
              Latest Activity
            </span>
            <span className="text-sm font-semibold text-stone-800 dark:text-stone-200 block truncate">
              {registrations.length > 0
                ? new Date(registrations[0]._createdAt).toLocaleString('en-US', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })
                : 'No signups yet'}
            </span>
          </div>
        </div>
      </div>

      {/* Registrations Data Table */}
      <div className="rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/80 shadow-sm overflow-hidden">
        {registrations.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Users className="w-12 h-12 text-stone-400 mx-auto opacity-50" />
            <h3 className="text-lg font-bold text-stone-700 dark:text-stone-300">
              No Registrations Yet
            </h3>
            <p className="text-sm text-stone-500 max-w-sm mx-auto">
              When users register for events on Sahityik, their contact details will show up here automatically.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-900/50 text-xs uppercase font-bold text-stone-500 dark:text-stone-400 tracking-wider">
                  <th className="py-4 px-6">Attendee</th>
                  <th className="py-4 px-6">Contact Info</th>
                  <th className="py-4 px-6">Event</th>
                  <th className="py-4 px-6">Registered On</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-stone-800/60 text-sm">
                {registrations.map((item) => {
                  const regDate = new Date(item._createdAt).toLocaleDateString(
                    'en-US',
                    {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    }
                  )

                  return (
                    <tr
                      key={item._id}
                      className="hover:bg-stone-50/80 dark:hover:bg-stone-800/30 transition-colors"
                    >
                      {/* Name */}
                      <td className="py-4 px-6 font-semibold text-stone-900 dark:text-stone-100 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs uppercase">
                            {item.name.charAt(0)}
                          </div>
                          <span>{item.name}</span>
                        </div>
                      </td>

                      {/* Contact Info */}
                      <td className="py-4 px-6 whitespace-nowrap space-y-1">
                        <div className="flex items-center gap-2 text-stone-600 dark:text-stone-300">
                          <Mail className="w-3.5 h-3.5 text-stone-400" />
                          <a
                            href={`mailto:${item.email}`}
                            className="hover:underline hover:text-amber-600 dark:hover:text-amber-400"
                          >
                            {item.email}
                          </a>
                        </div>
                        {item.phone && (
                          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                            <Phone className="w-3.5 h-3.5 text-stone-400" />
                            <span>{item.phone}</span>
                          </div>
                        )}
                      </td>

                      {/* Event Title */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        {item.event ? (
                          <Link
                            href={`/events/${item.event.slug}`}
                            className="inline-flex items-center gap-2 font-medium text-amber-600 dark:text-amber-400 hover:underline"
                          >
                            <Ticket className="w-4 h-4" />
                            {item.event.title}
                          </Link>
                        ) : (
                          <span className="text-stone-400 italic">
                            Event metadata missing
                          </span>
                        )}
                      </td>

                      {/* Registration Date */}
                      <td className="py-4 px-6 whitespace-nowrap text-stone-500 dark:text-stone-400 text-xs">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-stone-400" />
                          {regDate}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}