import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Snowflake component
const Snowflake = ({ delay, duration, size, left }: 
  { delay: number; duration: number; size: number; left: string }) => {
  
  return (
    <motion.div
      className="absolute z-10 text-white"
      initial={{ y: -20, x: left, opacity: 0 }}
      animate={{ 
        y: ["0vh", "100vh"],
        opacity: [0, 0.8, 0.6, 0.4, 0],
        rotate: [0, 360],
      }}
      transition={{ 
        y: { duration, ease: "linear", repeat: Infinity, delay },
        opacity: { duration, ease: "linear", repeat: Infinity, delay },
        rotate: { duration: duration * 2, ease: "linear", repeat: Infinity, delay }
      }}
      style={{ 
        fontSize: `${size}px`,
        left,
        top: "-20px"
      }}
    >
      ❄️
    </motion.div>
  );
};

// Snow pile component
const SnowPile = ({ position }: { position: { bottom: string, left: string, width: string } }) => {
  return (
    <div 
      className="absolute bg-white rounded-full opacity-50"
      style={{ 
        bottom: position.bottom,
        left: position.left,
        width: position.width,
        height: '10px'
      }}
    />
  );
};

// Generate random snowflakes
const generateSnowflakes = (count: number) => {
  const snowflakes = [];
  for (let i = 0; i < count; i++) {
    snowflakes.push({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 10 + 10,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 15
    });
  }
  return snowflakes;
};

// Christmas ornament component
const ChristmasOrnament = ({ position, color }: 
  { position: { top: string, left: string }, color: string }) => {
  return (
    <motion.div
      className={`absolute ${color} opacity-70`}
      style={{
        top: position.top,
        left: position.left,
        fontSize: '24px'
      }}
      animate={{
        y: [0, 5, 0, -5, 0],
      }}
      transition={{
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
      }}
    >
      🎄
    </motion.div>
  );
};

export default function ChristmasEffects() {
  const [snowflakes, setSnowflakes] = useState<any[]>([]);

  useEffect(() => {
    setSnowflakes(generateSnowflakes(20));
  }, []);

  return (
    <>
      {/* Christmas Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Christmas overlay with subtle red and green gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-800/5 to-green-800/5"></div>
        
        {/* Falling snowflakes */}
        {snowflakes.map((snowflake) => (
          <Snowflake
            key={snowflake.id}
            left={snowflake.left}
            size={snowflake.size}
            delay={snowflake.delay}
            duration={snowflake.duration}
          />
        ))}
        
        {/* Christmas ornaments */}
        <ChristmasOrnament position={{ top: '10%', left: '5%' }} color="text-red-600" />
        <ChristmasOrnament position={{ top: '30%', left: '80%' }} color="text-green-600" />
        <ChristmasOrnament position={{ top: '70%', left: '15%' }} color="text-red-600" />
        
        {/* Snow piles at the bottom */}
        <div className="absolute bottom-0 w-full">
          <SnowPile position={{ bottom: '0', left: '0', width: '40%' }} />
          <SnowPile position={{ bottom: '0', left: '30%', width: '70%' }} />
          <SnowPile position={{ bottom: '0', left: '60%', width: '40%' }} />
        </div>
        
        {/* Santa hat in a corner */}
        <div className="absolute top-5 right-5 opacity-80 hidden md:block">
          <div className="text-6xl">
            🎅
          </div>
        </div>
      </div>
    </>
  );
}