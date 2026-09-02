import React from 'react';

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-end justify-center pb-20 overflow-hidden">
      {/* Background Image & Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/team/bersamalugri.jpeg" 
          alt="Kemenlu EM UB Team" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-[#0A1128]/60 to-[#0A1128]/80" />
      </div>

      {/* Teks Judul Hero */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto space-y-4">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight uppercase leading-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
          Ministry of <br />
          Foreign Affairs
        </h1>
        <p className="text-white text-base sm:text-xl md:text-2xl font-medium tracking-wide drop-shadow-md">
          Eksekutif Mahasiswa Universitas Brawijaya 2026
        </p>
      </div>
    </section>
  );
}