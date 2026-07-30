'use client'

import { useActionState } from 'react'
import { submitRegistration } from '@/app/actions/register'
import Link from 'next/link'
import { CheckCircle, User, Mail, Phone } from 'lucide-react'

export default function RegisterForm({
  eventId,
  eventTitle,
}: {
  eventId: string
  eventTitle: string
}) {
  const [state, formAction, isPending] = useActionState(submitRegistration, null)

  if (state?.success) {
    return (
      <div className="text-center py-8 space-y-4">
        <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto" />
        <h2 className="text-3xl font-extrabold">Registration Saved!</h2>
        <p className="text-stone-600 dark:text-stone-400 max-w-md mx-auto">
          You are registered for <span className="font-semibold text-amber-500">{eventTitle}</span>. Your details have been stored.
        </p>
        <div className="pt-4">
          <Link
            href="/events"
            className="inline-block px-6 py-3 rounded-xl bg-amber-500 text-white font-semibold hover:bg-amber-600 transition"
          >
            Browse More Events
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      {state?.error && (
        <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-sm">
          {state.error}
        </div>
      )}

      <form action={formAction} className="space-y-5">
        <input type="hidden" name="eventId" value={eventId} />

        <div>
          <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1">
            Full Name *
          </label>
          <div className="relative">
            <User className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
            <input
              type="text"
              name="name"
              required
              placeholder="Mohit Sharma"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-sm focus:outline-none focus:border-amber-500 transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
            <input
              type="email"
              name="email"
              required
              placeholder="mohit@example.com"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-sm focus:outline-none focus:border-amber-500 transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1">
            Phone Number (Optional)
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
            <input
              type="tel"
              name="phone"
              placeholder="+977 9800000000"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-sm focus:outline-none focus:border-amber-500 transition"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-semibold shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 transition cursor-pointer"
        >
          {isPending ? 'Saving Registration...' : 'Complete Registration'}
        </button>
      </form>
    </>
  )
}