export default function Home() {
  return (
    <main className="min-h-screen bg-stone-950 text-stone-100 flex flex-col items-center justify-center px-6">
      <p className="text-amber-400 text-sm tracking-widest uppercase mb-4">
        Literature Festival
      </p>
      <h1 className="text-6xl font-bold text-center mb-4">
        Sahityik
      </h1>
      <p className="text-stone-400 text-lg text-center max-w-md mb-10">
        A celebration of words, stories, and the literary spirit.
      </p>
      
      <a
        href="/events"
        className="bg-amber-400 text-stone-950 font-semibold px-8 py-3 rounded-full hover:bg-amber-300 transition"
      >
        Explore Events
      </a>
    </main>
  )
}