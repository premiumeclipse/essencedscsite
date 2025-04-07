import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Bat component
const Bat = ({ delay, duration, size, startPos }: 
  { delay: number; duration: number; size: number; startPos: {x: string, y: string} }) => {
  
  return (
    <motion.div
      className="absolute z-10 text-black"
      initial={{ 
        x: startPos.x, 
        y: startPos.y, 
        opacity: 0,
        scale: 0
      }}
      animate={{ 
        x: ["0vw", "30vw", "60vw", "100vw"],
        y: ["0vh", "20vh", "10vh", "30vh"],
        opacity: [0, 1, 1, 0],
        scale: [0.7, 1, 0.9, 0.8]
      }}
      transition={{ 
        x: { duration, ease: "easeInOut", repeat: Infinity, delay },
        y: { duration, ease: "easeInOut", repeat: Infinity, delay },
        opacity: { duration: duration / 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", delay },
        scale: { duration: duration / 4, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", delay }
      }}
      style={{ 
        fontSize: `${size}px`
      }}
    >
      🦇
    </motion.div>
  );
};

// Generate random bat positions
const generateBats = (count: number) => {
  const bats = [];
  for (let i = 0; i < count; i++) {
    bats.push({
      id: i,
      startPos: {
        x: `${Math.random() * -20}%`,
        y: `${Math.random() * 30}%`
      },
      size: Math.random() * 10 + 20,
      delay: Math.random() * 5,
      duration: Math.random() * 15 + 15
    });
  }
  return bats;
};

// Floating ghost component
const Ghost = ({ delay, position }: { delay: number, position: {x: string, y: string} }) => {
  return (
    <motion.div
      className="absolute text-white opacity-30"
      initial={{ 
        x: position.x, 
        y: position.y, 
        opacity: 0 
      }}
      animate={{ 
        y: [position.y, `calc(${position.y} - 30px)`, position.y],
        opacity: [0.2, 0.4, 0.2]
      }}
      transition={{ 
        y: { duration: 3, ease: "easeInOut", repeat: Infinity, delay },
        opacity: { duration: 3, ease: "easeInOut", repeat: Infinity, delay }
      }}
      style={{ 
        fontSize: "40px"
      }}
    >
      👻
    </motion.div>
  );
};

export default function HalloweenEffects() {
  const [bats, setBats] = useState<any[]>([]);

  useEffect(() => {
    setBats(generateBats(8));
  }, []);

  return (
    <>
      {/* Halloween Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Dark overlay with orange tint */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-900/10 to-purple-900/5"></div>
        
        {/* Flying bats */}
        {bats.map((bat) => (
          <Bat
            key={bat.id}
            startPos={bat.startPos}
            size={bat.size}
            delay={bat.delay}
            duration={bat.duration}
          />
        ))}
        
        {/* Ghosts */}
        <Ghost position={{ x: '5%', y: '30%' }} delay={0} />
        <Ghost position={{ x: '80%', y: '60%' }} delay={1.5} />
        
        {/* Jack-o-lantern at the bottom corner */}
        <div className="absolute bottom-10 right-10 opacity-70 hidden md:block">
          <div className="text-6xl">
            🎃
          </div>
        </div>
        
        {/* Spider web in the top corner */}
        <div className="absolute top-0 left-0 opacity-30 hidden md:block">
          <div className="text-7xl rotate-45">
            🕸️
          </div>
        </div>
      </div>
    </>
  );
}