'use client'

import Script from 'next/script';
import TinyFunnel from './components/TinyFunnel';
import { ShootingStars } from './components/ShootingStars';

declare global {
  interface Window {
    grecaptcha: {
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        strategy="afterInteractive"
      />
      {/* Background effects */}
      <div className="fixed inset-0 w-full h-full">
        {/* Base background */}
        <div className="absolute inset-0 bg-[#030303]" />

        {/* Shooting stars effect */}
        <ShootingStars numberOfStars={20} className="opacity-70" />

        {/* Space gradient - simplified on mobile */}
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/10 via-purple-900/5 to-blue-900/20 sm:from-indigo-900/10 sm:via-purple-900/5 sm:to-blue-900/20" />

        {/* Nebula effect - simplified on mobile */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-indigo-500/2 rounded-full blur-[30px] sm:blur-[60px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] sm:w-[500px] sm:h-[500px] bg-purple-500/2 rounded-full blur-[30px] sm:blur-[60px]" />
        </div>

        {/* Minimal noise - reduced on mobile */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.01] sm:opacity-[0.015] mix-blend-overlay" />
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
    </main>
  );
}
