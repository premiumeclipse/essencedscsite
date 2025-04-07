import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Leaf component
const Leaf = ({ delay, duration, size, left, type }: 
  { delay: number; duration: number; size: number; left: string; type: number }) => {
  
  // Different leaf colors
  const leafColors = [
    "text-yellow-600", // Yellow
    "text-orange-600", // Orange
    "text-red-600",    // Red
    "text-amber-700",  // Amber
    "text-yellow-700"  // Dark yellow
  ];
  
  // Leaf emojis
  const leafType = type % 2 === 0 ? "🍂" : "🍁";
  
  return (
    <motion.div
      className={`absolute z-10 ${leafColors[type % leafColors.length]} opacity-80`}
      initial={{ y: -20, x: left, opacity: 0, rotate: 0 }}
      animate={{ 
        y: ["0vh", "100vh"],
        x: [left, `calc(${left} + 100px)`, `calc(${left} - 50px)`, `calc(${left} + 70px)`],
        opacity: [0, 0.8, 0.9, 0.7, 0.6, 0.2, 0],
        rotate: [0, 60, 120, 180, 240, 300, 360]
      }}
      transition={{ 
        y: { duration, ease: "easeIn", repeat: Infinity, delay },
        x: { duration, ease: "easeInOut", repeat: Infinity, delay },
        opacity: { duration, ease: "linear", repeat: Infinity, delay },
        rotate: { duration: duration * 1.2, ease: "linear", repeat: Infinity, delay }
      }}
      style={{ 
        fontSize: `${size}px`,
        left,
        top: "-20px"
      }}
    >
      {leafType}
    </motion.div>
  );
};

// Generate random leaves
const generateLeaves = (count: number) => {
  const leaves = [];
  for (let i = 0; i < count; i++) {
    leaves.push({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 15 + 20,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 12,
      type: Math.floor(Math.random() * 5)
    });
  }
  return leaves;
};

export default function ThanksgivingEffects() {
  const [leaves, setLeaves] = useState<any[]>([]);

  useEffect(() => {
    setLeaves(generateLeaves(15));
  }, []);

  return (
    <>
      {/* Thanksgiving Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Warm autumn overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-100/5 to-orange-900/5"></div>
        
        {/* Falling leaves */}
        {leaves.map((leaf) => (
          <Leaf
            key={leaf.id}
            left={leaf.left}
            size={leaf.size}
            delay={leaf.delay}
            duration={leaf.duration}
            type={leaf.type}
          />
        ))}
        
        {/* Turkey decoration at the bottom corner */}
        <div className="absolute bottom-10 left-10 opacity-80 hidden md:block">
          <div className="text-6xl">
            🦃
          </div>
        </div>
        
        {/* Pile of leaves */}
        <div className="absolute bottom-0 right-0 w-64 h-32 opacity-60 hidden md:block">
          <div className="absolute bottom-0 right-5 text-4xl">🍂</div>
          <div className="absolute bottom-2 right-12 text-4xl">🍁</div>
          <div className="absolute bottom-4 right-20 text-4xl">🍂</div>
          <div className="absolute bottom-1 right-28 text-4xl">🍁</div>
          <div className="absolute bottom-3 right-36 text-4xl">🍂</div>
          <div className="absolute bottom-0 right-44 text-4xl">🍁</div>
        </div>
        
        {/* Cornucopia decoration */}
        <div className="absolute top-10 right-10 opacity-60 hidden md:block">
          <div className="text-5xl">
            🌽
          </div>
        </div>
      </div>
    </>
  );
}