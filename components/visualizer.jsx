"use client"

import { useEffect, useRef } from "react"

export default function Visualizer({ isPlaying }) {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const bars = 40
    const barWidth = canvas.width / bars - 2

    const renderFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (isPlaying) {
        // Create a colorful gradient
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
        gradient.addColorStop(0, "#f687b3") // pink-400
        gradient.addColorStop(0.5, "#7f9cf5") // indigo-400
        gradient.addColorStop(1, "#4fd1c5") // teal-400

        ctx.fillStyle = gradient

        // Draw animated bars
        for (let i = 0; i < bars; i++) {
          const barHeight = isPlaying ? Math.random() * canvas.height * 0.8 + 10 : 5

          ctx.fillRect(i * (barWidth + 2), canvas.height - barHeight, barWidth, barHeight)
        }
      } else {
        // Draw flat line when not playing
        ctx.fillStyle = "#6b7280" // gray-500
        for (let i = 0; i < bars; i++) {
          const barHeight = 5
          ctx.fillRect(i * (barWidth + 2), canvas.height - barHeight, barWidth, barHeight)
        }
      }

      animationRef.current = requestAnimationFrame(renderFrame)
    }

    renderFrame()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying])

  return (
    <div className="w-full h-48 bg-black/50 rounded-xl overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}

