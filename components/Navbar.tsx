import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-stone-100/80 dark:bg-stone-950/80 backdrop-blur-md px-8 py-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 transition-colors">
      <Link href="/" className="text-xl font-bold text-amber-600 dark:text-amber-400">
        Sahityik
      </Link>

      <nav className="flex items-center gap-6 text-sm font-medium text-stone-700 dark:text-stone-300">
        <Link href="/" className="hover:text-amber-600 dark:hover:text-amber-400 transition">
          Home
        </Link>
        <Link href="/events" className="hover:text-amber-600 dark:hover:text-amber-400 transition">
          Events
        </Link>
        <Link href="/speakers" className="hover:text-amber-600 dark:hover:text-amber-400 transition">
          Speakers
        </Link>
        <Link href="/forum" className="hover:text-amber-600 dark:hover:text-amber-400 transition">
          Forum
        </Link>
        <Link href="/contact" className="hover:text-amber-600 dark:hover:text-amber-400 transition">
          Contact
        </Link>

        {/* Theme Toggle Button */}
        <ThemeToggle />
      </nav>
    </header>
  )
}