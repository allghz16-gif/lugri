import React, { useState, useEffect } from 'react';

export default function IntroAnimation({ onComplete }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleFinish();
    }, 5500);

    return () => clearTimeout(timer);
  }, []);

  const handleFinish = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 500);
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity duration-500 select-none ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        backgroundImage: `radial-gradient(#e5e7eb 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
      }}
    >
      <button
        onClick={handleFinish}
        className="absolute top-6 right-6 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-[#001662] transition border border-slate-200 hover:border-[#001662] rounded-full px-4 py-1.5"
      >
        Skip Intro ➔
      </button>

      <div className="flex flex-col items-center text-center px-4 max-w-4xl">
        {/* TIGA LOGO - muncul satu per satu dari kiri ke kanan, SANGAT halus */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <div
            className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-slate-50 border border-slate-100 p-2 shadow-sm flex items-center justify-center hover:scale-105 transition-transform logo-smooth-in"
            style={{ animationDelay: '0.2s' }}
          >
            <img
              src="/images/logo/ub.png"
              alt="Logo UB"
              className="w-full h-full object-contain"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
          <div
            className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-slate-50 border border-slate-100 p-2 shadow-sm flex items-center justify-center hover:scale-105 transition-transform logo-smooth-in"
            style={{ animationDelay: '0.55s' }}
          >
            <img
              src="/images/logo/emub.png"
              alt="Logo EM UB"
              className="w-full h-full object-contain"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
          <div
            className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-slate-50 border border-slate-100 p-2 shadow-sm flex items-center justify-center hover:scale-105 transition-transform logo-smooth-in"
            style={{ animationDelay: '0.9s' }}
          >
            <img
              src="/images/logo/lugrireal.png"
              alt="Logo Lugri"
              className="w-full h-full object-contain"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        </div>

        {/* TEKS SAMBUTAN - dibiarkan seperti semula, tidak diubah */}
        <p
          className="text-slate-500 text-sm md:text-base font-semibold tracking-widest uppercase mb-2 stagger-item"
          style={{ animationDelay: '1.4s' }}
        >
          Welcome to Website
        </p>

        {/* JUDUL - "Kementerian" masuk dari kiri, "Luar Negeri" masuk dari kanan, bertemu di tengah */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#001662] tracking-tight uppercase leading-tight mb-3">
          <span
            className="inline-block converge-from-left"
            style={{ animationDelay: '1.8s' }}
          >
            Kementerian{' '}
          </span>
          <span
            className="text-[#97E614] bg-[#001662] px-3 py-1 rounded-xl inline-block my-1 converge-from-right"
            style={{ animationDelay: '1.8s' }}
          >
            Luar Negeri
          </span>
        </h1>

        {/* SUBJUDUL - diperhalus lagi (durasi lebih panjang, easing lebih lembut) */}
        <p
          className="text-slate-700 font-medium text-base md:text-xl tracking-wide max-w-2xl very-smooth-in"
          style={{ animationDelay: '2.4s' }}
        >
          Eksekutif Mahasiswa Universitas Brawijaya 2026
        </p>

        <div
          className="mt-10 w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden stagger-item"
          style={{ animationDelay: '2.9s' }}
        >
          <div className="h-full bg-[#001662] animate-pulse rounded-full w-full origin-left scale-x-100 transition-transform duration-3000"></div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .stagger-item {
          opacity: 0;
          animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Logo muncul satu-satu dari kiri ke kanan, sangat halus dan lambat */
        @keyframes logoSmoothIn {
          from { opacity: 0; transform: translateX(-24px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .logo-smooth-in {
          opacity: 0;
          animation: logoSmoothIn 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* Teks judul: dua potongan bertemu dari arah berlawanan */
        @keyframes convergeFromLeft {
          from { opacity: 0; transform: translateX(-60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes convergeFromRight {
          from { opacity: 0; transform: translateX(60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .converge-from-left {
          opacity: 0;
          animation: convergeFromLeft 1.1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .converge-from-right {
          opacity: 0;
          animation: convergeFromRight 1.1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* Subjudul: sangat halus, durasi panjang, easing lembut */
        @keyframes verySmoothIn {
          from { opacity: 0; transform: translateY(12px); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0px); }
        }
        .very-smooth-in {
          opacity: 0;
          animation: verySmoothIn 1.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
    </div>
  );
}