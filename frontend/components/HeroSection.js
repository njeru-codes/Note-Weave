"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [featureIndex, setFeatureIndex] = useState(0);
  const features = [
    "Seamless Markdown Formatting",
    "Instant Note Syncing",
    "share notes to others",
    "export to docs,pdf,excel",
    "Distraction-Free Writing",
  ];

  // Typing effect logic
  useEffect(() => {
    setIsVisible(true);
    let index = 0;
    let currentFeature = features[featureIndex];
    let charIndex = 0;

    const typingInterval = setInterval(() => {
      if (charIndex <= currentFeature.length) {
        setTypedText(currentFeature.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setTypedText("");
          setFeatureIndex((prev) => (prev + 1) % features.length);
        }, 2000); // Pause before erasing
      }
    }, 100); // Typing speed

    return () => clearInterval(typingInterval);
  }, [featureIndex]);

  // Animation variants for text and image
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.2, ease: "easeOut" } },
  };

  return (
    <section className="relative bg-gradient-to-r from-teal-50 via-white to-teal-50 py-16 pt-48 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-teal-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between relative z-10">
        {/* Text Content */}
        <motion.div
          className="text-center lg:text-left mb-12 lg:mb-0 lg:w-1/2"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={textVariants}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-600">
              Note Weave
            </span>
          </h1>
          <p className="text-xl text-gray-700 mb-6 leading-relaxed max-w-lg mx-auto lg:mx-0">
            Write Naturally. Weave Beautiful Notes.<br />
            Experience <span className="font-semibold text-teal-600">{typedText}</span> <br/>— no distractions, just flow.
          </p>
          <a
            href="/try"
            className="inline-block bg-teal-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-teal-700 transition duration-300 ease-in-out shadow-lg hover:shadow-xl"
          >
            Try Note Weave Now
          </a>
        </motion.div>

        {/* Image Placeholder */}
        <motion.div
          className="w-full lg:w-1/2"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={imageVariants}
        >
          <div className="relative z-0">
            {/* Tilted Image */}
            <img
              src="/hero_img4.png"
              alt="Note Weave Interface"
              className="rotate-3 w-full h-auto rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-500 relative z-10"
            />

            {/* Decorative Overlays */}
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-teal-300 opacity-50 blur-2xl rounded-full z-0"></div>
            <div className="absolute -top-6 -right-6 w-40 h-40 bg-blue-300 opacity-50 blur-2xl rounded-full z-0"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;