'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // For redirecting
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import NavBar from '@/components/NavBar'; // Adjust path as needed

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirm_password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, confirm_password } = formData;

    // Client-side validation
    if (!email || !password || !confirm_password) {
      setError('All fields are required.');
      setSuccess('');
      return;
    }
    if (password !== confirm_password) {
      setError('Passwords do not match.');
      setSuccess('');
      return;
    }

    setLoading(true); // Set loading to true
    setError('');
    setSuccess('');

    try {
      const response = await fetch('https://note-weave-y0vf.onrender.com/auth/register', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          confirm_password,
        }),
      });

      const data = await response.json();

      if (response.ok && response.status === 200) {
        // Success: Account created
        setSuccess(data.message || 'Account created successfully!');
        setError('');
        // Redirect to login page after a short delay
        setTimeout(() => {
          router.push('/login');
        }, 1500);
      } else {
        // Handle API errors (e.g., email already exists)
        setError(data.message || 'Failed to create account. Please try again.');
        setSuccess('');
      }
    } catch (err) {
      // Handle network or other errors
      setError('An error occurred. Please check your connection and try again.');
      setSuccess('');
      console.error('Registration error:', err);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Registering with ${provider}`);
    // Implement Google/Facebook registration logic here
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gradient-to-r from-teal-700 to-teal-500 overflow-hidden">
      <NavBar />
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col-reverse md:flex-row w-full max-w-5xl h-full md:h-auto max-h-[calc(100vh-64px)]">
          {/* Left Side - Illustration */}
          <div className="md:w-1/2 bg-teal-600 text-white p-8 flex flex-col justify-center items-start">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Join NoteWeave Today</h2>
            <p className="text-white/80 mb-6 text-sm md:text-base">
              Create an account to start organizing, editing, and exporting your thoughts with ease.
            </p>
            <img
              src="/login_hero.png"
              alt="Illustration"
              className="w-full max-w-[300px] md:max-w-[400px] mt-auto"
            />
          </div>

          {/* Right Side - Register Form */}
          <div className="md:w-1/2 p-8 flex flex-col justify-center">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">Create Account</h2>
            <p className="text-sm text-gray-500 mb-4 md:mb-6">Sign up to get started</p>

            {error && (
              <div className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded-lg">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 text-sm text-green-600 bg-green-50 p-2 rounded-lg">
                {success}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email address"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 md:py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                disabled={loading} // Disable inputs during loading
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 md:py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                disabled={loading}
              />
              <input
                type="password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 md:py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                disabled={loading}
              />

              <button
                type="submit"
                className={`w-full bg-teal-600 text-white font-semibold py-2 md:py-3 rounded-lg transition flex items-center justify-center ${
                  loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-teal-700'
                }`}
                disabled={loading}
              >
                {loading ? (
                  <div className="spinner"></div>
                ) : (
                  'Register'
                )}
              </button>
            </form>

            {/* Social Login */}
            <div className="my-4 md:my-6 flex items-center gap-4">
              <div className="flex-grow h-px bg-gray-200" />
              <span className="text-gray-400 text-sm">Or Register with</span>
              <div className="flex-grow h-px bg-gray-200" />
            </div>

            <div className="flex gap-4 flex-col sm:flex-row">
              <button
                onClick={() => handleSocialLogin('Google')}
                className="flex items-center justify-center gap-2 border w-full py-2 md:py-3 rounded-lg hover:bg-gray-50 transition"
                disabled={loading}
              >
                <FaGoogle className="text-red-500" /> Google
              </button>
              <button
                onClick={() => handleSocialLogin('Facebook')}
                className="flex items-center justify-center gap-2 border w-full py-2 md:py-3 rounded-lg hover:bg-gray-50 transition"
                disabled={loading}
              >
                <FaFacebookF className="text-blue-600" /> Facebook
              </button>
            </div>

            <p className="mt-4 md:mt-6 text-sm text-center text-gray-500">
              Already have an account?{' '}
              <a href="/login" className="text-teal-600 font-medium hover:underline">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Spinner CSS */}
      <style jsx>{`
        .spinner {
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top: 3px solid white;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}