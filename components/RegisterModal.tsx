'use client'

import { useState } from 'react'
import { Ticket, X, CheckCircle, Mail, User } from 'lucide-react'

interface RegisterModalProps {
  eventTitle: string
}

export default function RegisterModal({ eventTitle }: RegisterModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email) return
    setSubmitted(true)
  }

  const resetAndClose = () => {
    setIsOpen(false)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '' })
    }, 300)
  }

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-semibold shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
      >
        <Ticket className="w-4 h-4" />
        Register for Event
      </button>

      {/* Modal Popup */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={resetAndClose}
              className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <>
                <div className="mb-6 pr-6">
                  <span className="text-xs font-semibold uppercase text-amber-600 dark:text-amber-400 tracking-wider">
                    Event Registration
                  </span>
                  <h3 className="text-xl font-bold mt-1 text-stone-900 dark:text-stone-100 line-clamp-1">
                    {eventTitle}
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3 top-3.5 text-stone-400" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Mohit Sharma"
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-amber-500 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-3.5 text-stone-400" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-amber-500 transition"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-semibold shadow-md hover:scale-[1.01] active:scale-[0.99] transition cursor-pointer"
                  >
                    Confirm Registration
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-6 space-y-4">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
                <div>
                  <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                    Registration Confirmed!
                  </h3>
                  <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
                    Thank you, <span className="font-semibold text-stone-900 dark:text-stone-200">{formData.name}</span>. Your spot for <span className="font-semibold text-stone-900 dark:text-stone-200">{eventTitle}</span> is reserved.
                  </p>
                </div>
                <button
                  onClick={resetAndClose}
                  className="px-6 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-sm font-semibold hover:bg-stone-200 dark:hover:bg-stone-700 transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}