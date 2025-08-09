'use client';

import Link from 'next/link';
import { FaGithub, FaTwitter, FaInstagram, FaClipboardList, FaBookmark, FaEdit, FaCheck } from 'react-icons/fa';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#131515] text-white">
      <nav className="fixed top-0 w-full bg-[#131515]/80 backdrop-blur-sm border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-red-500 text-2xl font-bold tracking-tighter">/ Stash</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/signin" className="text-gray-300 hover:text-white transition-colors">
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                <span className="block">Your Digital Life</span>
                <span className="block text-red-500 mt-2">Organized & Accessible</span>
              </h1>
              <p className="mt-6 text-xl text-gray-400 max-w-3xl mx-auto">
                A powerful platform that brings all your digital content together. From tasks to bookmarks, notes to media - everything in one secure place.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/signup"
                  className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors inline-block"
                >
                  Start Free Trial
                </Link>
                <Link
                  href="/signin"
                  className="border border-gray-600 hover:border-gray-500 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors inline-block"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="py-16 bg-[#131515]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Everything You Need to Stay Organized</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl bg-[#343a40] border border-gray-700 hover:border-red-500/50 transition-colors">
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-4">
                  <FaClipboardList className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Task Management</h3>
                <ul className="text-gray-400 space-y-2">
                  <li>• Create and organize tasks</li>
                  <li>• Set priorities and deadlines</li>
                  <li>• Track progress easily</li>
                  <li>• Get reminders and notifications</li>
                </ul>
              </div>

              <div className="p-6 rounded-xl bg-[#343a40] border border-gray-700 hover:border-red-500/50 transition-colors">
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-4">
                  <FaBookmark className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Powerful Bookmarks</h3>
                <ul className="text-gray-400 space-y-2">
                  <li>• Save and categorize links</li>
                  <li>• Add tags and descriptions</li>
                  <li>• Quick search and filter</li>
                  <li>• Share collections easily</li>
                </ul>
              </div>

              <div className="p-6 rounded-xl bg-[#343a40] border border-gray-700 hover:border-red-500/50 transition-colors">
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-4">
                  <FaEdit className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Rich Notes & Media</h3>
                <ul className="text-gray-400 space-y-2">
                  <li>• Create detailed notes</li>
                  <li>• Store images and videos</li>
                  <li>• Organize documents</li>
                  <li>• Access anywhere, anytime</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Why Choose Stash?</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <FaCheck className="w-4 h-4 text-red-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Secure & Private</h3>
                      <p className="text-gray-400">Your data is encrypted and protected with enterprise-grade security.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <FaCheck className="w-4 h-4 text-red-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Cross-Platform Access</h3>
                      <p className="text-gray-400">Access your content from any device, anywhere in the world.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <FaCheck className="w-4 h-4 text-red-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Smart Organization</h3>
                      <p className="text-gray-400">AI-powered suggestions and automatic categorization of your content.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#343a40] rounded-xl p-8 border border-gray-700">
                <h3 className="text-2xl font-bold mb-6">Ready to Get Started?</h3>
                <p className="text-gray-400 mb-8">Join thousands of users who are already organizing their digital life with Stash.</p>
                <div className="space-y-4">
                  <Link
                    href="/signup"
                    className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors inline-block text-center"
                  >
                    Create Free Account
                  </Link>
                  <p className="text-center text-gray-400 text-sm">
                    Already have an account?{' '}
                    <Link href="/signin" className="text-red-500 hover:text-red-400">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[#131515] border-t border-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <span className="text-red-500 text-xl font-bold tracking-tighter">/ Stash</span>
              <p className="mt-4 text-gray-400 text-sm">
                Your all-in-one digital organization platform.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end">
              <h4 className="text-sm font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaGithub className="w-6 h-6" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaTwitter className="w-6 h-6" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaInstagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            © 2024 Stash. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}