export default function Footer() {
  return (
    <footer className="mt-16 text-center text-gray-300 pb-8">
      <p>© {new Date().getFullYear()} MelodyMaker. All rights reserved.</p>
      <p className="mt-2 text-sm">Create, download, and share AI-generated music for personal and commercial use.</p>
    </footer>
  )
}

