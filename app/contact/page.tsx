import {
  Mail,
  Phone,
  GraduationCap,
  BookOpen,
  Theater,
} from 'lucide-react'
import { client } from '@/sanity/lib/client'
import ContactForm from '@/components/ContactForm'

// Disable cache so Sanity edits load dynamically on every request
export const revalidate = 0

const CONTACT_QUERY = `*[_type in ["contactInfo", "contact"]][0]{
  email,
  phoneNumber,
  address
}`

export default async function ContactPage() {
  const contactData = await client.fetch(
    CONTACT_QUERY,
    {},
    { cache: 'no-store' }
  ).catch(() => null)

  const email = contactData?.email || 'ai.department@gomendracollege.edu.np'
  const phone = contactData?.phoneNumber || '+977 9705807155'

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
      <section className="relative overflow-hidden bg-linear-to-b from-[#1b2668] via-[#233180] to-[#1a235c] text-white pt-16 pb-20 px-6 border-b border-blue-900">
        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center overflow-hidden">
          <span className="text-[22vw] font-serif font-black text-white select-none leading-none tracking-widest">
            साहित्य
          </span>
        </div>

        <div className="max-w-5xl mx-auto relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-100 text-xs md:text-sm font-semibold shadow-inner">
            <GraduationCap className="w-4 h-4 text-amber-300" />
            <span>
              Organized by <strong className="text-white">B. Tech in AI FACULTY</strong>
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-5xl sm:text-7xl font-black tracking-tight drop-shadow-md">
              साहित्यिक <span className="font-sans font-extrabold text-blue-200">Contact</span>
            </h1>
            <p className="text-lg md:text-xl font-serif text-blue-100 italic">
              &ldquo;Where Words Take Center Stage&rdquo;
            </p>
          </div>

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

      {/* Main Content Layout */}
      <main className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
                Get in Touch
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Have questions regarding event participation, poetry submissions, or venue details? Reach out to the student organizing team.
              </p>
            </div>

            {/* Info Cards */}
            <div className="space-y-4 pt-2">
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center shrink-0 font-bold">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Phone Number</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                    {phone}
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center shrink-0 font-bold">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Email Us</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    {email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

        </div>
      </main>
    </div>
  )
}