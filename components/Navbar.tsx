"use client";

import { ConnectButton } from "@mysten/dapp-kit"
import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="w-full bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-10">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-3 items-center">
        {/* Logo/Brand */}
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold">
            Peana
          </Link>
        </div>
        
        {/* Navigation Links - Centered */}
        <ul className="hidden md:flex justify-center space-x-10">
          <li>
            <Link href="/" className="hover:text-blue-600 transition-colors font-medium">
              Home
            </Link>
          </li>
          <li>
            <Link href="/projects" className="hover:text-blue-600 transition-colors font-medium">
              Projects
            </Link>
          </li>
          <li>
            <Link href="/create" className="hover:text-blue-600 transition-colors font-medium">
              Create
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-blue-600 transition-colors font-medium">
              About
            </Link>
          </li>
        </ul>
        
        {/* Connect Button - Right aligned */}
        <div className="flex justify-end">
          <ConnectButton />
        </div>
      </div>
    </nav>
  )
}

export default Navbar