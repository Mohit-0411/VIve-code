import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-stone-950/80 backdrop-blur-md px-8 py-4 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold text-amber-400">
        Sahityik
      </Link>

      <nav className="flex gap-6 text-sm font-medium text-stone-300">
        <Link href="/" className="hover:text-amber-400 transition">
          Home
        </Link>
        <Link href="/events" className="hover:text-amber-400 transition">
          Events
        </Link>
        <Link href="/speakers" className="hover:text-amber-400 transition">
          Speakers
        </Link>
        <Link href="/forum" className="hover:text-amber-400 transition">
          Forum
        </Link>
        <Link href="/contact" className="hover:text-amber-400 transition">
          Contact
        </Link>
      </nav>
    </header>
  )
}