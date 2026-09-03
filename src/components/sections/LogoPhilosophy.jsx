import SectionTitle from "../common/SectionTitle";
import Card from "../common/Card";
import { logoParts } from "../../data/logoPhilosophy";

export default function LogoPhilosophy() {
  return (
    <Card className="mb-6">
      <SectionTitle>Logo & Filosofi</SectionTitle>

      <div className="grid grid-cols-2 gap-6 mt-4">
        {logoParts.slice(0, 2).map((part) => (
          <LogoPart key={part.id} {...part} />
        ))}
      </div>

      <div className="flex justify-center my-6">
        <img
          src="/images/logo/lugrireal.png"
          alt="Logo EM UB 2026"
          className="w-32 h-auto"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        {logoParts.slice(2, 4).map((part) => (
          <LogoPart key={part.id} {...part} />
        ))}
      </div>
    </Card>
  );
}

function LogoPart({ image, title, description }) {
  return (
    <div className="flex flex-col items-center text-center">
      <img
        src={image}
        alt={title}
        className="w-16 h-16 object-contain mb-2"
      />
      <p className="text-blue-900 text-xs leading-relaxed">{description}</p>
    </div>
  );
}