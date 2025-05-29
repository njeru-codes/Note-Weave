'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // For redirecting and search params
import { FaGoogle, FaFacebookF, FaEye, FaEyeSlash } from 'react-icons/fa'; // Add eye icons
import NavBar from '@/components/NavBar'; // Adjust path as needed

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const [showPassword, setShowPassword] = useState(false); // Add password reveal state

  // Handle Google callback and token storage
  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      setLoading(true);
      fetch('https://note-weave-y0vf.onrender.com/auth/google/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({ credential: code }),
      })
        .then((res) => {
          if (!res.ok) throw new Error('Failed to authenticate with Google');
          return res.json();
        })
        .then((data) => {
          const token = data['X-weaver-key'];
          if (token) {
            localStorage.setItem('token', token);
            setSuccess('Login successful with Google!');
            setTimeout(() => {
              router.push('/home');
            }, 1500);
          } else {
            throw new Error('No token received');
          }
        })
        .catch((err) => {
          setError('Failed to complete Google login. Please try again.');
          console.error('OAuth error:', err);
        })
        .finally(() => setLoading(false));
    }
  }, [searchParams, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setError('All fields are required.');
      setSuccess('');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('https://note-weave-y0vf.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok && response.status === 200) {
        const token = data['X-weaver-key'];
        if (token) {
          localStorage.setItem('token', token);
        } else {
          console.warn('No token found in response');
        }
        setSuccess(data.message || 'Login successful!');
        setTimeout(() => {
          router.push('/home');
        }, 1500);
      } else {
        setError(data.message || 'Failed to login. Please check your credentials.');
        setSuccess('');
      }
    } catch (err) {
      setError('An error occurred. Please check your connection and try again.');
      setSuccess('');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://note-weave-y0vf.onrender.com/auth/google', {
        method: 'GET',
        headers: {
          'accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch Google login URL');
      }

      const data = await response.json();
      const redirectUrl = data.redirect_url;

      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        throw new Error('No redirect URL received from server');
      }
    } catch (err) {
      setError('Failed to initiate Google login: ' + err.message);
      console.error('Google login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    if (provider === 'Google') {
      handleGoogleLogin();
    } else if (provider === 'Facebook') {
      console.log(`Logging in with ${provider}`);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gradient-to-r from-teal-700 to-teal-500 overflow-hidden">
      <NavBar />
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col-reverse md:flex-row w-full max-w-5xl h-full md:h-auto max-h-[calc(100vh-64px)]">
          {/* Left side - Illustration */}
          <div className="md:w-1/2 bg-teal-600 text-white p-8 flex flex-col justify-center items-start">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Simplify note-taking with NoteWeave.</h2>
            <p className="text-white/80 mb-6 text-sm md:text-base">
              Organize, edit and export your thoughts beautifully with our web editor.
            </p>
            <img
              src="/login_hero.png"
              alt="Illustration"
              className="w-full max-w-[300px] md:max-w-[400px] mt-auto"
            />
          </div>

          {/* Right side - Login Form */}
          <div className="md:w-1/2 p-8 flex flex-col justify-center">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-sm text-gray-500 mb-4 md:mb-6">Please login to your account</p>

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
                disabled={loading}
              />
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 md:py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-600 hover:text-teal-700 focus:outline-none"
                  disabled={loading}
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
              <div className="text-right text-sm">
                <a href="#" className="text-teal-600 hover:underline">
                  Forgot password?
                </a>
              </div>

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
                  'Login'
                )}
              </button>
            </form>

            {/* Social login */}
            <div className="my-4 md:my-6 flex items-center gap-4">
              <div className="flex-grow h-px bg-gray-200" />
              <span className="text-gray-400 text-sm">Or Login with</span>
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
              Don’t have an account?{' '}
              <a href="/signup" className="text-teal-600 font-medium hover:underline">
                Signup
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