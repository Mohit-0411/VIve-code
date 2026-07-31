import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import {
  Sparkles,
  BookOpen,
  Theater,
  GraduationCap,
  User,
  Quote,
  ArrowRight,
} from 'lucide-react'

export const revalidate = 0

async function getSpeakers() {
  const speakers = await client.fetch(
    `*[_type in ["speaker", "speakers", "guest"]] | order(name asc){
      _id,
      name,
      role,
      bio,
      topic,
      "image": coalesce(image, photo, avatar),
      "slug": slug.current
    }`
  )
  return speakers
}

export default async function SpeakersPage() {
  const speakers = await getSpeakers()

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Top Academic Banner */}
      <div className="bg-blue-950 text-blue-100 py-2.5 px-4 text-xs md:text-sm text-center border-b border-blue-800/50 font-medium">
        <span className="opacity-80">Affiliated to Purbanchal University — </span>
        <strong className="text-white font-semibold">
          GOMENDRA MULTIPLE COLLEGE
        </strong>
        <span className="opacity-80"> | Birtamode-4, Jhapa</span>
      </div>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1b2668] via-[#233180] to-[#1a235c] text-white pt-16 pb-20 px-6 border-b border-blue-900">
        {/* Background Watermark */}
        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center overflow-hidden">
          <span className="text-[22vw] font-serif font-black text-white select-none leading-none tracking-widest">
            साहित्य
          </span>
        </div>

        <div className="max-w-5xl mx-auto relative z-10 text-center space-y-6">
          {/* Faculty Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-100 text-xs md:text-sm font-semibold shadow-inner">
            <GraduationCap className="w-4 h-4 text-amber-300" />
            <span>
              Organized by <strong className="text-white">B. Tech in AI FACULTY</strong>
            </span>
          </div>

          {/* Page Title */}
          <div className="space-y-2">
            <h1 className="text-5xl sm:text-7xl font-black tracking-tight drop-shadow-md">
              साहित्यिक <span className="font-sans font-extrabold text-blue-200">Speakers</span>
            </h1>
            <p className="text-lg md:text-xl font-serif text-blue-100 italic">
              &ldquo;Where Words Take Center Stage&rdquo;
            </p>
          </div>

          {/* Active Categories Bar */}
          <div className="pt-2">
            <div className="inline-flex items-center justify-center gap-4 px-6 py-2.5 rounded-2xl bg-white/10 border border-white/15 text-white font-bold text-xs md:text-sm tracking-wider uppercase backdrop-blur-sm">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-300" /> Poetry
              </span>
              <span className="text-blue-400">•</span>
              <span className="flex items-center gap-1.5">
                <Theater className="w-4 h-4 text-blue-300" /> Storytelling
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Speakers Grid Listing */}
      <main className="max-w-6xl mx-auto px-6 py-14 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
              Featured Artists & Performers
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Meet the poets, writers, and storytellers guiding our sessions.
            </p>
          </div>
          <div className="text-xs font-bold px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 w-fit">
            {speakers ? speakers.length : 0} Speaker{speakers?.length === 1 ? '' : 's'} Listed
          </div>
        </div>

        {speakers && speakers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {speakers.map((speaker: any) => {
              const imgUrl = speaker.image ? urlFor(speaker.image).url() : null

              return (
                <div
                  key={speaker._id}
                  className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-blue-500 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Speaker Avatar / Photo */}
                    <div className="h-56 bg-blue-950 relative overflow-hidden">
                      {imgUrl ? (
                        <img
                          src={imgUrl}
                          alt={speaker.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#1b2668] to-[#233180] flex items-center justify-center">
                          <User className="w-16 h-16 text-blue-300/40" />
                        </div>
                      )}

                      {/* Topic Overlay Badge */}
                      {speaker.topic && (
                        <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 rounded-xl bg-blue-950/80 backdrop-blur-md text-white text-xs font-semibold border border-white/20 truncate">
                          <span className="text-blue-300 font-bold">Session:</span> {speaker.topic}
                        </div>
                      )}
                    </div>

                    {/* Speaker Details */}
                    <div className="p-6 space-y-3">
                      <div>
                        <h3 className="font-extrabold text-xl text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                          {speaker.name}
                        </h3>
                        {speaker.role && (
                          <p className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider mt-0.5">
                            {speaker.role}
                          </p>
                        )}
                      </div>

                      {speaker.bio && (
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                            {speaker.bio}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Link if slug is available */}
                  {speaker.slug && (
                    <div className="p-6 pt-0">
                      <Link
                        href={`/speakers/${speaker.slug}`}
                        className="w-full py-3 px-4 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-[#1b2668] text-blue-800 dark:text-blue-300 hover:text-white font-bold text-sm transition-all flex items-center justify-center gap-2 group-hover:bg-[#1b2668] group-hover:text-white shadow-xs"
                      >
                        View Profile
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
            <Sparkles className="w-10 h-10 text-blue-600 mx-auto opacity-40" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              No Speakers Listed Yet
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Speaker line-ups for upcoming literary sessions will be announced soon.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}