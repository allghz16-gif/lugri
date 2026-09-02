import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed top-6 left-0 right-0 z-50 px-4 flex justify-center">
      <nav className="w-full max-w-5xl bg-[#131D38]/80 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 flex items-center justify-between shadow-2xl">
        
        {/* Group Logo & Nama */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <img 
              src="/images/logo/ub.png" 
              alt="Logo UB" 
              className="h-8 md:h-9 w-auto object-contain rounded-full"
            />
            <img 
              src="/images/logo/emub.png" 
              alt="Logo EM UB" 
              className="h-8 md:h-9 w-auto object-contain rounded-full"
            />
            <img 
              src="/images/logo/lugri.png" 
              alt="Logo Lugri" 
              className="h-8 md:h-9 w-auto object-contain rounded-full"
            />
          </div>

          <div className="flex flex-col text-white pl-1 border-l border-white/20">
            <span className="font-semibold text-xs md:text-sm tracking-wide leading-tight">
              Kementerian Luar Negeri
            </span>
            <span className="font-extrabold text-xs md:text-sm tracking-wider leading-tight text-[#97E614]">
              EM UB 2026
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link 
            to="/" 
            className={isActive('/') ? 'text-[#97E614] font-bold' : 'text-white hover:text-[#97E614] transition'}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={isActive('/about') ? 'text-[#97E614] font-bold' : 'text-white hover:text-[#97E614] transition'}
          >
            About us
          </Link>
          <Link 
            to="/programs" 
            className={isActive('/programs') ? 'text-[#97E614] font-bold' : 'text-white hover:text-[#97E614] transition'}
          >
            Programs
          </Link>
        </div>

        {/* Contact Us Button */}
        <Link 
          to="/contact" 
          className="bg-[#97E614] hover:bg-lime-400 text-[#0A1128] font-bold text-xs md:text-sm px-6 py-2.5 rounded-full transition-all duration-300 shadow-md"
        >
          Contact us
        </Link>
      </nav>
    </div>
  );
}