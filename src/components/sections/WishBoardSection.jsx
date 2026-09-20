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
        // Generasikan posisi xPos & yOffset acak agar kartu tidak bertabrakan/saling menutupi
        const formattedData = data.map((item, index) => {
          // Buat 6 kolom posisi horizontal terdistribusi
          const xPos = `${(index % 5) * 18 + 4}%`;
          // Kecepatan & penundaan acak agar tidak pernah naik bersamaan di baris yang sama
          const delay = (index % 5) * 2.2;
          // Offset ketinggian vertikal acak (antara 0px - 60px)
          const yOffset = (index % 3) * 25;

          return {
            ...item,
            xPos,
            delay,
            yOffset,
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
      
      {/* AREA TEKS HARAPAN MELAYANG BEBAS (SELEBAR SELURUH LAYAR MONITOR) */}
      <div className="absolute left-0 right-0 w-full -top-60 bottom-0 pointer-events-none z-10">
        <AnimatePresence>
          {!loading &&
            wishes.map((item) => (
              <motion.div
                key={item.id || item._id}
                initial={{ y: 180 + item.yOffset, opacity: 0 }}
                animate={{
                  y: -120 - item.yOffset,
                  opacity: [0, 1, 1, 0.4, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: item.delay || 0,
                }}
                style={{ left: item.xPos }}
                className="absolute w-fit max-w-[240px] sm:max-w-[320px] bg-[#001662]/95 text-white backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl pointer-events-auto border border-white/20 transition-all duration-300"
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