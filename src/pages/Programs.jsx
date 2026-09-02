import ProgramCard from "../components/sections/ProgramCard";
import { workPrograms, operationalPrograms } from "../data/programs";

export default function Programs() {
  return (
    <div className="min-h-screen bg-[#050b2c] px-6 py-10">
      <h2 className="text-white text-xl font-bold mb-4">Work Programs</h2>
      {workPrograms.map((p) => (
        <ProgramCard key={p.id} {...p} />
      ))}

      <h2 className="text-white text-xl font-bold mb-4 mt-8">
        Operational Programs
      </h2>
      {operationalPrograms.map((p) => (
        <ProgramCard key={p.id} {...p} />
      ))}
    </div>
  );
}