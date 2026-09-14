import React from 'react';
import { motion } from 'framer-motion';
import ContactCard from "../components/sections/ContactCard";
import { contactSections } from "../data/contacts";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-[#001662] px-4 md:px-10 pt-28 pb-12">
      <div className="max-w-5xl mx-auto space-y-6">
        {contactSections.map((section, idx) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <ContactCard
              items={section.items}
              photo={section.photo}
              altText={section.altText}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}