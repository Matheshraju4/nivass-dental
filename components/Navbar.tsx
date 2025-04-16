"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-primary">
              Nivass Dental Clinic
            </Link>
          </div>

          {/* Center navigation items */}
       

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">

            <Button variant={"outline"} asChild>
            <Link 
              href="/view-patients"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
             View Patients
            </Link>

            </Button>
           
            <Button 
              className="bg-primary hover:bg-primary/90 text-white rounded-md px-4 py-2 text-sm font-medium"
            >
             Generate Invoice
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
} 