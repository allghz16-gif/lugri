import Card from "../common/Card";

export default function ContactCard({ items, photo, altText }) {
  return (
    <Card className="flex flex-col md:flex-row justify-between items-start bg-white p-6 md:p-8 rounded-[2rem] border-2 border-[#97E614] mb-8 gap-6 shadow-xl">
      {/* Bagian Kiri: List Kontak */}
      <div className="flex-1 space-y-6 w-full pt-2">
        {items.map((contact, index) => (
          <div key={index} className="flex flex-col items-start gap-2">
            {/* Box Header Judul & Nama PIC - Uppercase */}
            <div className="bg-[#001662] px-6 py-2.5 rounded-2xl w-full max-w-x10 shadow-md overflow-hidden">
              <h3 
                className="text-[#97E614] text-base md:text-lg font-[900] tracking-wider uppercase inline-block origin-left transform scale-x-110"
                style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Arial Black', sans-serif" }}
              >
                {contact.title} <span className="font-[900] text-[#97E614]">({contact.name})</span>
              </h3>
            </div>

            {/* Tombol Contact - Uppercase */}
            <a
              href={`https://wa.me/${contact.waNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#97E614] hover:bg-[#83cb10] text-[#001662] font-[900] text-xs md:text-sm px-5 py-2.5 rounded-xl uppercase shadow-sm transition-all duration-200 active:scale-95 origin-left transform scale-x-105"
              style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Arial Black', sans-serif" }}
            >
              Contact
            </a>
          </div>
        ))}
      </div>

      {/* Bagian Kanan: Foto Poster */}
      <div className="w-full md:w-72 h-auto flex-shrink-0 self-center md:self-start">
        <img
          src={photo}
          alt={altText}
          className="w-full h-auto object-contain rounded-2xl shadow-md border border-gray-100"
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