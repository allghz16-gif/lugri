import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About us', path: '/about' },
    { name: 'Programs', path: '/programs' },
  ];

  return (
    <header className="fixed top-6 left-0 right-0 z-50 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between gap-4">
        
        {/* KAPSUL KIRI: OUTER PUTIH BLUR + INNER BIRU */}
        <div className="p-1.5 bg-white/20 backdrop-blur-md border border-white/40 rounded-full shadow-2xl">
          <Link 
            to="/" 
            className="bg-[#2B3970] rounded-full px-5 py-2 flex items-center gap-3 min-w-0"
          >
            <div className="flex items-center gap-2 shrink-0">
              <img 
                src="/images/logo/ub.png" 
                alt="Logo UB" 
                className="h-7 sm:h-8 w-auto object-contain rounded-full"
              />
              <img 
                src="/images/logo/emub.png" 
                alt="Logo EM UB" 
                className="h-7 sm:h-8 w-auto object-contain rounded-full"
              />
              <img 
                src="/images/logo/logolugri.png" 
                alt="Logo Lugri" 
                className="h-7 sm:h-8 w-auto object-contain rounded-full"
              />
            </div>

            <div className="flex flex-col min-w-0 leading-tight border-l border-white/20 pl-2">
              <span className="text-xs font-bold text-white tracking-wide truncate">
                Kementerian Luar Negeri
              </span>
              <span className="text-[10px] text-[#97E614] font-extrabold tracking-wider">
                EM UB 2026
              </span>
            </div>
          </Link>
        </div>

        {/* KAPSUL KANAN: OUTER PUTIH BLUR + INNER BIRU (DESKTOP) */}
        <div className="hidden md:block p-1.5 bg-white/20 backdrop-blur-md border border-white/40 rounded-full shadow-2xl">
          <nav className="bg-[#2B3970] rounded-full px-7 py-2 flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path} 
                className={`text-sm font-bold transition-colors ${
                  isActive(link.path) 
                    ? 'text-[#97E614]' 
                    : 'text-white hover:text-[#97E614]'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <Link 
              to="/contact" 
              className="bg-[#97E614] hover:bg-lime-400 text-[#001662] font-bold text-xs md:text-sm px-5 py-2 rounded-full transition-all duration-300 shadow-md ml-2"
            >
              Contact us
            </Link>
          </nav>
        </div>

        {/* HAMBURGER MOBILE */}
        <div className="md:hidden p-1.5 bg-white/20 backdrop-blur-md border border-white/40 rounded-2xl shadow-2xl">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-[#2B3970] text-white p-2.5 rounded-xl hover:text-[#97E614] transition-colors focus:outline-none flex items-center justify-center"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

      </div>

      {/* DROPDOWN MOBILE WITH DOUBLE LAYER */}
      {isOpen && (
        <div className="md:hidden mt-3 p-1.5 bg-white/20 backdrop-blur-md border border-white/40 rounded-3xl shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="bg-[#2B3970] rounded-2xl p-4 flex flex-col gap-2.5">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-bold py-3 px-4 rounded-xl border transition-all block ${
                    isActive(link.path)
                      ? 'bg-white/20 text-[#97E614] border-white/30'
                      : 'bg-white/10 text-white hover:bg-white/20 border-white/10'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <Link
              to="/contact"
              className="bg-[#97E614] hover:bg-lime-400 text-[#001662] text-center text-sm font-bold py-3 px-4 rounded-xl transition-colors mt-1 block shadow-md"
            >
              Contact us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}