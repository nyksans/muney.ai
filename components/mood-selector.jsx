"use client"

const moods = [
  { id: "happy", label: "Happy", emoji: "😊", color: "from-yellow-400 to-yellow-500" },
  { id: "sad", label: "Sad", emoji: "😢", color: "from-blue-400 to-blue-500" },
  { id: "energetic", label: "Energetic", emoji: "⚡", color: "from-red-400 to-red-500" },
  { id: "relaxing", label: "Relaxing", emoji: "😌", color: "from-green-400 to-green-500" },
  { id: "romantic", label: "Romantic", emoji: "❤️", color: "from-pink-400 to-pink-500" },
  { id: "mysterious", label: "Mysterious", emoji: "🔮", color: "from-purple-400 to-purple-500" },
]

export default function MoodSelector({ mood, setMood }) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">Select Mood</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {moods.map((moodOption) => (
          <button
            key={moodOption.id}
            onClick={() => setMood(moodOption.id)}
            className={`
              bg-gradient-to-r ${moodOption.color} 
              p-3 rounded-lg shadow-md transition-all duration-300
              ${mood === moodOption.id ? "ring-4 ring-white scale-105" : "opacity-80 hover:opacity-100 hover:scale-105"}
            `}
          >
            <div className="text-2xl mb-1">{moodOption.emoji}</div>
            <div className="font-medium">{moodOption.label}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

