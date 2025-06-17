'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || 'Something went wrong');
      } else {
        router.push('/signin');
      }
    } catch (err) {
      setError('Failed to connect to server');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#131515] px-4">
      <div className="w-full max-w-md bg-[#343a40] p-8 rounded-xl shadow-lg border border-gray-700">
        <div className="text-center mb-8">
          <h1 className="text-red-500 text-3xl font-bold tracking-tighter mb-2">/ Stash</h1>
          <h2 className="text-2xl font-semibold text-white">Create Account</h2>
          <p className="text-gray-400 mt-2">Join us and start organizing your content</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-300">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Choose a username"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-[#2b2b2b] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-[#2b2b2b] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-[#2b2b2b] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white rounded-lg font-medium transition-colors ${
              loading 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

          {error && (
            <p className="text-red-400 text-sm text-center bg-red-500/10 py-2 px-4 rounded-lg">
              {error}
            </p>
          )}

          <p className="text-center text-gray-400 text-sm">
            Already have an account?{' '}
            <Link href="/signin" className="text-red-500 hover:text-red-400 transition-colors">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
