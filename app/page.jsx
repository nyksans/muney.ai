"use client"

import { useState, useEffect, useRef } from "react"
import * as Tone from "tone"
import { Download, Play, Pause, RefreshCw, Share2 } from "lucide-react"
import MoodSelector from "@/components/mood-selector"
import GenreSelector from "@/components/genre-selector"
import ControlPanel from "@/components/control-panel"
import Visualizer from "@/components/visualizer"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [mood, setMood] = useState("happy")
  const [genre, setGenre] = useState("lofi")
  const [tempo, setTempo] = useState(120)
  const [duration, setDuration] = useState(60)
  const [instruments, setInstruments] = useState(["piano", "bass", "drums"])
  const [musicData, setMusicData] = useState(null)

  const synth = useRef(null)
  const pattern = useRef(null)

  useEffect(() => {
    // Initialize Tone.js
    synth.current = new Tone.PolySynth().toDestination()

    return () => {
      if (pattern.current) {
        pattern.current.dispose()
      }
      if (synth.current) {
        synth.current.dispose()
      }
    }
  }, [])

  const generateMusic = async () => {
    setIsGenerating(true)

    // Simulate AI music generation
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Create a simple melody based on mood and genre
    let notes = []
    let durations = []

    if (mood === "happy") {
      notes = ["C4", "E4", "G4", "B4", "C5", "B4", "G4", "E4"]
      durations = ["8n", "8n", "4n", "8n", "4n", "8n", "4n", "2n"]
    } else if (mood === "sad") {
      notes = ["A3", "C4", "E4", "A4", "G4", "E4", "C4", "A3"]
      durations = ["4n", "4n", "4n", "2n", "4n", "4n", "4n", "2n"]
    } else if (mood === "energetic") {
      notes = ["E4", "G4", "A4", "B4", "C5", "B4", "A4", "G4", "E4", "G4", "A4", "B4"]
      durations = ["16n", "16n", "16n", "16n", "8n", "16n", "16n", "16n", "16n", "8n", "8n", "4n"]
    } else {
      notes = ["G3", "B3", "D4", "G4", "F#4", "D4", "B3", "G3"]
      durations = ["4n", "4n", "4n", "2n", "4n", "4n", "4n", "2n"]
    }

    setMusicData({
      notes,
      durations,
      tempo,
    })

    setIsGenerating(false)
  }

  const playMusic = () => {
    if (!musicData) return

    Tone.Transport.bpm.value = tempo

    if (Tone.context.state !== "running") {
      Tone.start()
    }

    if (pattern.current) {
      pattern.current.dispose()
    }

    let index = 0
    pattern.current = new Tone.Sequence(
      (time, note) => {
        synth.current.triggerAttackRelease(musicData.notes[index], musicData.durations[index], time)
        index = (index + 1) % musicData.notes.length
      },
      ["C4"], // This is a placeholder, we're using our own indexing
      "8n",
    ).start(0)

    Tone.Transport.start()
    setIsPlaying(true)
  }

  const stopMusic = () => {
    Tone.Transport.stop()
    setIsPlaying(false)
  }

  const togglePlayback = () => {
    if (isPlaying) {
      stopMusic()
    } else {
      playMusic()
    }
  }

  const downloadMusic = () => {
    // In a real app, this would convert the music to an audio file
    alert("In a production app, this would download your music as an MP3 file!")
  }

  const shareMusic = () => {
    // In a real app, this would share the music
    alert("In a production app, this would share your music to social media!")
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-800 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <Header />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-black/30 backdrop-blur-md rounded-xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Music Controls</h2>

            <MoodSelector mood={mood} setMood={setMood} />

            <div className="mt-6">
              <GenreSelector genre={genre} setGenre={setGenre} />
            </div>

            <div className="mt-6">
              <ControlPanel
                tempo={tempo}
                setTempo={setTempo}
                duration={duration}
                setDuration={setDuration}
                instruments={instruments}
                setInstruments={setInstruments}
              />
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={generateMusic}
                disabled={isGenerating}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <div className="flex items-center">
                    <RefreshCw className="animate-spin mr-2" size={20} />
                    Generating...
                  </div>
                ) : (
                  "Generate Music"
                )}
              </button>
            </div>
          </div>

          <div className="lg:col-span-2 bg-black/30 backdrop-blur-md rounded-xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Music Playback</h2>

            <div className="mb-6">
              <Visualizer isPlaying={isPlaying} />
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={togglePlayback}
                disabled={!musicData}
                className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isPlaying ? (
                  <>
                    <Pause size={20} className="mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play size={20} className="mr-2" />
                    Play
                  </>
                )}
              </button>

              <button
                onClick={downloadMusic}
                disabled={!musicData}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <Download size={20} className="mr-2" />
                Download
              </button>

              <button
                onClick={shareMusic}
                disabled={!musicData}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <Share2 size={20} className="mr-2" />
                Share
              </button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  )
}

