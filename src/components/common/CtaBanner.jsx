import React from 'react';
import { Link } from 'react-router-dom';

const CtaBanner = () => {
  return (
    <section className="bg-[#001662] py-16 px-6 border-t border-white/10 text-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Ready to collaborate?
          </h2>
          <p className="text-gray-400">
            Get in touch to connect with us! 👋
          </p>
        </div>
        <Link
          to="/contact"
          className="bg-[#97E614] hover:bg-lime-400 text-[#001662] font-bold px-6 py-3 rounded-xl transition duration-300 inline-block"
        >
          Contact us
        </Link>
      </div>
    </section>
  );
};

export default CtaBanner;