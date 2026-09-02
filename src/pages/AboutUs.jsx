import Urgency from "../components/sections/Urgency";
import VisionMission from "../components/sections/VisionMission";
import LogoPhilosophy from "../components/sections/LogoPhilosophy";
import Positioning from "../components/sections/Positioning";
import WorkCulture from "../components/sections/WorkCulture";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-[#050b2c] flex justify-center">
      <div className="w-full max-w-md px-6 py-10">
        <Urgency />
        <VisionMission />
        <LogoPhilosophy />
        <Positioning />
        <WorkCulture />
      </div>
    </div>
  );
}