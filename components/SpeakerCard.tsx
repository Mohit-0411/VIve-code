'use client'

import { useState } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { X, User, Sparkles, BookOpen, ChevronRight } from 'lucide-react'

export interface Speaker {
  _id: string
  name: string
  role?: string
  bio?: string
  image?: any
}

export default function SpeakerCard({ speaker }: { speaker: Speaker }) {
  const [isOpen, setIsOpen] = useState(false)

  const imageUrl = speaker.image ? urlFor(speaker.image).url() : null

  return (
    <>
      {/* Enhanced Clickable Speaker Card */}
      <div
        onClick={() => setIsOpen(true)}
        className="group relative cursor-pointer p-4 rounded-2xl bg-white/80 dark:bg-stone-900/80 backdrop-blur-sm border border-stone-200/80 dark:border-stone-800/80 hover:border-amber-500/50 dark:hover:border-amber-500/50 shadow-sm hover:shadow-xl hover:shadow-amber-500/5 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-4 overflow-hidden"
      >
        {/* Subtle Gradient Glow on Hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Avatar with Hover Scale */}
        <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 flex-shrink-0 border border-stone-200 dark:border-stone-700/80 group-hover:border-amber-500/60 transition-colors shadow-inner">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={speaker.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-stone-400 dark:text-stone-500 bg-amber-500/5">
              <User className="w-6 h-6" />
            </div>
          )}
        </div>

        {/* Speaker Basic Details */}
        <div className="flex-1 min-w-0 z-10">
          <h4 className="font-extrabold text-stone-900 dark:text-stone-100 truncate group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors text-base">
            {speaker.name}
          </h4>
          {speaker.role && (
            <p className="text-xs font-semibold text-rose-600/90 dark:text-rose-400/90 truncate mt-0.5 uppercase tracking-wider">
              {speaker.role}
            </p>
          )}
          <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-amber-600 dark:text-amber-400 mt-1.5 group-hover:translate-x-1 transition-transform">
            Read Bio <ChevronRight className="w-3 h-3" />
          </span>
        </div>
      </div>

      {/* Upgraded Speaker Bio Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Hero Banner Gradient */}
            <div className="h-28 bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-purple-500/20 relative">
              <div className="absolute inset-0 bg-stone-950/10 dark:bg-stone-950/20" />

              {/* Glassmorphism Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/70 dark:bg-stone-900/70 backdrop-blur-md border border-stone-200/50 dark:border-stone-700/50 text-stone-600 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 hover:scale-105 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 pb-6 relative pt-0">
              {/* Overlapping Avatar Header */}
              <div className="flex justify-between items-end -mt-12 mb-4">
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 border-4 border-white dark:border-stone-900 shadow-xl flex-shrink-0">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={speaker.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-400 bg-amber-500/5">
                      <User className="w-10 h-10" />
                    </div>
                  )}
                </div>

                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Speaker
                </span>
              </div>

              {/* Title & Role */}
              <div className="space-y-1 mb-5">
                <h3 className="text-2xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
                  {speaker.name}
                </h3>
                {speaker.role && (
                  <p className="text-sm font-semibold text-rose-600 dark:text-rose-400">
                    {speaker.role}
                  </p>
                )}
              </div>

              {/* Bio Excerpt Box */}
              <div className="bg-stone-50 dark:bg-stone-800/40 rounded-2xl p-4 border border-stone-200/60 dark:border-stone-800/80 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-400 uppercase tracking-wider">
                  <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                  Biography
                </div>
                <div className="border-l-2 border-amber-500/60 pl-3 my-1">
                  <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed max-h-56 overflow-y-auto pr-2">
                    {speaker.bio || 'No biography available for this speaker yet.'}
                  </p>
                </div>
              </div>

              {/* Footer Button */}
              <div className="mt-6">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 px-4 rounded-xl bg-stone-900 dark:bg-stone-100 hover:bg-amber-600 dark:hover:bg-amber-500 text-stone-100 dark:text-stone-900 hover:text-white dark:hover:text-white text-sm font-bold shadow-md transition-all duration-200 active:scale-[0.99]"
                >
                  Close Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}