import Card from "../common/Card";

export default function ContactCard({ items, photo, altText }) {
  return (
    <Card className="flex flex-col md:flex-row justify-between items-start bg-white p-6 md:p-8 rounded-[2rem] border-2 border-[#97E614] mb-8 gap-6 shadow-xl">
      {/* Bagian Kiri: List Kontak */}
      <div className="flex-1 space-y-6 w-full pt-2">
        {items.map((contact, index) => (
          <div key={index} className="flex flex-col items-start gap-2">
            {/* Box Header Judul & Nama PIC - Memanjang sesuai desain */}
            <div className="bg-[#001662] text-white font-bold text-base md:text-lg px-6 py-2.5 rounded-2xl w-full max-w-x10 shadow-md">
              {contact.title} <span className="font-normal text-[#97E614]">({contact.name})</span>
            </div>

            {/* Tombol Contact - Berada di bawah kiri box nama */}
            <a
              href={`https://wa.me/${contact.waNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#97E614] hover:bg-[#83cb10] text-black font-semibold text-xs md:text-sm px-7 py-2.5 rounded-full shadow-sm transition-all duration-200 active:scale-95"
            >
              Contact
            </a>
          </div>
        ))}
      </div>

      {/* Bagian Kanan: Foto Poster */}
      <div className="w-full md:w-72 h-90 flex-shrink-0 self-center md:self-start">
        <img
          src={photo}
          alt={altText}
          className="w-full h-full object-cover rounded-2xl shadow-md border border-gray-100"
          onError={(e) => {
            if (!e.target.dataset.retried) {
              e.target.dataset.retried = 'true';
              if (photo.endsWith('.png')) e.target.src = photo.replace('.png', '.PNG');
              else if (photo.endsWith('.PNG')) e.target.src = photo.replace('.PNG', '.png');
            }
          }}
        />
      </div>
    </Card>
  );
}