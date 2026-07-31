'use client'

import { MessageSquare, Send } from 'lucide-react'

export default function ContactForm() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      <div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-700 dark:text-blue-400" />
          Send a Message
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Fill out the form below and the B. Tech in AI event team will get back to you.
        </p>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Full Name *
            </label>
            <input
              type="text"
              placeholder="Your Name"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:border-blue-600 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Email Address *
            </label>
            <input
              type="email"
              placeholder="your.email@example.com"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:border-blue-600 transition-colors"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Category / Inquiry Topic
          </label>
          <select className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:border-blue-600 transition-colors">
            <option>Poetry Performance Inquiry</option>
            <option>Storytelling Performance Inquiry</option>
            <option>General Event Inquiry</option>
            <option>Volunteering / Participation</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Message *
          </label>
          <textarea
            rows={5}
            placeholder="Write your message here..."
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:border-blue-600 transition-colors resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 px-6 rounded-xl bg-[#1b2668] hover:bg-[#233180] text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4 text-blue-300" />
          Submit Inquiry
        </button>
      </form>
    </div>
  )
}