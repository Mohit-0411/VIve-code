'use client'

import { useActionState } from 'react'
import { createForumPost } from '@/app/actions/createForumPost'
import Link from 'next/link'
import { ArrowLeft, MessageSquare, User, Tag, FileText, Send } from 'lucide-react'

export default function NewForumPostPage() {
  const [state, formAction, isPending] = useActionState(createForumPost, null)

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 pt-28 pb-20 px-6 max-w-2xl mx-auto">
      {/* Back Button */}
      <Link
        href="/forum"
        className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 dark:text-stone-400 hover:text-amber-500 transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Forum
      </Link>

      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-8 shadow-xl">
        <div className="mb-8 border-b border-stone-100 dark:border-stone-800 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            New Thread
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Start a Discussion</h1>
          <p className="text-stone-600 dark:text-stone-400 text-sm mt-1">
            Share a thought, review, question, or literary piece with the community.
          </p>
        </div>

        {state?.error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-sm">
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-5">
          {/* Author Field */}
          <div>
            <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1">
              Your Name / Alias *
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
              <input
                type="text"
                name="author"
                required
                placeholder="e.g. Mohit Sharma"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-sm focus:outline-none focus:border-amber-500 transition"
              />
            </div>
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1">
              Category
            </label>
            <div className="relative">
              <Tag className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
              <select
                name="category"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-sm focus:outline-none focus:border-amber-500 transition appearance-none cursor-pointer"
              >
                <option value="General">General Discussion</option>
                <option value="Poetry">Poetry</option>
                <option value="Fiction">Fiction</option>
                <option value="Workshop">Workshop</option>
                <option value="Panel">Panel Discussion</option>
              </select>
            </div>
          </div>

          {/* Title Field */}
          <div>
            <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1">
              Discussion Title *
            </label>
            <div className="relative">
              <FileText className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
              <input
                type="text"
                name="title"
                required
                placeholder="What would you like to talk about?"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-sm focus:outline-none focus:border-amber-500 transition"
              />
            </div>
          </div>

          {/* Body Content */}
          <div>
            <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1">
              Content *
            </label>
            <textarea
              name="content"
              required
              rows={6}
              placeholder="Write your discussion prompt or thoughts here..."
              className="w-full p-4 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-sm focus:outline-none focus:border-amber-500 transition resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-semibold shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 transition cursor-pointer"
          >
            <Send className="w-4 h-4" />
            {isPending ? 'Publishing Post...' : 'Publish Discussion'}
          </button>
        </form>
      </div>
    </div>
  )
}