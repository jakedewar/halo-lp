'use client'

import { useState, useEffect } from 'react';
import Script from 'next/script';
import TinyFunnel from './components/TinyFunnel';

declare global {
  interface Window {
    grecaptcha: {
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export default function Home() {
  const [stars, setStars] = useState<Array<{ left: string; top: string; opacity: number; animation: string }>>([]);

  useEffect(() => {
    // Generate stars only on client side
    const generatedStars = [...Array(50)].map(() => ({ // Reduced number of stars on mobile
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.5 + 0.5,
      animation: `twinkle ${Math.random() * 3 + 2}s infinite alternate`,
    }));
    setStars(generatedStars);
  }, []);

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

        {/* Space gradient - simplified on mobile */}
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/10 via-purple-900/5 to-blue-900/20 sm:from-indigo-900/10 sm:via-purple-900/5 sm:to-blue-900/20" />

        {/* Nebula effect - simplified on mobile */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-indigo-500/2 rounded-full blur-[30px] sm:blur-[60px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] sm:w-[500px] sm:h-[500px] bg-purple-500/2 rounded-full blur-[30px] sm:blur-[60px]" />
        </div>

        {/* Stars - reduced on mobile */}
        <div className="absolute inset-0">
          {stars.map((star, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white rounded-full"
              style={{
                ...star,
                willChange: 'opacity',
                transform: 'translateZ(0)'
              }}
            />
          ))}
        </div>

        {/* Minimal noise - reduced on mobile */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.01] sm:opacity-[0.015] mix-blend-overlay" />

        {/* Refined spotlight - simplified on mobile */}
        <div className="absolute -top-1/2 left-1/2 w-[400px] h-[400px] sm:w-[800px] sm:h-[800px] -translate-x-1/2 bg-gradient-to-b from-indigo-500/[0.05] to-blue-500/[0.05] sm:from-indigo-500/[0.07] sm:to-blue-500/[0.07] rounded-full blur-[60px] sm:blur-[120px]" />
      </div>

      {/* TinyFunnel Component */}
      <div className="relative z-10">
        <TinyFunnel />
      </div>

      {/* Footer Bar */}
      <footer className="relative z-10 w-full py-4 mt-16 border-t border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center text-sm text-gray-400">
            © {new Date().getFullYear()} Halo LP. All rights reserved.
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes twinkle {
          0% { opacity: 0.2; }
          100% { opacity: 1; }
        }
      `}</style>
    </main>
  );
}
