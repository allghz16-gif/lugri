import ContactCard from "../components/sections/ContactCard";
import { contactSections } from "../data/contacts";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-[#001662] px-4 md:px-10 pt-28 pb-12">
      <div className="max-w-5xl mx-auto">

        {contactSections.map((section) => (
          <ContactCard
            key={section.id}
            items={section.items}
            photo={section.photo}
            altText={section.altText}
          />
        ))}
      </div>
    </div>
  );
}