'use client'

import { motion } from 'framer-motion';
import { Circle } from 'lucide-react';

interface FloatingToggleProps {
    onClick: () => void;
}

export default function FloatingToggle({ onClick }: FloatingToggleProps) {
    return (
        <motion.button
            onClick={onClick}
            className="fixed right-8 top-1/2 -translate-y-1/2 z-40 border border-white/[0.05] backdrop-blur-sm rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <div className="relative">
                {/* Outer glow */}
                <motion.div
                    className="absolute inset-0 rounded-full bg-indigo-500/20 blur-xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Button */}
                <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-[#030303] border border-white/[0.05] shadow-lg backdrop-blur-sm">
                    <Circle className="w-5 h-5 text-indigo-300" strokeWidth={2.5} />
                </div>
            </div>
        </motion.button>
    );
} 