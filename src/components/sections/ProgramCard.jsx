import Card from '../common/Card'

export default function ProgramCard({ title, icon, photo, desc }) {
  const lowerTitle = title.toLowerCase()
  const isBramud = lowerTitle.includes('brawijaya muda')
  const isEJCS = lowerTitle.includes('east java')
  const isBB = lowerTitle.includes('berkelana')

  return (
    <Card className="mb-8 p-5 md:p-6 bg-white rounded-3xl shadow-lg border border-slate-100">
      <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-stretch">
        
        {/* KOLOM KIRI */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            {/* Title Bar */}
            <div className="bg-[#0A1128] rounded-xl px-5 py-3 mb-6 w-full">
              <h3 className="text-[#97E614] font-bold text-xl md:text-2xl tracking-wide">
                {title}
              </h3>
            </div>

            {/* Area Logo & Deskripsi */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center min-h-[260px]">
              {icon && (
                <div className="w-64 h-64 sm:w-72 sm:h-72 shrink-0 flex items-center justify-center p-0 relative">
                  <img
                    src={icon}
                    alt={title}
                    className={`object-contain transition-all ${
                      isBramud
                        ? 'w-full h-full scale-150 translate-y-15' // Bramud jumbo
                        : isEJCS
                        ? 'w-full h-full scale-150 translate-y-15' // EJCS besar + offset shadow
                        : isBB
                        ? 'w-full h-full scale-90' // BB kembali ke ukuran semula/sedang
                        : 'w-full h-full scale-100'
                    }`}
                  />
                </div>
              )}

              {/* Teks Deskripsi */}
              <p className="text-slate-800 text-base md:text-lg leading-relaxed text-justify flex-1 font-normal whitespace-pre-line">
                {desc}
              </p>
            </div>
          </div>

          {/* Tombol Read More */}
          <div className="mt-6 sm:mt-4">
            <button className="bg-[#0A1128] text-[#97E614] text-sm md:text-base font-semibold px-6 py-2.5 rounded-xl hover:bg-[#132048] transition shadow-md">
              Read more
            </button>
          </div>
        </div>

        {/* KOLOM KANAN: Poster */}
        {photo && (
          <div className="w-full lg:w-[380px] shrink-0 rounded-2xl overflow-hidden min-h-[320px]">
            <img 
              src={photo} 
              alt={`${title} poster`} 
              className="w-full h-full object-cover rounded-2xl" 
            />
          </div>
        )}

      </div>
    </Card>
  )
}