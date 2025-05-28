'use client';

import { FaUserPlus, FaRegStickyNote, FaFileExport } from 'react-icons/fa';

export default function HowItWorksSection() {
  return (
    <section className="bg-white py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Steps */}
        <div>
          <p className="text-teal-600 font-semibold mb-2">How It Works</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">
            Using NoteWeave is Simple
          </h2>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex items-start gap-4">
              <div className="bg-teal-100 text-teal-600 p-3 rounded-full">
                <FaUserPlus size={20} />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-1">
                  Create an Account & Login
                </h4>
                <p className="text-gray-600 text-sm">
                  Sign up in seconds and securely log into your workspace.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4">
              <div className="bg-teal-100 text-teal-600 p-3 rounded-full">
                <FaRegStickyNote size={20} />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-1">
                  Create & Save Notes
                </h4>
                <p className="text-gray-600 text-sm">
                  Start a new note with our web editor and save it with one click.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4">
              <div className="bg-teal-100 text-teal-600 p-3 rounded-full">
                <FaFileExport size={20} />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-1">
                  Export in One Click
                </h4>
                <p className="text-gray-600 text-sm">
                  Download your notes as PDF, DOCX, or markdown instantly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Image/Video Placeholder */}
        <div className="w-full h-full">
          <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center shadow-md">
            {/* Replace with actual video or image */}
            <img
              src="/hero_img3.png"
              alt="How NoteWeave works"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
