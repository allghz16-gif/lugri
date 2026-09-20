import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users2, Landmark, X } from 'lucide-react';
import CtaBanner from '../components/common/CtaBanner';
import ministryTitle from '../assets/font/fontministry.png';
import API from '../api';

/* ---------- Wish Board Section (Connected to Express API via Netlify) ---------- */
function WishBoardSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Ambil data harapan dari MySQL via Netlify Backend
  const fetchWishes = async () => {
    try {
      const response = await API.get('/wishes');
      const data = response.data.data || response.data;

      if (Array.isArray(data)) {
        // Bagi layar jadi 5 zona utama dari Ujung Kiri (2%) sampai Ujung Kanan (80%)
        const zones = [
          { min: 2, max: 15 },   // Paling Kiri
          { min: 18, max: 32 },  // Tengah Kiri
          { min: 35, max: 48 },  // Tengah
          { min: 52, max: 65 },  // Tengah Kanan
          { min: 68, max: 80 }   // Paling Kanan
        ];

        const formattedData = data.map((item, index) => {
          // Pilih zona secara bergantian agar terisi rata dari kiri ke kanan
          const zone = zones[index % zones.length];
          // Acak posisi murni di dalam zona tersebut
          const randomX = Math.floor(Math.random() * (zone.max - zone.min + 1)) + zone.min;
          
          // Durasi acak (8 - 14 detik) agar kecepatan melayang tiap kartu beda-beda
          const duration = Math.floor(Math.random() * 7) + 8;
          
          // Delay acak agar tidak pernah start bersamaan di baris yang sama
          const delay = (index % 6) * 1.6 + Math.random() * 0.8;

          return {
            ...item,
            xPos: `${randomX}%`,
            duration,
            delay,
          };
        });

        setWishes(formattedData);
      }
    } catch (error) {
      console.error('Error fetching wishes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishes();
  }, []);

  // 2. Simpan harapan baru ke MySQL via Netlify Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    try {
      const response = await API.post('/wishes', { text: inputText });

      if (response.status === 200 || response.status === 201) {
        setInputText('');
        setIsModalOpen(false);
        fetchWishes(); // Refresh data dari DB secara instan
      } else {
        alert('Gagal mengirim harapan.');
      }
    } catch (error) {
      console.error('Error submitting wish:', error);
      alert('Gagal mengirim harapan ke server.');
    }
  };

  return (
    <section className="relative w-full my-8 flex items-center justify-center min-h-[120px] overflow-visible">
      
      {/* AREA TEKS HARAPAN MELAYANG BEBAS (GOYANG HALUS/SMOOTH KANAN-KIRI) */}
      <div className="absolute left-0 right-0 w-full -top-64 bottom-0 pointer-events-none z-10 overflow-visible">
        <AnimatePresence>
          {!loading &&
            wishes.map((item) => (
              <motion.div
                key={item.id || item._id || item.text}
                initial={{ y: 220, x: 0, opacity: 0 }}
                animate={{
                  y: -160,
                  x: [-12, 12, -12], // Goyang halus horizontal ke kiri-kanan
                  rotate: [-2, 2, -2], // Kemiringan tipis super smooth
                  opacity: [0, 1, 1, 0.3, 0],
                }}
                transition={{
                  y: {
                    duration: item.duration || 10,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: item.delay || 0,
                  },
                  x: {
                    duration: 3.5,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                  },
                  rotate: {
                    duration: 4,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                  },
                  opacity: {
                    duration: item.duration || 10,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: item.delay || 0,
                  },
                }}
                style={{ left: item.xPos }}
                className="absolute w-fit max-w-[200px] sm:max-w-[270px] bg-[#001662]/95 text-white backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl pointer-events-auto border border-white/20"
              >
                <p className="text-xs sm:text-sm font-medium leading-relaxed break-words">
                  "{item.text}"
                </p>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {/* TOMBOL BERI HARAPAN MEMANJANG (#001662) */}
      <div className="w-full mx-3 sm:mx-6 md:mx-10 relative z-20">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => setIsModalOpen(true)}
          style={{
            boxShadow: '0 10px 25px -5px rgba(0, 22, 98, 0.5), 0 0 15px rgba(0, 22, 98, 0.3)',
          }}
          className="w-full bg-[#001662] hover:bg-[#0A1128] text-white font-black text-base sm:text-xl md:text-2xl py-5 rounded-3xl uppercase tracking-wider transition duration-300 cursor-pointer border border-white/30 text-center flex items-center justify-center gap-3 shadow-2xl"
        >
          <span>BERI HARAPAN</span>
        </motion.button>
      </div>

      {/* POPUP MODAL FORM INPUT HARAPAN */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-[#001662] border border-white/20 p-6 sm:p-8 rounded-[2rem] shadow-2xl text-white"
            >
              {/* Tombol Close X */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition"
              >
                <X size={20} />
              </button>

              {/* Header Modal */}
              <h3 className="text-2xl font-extrabold uppercase text-[#97E614] tracking-wide mb-2">
                KIRIM HARAPANMU
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-6 font-normal">
                Apa pesan dan harapan kamu untuk kabinet tahun ini?
              </p>

              {/* Form Input */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tulis harapanmu di sini..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="w-full bg-white/10 border-2 border-cyan-400/80 rounded-2xl p-4 text-sm text-white placeholder-slate-300 focus:outline-none focus:border-[#97E614] transition resize-none leading-relaxed"
                  />
                </div>

                {/* Tombol Kirim Pill */}
                <button
                  type="submit"
                  className="w-full bg-[#97E614] hover:bg-[#82cb0f] text-[#001662] font-black text-base py-3.5 rounded-full transition duration-300 shadow-lg cursor-pointer uppercase tracking-wider"
                >
                  Kirim
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------- Reusable 3D Tilt Card ---------- */
function TiltCard({ src, alt, onClick, className = '', rounded = 'rounded-2xl', role, name, faculty }) {
  const defaultShadow = '0 10px 25px -5px rgba(10, 17, 40, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.08)';

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
      boxShadow: `${-rotateY * 2}px ${rotateX * 2 + 15}px 30px rgba(10, 17, 40, 0.2)`,
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
      <div
        className={`relative ${rounded} cursor-pointer will-change-transform ${className}`}
        style={style}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      >
        <div className={`w-full h-full ${rounded} overflow-hidden relative`}>
          {role && (
            <div className="absolute top-0 left-0 bg-[#001662] text-white text-xs font-semibold px-4 py-1.5 rounded-br-xl z-10 shadow-sm">
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
          style={{
            boxShadow: '0 8px 18px -4px rgba(10, 17, 40, 0.12), 0 4px 8px -4px rgba(0, 0, 0, 0.08)',
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
      <motion.section 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-3 sm:mx-6 md:mx-10 mt-4 rounded-3xl min-h-[500px] md:min-h-[580px] flex items-end justify-center overflow-hidden shadow-2xl"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/images/team/bersamalugri.jpeg"
            alt="Kemenlu EM UB Team"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-[#0A1128]/60 to-transparent" />
        </div>

        {/* Dekorasi kotak-kotak kecil */}
        <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
          <div className="absolute top-[8%] left-[12%] w-6 h-6 bg-[#97E614] rounded-sm rotate-3" />
          <div className="absolute top-[10%] left-[18%] w-6 h-6 bg-gray-300/70 rounded-sm -rotate-2" />
          <div className="absolute top-[6%] left-[45%] w-6 h-6 bg-blue-400/70 rounded-sm rotate-6" />
          <div className="absolute top-[9%] right-[25%] w-6 h-6 bg-[#97E614] rounded-sm -rotate-3" />
          <div className="absolute top-[5%] right-[10%] w-6 h-6 bg-gray-300/70 rounded-sm rotate-2" />
          <div className="absolute top-[18%] right-[8%] w-5 h-5 bg-blue-400/70 rounded-sm rotate-12" />
          <div className="absolute top-[15%] left-[8%] w-5 h-5 bg-blue-400/60 rounded-sm rotate-6" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center px-4 pb-8 md:pb-10">
          <img
            src={ministryTitle}
            alt="Ministry of Foreign Affairs"
            className="w-full max-w-3xl mx-auto"
          />
          <p className="text-white text-lg sm:text-xl md:text-2xl font-medium tracking-wide mt-1.5 drop-shadow-md">
            Eksekutif Mahasiswa Universitas Brawijaya 2026
          </p>
        </div>
      </motion.section>

      {/* 2. BERI HARAPAN SECTION */}
      <WishBoardSection />

      <div className="pb-12 px-4 md:px-12 space-y-16">

        {/* 3. OUR ROLE AND VISION SECTION */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl mx-auto"
        >
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
        </motion.section>

        {/* 4. ORGANIZATIONAL STRUCTURE SECTION */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl mx-auto space-y-10"
        >
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

        </motion.section>

      </div>

      {/* 5. CTA BANNER */}
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