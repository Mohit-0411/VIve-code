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
    <div className="min-h-screen bg-black text-white pt-28 pb-16 px-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Speakers</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {speakers.map((speaker: any) => (
          <Link
            key={speaker._id}
            href={`/speakers/${speaker.slug}`}
            className="group block bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-yellow-500 transition-all"
          >
            {speaker.photo && (
              <img
                src={urlFor(speaker.photo).url()}
                alt={speaker.name}
                className="w-full h-48 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300"
              />
            )}
            <h2 className="text-xl font-bold group-hover:text-yellow-500 transition-colors">
              {speaker.name}
            </h2>
            {speaker.role && (
              <p className="text-sm text-gray-400 mt-1">{speaker.role}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}