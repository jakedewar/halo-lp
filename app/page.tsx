'use client'

import { motion } from 'framer-motion';
import Navbar from "./components/Navbar";
import MockPanel from "./components/MockPanel";
import FloatingToggle from "./components/FloatingToggle";
import { useState, useEffect } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    grecaptcha: {
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const OrbitRing = () => {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[800px] max-h-[800px] pointer-events-none hidden sm:block">
      {/* Outer ring with dots */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          border: '1px dashed rgba(99, 102, 241, 0.2)',
          rotate: '0deg',
        }}
        animate={{
          rotate: [0, 360]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Dots on the outer ring */}
        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-indigo-500/30" />
        <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-indigo-500/30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-indigo-500/30" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-indigo-500/30" />
      </motion.div>

      {/* Middle ring */}
      <motion.div
        className="absolute inset-[100px] rounded-full"
        style={{
          border: '1px solid rgba(99, 102, 241, 0.15)',
        }}
        animate={{
          rotate: [360, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Inner ring with gradient */}
      <motion.div
        className="absolute inset-[200px] rounded-full"
        style={{
          border: '1px solid rgba(99, 102, 241, 0.25)',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 70%)',
        }}
        animate={{
          rotate: [0, 360]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

export default function Home() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [stars, setStars] = useState<Array<{ left: string; top: string; opacity: number; animation: string }>>([]);
  const [formState, setFormState] = useState<{
    email: string;
    price: string;
    status: 'idle' | 'loading' | 'success' | 'error';
    message: string;
  }>({
    email: '',
    price: '',
    status: 'idle',
    message: '',
  });

  useEffect(() => {
    // Generate stars only on client side
    const generatedStars = [...Array(100)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.5 + 0.5,
      animation: `twinkle ${Math.random() * 3 + 2}s infinite alternate`,
    }));
    setStars(generatedStars);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, status: 'loading' }));

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formState.email,
          price: formState.price,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setFormState(prev => ({
        ...prev,
        status: 'success',
        message: data.message,
        email: '',
        price: '',
      }));
    } catch (error) {
      setFormState(prev => ({
        ...prev,
        status: 'error',
        message: error instanceof Error ? error.message : 'Something went wrong',
      }));
    }
  };

  return (
    <main className="relative min-h-screen bg-black">
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        strategy="afterInteractive"
      />
      {/* Minimal background */}
      <div className="fixed inset-0 w-full h-full">
        {/* Base background */}
        <div className="absolute inset-0 bg-[#030303]" />

        {/* Space gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/10 via-purple-900/5 to-blue-900/20" />

        {/* Nebula effect */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-indigo-500/2 rounded-full blur-[60px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/2 rounded-full blur-[60px]" />
        </div>

        {/* Stars */}
        <div className="absolute inset-0">
          {stars.map((star, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white rounded-full"
              style={star}
            />
          ))}
        </div>

        {/* Minimal noise */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.015] mix-blend-overlay" />

        {/* Refined spotlight */}
        <div className="absolute -top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 bg-gradient-to-b from-indigo-500/[0.07] to-blue-500/[0.07] rounded-full blur-[120px]" />
      </div>

      <Navbar />

      {/* Hero Section with Orbital Animation */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32">
        <OrbitRing />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center relative z-10"
        >
          <span className="inline-block text-xs font-medium tracking-wide uppercase text-indigo-300/70 mb-4 sm:mb-6">
            Launching soon in Private Beta
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6 sm:mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-200 to-blue-300">
              Your Second Brain.
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-200 to-indigo-300">
              Everywhere You Browse.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-white/50 mb-8 sm:mb-12 max-w-xl mx-auto leading-relaxed px-4 sm:px-0">
            Halo is a Chrome extension that captures your thoughts, links, and tasks as you browse — turning your scattered digital world into a structured second brain.
          </p>
          <motion.div
            className="flex flex-col items-center gap-4 max-w-md mx-auto px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            id="join-waitlist"
          >
            <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-white/50">What would Halo be worth to you?</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { value: '0', label: '$0' },
                    { value: '5', label: '$5' },
                    { value: '10', label: '$10' },
                    { value: '15', label: '$15+' }
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="relative flex items-center justify-center px-3 sm:px-4 py-2.5 rounded-md bg-white/5 border border-white/10 text-white cursor-pointer hover:border-indigo-500/50 transition-colors duration-200 [&:has(input:checked)]:border-indigo-500"
                    >
                      <input
                        type="radio"
                        name="price"
                        value={option.value}
                        checked={formState.price === option.value}
                        onChange={(e) => setFormState(prev => ({ ...prev, price: e.target.value }))}
                        className="sr-only"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-white/50">Your email address</label>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-md bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500/50 transition-colors duration-200"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={formState.status === 'loading'}
                className="w-full px-4 py-2.5 rounded-md bg-indigo-500 text-white hover:bg-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {formState.status === 'loading' ? 'Joining...' : 'Join Waitlist →'}
              </button>
              {formState.status === 'success' && (
                <p className="text-sm text-green-400">{formState.message}</p>
              )}
              {formState.status === 'error' && (
                <p className="text-sm text-red-400">{formState.message}</p>
              )}
            </form>
          </motion.div>
        </motion.div>
      </div>

      {/* Mock Panel */}
      <MockPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} />

      {/* Floating Toggle */}
      <FloatingToggle onClick={() => setIsPanelOpen(true)} />
    </main>
  );
}
