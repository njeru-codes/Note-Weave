'use client';

import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import NavBar from '@/components/NavBar'; // Adjust path as needed

export default function LoginPage() {
  return (
    <>
      <NavBar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-700 to-teal-500 px-4 pt-32">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col-reverse md:flex-row w-full max-w-5xl">
          {/* Left side - Illustration */}
          <div className="md:w-1/2 bg-teal-600 text-white p-10 flex flex-col justify-center items-start">
            <h2 className="text-3xl font-bold mb-4">Simplify note-taking with NoteWeave.</h2>
            <p className="text-white/80 mb-6">
              Organize, edit and export your thoughts beautifully with our web editor.
            </p>
            <img
              src="/login_hero.png"
              alt="Illustration"
              className="w-full max-w-[360px] md:max-w-[500px] mt-auto"
            />
          </div>

          {/* Right side - Login Form */}
          <div className="md:w-1/2 p-10 flex flex-col justify-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-sm text-gray-500 mb-6">Please login to your account</p>

            <form className="space-y-4">
              <input
                type="email"
                placeholder="Email address"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <div className="text-right text-sm">
                <a href="#" className="text-teal-600 hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition"
              >
                Login
              </button>
            </form>

            {/* Social login */}
            <div className="my-6 flex items-center gap-4">
              <div className="flex-grow h-px bg-gray-200" />
              <span className="text-gray-400 text-sm">Or Login with</span>
              <div className="flex-grow h-px bg-gray-200" />
            </div>

            <div className="flex gap-4 flex-col sm:flex-row">
              <button className="flex items-center justify-center gap-2 border w-full py-3 rounded-lg hover:bg-gray-50 transition">
                <FaGoogle className="text-red-500" /> Google
              </button>
              <button className="flex items-center justify-center gap-2 border w-full py-3 rounded-lg hover:bg-gray-50 transition">
                <FaFacebookF className="text-blue-600" /> Facebook
              </button>
            </div>

            <p className="mt-6 text-sm text-center text-gray-500">
              Don’t have an account?{' '}
              <a href="/signup" className="text-teal-600 font-medium hover:underline">
                Signup
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
