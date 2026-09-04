import ContactCard from "../components/sections/ContactCard";
import { contacts } from "../data/contacts";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-[#001662] px-6 pt-28 pb-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-[#97E614] text-xl font-bold uppercase tracking-wider mb-6">Contact Us</h2>
        {contacts.map((c) => (
          <ContactCard key={c.id} {...c} />
        ))}
      </div>
    </div>
  );
}