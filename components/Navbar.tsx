"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Desktop and Mobile Header */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-lg md:text-xl font-bold text-primary">
              Nivass Dental Clinic
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
           
            <Button className="bg-primary hover:bg-primary/90 text-white">
            <Link href="/view-patients">
                View Patients
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="flex flex-col space-y-3 py-4">
              <Link 
                href="/view-patients"
                  className="px-2 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                View Patients
              </Link>
           
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 