import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  GraduationCap,
  Sparkles,
  User,
  BookOpen,
} from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

// Disable cache so updates in Sanity load dynamically on page refresh
export const revalidate = 0

const SPEAKER_QUERY = `*[_type == "speaker" && (slug.current == $slug || _id == $slug)][0]{
  _id,
  name,
  role,
  bio,
  isFeatured,
  image,
  photo,
  avatar,
  profileImage,
  "directImageUrl": coalesce(
    image.asset->url, 
    photo.asset->url, 
    avatar.asset->url, 
    profileImage.asset->url
  )
}`

interface SpeakerPageProps {
  params: Promise<{ slug: string }>
}

export default async function SpeakerDetailPage({ params }: SpeakerPageProps) {
  const { slug } = await params
  const speaker = await client.fetch(SPEAKER_QUERY, { slug }).catch(() => null)

  const name = speaker?.name || 'Mohit Sharma Upreti'
  const role = speaker?.role || 'ADMIN'
  const bio = speaker?.bio || 'No biography available.'
  const isFeatured = speaker?.isFeatured ?? true

  // Fallback check across direct URL, urlFor helper, and alternate fields
  let imageUrl: string | null = speaker?.directImageUrl || null

  if (!imageUrl && speaker) {
    const rawImage = speaker.image || speaker.photo || speaker.avatar || speaker.profileImage
    if (rawImage) {
      try {
        imageUrl = urlFor(rawImage).url()
      } catch {
        imageUrl = null
      }
    }
  }

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
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1b2668] via-[#233180] to-[#1a235c] text-white pt-12 pb-16 px-6 border-b border-blue-900">
        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center overflow-hidden">
          <span className="text-[22vw] font-serif font-black text-white select-none leading-none tracking-widest">
            साहित्य
          </span>
        </div>

        <div className="max-w-4xl mx-auto relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            href="/speakers"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs md:text-sm font-semibold text-blue-100 transition-all backdrop-blur-md w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Speakers</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-100 text-xs font-semibold w-fit">
            <GraduationCap className="w-4 h-4 text-amber-300" />
            <span>Organized by B. Tech in AI Faculty</span>
          </div>
        </div>
      </section>

      {/* Main Speaker Details Layout */}
      <main className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        
        {/* Profile Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center sm:items-center gap-6 sm:gap-8">
          
          {/* Avatar Image */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-2 border-slate-100 dark:border-slate-800 shadow-md shrink-0 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={name}
                fill
                unoptimized
                className="object-cover"
                priority
              />
            ) : (
              <User className="w-16 h-16 text-slate-400" />
            )}
          </div>

          {/* Speaker Metadata */}
          <div className="space-y-3 text-center sm:text-left flex-1">
            {isFeatured && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Featured Speaker
              </span>
            )}

            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                {name}
              </h1>
              <p className="text-xs sm:text-sm font-extrabold text-rose-600 dark:text-rose-400 tracking-wider uppercase mt-1">
                {role}
              </p>
            </div>
          </div>
        </div>

        {/* Bio Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <BookOpen className="w-4 h-4 text-blue-700 dark:text-blue-400" />
            <h2 className="text-xs font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400">
              About {name}
            </h2>
          </div>

          <div className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed pl-3 border-l-2 border-blue-600 dark:border-blue-500">
            {typeof bio === 'string' ? bio : JSON.stringify(bio)}
          </div>
        </div>

      </main>
    </div>
  )
}