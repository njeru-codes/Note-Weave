'use client';

import { motion } from 'framer-motion';

export default function ReviewsSection() {
  const reviews = [
    {
      user: 'Aisha K.',
      text: 'NoteWeave has transformed how I organize my thoughts! Syncing across devices is seamless.',
      rating: 5,
    },
    {
      user: 'Chidi O.',
      text: 'I love the distraction-free writing. It’s perfect for my daily journaling.',
      rating: 4,
    },
    {
      user: 'Lerato M.',
      text: 'The Markdown formatting is so intuitive. I can’t imagine using anything else!',
      rating: 5,
    },
  ];

  const loopedReviews = [...reviews, ...reviews, ...reviews];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-64 h-64 bg-teal-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          className="text-4xl font-extrabold text-gray-900 mb-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-600">
            What Users Across continent Say
          </span>
        </motion.h2>
        <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto">
          Hear from NoteWeave users across the continent.
        </p>

        {/* Reviews Marquee */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: ['0%', '-100%'] }}
            transition={{
              repeat: Infinity,
              duration: 30,
              ease: 'linear',
            }}
          >
            {loopedReviews.map((review, index) => (
              <div
                key={index}
                className="inline-block bg-teal-50 rounded-xl shadow-lg p-6 max-w-xs min-w-[280px]"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{review.user}</h3>
                <p className="text-gray-600 mb-4 break-words whitespace-normal">"{review.text}"</p>
                <div className="flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-2xl ${i < review.rating ? 'text-teal-600' : 'text-gray-300'}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
