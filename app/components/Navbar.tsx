'use client'

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Circle } from 'lucide-react';

export default function Navbar() {
    return (
        <div className="fixed w-full z-50 top-0 left-0 px-4 sm:px-6 lg:px-8 pt-6">
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-5xl mx-auto bg-black/30 backdrop-blur-sm px-6 py-4 rounded-lg border border-white/[0.05] bg-gradient-to-b from-white/[0.05] to-transparent backdrop-blur-[2px]"
            >
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 group">
                        <Circle className="w-5 h-5 text-indigo-300 group-hover:text-indigo-200 transition-colors duration-200" />
                        <span className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r text-white">
                            Halo
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-6">
                        <Link
                            href="#features"
                            className="text-xs text-white/50 hover:text-white transition-colors duration-200"
                        >
                            Why Halo
                        </Link>
                        <Link
                            href="#future"
                            className="text-xs text-white/50 hover:text-white transition-colors duration-200"
                        >
                            Vision
                        </Link>
                        <Link
                            href="/pricing"
                            className="text-xs text-white/50 hover:text-white transition-colors duration-200"
                        >
                            Pricing
                        </Link>
                        <Link
                            href="#"
                            className="text-xs px-4 py-2 rounded-md bg-indigo-500 text-white hover:bg-indigo-400 transition-colors duration-200"
                        >
                            Join Waitlist →
                        </Link>
                    </div>
                </div>
            </motion.nav>
        </div>
    );
} 