import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Snowflake component with improved visual
const Snowflake = ({ delay, duration, size, left, type }: 
  { delay: number; duration: number; size: number; left: string; type: string }) => {
  
  return (
    <motion.div
      className="absolute z-10 text-white"
      initial={{ y: -20, x: left, opacity: 0 }}
      animate={{ 
        y: ["0vh", "100vh"],
        opacity: [0, 0.9, 0.7, 0.5, 0],
        rotate: [0, 360],
        scale: [0.8, 1, 0.9, 1, 0.8],
      }}
      transition={{ 
        y: { duration, ease: "linear", repeat: Infinity, delay },
        opacity: { duration, ease: "linear", repeat: Infinity, delay },
        rotate: { duration: duration * 2, ease: "linear", repeat: Infinity, delay },
        scale: { duration: duration / 2, ease: "easeInOut", repeat: Infinity, delay }
      }}
      style={{ 
        fontSize: `${size}px`,
        left,
        top: "-20px",
        filter: "drop-shadow(0 0 3px rgba(255,255,255,0.5))",
      }}
    >
      {type === 'snow' ? '❄️' : '✨'}
    </motion.div>
  );
};

// Snow pile component with glowing effect
const SnowPile = ({ position }: { position: { bottom: string, left: string, width: string } }) => {
  return (
    <div className="relative">
      <div 
        className="absolute bg-white rounded-full opacity-40"
        style={{ 
          bottom: position.bottom,
          left: position.left,
          width: position.width,
          height: '14px',
          boxShadow: "0 0 10px 2px rgba(255,255,255,0.4), 0 0 20px 8px rgba(255,0,0,0.1)"
        }}
      />
      <div 
        className="absolute bg-white rounded-full opacity-70"
        style={{ 
          bottom: `calc(${position.bottom} + 4px)`,
          left: `calc(${position.left} + 5%)`,
          width: `calc(${position.width} - 10%)`,
          height: '8px',
        }}
      />
    </div>
  );
};

// Generate random snowflakes and sparkles
const generateSnowflakes = (count: number) => {
  const items = [];
  for (let i = 0; i < count; i++) {
    items.push({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 14 + 10,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 15,
      type: Math.random() > 0.3 ? 'snow' : 'sparkle'
    });
  }
  return items;
};

// Christmas ornament component
const ChristmasOrnament = ({ position, emoji, scale = 1 }: 
  { position: { top: string, left: string }, emoji: string, scale?: number }) => {
  return (
    <motion.div
      className="absolute"
      style={{
        top: position.top,
        left: position.left,
        fontSize: `${24 * scale}px`,
        filter: "drop-shadow(0 0 5px rgba(255,255,255,0.5))"
      }}
      animate={{
        y: [0, 5, 0, -5, 0],
        rotate: [-5, 0, 5, 0, -5],
        scale: [1, 1.05, 1, 0.95, 1]
      }}
      transition={{
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
      }}
    >
      {emoji}
    </motion.div>
  );
};

// Christmas light string
const ChristmasLights = () => {
  const colors = ['bg-red-500', 'bg-green-500', 'bg-yellow-500', 'bg-blue-500'];
  const lights = [];
  
  for (let i = 0; i < 15; i++) {
    const colorIndex = i % colors.length;
    lights.push(
      <motion.div 
        key={i}
        className={`absolute ${colors[colorIndex]} h-4 w-4 rounded-full`}
        style={{ left: `${i * 7}%`, top: '0' }}
        animate={{
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          repeat: Infinity,
          delay: i * 0.1
        }}
      />
    );
  }
  
  return (
    <div className="absolute top-0 left-0 w-full h-10 overflow-hidden">
      <div className="absolute top-5 left-0 w-full h-1 bg-green-800"></div>
      {lights}
    </div>
  );
};

// Floating Present Component
const FloatingPresent = ({ position, delay }: { position: { bottom: string, right: string }, delay: number }) => {
  return (
    <motion.div 
      className="absolute text-3xl"
      style={{ 
        bottom: position.bottom, 
        right: position.right,
      }}
      initial={{ y: 20, opacity: 0 }}
      animate={{ 
        y: [0, -20, 0],
        opacity: [0.4, 1, 0.4],
        rotate: [-5, 5, -5]
      }}
      transition={{
        duration: 8,
        ease: "easeInOut",
        repeat: Infinity,
        delay
      }}
    >
      🎁
    </motion.div>
  );
};

// Christmas glow spot
const GlowSpot = ({ position, color }: { position: { top: string, left: string }, color: string }) => {
  return (
    <motion.div
      className={`absolute ${color} rounded-full blur-2xl opacity-10`}
      style={{
        top: position.top,
        left: position.left,
        width: '150px',
        height: '150px',
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.1, 0.15, 0.1]
      }}
      transition={{
        duration: 5,
        ease: "easeInOut",
        repeat: Infinity,
      }}
    />
  );
};

export default function ChristmasEffects() {
  const [snowflakes, setSnowflakes] = useState<any[]>([]);

  useEffect(() => {
    setSnowflakes(generateSnowflakes(25));
  }, []);

  return (
    <>
      {/* Christmas Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Christmas overlay with subtle red and green gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/10 to-green-950/10"></div>
        
        {/* Glowing spots */}
        <GlowSpot position={{ top: '20%', left: '10%' }} color="bg-red-600" />
        <GlowSpot position={{ top: '50%', left: '80%' }} color="bg-green-600" />
        <GlowSpot position={{ top: '80%', left: '30%' }} color="bg-red-600" />
        
        {/* Christmas Lights at top */}
        <ChristmasLights />
        
        {/* Falling snowflakes */}
        {snowflakes.map((snowflake) => (
          <Snowflake
            key={snowflake.id}
            left={snowflake.left}
            size={snowflake.size}
            delay={snowflake.delay}
            duration={snowflake.duration}
            type={snowflake.type}
          />
        ))}
        
        {/* Christmas decorations */}
        <ChristmasOrnament position={{ top: '15%', left: '5%' }} emoji="🎄" scale={1.2} />
        <ChristmasOrnament position={{ top: '35%', left: '85%' }} emoji="🎄" />
        <ChristmasOrnament position={{ top: '65%', left: '12%' }} emoji="🎄" />
        <ChristmasOrnament position={{ top: '25%', left: '50%' }} emoji="🔔" scale={0.9} />
        <ChristmasOrnament position={{ top: '75%', left: '75%' }} emoji="🧦" />
        
        {/* Floating presents */}
        <FloatingPresent position={{ bottom: '10%', right: '10%' }} delay={0} />
        <FloatingPresent position={{ bottom: '15%', right: '25%' }} delay={2} />
        <FloatingPresent position={{ bottom: '5%', right: '45%' }} delay={4} />
        
        {/* Snow piles at the bottom */}
        <div className="absolute bottom-0 w-full">
          <SnowPile position={{ bottom: '0', left: '0', width: '50%' }} />
          <SnowPile position={{ bottom: '0', left: '30%', width: '80%' }} />
          <SnowPile position={{ bottom: '0', left: '60%', width: '40%' }} />
        </div>
        
        {/* Santa hat in a corner */}
        <motion.div 
          className="absolute top-5 right-5 opacity-90 hidden md:block"
          animate={{
            y: [0, 5, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity
          }}
        >
          <div className="text-6xl" style={{ filter: "drop-shadow(0 0 5px rgba(255,50,50,0.3))" }}>
            🎅
          </div>
        </motion.div>
      </div>
    </>
  );
}