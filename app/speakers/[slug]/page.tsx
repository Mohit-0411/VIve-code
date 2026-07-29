import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const revalidate = 0

async function getSpeaker(slug: string) {
  return await client.fetch(
    `*[_type == "speaker" && slug.current == $slug][0]{
      name,
      role,
      bio,
      photo,
      "slug": slug.current
    }`,
    { slug }
  )
}

export default async function SpeakerDetailPage(props: any) {
  const params = await props.params
  const slug = params?.slug

  if (!slug) notFound()

  const speaker = await getSpeaker(slug)

  if (!speaker) notFound()

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-16 px-8 max-w-3xl mx-auto">
      <Link href="/events" className="text-yellow-500 text-sm hover:underline mb-6 inline-block">
        ← Back
      </Link>

      <div className="flex flex-col md:flex-row gap-8 items-start mt-4">
        {speaker.photo && (
          <img
            src={urlFor(speaker.photo).url()}
            alt={speaker.name}
            className="w-48 h-48 object-cover rounded-2xl border border-zinc-800"
          />
        )}
        <div>
          <h1 className="text-4xl font-bold mb-2">{speaker.name}</h1>
          {speaker.role && (
            <p className="text-yellow-500 text-sm font-semibold uppercase tracking-wider mb-4">
              {speaker.role}
            </p>
          )}
          <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-line">
            {speaker.bio || 'No bio available.'}
          </p>
        </div>
      </div>
    </div>
  )
}