'use client'

import { motion } from 'framer-motion';
import Navbar from "./components/Navbar";
import MockPanel from "./components/MockPanel";
import FloatingToggle from "./components/FloatingToggle";
import { useState } from 'react';

const OrbitRing = () => {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[800px] max-h-[800px] pointer-events-none">
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

  return (
    <main className="relative min-h-screen bg-black">
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
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.5,
                animation: `twinkle ${Math.random() * 3 + 2}s infinite alternate`,
              }}
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
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
        <OrbitRing />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center relative z-10"
        >
          <span className="inline-block text-xs font-medium tracking-wide uppercase text-indigo-300/70 mb-6">
            Introducing Halo
          </span>
          <h1 className="text-5xl font-bold tracking-tight text-white mb-8">
            Build Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-200 to-blue-300">
              Digital Orbit
            </span>
          </h1>
          <p className="text-base text-white/50 mb-12 max-w-xl mx-auto leading-relaxed">
            Halo is a Chrome extension that quietly captures your ideas, actions, and discoveries — weaving your digital world into something effortless to remember, search, and build upon.
          </p>
          <motion.div
            className="flex justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href="#"
              className="rounded-md bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-400 transition-colors duration-200"
            >
              Join Waitlist →
            </a>
            <a
              href="#features"
              className="rounded-md px-5 py-2.5 text-sm text-white/50 font-medium hover:text-white transition-colors duration-200"
            >
              Learn More
            </a>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          id="features"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-48"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

        {/* Try it out Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-48 text-center"
        >
          <span className="inline-block text-xs font-medium tracking-wide uppercase text-indigo-300/70 mb-6">
            Try it out
          </span>
          <h2 className="text-2xl font-bold text-white mb-6">
            Experience Halo in action
          </h2>
          <p className="text-base text-white/50 max-w-xl mx-auto leading-relaxed mb-8">
            Get a glimpse of how Halo works with our interactive demo. See how it feels to capture and organize your thoughts effortlessly.
          </p>
          <button
            onClick={() => setIsPanelOpen(true)}
            className="inline-flex items-center rounded-md bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-400 transition-colors duration-200"
          >
            Open Halo Demo →
          </button>
        </motion.div>

        {/* Orbit Concept Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-48 text-center"
        >
          <span className="inline-block text-xs font-medium tracking-wide uppercase text-indigo-300/70 mb-6">
            The Orbit Concept
          </span>
          <h2 className="text-2xl font-bold text-white mb-6">
            Your Personal Knowledge Satellite
          </h2>
          <p className="text-base text-white/50 max-w-xl mx-auto leading-relaxed mb-8">
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
          className="mt-48 text-center mb-32"
        >
          <span className="inline-block text-xs font-medium tracking-wide uppercase text-indigo-300/70 mb-6">
            The Future
          </span>
          <h2 className="text-2xl font-bold text-white mb-6">
            This is only the beginning
          </h2>
          <p className="text-base text-white/50 max-w-xl mx-auto leading-relaxed mb-12">
            Today, Halo quietly builds your memory. Tomorrow, it will help you shape the universe of your ideas.
          </p>
          <a
            href="#"
            className="inline-flex items-center rounded-md bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-400 transition-colors duration-200"
          >
            Get Early Access →
          </a>
        </motion.div>

        {/* Mock Panel */}
        <MockPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} />

        {/* Floating Toggle */}
        <FloatingToggle onClick={() => setIsPanelOpen(true)} />

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
