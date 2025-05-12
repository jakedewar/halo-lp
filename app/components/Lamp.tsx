"use client";

import { motion } from "framer-motion";

export const Lamp = () => {
  return (
    <div className="absolute inset-x-0 top-0 h-[2px] w-full overflow-hidden">
      <div className="relative h-full w-full">
        <motion.div
          initial={{ opacity: 0.5, width: "100%" }}
          whileInView={{ opacity: 1, width: "100%" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-x-0 h-full bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-x-0 -top-1 h-[1px] w-full bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-x-0 -bottom-1 h-[1px] w-full bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"
        />
        <div className="absolute inset-x-0 top-0 h-[50px] w-full bg-gradient-to-b from-indigo-500/20 to-transparent blur-2xl" />
      </div>
    </div>
  );
}; 