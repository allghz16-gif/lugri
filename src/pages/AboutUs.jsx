import React from 'react';
import { motion } from 'framer-motion';
import CtaBanner from '../components/common/CtaBanner';
import Card from '../components/common/Card';

function SectionTitle({ children }) {
  return (
    <div className="w-full bg-[#121B74] rounded-xl px-5 py-3.5 mb-6 shadow-sm">
      <h3 
        className="text-[#97E614] font-extrabold text-xl md:text-2xl uppercase tracking-wider"
        style={{ fontFamily: "'Syne', 'Montserrat', sans-serif" }}
      >
        {children}
      </h3>
    </div>
  );
}

export default function AboutUs() {
  return (
    <div className="bg-[#001662] min-h-screen text-slate-800 font-sans overflow-x-hidden">
      <div className="h-28 md:h-32" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-8">

        {/* 1. WHAT'S THE URGENCY */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card className="p-6 md:p-8 bg-white rounded-3xl shadow-lg border border-slate-100">
            <SectionTitle>What's the Urgency?</SectionTitle>
            <p className="text-slate-800 text-base md:text-lg leading-relaxed text-justify font-normal">
              <strong className="text-[#001662]">Kementerian Luar Negeri</strong> Eksekutif
              Mahasiswa Universitas Brawijaya hadir sebagai entitas strategis diplomasi
              mahasiswa yang berfungsi sebagai katalisator orkestrasi jejaring eksternal
              dalam merajut sinergi eksternal secara sinergis, dengan mandat mengonversi
              relasi dan peluang antarlembaga menjadi hasil aksi kolektif yang terintegrasi,
              inklusif, dan berkelanjutan. Melalui pengelolaan hubungan eksternal yang
              sistematis dan strategis, kementerian ini mendorong penguatan citra EM UB,
              sekaligus mengakselerasi pengembangan potensi mahasiswa dan memosisikan EM UB
              sebagai aktor strategis dalam ekosistem kemahasiswaan Universitas Brawijaya.
            </p>
          </Card>
        </motion.div>

        {/* 2. VISI & MISI */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card className="p-6 md:p-8 bg-white rounded-3xl shadow-lg border border-slate-100">
            <div className="mb-8">
              <SectionTitle>Visi</SectionTitle>
              <p className="text-slate-800 text-base md:text-lg leading-relaxed font-normal px-1">
                Mengorkestrasikan sinergi eksternal melalui diplomasi mahasiswa yang
                berkelanjutan dan berdampak.
              </p>
            </div>

            <div>
              <SectionTitle>Misi</SectionTitle>
              <ul className="space-y-3 text-slate-800 text-base md:text-lg leading-relaxed px-1">
                <li className="flex items-start gap-3">
                  <span className="text-[#001662] font-bold text-xl select-none">•</span>
                  <span className="text-justify">
                    <strong className="text-[#001662]">Orkestrasi dan harmonisasi sinergi eksternal</strong>{' '}
                    dalam eskalasi peran mahasiswa sebagai representasi resmi EM UB lintas sektor.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#001662] font-bold text-xl select-none">•</span>
                  <span className="text-justify">
                    <strong className="text-[#001662]">Konsolidasi dan institusionalisasi relasi strategis</strong>{' '}
                    guna memperkuat marwah serta citra kelembagaan EM UB.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#001662] font-bold text-xl select-none">•</span>
                  <span className="text-justify">
                    <strong className="text-[#001662]">Transformasi jejaring eksternal menjadi aksi kolektif</strong>{' '}
                    yang terintegrasi, inklusif, berkelanjutan, dan berdampak struktural bagi
                    Universitas Brawijaya.
                  </span>
                </li>
              </ul>
            </div>
          </Card>
        </motion.div>

        {/* 3. LOGO & FILOSOFI */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card className="p-6 md:p-8 bg-white rounded-3xl shadow-lg border border-slate-100">
            <SectionTitle>Logo & Filosofi</SectionTitle>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mt-6">
              <div className="space-y-8 order-2 md:order-1">
                <div className="flex items-start gap-4">
                  <img
                    src="/images/logo/Group1.png"
                    alt="Filosofi Logo 1"
                    className="w-16 h-16 object-contain shrink-0"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                    Melambangkan keterhubungan dan kolaborasi antar anggota, setiap rajutan
                    mencerminkan semangat kebersamaan dalam membangun Kementerian Luar Negeri
                    EM UB yang solid dan berdampak.
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <img
                    src="/images/logo/Group3.png"
                    alt="Filosofi Logo 2"
                    className="w-16 h-16 object-contain shrink-0"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                    Menjadi kompas arah gerak organisasi, menunjukkan bahwa setiap langkah
                    Kementerian Luar Negeri EM UB selalu terarah, penuh visi, dan berorientasi
                    pada kontribusi nyata bagi civitas akademika.
                  </p>
                </div>
              </div>

              <div className="order-1 md:order-2 flex justify-center py-4 md:py-0">
                <img
                  src="/images/logo/lugrireal.png"
                  alt="Logo Utama EM UB"
                  className="w-48 md:w-60 h-auto object-contain drop-shadow-md"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>

              <div className="space-y-8 order-3">
                <div className="flex items-start gap-4">
                  <img
                    src="/images/logo/Group2.png"
                    alt="Filosofi Logo 3"
                    className="w-16 h-16 object-contain shrink-0"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                    Mencerminkan komitmen organisasi dalam menjaga nilai-nilai dan kepentingan
                    mahasiswa, sekaligus simbol ketangguhan dalam menghadapi setiap tantangan
                    keorganisasian.
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <img
                    src="/images/logo/Group636.png"
                    alt="Filosofi Logo 4"
                    className="w-16 h-16 object-contain shrink-0"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                    Melambangkan fondasi organisasi yang kokoh prinsip, integritas, dan
                    keteguhan anggota dalam menjalankan setiap program kerja atas dasar nilai
                    yang konsisten dan dapat dipercaya.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* 4. POSITIONING */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card className="p-6 md:p-8 bg-white rounded-3xl shadow-lg border border-slate-100">
            <SectionTitle>Positioning</SectionTitle>
            <div className="mt-4 overflow-hidden rounded-xl">
              <img
                src="/images/logo/positioning.png"
                alt="Positioning - The Distributor, The Accelerator, The Connector"
                className="w-full h-auto object-cover"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          </Card>
        </motion.div>

        {/* 5. WORK CULTURE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card className="p-6 md:p-8 bg-white rounded-3xl shadow-lg border border-slate-100">
            <SectionTitle>Work Culture</SectionTitle>
            <div className="mt-4 overflow-hidden rounded-xl">
              <img
                src="/images/logo/workculture.png"
                alt="Work Culture - Rational Decision Making Model, 4 Respect, Human Centered Design"
                className="w-full h-auto object-cover"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          </Card>
        </motion.div>

      </div>

      <CtaBanner />
    </div>
  );
}