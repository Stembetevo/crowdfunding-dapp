import Navbar from "@/components/Navbar"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-6 py-8">
        {/* Your main content goes here */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6">Welcome to Your App</h1>
          <p className="text-lg mb-8">Your amazing Web3 application powered by Sui</p>
          <div className="bg-gray-100 p-8 rounded-lg shadow-md">
            <p>Main content area where your app features will be displayed</p>
          </div>
        </div>
      </main>
      <footer className="bg-gray-100 py-6 text-center text-gray-600">
        <p>© 2025 Your App Name. All rights reserved.</p>
      </footer>
    </div>
  )
}