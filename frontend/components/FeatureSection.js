'use client';

import { motion } from 'framer-motion';
import { FaSyncAlt, FaCogs, FaSmile, FaBolt } from 'react-icons/fa';

export default function FeatureSection() {
  const features = [
    {
      title: 'Instant Syncing',
      description: 'Access your notes across devices effortlessly.',
      icon: <FaSyncAlt className="w-6 h-6 text-teal-600" />,
      image: '/1.png', // Replace with your actual image path
    },
    {
      title: 'Streamlined Process',
      description: 'Everything stays organized in one place.',
      icon: <FaCogs className="w-6 h-6 text-teal-600" />,
      image: '/2.png', // Replace with your actual image path
    },
    {
      title: 'Easy To Use',
      description: 'No steep learning curve. Just jump in and go.',
      icon: <FaBolt className="w-6 h-6 text-teal-600" />,
      image: '/3.png', // Replace with your actual image path
    },
    {
      title: 'Just Chill',
      description: 'Let the app do the work while you relax.',
      icon: <FaSmile className="w-6 h-6 text-teal-600" />,
    },
  ];

  return (
    <section className="py-20 bg-white relative">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-64 h-64 bg-teal-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.p
          className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-600"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Our Main Features
        </motion.p>
        <motion.h2
          className="text-3xl font-extrabold text-gray-900 mt-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Enjoy Our Best Features.
        </motion.h2>

        {/* Image mockup section */}
        <div className="relative mt-16 flex justify-center">
          {/* Left phone */}
          <motion.div
            className="w-48 sm:w-56 md:w-64 lg:w-80 rounded-xl overflow-hidden absolute left-1/2 -translate-x-[90%] sm:-translate-x-[110%] md:-translate-x-[130%] z-10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <img
              src={features[0].image}
              alt="UI Image 1"
              className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-contain"
            />
          </motion.div>

          {/* Center phone */}
          <motion.div
            className="w-48 sm:w-56 md:w-64 lg:w-80 rounded-xl overflow-hidden z-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <img
              src={features[1].image}
              alt="UI Image 2"
              className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-contain"
            />
          </motion.div>

          {/* Right phone */}
          <motion.div
            className="w-48 sm:w-56 md:w-64 lg:w-80 rounded-xl overflow-hidden absolute right-1/2 translate-x-[90%] sm:translate-x-[110%] md:translate-x-[130%] z-10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <img
              src={features[2].image}
              alt="UI Image 3"
              className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-contain"
            />
          </motion.div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-32">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-teal-50 rounded-xl shadow-md p-6 border border-teal-200 hover:shadow-lg transition-shadow"
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="flex items-center gap-3 mb-3">
                {feature.icon}
                <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
              </div>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}