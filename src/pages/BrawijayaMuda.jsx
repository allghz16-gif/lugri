import React, { useState, useRef, useEffect } from 'react';
import CtaBanner from '../components/common/CtaBanner';

/* ---------- Draggable + Auto-scrolling Image Carousel ---------- */
function ImageCarousel({ images, alt, onImageClick, reverse = false }) {
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);
  const [isPaused, setIsPaused] = useState(false);
  const doubled = [...images, ...images];

  // Posisi awal: jika reverse, mulai dari tengah agar bisa bergulir mundur
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (reverse) {
      el.scrollLeft = el.scrollWidth / 2;
    }
  }, [reverse]);

  // Auto-scroll menggunakan requestAnimationFrame
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let rafId;
    const speed = 0.6; // kecepatan scrolling (px/frame)

    const step = () => {
      if (!isPaused && !isDragging.current && el) {
        if (reverse) {
          el.scrollLeft -= speed;
          if (el.scrollLeft <= 0) {
            el.scrollLeft = el.scrollWidth / 2;
          }
        } else {
          el.scrollLeft += speed;
          if (el.scrollLeft >= el.scrollWidth / 2) {
            el.scrollLeft = 0;
          }
        }
      }
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [isPaused, reverse]);

  const handlePointerDown = (e) => {
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.pageX ?? e.touches?.[0]?.pageX ?? 0;
    startScrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const x = e.pageX ?? e.touches?.[0]?.pageX ?? 0;
    const walk = x - startX.current;
    if (Math.abs(walk) > 5) hasDragged.current = true;
    scrollRef.current.scrollLeft = startScrollLeft.current - walk;
  };

  const endDrag = () => {
    isDragging.current = false;
  };

  const handleImageClick = (src) => {
    if (!hasDragged.current && onImageClick) onImageClick(src);
  };

  return (
    <div
      ref={scrollRef}
      className="flex gap-4 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => { setIsPaused(false); endDrag(); }}
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={endDrag}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={endDrag}
    >
      {doubled.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`${alt} ${idx + 1}`}
          draggable={false}
          className="h-72 md:h-80 w-auto rounded-2xl shadow-md flex-shrink-0 pointer-events-auto object-cover"
          onClick={() => handleImageClick(src)}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      ))}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

