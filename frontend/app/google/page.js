'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // For redirecting and search params
import NavBar from '@/components/NavBar'; // Adjust path as needed

// Component to handle search params and Google callback
function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams(); // Use useSearchParams inside the component
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const [action, setAction] = useState(''); // Track whether it's login or signup

  // Handle Google callback and token storage
  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      setLoading(true);
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google/callback`, {
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
            setSuccess(`Successfully ${action === 'login' ? 'signed in' : 'signed up'} with Google!`);
            setTimeout(() => {
              router.push('/home');
            }, 1500);
          } else {
            throw new Error('No token received');
          }
        })
        .catch((err) => {
          setError(`Failed to complete Google ${action || 'authentication'}. Please try again.`);
          console.error('OAuth error:', err);
        })
        .finally(() => setLoading(false));
    }
  }, [searchParams, router, action]);

  const handleGoogleAuth = async (authAction) => {
    setAction(authAction); // Set the action (login or signup)
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`, {
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
      setError(`Failed to initiate Google ${authAction}: ${err.message}`);
      console.error(`Google ${authAction} error:`, err);
    } finally {
      setLoading(false);
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
              Organize, edit, and export your thoughts beautifully with our web editor.
            </p>
            <img
              src="/login_hero.png"
              alt="Illustration"
              className="w-full max-w-[300px] md:max-w-[400px] mt-auto"
            />
          </div>

          {/* Right side - Auth Section */}
          <div className="md:w-1/2 p-8 flex flex-col justify-center">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">Welcome to NoteWeave</h2>
            <p className="text-sm text-gray-500 mb-4 md:mb-6">Sign in or sign up to continue</p>

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

            {/* Google Sign-In and Sign-Up Buttons */}
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleGoogleAuth('login')}
                className={`flex items-center justify-center gap-3 w-full py-2.5 px-4 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={loading}
              >
                {loading ? (
                  <div className="spinner"></div>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1.01.68-2.3 1.09-3.71 1.09-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C4 20.65 7.67 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.67 1 4 3.35 2.18 7.07l3.66 2.84c.87-2.6 3.30-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Sign in with Google
                  </>
                )}
              </button>
              <button
                onClick={() => handleGoogleAuth('signup')}
                className={`flex items-center justify-center gap-3 w-full py-2.5 px-4 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={loading}
              >
                {loading ? (
                  <div className="spinner"></div>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1.01.68-2.3 1.09-3.71 1.09-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C4 20.65 7.67 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.67 1 4 3.35 2.18 7.07l3.66 2.84c.87-2.6 3.30-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Sign up with Google
                  </>
                )}
              </button>
            </div>

            <p className="mt-4 md:mt-6 text-sm text-center text-gray-500">
              By continuing, you agree to our{' '}
              <a href="#" className="text-teal-600 hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-teal-600 hover:underline">
                Privacy Policy
              </a>.
            </p>
          </div>
        </div>
      </div>

      {/* Spinner CSS */}
      <style jsx>{`
        .spinner {
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top: 3px solid #4b5563; /* Gray-600 */
          border-radius: 50%;
          width: 20px;
          height: 20px;
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

// Wrap the component in Suspense
export default function LoginPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}