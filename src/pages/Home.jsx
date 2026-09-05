import React, { useState, useRef, useEffect } from 'react';
import { Users2, Landmark, X } from 'lucide-react';
import CtaBanner from '../components/common/CtaBanner';

/* ---------- Reusable 3D Tilt Card ---------- */
function TiltCard({ src, alt, onClick, className = '', rounded = 'rounded-2xl', role, name, faculty }) {
  // Shadow awal yang dibuat jauh lebih tebal, pekat, dan menyebar
  const defaultShadow = '0 25px 50px -12px rgba(10, 17, 40, 0.65), 0 15px 30px -8px rgba(0, 0, 0, 0.5)';

  const [style, setStyle] = useState({
    transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',
    boxShadow: defaultShadow,
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
      // Dynamic Shadow yang jauh lebih tebal dan dramatis saat di-hover
      boxShadow: `${-rotateY * 3}px ${rotateX * 3 + 30}px 60px rgba(10, 17, 40, 0.8)`,
      transition: 'transform 0.1s ease-out, box-shadow 0.1s ease-out',
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',
      boxShadow: defaultShadow,
      transition: 'transform 0.5s ease, box-shadow 0.5s ease',
    });
  };

  return (
    <div className="flex flex-col p-2">
      {/* Container Luar: Menerima inline boxShadow dari Tilt Effect */}
      <div
        className={`relative ${rounded} cursor-pointer will-change-transform ${className}`}
        style={style}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      >
        {/* Container Dalam: Memotong batas gambar agar sudut rounded presisi */}
        <div className={`w-full h-full ${rounded} overflow-hidden relative`}>
          {/* Badge Posisi / Jabatan */}
          {role && (
            <div className="absolute top-0 left-0 bg-[#001662] text-white text-xs font-semibold px-4 py-1.5 rounded-br-xl z-10 shadow-lg">
              {role}
            </div>
          )}
          <img
            src={src}
            alt={alt}
            className="w-full h-auto block pointer-events-none select-none object-cover"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
      </div>

      {/* Detail Nama & Fakultas */}
      {(name || faculty) && (
        <div className="mt-3 px-1">
          {name && <h3 className="text-base font-bold text-[#0A1128] leading-tight">{name}</h3>}
          {faculty && <p className="text-xs text-gray-500 font-medium mt-0.5">{faculty}</p>}
        </div>
      )}
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

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (reverse) {
      el.scrollLeft = el.scrollWidth / 2;
    }
  }, [reverse]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let rafId;
    const speed = 0.6;

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
      /* p-6 memberikan ruang luas di sekitar gambar agar shadow tebal tidak terpotong (overflow) */
      className="flex gap-6 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing select-none p-6"
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
          /* Custom style box-shadow kuat dan jelas */
          style={{
            boxShadow: '0 15px 30px -5px rgba(10, 17, 40, 0.35), 0 8px 15px -6px rgba(0, 0, 0, 0.25)',
          }}
          className="h-72 md:h-80 w-auto rounded-2xl flex-shrink-0 pointer-events-auto transition-all duration-300 hover:scale-105 hover:-translate-y-1"
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

      {/* 1. HERO SECTION */}
      <section className="relative mx-3 sm:mx-6 md:mx-10 mt-4 rounded-3xl min-h-[500px] md:min-h-[580px] flex items-end justify-center overflow-hidden shadow-2xl">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/team/bersamalugri.jpeg"
            alt="Kemenlu EM UB Team"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-[#0A1128]/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center px-4 pb-8 md:pb-10">
          <h1
            className="text-5xl md:text-7xl lg:text-8xl uppercase leading-[0.9] text-white tracking-tight"
            style={{
              fontFamily: "'Stretch Pro', sans-serif",
              fontWeight: 800,
              WebkitTextStroke: '3px #1E3A8A',
              textShadow: '3px 3px 0 #1E3A8A, 6px 6px 20px rgba(0,0,0,0.5)',
            }}
          >
            Ministry of <br />
            Foreign Affairs
          </h1>
          <p className="text-white text-lg sm:text-xl md:text-2xl font-medium tracking-wide mt-1.5 drop-shadow-md">
            Eksekutif Mahasiswa Universitas Brawijaya 2026
          </p>
        </div>
      </section>

      <div className="h-16" />

      <div className="pb-12 px-4 md:px-12 space-y-16">

        {/* 2. OUR ROLE AND VISION SECTION */}
        <section className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0A1128]">Our Role and Vision</h2>
          <p className="text-gray-500 text-sm mb-8">Empowering Students in Foreign Affairs</p>

          <div className="grid sm:grid-cols-2 gap-8 border-t border-gray-200 pt-8">
            <div className="flex items-start gap-4">
              <div className="bg-[#0A1128] rounded-lg p-3 flex-shrink-0 shadow-md">
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
              <div className="bg-[#0A1128] rounded-lg p-3 flex-shrink-0 shadow-md">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TiltCard
              src="/images/team/menteriilugs.jpeg"
              alt="Menteri - Dimas Putra Sofyan"
              role="Minister"
              name="Dimas Putra Sofyan"
              faculty="FISIP'24"
              onClick={() => setSelectedImage('/images/team/menteriilugs.jpeg')}
            />
            <TiltCard
              src="/images/team/wamenlugs.jpeg"
              alt="Vice Minister - Fairuz Nadir Alamsyah"
              role="Vice Minister"
              name="Fairuz Nadir Alamsyah"
              faculty="FISIP'24"
              onClick={() => setSelectedImage('/images/team/wamenlugs.jpeg')}
            />
          </div>

          {/* LEVEL 2: DIRJEN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TiltCard
              src="/images/team/acle.jpeg"
              alt="Directorate IDP - Miracle Lyra Aprilya"
              role="Directorate IDP"
              name="Miracle Lyra Aprilya"
              faculty="FH'24"
              onClick={() => setSelectedImage('/images/team/acle.jpeg')}
            />
            <TiltCard
              src="/images/team/kafkha.jpeg"
              alt="Directorate PKM - Kafkha Saifan Nugraha"
              role="Directorate PKM"
              name="Kafkha Saifan Nugraha"
              faculty="FTAB'24"
              onClick={() => setSelectedImage('/images/team/kafkha.jpeg')}
            />
          </div>

          {/* LEVEL 3a: KEDIRJENAN - Diplomasi Publik */}
          <div className="space-y-2 pt-4">
            <div className="flex items-center gap-2 px-2">
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

          {/* LEVEL 3b: KEDIRJENAN - Perjanjian Kerjasama Multilateral */}
          <div className="space-y-2 pt-4">
            <div className="flex items-center gap-2 px-2">
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