import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#070D1F] border-t border-white/10 py-8 px-6 text-gray-400 text-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <p className="text-white font-medium">Ministry of Foreign Affairs</p>
          <p className="text-xs text-gray-500">Brawijaya / EM UB 2026</p>
        </div>
        <div className="flex gap-6 text-xs">
          <a href="#" className="hover:text-white transition">Tiktok</a>
          <a href="#" className="hover:text-white transition">Instagram</a>
          <a href="#" className="hover:text-white transition">Youtube</a>
        </div>
      </div>
    </footer>
  );
}