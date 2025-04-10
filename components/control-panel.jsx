"use client"

import { Slider } from "@/components/ui/slider"

const availableInstruments = [
  { id: "piano", label: "Piano", icon: "🎹" },
  { id: "guitar", label: "Guitar", icon: "🎸" },
  { id: "bass", label: "Bass", icon: "🎸" },
  { id: "drums", label: "Drums", icon: "🥁" },
  { id: "strings", label: "Strings", icon: "🎻" },
  { id: "synth", label: "Synth", icon: "🎛️" },
]

export default function ControlPanel({ tempo, setTempo, duration, setDuration, instruments, setInstruments }) {
  const toggleInstrument = (instrumentId) => {
    if (instruments.includes(instrumentId)) {
      setInstruments(instruments.filter((id) => id !== instrumentId))
    } else {
      setInstruments([...instruments, instrumentId])
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-3">Tempo: {tempo} BPM</h3>
        <Slider
          value={[tempo]}
          min={60}
          max={200}
          step={1}
          onValueChange={(value) => setTempo(value[0])}
          className="my-4"
        />
        <div className="flex justify-between text-sm">
          <span>Slow</span>
          <span>Fast</span>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-3">Duration: {duration} seconds</h3>
        <Slider
          value={[duration]}
          min={30}
          max={180}
          step={10}
          onValueChange={(value) => setDuration(value[0])}
          className="my-4"
        />
        <div className="flex justify-between text-sm">
          <span>30s</span>
          <span>3m</span>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-3">Instruments</h3>
        <div className="grid grid-cols-2 gap-2">
          {availableInstruments.map((instrument) => (
            <button
              key={instrument.id}
              onClick={() => toggleInstrument(instrument.id)}
              className={`
                flex items-center px-3 py-2 rounded-lg transition-all duration-300
                ${
                  instruments.includes(instrument.id)
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 font-medium"
                    : "bg-gray-800/50 hover:bg-gray-700/50"
                }
              `}
            >
              <span className="mr-2">{instrument.icon}</span>
              {instrument.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

