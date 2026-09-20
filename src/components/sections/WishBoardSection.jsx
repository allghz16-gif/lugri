import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';

export default function WishBoardSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputName, setInputName] = useState('');
  const [inputText, setInputText] = useState('');

  // Data harapan yang melayang bebas dari bawah ke atas
  const [wishes, setWishes] = useState([
    {
      id: 1,
      text: 'Jangan lupakan transparansi dan akuntabilitas dalam menjalankan amanah!',
      xPos: 'left-[2%] sm:left-[8%]',
      delay: 0,
    },
    {
      id: 2,
      text: 'Semoga EM UB 2026 jadilah wadah yang benar-benar mewakili suara mahasiswa!',
      xPos: 'right-[2%] sm:right-[8%]',
      delay: 6,
    },
    {
      id: 3,
      text: 'Sukses untuk EM UB 2026, semangat memperjuangkan aspirasi mahasiswa!',
      xPos: 'left-[15%] sm:left-[25%]',
      delay: 12,
    },
    {
      id: 4,
      text: 'EM 2026, waktunya aksi nyata bukan janji-janji! Let’s go!',
      xPos: 'right-[15%] sm:right-[22%]',
      delay: 18,
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newWish = {
      id: Date.now(),
      text: inputText,
      xPos: `${Math.floor(Math.random() * 50) + 15}%`,
      delay: 0,
    };

    setWishes((prev) => [newWish, ...prev]);
    setInputText('');
    setInputName('');
    setIsModalOpen(false);
  };

  return (
    <section className="relative w-full max-w-6xl mx-auto px-4 my-12 h-[120px] flex items-center justify-center overflow-visible">
      
      {/* AREA TEKS HARAPAN MELAYANG BEBAS TANPA CONTAINER BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -top-12 -bottom-12">
        <AnimatePresence>
          {wishes.map((item) => (
            <motion.div
              key={item.id}
              initial={{ y: 120, opacity: 0 }}
              animate={{
                y: -120,
                opacity: [0, 0.95, 0.95, 0],
              }}
              transition={{
                duration: 16,
                repeat: Infinity,
                ease: 'linear',
                delay: item.delay,
              }}
              className={`absolute ${item.xPos} max-w-[220px] sm:max-w-[300px] bg-[#eef7ff]/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg pointer-events-auto z-10 border border-blue-100/60`}
            >
              <p className="text-[11px] sm:text-xs text-[#003366] font-semibold truncate">
                "{item.text}"
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* HANYA TOMBOL BERI HARAPAN GLOOWING */}
      <div className="relative z-20">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          style={{
            boxShadow: '0 0 30px rgba(0, 195, 255, 0.9), 0 0 12px rgba(255, 255, 255, 0.8)',
          }}
          className="bg-gradient-to-r from-[#0099ff] via-[#00c3ff] to-[#0099ff] text-white font-black text-xs sm:text-sm md:text-base px-8 py-3.5 rounded-full uppercase tracking-wider transition duration-300 cursor-pointer border border-white/50 whitespace-nowrap"
        >
          BERI HARAPAN
        </motion.button>
      </div>

      {/* Pop-up Modal Form Input Harapan */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-[#000d33] border border-white/20 p-6 sm:p-8 rounded-3xl shadow-2xl text-white"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition"
              >
                <X size={18} />
              </button>

              <h4 className="text-xl font-bold mb-1 uppercase text-[#00c3ff] tracking-wide">
                Tulis Harapanmu
              </h4>
              <p className="text-xs text-slate-300 mb-6">
                Harapanmu akan ditampilkan melayang pada halaman ini!
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                    Nama / Fakultas (Opsional)
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Dhika - FILKOM"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#00c3ff] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                    Pesan & Harapan *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tuliskan harapanmu untuk Kemenlu EM UB 2026..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#00c3ff] transition resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-[#00c3ff] hover:bg-[#0099ff] text-white font-bold text-xs px-6 py-2.5 rounded-xl transition shadow-md cursor-pointer"
                  >
                    <Send size={14} /> Kirim
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}