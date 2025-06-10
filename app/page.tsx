import Navbar from "@/components/Navbar"
import Campaigns from "@/components/campaigns-dash/Campaigns"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-6 py-8">
        {/* Your main content goes here */}
        <div className="text-center">
          <Campaigns />
        </div>
      </main>
      <footer className="bg-gray-100 py-6 text-center text-gray-600">
        <p>© Peana. All rights reserved.</p>
      </footer>
    </div>
  )
}