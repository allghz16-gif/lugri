import React from 'react';
import { motion } from 'framer-motion';
import ProgramCard from '../components/sections/ProgramCard';
import { workPrograms, operationalPrograms } from '../data/programs';
import CtaBanner from '../components/common/CtaBanner';

export default function Programs() {
  const checkIsLargeLogo = (title) => {
    const lowerTitle = title.toLowerCase();
    return (
      lowerTitle.includes('brawijaya muda') ||
      lowerTitle.includes('east java') ||
      lowerTitle.includes('berkelana')
    );
  };

  const getProgramPath = (title) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('brawijaya muda')) return '/programs/brawijayamuda';
    if (lowerTitle.includes('east java')) return '/programs/ejcs';
    if (lowerTitle.includes('berkelana')) return '/programs/brawijayaberkelana';
    return null;
  };

  return (
    <div className="min-h-screen bg-[#001662] w-full flex justify-center">
      <div className="w-full max-w-7xl px-4 sm:px-6 md:px-8 pt-28 pb-16">
        
        {/* Section Work Programs */}
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[#97E614] font-bold text-xl uppercase tracking-wider mb-6 flex items-center gap-3"
        >
          Work Programs
          <span className="flex-1 h-px bg-[#97E614]/40" />
        </motion.h2>

        <div className="mb-12 space-y-6">
          {workPrograms.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProgramCard 
                {...p} 
                isLargeLogo={checkIsLargeLogo(p.title)} 
                linkTo={getProgramPath(p.title)}
              />
            </motion.div>
          ))}
        </div>

        {/* Section Operational Programs */}
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[#97E614] font-bold text-xl uppercase tracking-wider mb-6 flex items-center gap-3"
        >
          Operational Programs
          <span className="flex-1 h-px bg-[#97E614]/40" />
        </motion.h2>

        <div className="mb-12 space-y-6">
          {operationalPrograms.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProgramCard 
                {...p} 
                isLargeLogo={checkIsLargeLogo(p.title)} 
                linkTo={getProgramPath(p.title)}
              />
            </motion.div>
          ))}
        </div>

        <CtaBanner />

      </div>
    </div>
  );
}