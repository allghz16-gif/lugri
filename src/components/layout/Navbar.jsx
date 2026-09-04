import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed top-6 left-0 right-0 z-50 px-6 md:px-12 flex justify-center">
      {/* Diubah menjadi max-w-7xl agar lebih panjang ke kanan & kiri */}
      <nav className="w-full max-w-7xl bg-[#2B3970] border-2 border-white rounded-full px-8 py-3 flex items-center justify-between shadow-2xl">
        
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
        <div className="hidden md:flex items-center gap-10 text-sm font-bold">
          <Link 
            to="/" 
            className={isActive('/') ? 'text-[#97E614]' : 'text-white hover:text-[#97E614] transition'}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={isActive('/about') ? 'text-[#97E614]' : 'text-white hover:text-[#97E614] transition'}
          >
            About us
          </Link>
          <Link 
            to="/programs" 
            className={isActive('/programs') ? 'text-[#97E614]' : 'text-white hover:text-[#97E614] transition'}
          >
            Programs
          </Link>
        </div>

        {/* Contact Us Button */}
        <Link 
          to="/contact" 
          className="bg-[#97E614] hover:bg-lime-400 text-[#001662] font-bold text-xs md:text-sm px-6 py-2.5 rounded-2xl transition-all duration-300 shadow-md"
        >
          Contact us
        </Link>
      </nav>
    </div>
  );
}