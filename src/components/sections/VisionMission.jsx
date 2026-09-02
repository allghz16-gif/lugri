import Card from "../common/Card";
import SectionTitle from "../common/SectionTitle";

const misi = [
  {
    bold: "Orkestrasi dan harmonisasi sinergi eksternal",
    rest: " dalam eskalasi peran diplomasi mahasiswa sebagai representasi resmi EM UB lintas sektor",
  },
  {
    bold: "Konsolidasi dan institusionalisasi relasi strategis",
    rest: " guna memperkuat marwah serta citra kelembagaan EM UB",
  },
  {
    bold: "Transformasi jejaring eksternal menjadi aksi kolektif",
    rest: " terintegrasi yang inklusif, berkelanjutan, dan berdampak struktural bagi Universitas Brawijaya",
  },
];

export default function VisionMission() {
  return (
    <Card className="mb-6">
      <SectionTitle>Visi</SectionTitle>
      <p className="text-blue-900 text-sm px-4 pt-3 pb-4">
        Mengorkestrasi sinergi eksternal melalui diplomasi mahasiswa yang
        berkelanjutan dan berdampak
      </p>

      <SectionTitle>Misi</SectionTitle>
      <ul className="list-disc list-inside space-y-2 px-4 py-4">
        {misi.map((item, idx) => (
          <li key={idx} className="text-blue-900 text-sm">
            <span className="font-bold">{item.bold}</span>
            {item.rest}
          </li>
        ))}
      </ul>
    </Card>
  );
}