import { Music } from "lucide-react"

export default function Header() {
  return (
    <header className="flex flex-col items-center justify-center py-8">
      <div className="flex items-center mb-4">
        <Music size={40} className="text-pink-400 mr-3" />
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
          MelodyMaker
        </h1>
      </div>
      <p className="text-xl text-center max-w-2xl text-gray-200">
        Create unique music with AI. Select your mood, genre, and preferences, then let our AI compose a custom track
        just for you.
      </p>
    </header>
  )
}

