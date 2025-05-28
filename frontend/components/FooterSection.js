'use client';

import { motion } from 'framer-motion';
import { FaTwitter, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function FooterSection() {
  return (
    <footer className="bg-gradient-to-r from-teal-700 to-teal-500 text-white pt-16 pb-10 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10"
      >
        {/* Column 1: Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-4">NoteWeave</h2>
          <p className="text-white/80 text-sm">
            Your unified platform for capturing, organizing and exporting your thoughts beautifully.
          </p>
        </div>

        {/* Column 2: Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/features" className="hover:underline">Features</a>
            </li>
            <li>
              <a href="/pricing" className="hover:underline">Pricing</a>
            </li>
            <li>
              <a href="/about" className="hover:underline">About Us</a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">Contact</a>
            </li>
          </ul>
        </div>

        {/* Column 3: Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Connect With Us</h3>
          <div className="flex gap-4 text-xl">
            <motion.a
              href="https://twitter.com"
              whileHover={{ scale: 1.2 }}
              className="hover:text-white"
            >
              <FaTwitter />
            </motion.a>
            <motion.a
              href="https://github.com"
              whileHover={{ scale: 1.2 }}
              className="hover:text-white"
            >
              <FaGithub />
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              whileHover={{ scale: 1.2 }}
              className="hover:text-white"
            >
              <FaLinkedin />
            </motion.a>
            <motion.a
              href="mailto:support@noteweave.app"
              whileHover={{ scale: 1.2 }}
              className="hover:text-white"
            >
              <FaEnvelope />
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-12 text-center text-sm text-white/70"
      >
        &copy; {new Date().getFullYear()} NoteWeave. All rights reserved.
      </motion.div>
    </footer>
  );
}
