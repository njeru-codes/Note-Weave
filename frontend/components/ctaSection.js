'use client';

import { motion } from 'framer-motion';

export default function CtaSection() {
  return (
    <section className="relative py-20 bg-gradient-to-r from-teal-500 to-teal-700 overflow-hidden rounded-3xl">
      {/* Circular teal rings (right side) */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-teal-100 opacity-10 absolute top-0 right-0"></div>
        <div className="w-[450px] h-[450px] rounded-full bg-teal-100 opacity-20 absolute top-[75px] right-[75px]"></div>
        <div className="w-[300px] h-[300px] rounded-full bg-teal-100 opacity-30 absolute top-[150px] right-[150px]"></div>
        <div className="w-[150px] h-[150px] rounded-full bg-teal-100 opacity-40 absolute top-[225px] right-[225px]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative z-10">
        <motion.h2
          className="text-4xl font-extrabold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Start Capturing Smarter Notes Today.
        </motion.h2>

        <p className="text-lg text-white/80 mb-10 max-w-xl">
          NoteWeave helps you write, organize, and export your notes effortlessly — straight from your browser.
        </p>

        <div className="flex gap-4 flex-wrap">
          <motion.a
            href="/book-call"
            className="bg-black text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-gray-800 transition"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Create Free Account
          </motion.a>
        </div>
      </div>
    </section>
  );
}
