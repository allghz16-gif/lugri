import ContactCard from "../components/sections/ContactCard";
import { contacts } from "../data/contacts";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-[#050b2c] px-6 py-10">
      <h2 className="text-white text-xl font-bold mb-4">Contact Us</h2>
      {contacts.map((c) => (
        <ContactCard key={c.id} {...c} />
      ))}
    </div>
  );
}