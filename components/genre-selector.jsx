"use client"

const genres = [
  { id: "lofi", label: "Lo-Fi", icon: "🎧" },
  { id: "classical", label: "Classical", icon: "🎻" },
  { id: "jazz", label: "Jazz", icon: "🎷" },
  { id: "rock", label: "Rock", icon: "🎸" },
  { id: "electronic", label: "Electronic", icon: "🎛️" },
  { id: "ambient", label: "Ambient", icon: "🌌" },
]

export default function GenreSelector({ genre, setGenre }) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">Select Genre</h3>
      <div className="flex flex-wrap gap-2">
        {genres.map((genreOption) => (
          <button
            key={genreOption.id}
            onClick={() => setGenre(genreOption.id)}
            className={`
              px-4 py-2 rounded-full transition-all duration-300
              ${
                genre === genreOption.id
                  ? "bg-white text-purple-900 font-bold"
                  : "bg-purple-800/50 hover:bg-purple-700/50"
              }
            `}
          >
            <span className="mr-1">{genreOption.icon}</span>
            {genreOption.label}
          </button>
        ))}
      </div>
    </div>
  )
}

