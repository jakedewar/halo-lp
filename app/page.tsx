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
                      className="relative flex items-center justify-center px-3 sm:px-4 py-2.5 rounded-md bg-[#1a1a1a] border border-white/10 text-white cursor-pointer hover:border-indigo-500/50 transition-colors duration-200 [&:has(input:checked)]:border-indigo-500"
                    >
                      <input
                        type="radio"
                        name="price"
                        value={option.value}
                        className="sr-only peer"
                        checked={formState.price === option.value}
                        onChange={(e) => setFormState(prev => ({ ...prev, price: e.target.value }))}
                      />
                      <span className="peer-checked:text-indigo-300 text-sm sm:text-base">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2.5 rounded-md bg-[#1a1a1a] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-sm sm:text-base"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                  disabled={formState.status === 'loading'}
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-md bg-indigo-500 text-sm font-medium text-white hover:bg-indigo-400 transition-colors duration-200 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={formState.status === 'loading'}
                >
                  {formState.status === 'loading' ? 'Joining...' : 'Join Waitlist →'}
                </button>
              </div>
              {formState.status !== 'idle' && (
                <p className={`text-sm ${
                  formState.status === 'success' ? 'text-green-400' :
                  formState.status === 'error' ? 'text-red-400' :
                  'text-white/50'
                }`}>
                  {formState.message}
                </p>
              )}
            </form>
            <p className="text-xs text-white/30">
              Be among the first to experience Halo when we launch.
            </p>
          </motion.div>
        </motion.div>

        {/* Demo Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-32 sm:mt-48 text-center"
        >
          <span className="inline-block text-xs font-medium tracking-wide uppercase text-indigo-300/70 mb-4 sm:mb-6">
            See Halo in Action
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">
            Watch how Halo transforms your digital experience
          </h2>
          <div className="relative w-full max-w-4xl mx-auto aspect-video rounded-lg overflow-hidden border border-white/10 bg-white/5">
            <video
              className="w-full h-full object-cover"
              controls
              playsInline
              preload="metadata"
              controlsList="nodownload"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
            >
              <source src="/Halo-Demo-Web.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          id="features"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-32 sm:mt-48"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Catch Ideas in Their Natural Habitat",
                description: "Your thoughts and discoveries, preserved exactly where they happen."
              },
              {
                title: "Find What You Forgot",
                description: "Every idea and webpage at your fingertips, ready to be rediscovered."
              },
              {
                title: "Move Through Your Digital Universe",
                description: "Navigate your personal constellation of knowledge with natural, fluid motions."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group relative overflow-hidden rounded-lg border border-white/[0.05] bg-gradient-to-b from-white/[0.05] to-transparent p-6 hover:border-indigo-500/20 hover:bg-gradient-to-b hover:from-indigo-500/[0.05] hover:to-transparent backdrop-blur-[2px] transition-all duration-500"
              >
                <div className="relative">
                  <h3 className="text-sm font-medium text-indigo-300 mb-3">{feature.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Current vs Roadmap Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-32 sm:mt-48 text-center px-4 sm:px-0"
        >
          <span className="inline-block text-xs font-medium tracking-wide uppercase text-indigo-300/70 mb-4 sm:mb-6">
            Current vs Roadmap
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
            Where We Are vs Where We&apos;re Going
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Current Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-lg border border-white/[0.05] bg-gradient-to-b from-white/[0.05] to-transparent p-6 hover:border-indigo-500/20 hover:bg-gradient-to-b hover:from-indigo-500/[0.05] hover:to-transparent backdrop-blur-[2px] transition-all duration-500"
            >
              <div className="relative">
                <h3 className="text-sm font-medium text-indigo-300 mb-4">Current Features</h3>
                <ul className="space-y-3 text-left">
                  <li className="text-sm text-white/50 leading-relaxed flex items-start">
                    <span className="text-indigo-400 mr-2">•</span>
                    Capture thoughts and notes while browsing
                  </li>
                  <li className="text-sm text-white/50 leading-relaxed flex items-start">
                    <span className="text-indigo-400 mr-2">•</span>
                    Organize content with the Orbit system
                  </li>
                  <li className="text-sm text-white/50 leading-relaxed flex items-start">
                    <span className="text-indigo-400 mr-2">•</span>
                    Quick access to saved content and tasks
                  </li>
                  <li className="text-sm text-white/50 leading-relaxed flex items-start">
                    <span className="text-indigo-400 mr-2">•</span>
                    Seamless integration with Chrome
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Future AI Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-lg border border-white/[0.05] bg-gradient-to-b from-white/[0.05] to-transparent p-6 hover:border-indigo-500/20 hover:bg-gradient-to-b hover:from-indigo-500/[0.05] hover:to-transparent backdrop-blur-[2px] transition-all duration-500"
            >
              <div className="relative">
                <h3 className="text-sm font-medium text-indigo-300 mb-4">AI-Powered Future</h3>
                <ul className="space-y-3 text-left">
                  <li className="text-sm text-white/50 leading-relaxed flex items-start">
                    <span className="text-indigo-400 mr-2">•</span>
                    Smart content summarization and insights
                  </li>
                  <li className="text-sm text-white/50 leading-relaxed flex items-start">
                    <span className="text-indigo-400 mr-2">•</span>
                    Automated organization and tagging
                  </li>
                  <li className="text-sm text-white/50 leading-relaxed flex items-start">
                    <span className="text-indigo-400 mr-2">•</span>
                    Intelligent search and recommendations
                  </li>
                  <li className="text-sm text-white/50 leading-relaxed flex items-start">
                    <span className="text-indigo-400 mr-2">•</span>
                    Context-aware task prioritization
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
          <div className="mt-8">
            <button
              onClick={() => setIsPanelOpen(true)}
              className="inline-flex items-center rounded-md bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-400 transition-colors duration-200"
            >
              Try Current Features →
            </button>
          </div>
        </motion.div>

        {/* Orbit Concept Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-32 sm:mt-48 text-center px-4 sm:px-0"
        >
          <span className="inline-block text-xs font-medium tracking-wide uppercase text-indigo-300/70 mb-4 sm:mb-6">
            The Orbit Concept
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
            Your Personal Knowledge Satellite
          </h2>
          <p className="text-sm sm:text-base text-white/50 max-w-xl mx-auto leading-relaxed mb-6 sm:mb-8">
            Halo&apos;s unique orbit system creates a dynamic workspace that follows you as you browse. Each orbit represents a collection of related notes, tasks, and ideas tied to specific web pages or domains.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: "Contextual",
                description: "Automatically linked to the pages you visit"
              },
              {
                title: "Persistent",
                description: "Stays with you across browsing sessions"
              },
              {
                title: "Organized",
                description: "Groups related thoughts and tasks together"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group relative overflow-hidden rounded-lg border border-white/[0.05] bg-gradient-to-b from-white/[0.05] to-transparent p-6 hover:border-indigo-500/20 hover:bg-gradient-to-b hover:from-indigo-500/[0.05] hover:to-transparent backdrop-blur-[2px] transition-all duration-500"
              >
                <div className="relative">
                  <h3 className="text-sm font-medium text-indigo-300 mb-3">{feature.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Vision Section */}
        <motion.div
          id="future"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-32 sm:mt-48 text-center mb-20 sm:mb-32 px-4 sm:px-0"
        >
          <span className="inline-block text-xs font-medium tracking-wide uppercase text-indigo-300/70 mb-4 sm:mb-6">
            The Future
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
            This is only the beginning
          </h2>
          <p className="text-sm sm:text-base text-white/50 max-w-xl mx-auto leading-relaxed mb-8 sm:mb-12">
            Today, Halo quietly builds your memory. Tomorrow, it will help you shape the universe of your ideas.
          </p>
          <a
            href="#join-waitlist"
            className="inline-flex items-center rounded-md bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-400 transition-colors duration-200"
          >
            Get Early Access →
          </a>
        </motion.div>

        {/* Mock Panel */}
        <MockPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} />

        {/* Floating Toggle */}
        <div className="hidden sm:block">
          <FloatingToggle onClick={() => setIsPanelOpen(true)} />
        </div>

        {/* Footer */}
        <footer className="border-t border-white/[0.02] py-8 text-center">
          <p className="text-xs text-white/30">Crafted with care for explorers of the digital world</p>
        </footer>
      </div>

      <style jsx global>{`
        @keyframes twinkle {
          0% { opacity: 0.2; }
          100% { opacity: 1; }
        }
      `}</style>
    </main>
  );
}