export default function BrawijayaMuda() {
  const [selectedImage, setSelectedImage] = useState(null);

  // 5 Program Activities
  const programActivities = [
    { title: 'Brawijaya Student Challenge', image: '/images/team/bsc.png' },
    { title: 'Brawijaya Preparation Test', image: '/images/team/bpt.png' },
    { title: 'Roadshow', image: '/images/team/roadshow.png' },
    { title: 'Open House', image: '/images/team/OH.png' },
    { title: 'Jelajah Kampus', image: '/images/team/jelajahkampus.png' }
  ];

  // 15 Dokumentasi Kegiatan (bramud1.png s/d bramud15.png)
  const dokumentasiList = Array.from(
    { length: 15 },
    (_, i) => `/images/team/bramud${i + 1}.png`
  );

  return (
    <div className="min-h-screen bg-[#001662] w-full flex justify-center">
      <div className="w-full max-w-7xl px-4 sm:px-6 md:px-8 pt-28 pb-16 space-y-10">

        {/* SECTION 1: HERO / BANNER UTAMA */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-slate-100 flex flex-col md:flex-row gap-6 md:gap-8 items-stretch">
          <div className="w-full md:w-1/3 flex flex-col justify-between">
            <div>
              <div className="bg-[#001662] rounded-xl px-6 py-3 mb-4 inline-block">
                <h1 className="text-[#97E614] font-bold text-xl md:text-2xl tracking-wide">
                  Brawijaya Muda
                </h1>
              </div>
              <p className="text-slate-800 text-base md:text-lg font-normal leading-relaxed">
                Program outreach universitas untuk siswa SMA/MA.
              </p>
            </div>
          </div>
          <div className="w-full md:w-2/3 h-64 md:h-80 rounded-2xl overflow-hidden shrink-0">
            <img
              src="/images/team/bramudutama.png"
              alt="Brawijaya Muda Utama"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>

        {/* SECTION 2: DETAIL PROGRAM & TUJUAN */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-slate-100 flex flex-col md:flex-row gap-6 md:gap-8 items-stretch">
          <div className="w-full md:w-1/3 flex flex-col justify-between">
            <div>
              <div className="bg-[#001662] rounded-xl px-6 py-3 mb-2 inline-block">
                <h2 className="text-[#97E614] font-bold text-xl md:text-2xl tracking-wide">
                  Detail Program
                </h2>
              </div>
              <p className="text-slate-500 text-xs md:text-sm">
                Scroll untuk informasi lengkap
              </p>
            </div>
          </div>

          <div className="w-full md:w-2/3 bg-[#97E614] p-5 md:p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-center">
            <div className="w-full md:w-1/2 h-48 md:h-56 rounded-xl overflow-hidden shrink-0">
              <img
                src="/images/team/bramudke2.png"
                alt="Detail Program Brawijaya Muda"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="w-full md:w-1/2 text-black">
              <h3 className="font-bold text-lg md:text-xl mb-2">Tujuan Program</h3>
              <p className="text-xs md:text-sm leading-relaxed text-justify">
                Sebagai wadah perkenalan kehidupan kampus Universitas Brawijaya secara luas bagi para siswa SMA/MA sederajat yang berminat untuk melanjutkan pendidikan di perguruan tinggi. Melalui sosialisasi, tryout, dan mentoring interaktif, program ini bertujuan mendampingi persiapan akademis maupun non-akademis calon mahasiswa baru.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 3: PROGRAM ACTIVITIES */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-slate-100 flex flex-col items-center">
          <div className="w-full text-center mb-8">
            <div className="bg-[#001662] rounded-2xl w-full py-3 mb-2">
              <h2 className="text-[#97E614] font-bold text-xl md:text-2xl tracking-wide">
                Program Activities
              </h2>
            </div>
            <p className="text-slate-600 text-sm">
              Kegiatan utama selama periode program
            </p>
          </div>

          <div className="w-full flex flex-col gap-6 items-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl justify-items-center">
              {programActivities.slice(0, 3).map((act, index) => (
                <div key={index} className="flex flex-col items-center text-center w-full max-w-[280px]">
                  <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-md mb-3">
                    <img
                      src={act.image}
                      alt={act.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-semibold text-slate-800 leading-tight">
                    {act.title}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-6 w-full max-w-5xl">
              {programActivities.slice(3, 5).map((act, index) => (
                <div key={index} className="flex flex-col items-center text-center w-full max-w-[280px]">
                  <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-md mb-3">
                    <img
                      src={act.image}
                      alt={act.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-semibold text-slate-800 leading-tight">
                    {act.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 4: DOKUMENTASI KEGIATAN (IMAGE CAROUSEL AUTO-SCROLL & DRAGGABLE) */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-slate-100 flex flex-col">
          <div className="w-full text-center mb-6">
            <div className="bg-[#001662] rounded-2xl w-full py-3">
              <h2 className="text-[#97E614] font-bold text-xl md:text-2xl tracking-wide">
                Dokumentasi Kegiatan
              </h2>
            </div>
          </div>

          <ImageCarousel
            images={dokumentasiList}
            alt="Dokumentasi Brawijaya Muda"
            onImageClick={(src) => setSelectedImage(src)}
          />
        </div>

        {/* SECTION 5: CTA BANNER */}
        <CtaBanner />

      </div>

      {/* LIGHTBOX POPUP UNTUK DOKUMENTASI */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-5 right-5 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition"
            onClick={() => setSelectedImage(null)}
            aria-label="Tutup"
          >
            ✕
          </button>
          <img
            src={selectedImage}
            alt="Preview Dokumentasi"
            className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}