import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'

export const revalidate = 0

async function getSpeakers() {
  return await client.fetch(`
    *[_type == "speaker"]{
      _id,
      name,
      role,
      photo,
      "slug": slug.current
    }
  `)
}

export default async function SpeakersPage() {
  const speakers = await getSpeakers()

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 pt-28 pb-16 px-8 max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">
          Featured <span className="text-amber-500">Speakers</span>
        </h1>
        <p className="text-stone-600 dark:text-stone-400">Voices shaping contemporary literary discourse.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {speakers.map((speaker: any) => (
          <Link
            key={speaker._id}
            href={`/speakers/${speaker.slug}`}
            className="group relative block bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800/80 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/10"
          >
            {speaker.photo && (
              <div className="relative overflow-hidden rounded-xl mb-4">
                <img
                  src={urlFor(speaker.photo).url()}
                  alt={speaker.name}
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )}
            
            <h2 className="text-xl font-bold group-hover:text-amber-500 transition-colors">
              {speaker.name}
            </h2>
            
            {speaker.role && (
              <span className="inline-block mt-1 text-xs font-semibold uppercase tracking-wider text-rose-500 dark:text-rose-400">
                {speaker.role}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}