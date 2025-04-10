import "./globals.css"

export const metadata = {
  title: "MelodyMaker - AI Music Generation",
  description: "Create unique music with AI based on your mood, genre, and preferences",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}



import './globals.css'