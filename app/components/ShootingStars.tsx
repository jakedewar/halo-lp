"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const ShootingStars = ({ 
  numberOfStars = 15,
  className = "",
}: { 
  numberOfStars?: number;
  className?: string;
}) => {
  const [stars, setStars] = useState<Array<{ id: number; delay: number; duration: number; size: number }>>([]);

  useEffect(() => {
    const stars = [...Array(numberOfStars)].map((_, i) => ({
      id: i,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
      size: Math.random() * 1.5 + 0.5,
    }));
    setStars(stars);
  }, [numberOfStars]);

  return (
    <div className={`fixed inset-0 ${className}`}>
      {stars.map((star) => (
        <motion.span
          key={star.id}
          animate={{
            x: ["-100%", "200%"],
            y: ["0%", "200%"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 50}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: "white",
            borderRadius: "50%",
            boxShadow: "0 0 3px rgba(255, 255, 255, 0.6), 0 0 6px rgba(255, 255, 255, 0.4)",
            filter: "blur(0.5px)",
          }}
          className="pointer-events-none"
        />
      ))}
    </div>
  );
}; 