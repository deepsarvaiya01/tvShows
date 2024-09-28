import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const HDEntAnimation = () => {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // Trigger animation when the component mounts
    setShowAnimation(true);

    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 3000); // Show animation for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  const letters = "H&D ENTERTAINMENT".split("");

  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden bg-black">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-black opacity-70"></div>

      <motion.div
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: showAnimation ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
      >
        <div className="flex">
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              className="text-white text-6xl md:text-8xl font-bold tracking-wide"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
                type: "spring",
                stiffness: 200,
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default HDEntAnimation;
