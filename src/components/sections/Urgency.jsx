import Card from "../common/Card";
import SectionTitle from "../common/SectionTitle";

export default function Urgency() {
  return (
    <Card className="mb-6">
      <SectionTitle>What's the Urgency?</SectionTitle>
      <p className="text-blue-900 text-sm leading-relaxed p-4 font-bold">
        <span className="font-extrabold">Kementerian Luar Negeri</span> Eksekutif
        Mahasiswa Universitas Brawijaya hadir sebagai entitas strategis
        diplomasi mahasiswa yang berfungsi sebagai katalisator orkestrasi
        jejaring eksternal dalam merajut sinergi eksternal secara sinergis,
        dengan mandat mengonversi relasi dan peluang antarlembaga menjadi
        aksi kolektif yang terintegrasi, inklusif, dan berkelanjutan. Melalui
        pengelolaan hubungan eksternal yang sistematis dan strategis,
        kementerian ini mendorong adanya penguatan marwah serta citra EM UB,
        sekaligus mengakselerasi pengembangan potensi mahasiswa dan
        memosisikan EM UB sebagai aktor strategis dalam ekosistem
        kemahasiswaan Universitas Brawijaya.
      </p>
    </Card>
  );
}