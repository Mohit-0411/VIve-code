'use client'

import { useState } from 'react'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import { Show, SignInButton, UserButton } from '@clerk/nextjs'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Events', href: '/events' },
    { name: 'Speakers', href: '/speakers' },
    { name: 'Forum', href: '/forum' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-stone-100/80 dark:bg-stone-950/80 backdrop-blur-md px-4 sm:px-8 py-4 border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="text-xl font-bold text-amber-600 dark:text-amber-400">
          Sahityik
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-700 dark:text-stone-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-amber-600 dark:hover:text-amber-400 transition"
            >
              {link.name}
            </Link>
          ))}

          {/* Authentication Buttons (Desktop) */}
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="px-4 py-2 text-xs md:text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-xl transition-all shadow-sm">
                Sign In
              </button>
            </SignInButton>
          </Show>

          <Show when="signed-in">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9 rounded-full border border-stone-200 dark:border-stone-800"
                }
              }}
            />
          </Show>

          {/* Theme Toggle Button */}
          <ThemeToggle />
        </nav>

        {/* Mobile Action Controls (Hamburger, Theme, Auth) */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />

          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="px-3 py-1.5 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-all shadow-sm">
                Sign In
              </button>
            </SignInButton>
          </Show>

          <Show when="signed-in">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8 rounded-full border border-stone-200 dark:border-stone-800"
                }
              }}
            />
          </Show>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 transition focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-stone-200 dark:border-stone-800 flex flex-col gap-3 text-stone-700 dark:text-stone-300 font-medium text-sm animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="py-2 hover:text-amber-600 dark:hover:text-amber-400 transition border-b border-stone-100 dark:border-stone-900 last:border-none"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}