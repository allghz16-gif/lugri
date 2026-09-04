import React, { useState, useRef, useEffect } from 'react';
import { Users2, Landmark, X } from 'lucide-react';
import CtaBanner from '../components/common/CtaBanner';

/* ---------- Reusable 3D Tilt Card ---------- */
function TiltCard({ src, alt, onClick, className = '', rounded = 'rounded-2xl' }) {
  const [style, setStyle] = useState({
    transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',
    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
    transition: 'transform 0.5s ease, box-shadow 0.5s ease',
  });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setStyle({
      transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04,1.04,1.04)`,
      boxShadow: `${-rotateY * 1.5}px ${rotateX * 1.5}px 30px rgba(0,0,0,0.35)`,
      transition: 'transform 0.1s ease-out, box-shadow 0.1s ease-out',
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',
      boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
      transition: 'transform 0.5s ease, box-shadow 0.5s ease',
    });
  };

  return (
    <div
      className={`${rounded} overflow-hidden cursor-pointer will-change-transform ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-auto block pointer-events-none select-none"
        onError={(e) => { e.target.style.display = 'none'; }}
      />
    </div>
  );
}

/* ---------- Draggable + Auto-scrolling Image Carousel ---------- */
function ImageCarousel({ images, alt, onImageClick, reverse = false }) {
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);
  const [isPaused, setIsPaused] = useState(false);
  const doubled = [...images, ...images];

  // Posisi awal: kalau reverse, mulai dari tengah supaya bisa gulir mundur tanpa mentok
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (reverse) {
      el.scrollLeft = el.scrollWidth / 2;
    }
  }, [reverse]);

  // Auto-scroll pakai requestAnimationFrame, jalan terus kecuali di-hover/drag
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let rafId;
    const speed = 0.6; // px per frame

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
    if (!hasDragged.current) onImageClick(src);
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
          className="h-72 md:h-80 w-auto rounded-2xl shadow-md flex-shrink-0 pointer-events-auto"
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

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="bg-white min-h-screen text-gray-900 font-sans overflow-x-hidden">

      {/* 1. HERO SECTION - dengan margin di sekeliling, rounded */}
      <section className="relative mx-3 sm:mx-6 md:mx-10 mt-4 rounded-3xl min-h-[550px] flex items-center justify-center overflow-hidden shadow-2xl">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/team/bersamalugri.jpeg"
            alt="Kemenlu EM UB Team"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-[#0A1128]/70 to-[#0A1128]/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 pt-24 md:pt-28 pb-14 space-y-4">
          <h1
            className="text-5xl md:text-7xl uppercase leading-[0.95] text-white tracking-tight"
            style={{
              fontFamily: "'Baloo 2', sans-serif",
              fontWeight: 800,
              WebkitTextStroke: '3px #1E3A8A',
              textShadow: '3px 3px 0 #1E3A8A, 6px 6px 20px rgba(0,0,0,0.5)',
            }}
          >
            Ministry of <br />
            Foreign Affairs
          </h1>
          <p className="text-gray-200 text-sm md:text-base font-light">
            Eksekutif Mahasiswa Universitas Brawijaya 2026
          </p>
        </div>
      </section>

      <div className="h-20" />

      <div className="pb-12 px-4 md:px-12 space-y-16">

        {/* 2. OUR ROLE AND VISION SECTION */}
        <section className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0A1128]">Our Role and Vision</h2>
          <p className="text-gray-500 text-sm mb-8">Empowering Students in Foreign Affairs</p>

          <div className="grid sm:grid-cols-2 gap-8 border-t border-gray-200 pt-8">
            <div className="flex items-start gap-4">
              <div className="bg-[#0A1128] rounded-lg p-3 flex-shrink-0">
                <Users2 className="text-[#97E614]" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-[#0A1128]">Vision</h3>
                <p className="text-gray-600 text-sm">
                  Mengorkestrasikan sinergi eksternal melalui diplomasi mahasiswa yang berkelanjutan dan berdampak.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-[#0A1128] rounded-lg p-3 flex-shrink-0">
                <Landmark className="text-[#97E614]" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-[#0A1128]">Mission</h3>
                <p className="text-gray-600 text-sm">
                  Orkestrasi dan harmonisasi sinergi eksternal, konsolidasi dan institusionalisasi relasi strategis, serta transformasi jejaring eksternal.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. ORGANIZATIONAL STRUCTURE SECTION */}
        <section className="max-w-6xl mx-auto space-y-10">
          <div className="border-b border-gray-200 pb-3">
            <h2 className="text-lg font-bold uppercase tracking-wider text-[#0A1128]">
              Organizational Structure
            </h2>
          </div>

          {/* LEVEL 1: MENTERI & WAMEN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TiltCard
              src="/images/team/menteriilugs.jpeg"
              alt="Menteri - Dimas Putra Syafiie"
              onClick={() => setSelectedImage('/images/team/menteriilugs.jpeg')}
            />
            <TiltCard
              src="/images/team/wamenlugs.jpeg"
              alt="Wakil Menteri - Fahza Hasbi Uliaansyah"
              onClick={() => setSelectedImage('/images/team/wamenlugs.jpeg')}
            />
          </div>

          {/* LEVEL 2: DIRJEN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TiltCard
              src="/images/team/acle.jpeg"
              alt="Dirjen Diplomasi Publik - Naysilla Lyra Aprillia"
              onClick={() => setSelectedImage('/images/team/acle.jpeg')}
            />
            <TiltCard
              src="/images/team/kafkha.jpeg"
              alt="Dirjen Perjanjian Kerjasama Multilateral - Dzulfiqar Saifur Nugroho"
              onClick={() => setSelectedImage('/images/team/kafkha.jpeg')}
            />
          </div>

          {/* LEVEL 3a: KEDIRJENAN - Diplomasi Publik (carousel bergulir) */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#97E614] flex-shrink-0"></span>
              <p className="text-base md:text-lg font-bold text-[#0A1128] uppercase tracking-wide">
                Expert Staff to the Director General of Information and Public Diplomacy
              </p>
            </div>
            <ImageCarousel
              images={[
                '/images/team/idp1.jpeg',
                '/images/team/idp2.jpeg',
                '/images/team/idp3.jpeg',
                '/images/team/idp4.jpeg',
                '/images/team/idp5.jpeg',
                '/images/team/idp6.jpeg',
                '/images/team/idp7.jpeg',
                '/images/team/idp8.jpeg',
              ]}
              alt="Kedirjenan Diplomasi Publik"
              onImageClick={(src) => setSelectedImage(src)}
            />
          </div>

          {/* LEVEL 3b: KEDIRJENAN - Perjanjian Kerjasama Multilateral (carousel bergulir) */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#97E614] flex-shrink-0"></span>
              <p className="text-base md:text-lg font-bold text-[#0A1128] uppercase tracking-wide">
                Expert Staff to the Director General of Multilateral Cooperation Agreements
              </p>
            </div>
            <ImageCarousel
              images={[
                '/images/team/pkm1.jpeg',
                '/images/team/pkm2.jpeg',
                '/images/team/pkm3.jpeg',
                '/images/team/pkm4.jpeg',
                '/images/team/pkm5.jpeg',
                '/images/team/pkm6.jpeg',
                '/images/team/pkm7.jpeg',
                '/images/team/pkm8.jpeg',
              ]}
              alt="Kedirjenan Kerjasama Multilateral"
              onImageClick={(src) => setSelectedImage(src)}
              reverse
            />
          </div>

        </section>

      </div>

      {/* 4. CTA BANNER */}
      <CtaBanner />

      {/* POPUP / LIGHTBOX MODAL */}
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
            <X size={28} />
          </button>
          <img
            src={selectedImage}
            alt="Preview"
            className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}