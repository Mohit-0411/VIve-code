import { client } from '@/sanity/lib/client'

// Force fresh data fetching on every request
export const revalidate = 0 

async function getContactInfo() {
  const query = `*[_type == "contact"][0]`
  const contact = await client.fetch(query)
  return contact
}

export default async function ContactPage() {
  const contact = await getContactInfo()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <p className="text-yellow-500 tracking-widest text-sm font-semibold uppercase">Get in Touch</p>
      <h1 className="text-4xl font-bold my-2">Contact Us</h1>
      <p className="text-gray-400 mb-8 text-center max-w-md">
        Have questions about Sahityik Festival or want to participate? Reach out to us anytime!
      </p>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-md flex flex-col gap-3">
        {contact?.email && (
          <div className="flex items-center gap-3 text-gray-300">
            <span>📧</span>
            <span>{contact.email}</span>
          </div>
        )}

        {contact?.phone && (
          <div className="flex items-center gap-3 text-gray-300">
            <span>📞</span>
            <span>{contact.phone}</span>
          </div>
        )}

        {contact?.address && (
          <div className="flex items-center gap-3 text-gray-300">
            <span>📍</span>
            <span>{contact.address}</span>
          </div>
        )}
      </div>
    </div>
  )
}