import ProgramCard from '../components/sections/ProgramCard'
import { workPrograms, operationalPrograms } from '../data/programs'
import CtaBanner from '../components/common/CtaBanner'

export default function Programs() {
  const checkIsLargeLogo = (title) => {
    const lowerTitle = title.toLowerCase()
    return (
      lowerTitle.includes('brawijaya muda') ||
      lowerTitle.includes('east java') ||
      lowerTitle.includes('berkelana')
    )
  }

  // Helper untuk menentukan path halaman detail berdasarkan judul program
  const getProgramPath = (title) => {
    const lowerTitle = title.toLowerCase()
    if (lowerTitle.includes('brawijaya muda')) return '/programs/brawijayamuda'
    if (lowerTitle.includes('east java')) return '/programs/ejcs'
    if (lowerTitle.includes('berkelana')) return '/programs/brawijayaberkelana'
    return null
  }

  return (
    <div className="min-h-screen bg-[#001662] w-full flex justify-center">
      <div className="w-full max-w-7xl px-4 sm:px-6 md:px-8 pt-28 pb-16">
        
        {/* Section Work Programs */}
        <h2 className="text-[#97E614] font-bold text-xl uppercase tracking-wider mb-6 flex items-center gap-3">
          Work Programs
          <span className="flex-1 h-px bg-[#97E614]/40" />
        </h2>
        <div className="mb-12">
          {workPrograms.map((p) => (
            <ProgramCard 
              key={p.id} 
              {...p} 
              isLargeLogo={checkIsLargeLogo(p.title)} 
              linkTo={getProgramPath(p.title)}
            />
          ))}
        </div>

        {/* Section Operational Programs */}
        <h2 className="text-[#97E614] font-bold text-xl uppercase tracking-wider mb-6 flex items-center gap-3">
          Operational Programs
          <span className="flex-1 h-px bg-[#97E614]/40" />
        </h2>
        <div className="mb-12">
          {operationalPrograms.map((p) => (
            <ProgramCard 
              key={p.id} 
              {...p} 
              isLargeLogo={checkIsLargeLogo(p.title)} 
              linkTo={getProgramPath(p.title)}
            />
          ))}
        </div>

        <CtaBanner />

      </div>
    </div>
  )
}