'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

// Import a gamified font via Google Fonts (e.g., 'Press Start 2P', 'Bangers', or 'Luckiest Guy')
// In your _app.tsx or _document.tsx, add:
// import '@fontsource/press-start-2p'; // npm install @fontsource/press-start-2p
// Or include in <head>: <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">

interface HeaderProps {
  onNavigateToSection?: (sectionId: string) => void;
  onLoginClick?: () => void; // Optional handler for login
}

export function Header({ onNavigateToSection, onLoginClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    if (onNavigateToSection) {
      onNavigateToSection(sectionId);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const navLinks = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'course', label: 'COURSE' },
    { id: 'feature', label: 'FEATURES' },
  ];

  // Gamified font classes
  const gamifiedFont = "font-gamified"; // See note below

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-black/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/favicon2.png"
              alt="Bioblitz logo"
              className="w-8 h-8 mr-2 rounded-lg border-2 border-black bg-black/5 shadow-sm"
            />
            <h1 className={`text-2xl tracking-wider text-black font-bold pl-2 ${gamifiedFont}`}>
              BIOBLITZ
            </h1>
          </div>

          {/* Centered Navigation for Desktop */}
          <div className="hidden md:flex flex-1 justify-center">
            <nav className="flex space-x-8 bg-black/5 border border-black/30 rounded-xl px-6 py-2 shadow-sm">
              {navLinks.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`text-sm text-black font-medium px-3 py-1 rounded-lg border border-transparent hover:bg-black/10 hover:border-black hover:text-white transition-all duration-300 shadow-sm ${gamifiedFont}`}
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>

          {/* Login Button - visible on desktop */}
          <div className="hidden md:flex items-center">
            <Button
              variant="default"
              size="sm"
              onClick={onLoginClick}
              className={`ml-4 border border-black rounded-lg bg-black text-white hover:bg-white hover:text-black hover:border-black transition-all duration-300 shadow ${gamifiedFont}`}
            >
              Login
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-6 border-t border-black/20 mt-4">
            <div className="flex flex-col space-y-4 pt-6 items-center">
              {navLinks.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`w-full text-center text-base text-black font-medium px-4 py-2 rounded-lg border border-black/30 hover:bg-black/10 hover:border-black hover:text-white transition-all duration-300 shadow ${gamifiedFont}`}
                >
                  {label}
                </button>
              ))}
              {/* Login Button for Mobile */}
              <Button
                variant="default"
                size="sm"
                onClick={onLoginClick}
                className={`mt-3 w-32 border border-black rounded-lg bg-black text-white hover:bg-white hover:text-black hover:border-black transition-all duration-300 shadow ${gamifiedFont}`}
              >
                Login
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

// Add this to your global CSS (e.g. styles/globals.css):
// .font-gamified { font-family: 'Press Start 2P', 'Bangers', 'Luckiest Guy', cursive, sans-serif; font-weight: bold; }