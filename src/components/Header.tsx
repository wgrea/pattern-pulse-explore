
import { useState } from 'react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SP</span>
            </div>
            <span className="text-white font-semibold text-lg">SmartPack</span>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <a href="#features" className="text-slate-300 hover:text-white transition-colors">
              Features
            </a>
            <a href="#patterns" className="text-slate-300 hover:text-white transition-colors">
              DSA Patterns
            </a>
            <a href="#about" className="text-slate-300 hover:text-white transition-colors">
              About
            </a>
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-slate-700 pt-4">
            <div className="flex flex-col space-y-2">
              <a href="#features" className="text-slate-300 hover:text-white transition-colors py-2">
                Features
              </a>
              <a href="#patterns" className="text-slate-300 hover:text-white transition-colors py-2">
                DSA Patterns
              </a>
              <a href="#about" className="text-slate-300 hover:text-white transition-colors py-2">
                About
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
