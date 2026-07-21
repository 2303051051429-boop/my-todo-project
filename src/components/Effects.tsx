import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function BackgroundEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Random static crosses
  const [crosses] = useState(() => Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    opacity: Math.random() * 0.3 + 0.1,
    scale: Math.random() * 0.4 + 0.4,
  })));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050505]">
      {/* Moving Ambient Gradients */}
      <motion.div 
        className="absolute w-[120vw] h-[120vh] -left-[10vw] -top-[10vh] opacity-20"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(217,255,0,0.03) 0%, rgba(0,0,0,0) 50%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "easeInOut"
        }}
      />
      
      {/* Kinetic Grid Lines - Horizontal */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent w-[200vw]"
          style={{ top: `${(i + 1) * 16}%`, left: '-50vw' }}
          animate={{ x: ['-20%', '20%', '-20%'] }}
          transition={{ duration: 30 + i * 15, repeat: Infinity, ease: 'linear' }}
        />
      ))}

      {/* Kinetic Grid Lines - Vertical */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`v-${i}`}
          className="absolute w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent h-[200vh]"
          style={{ left: `${(i + 1) * 15}%`, top: '-50vh' }}
          animate={{ y: ['-20%', '20%', '-20%'] }}
          transition={{ duration: 40 + i * 8, repeat: Infinity, ease: 'linear' }}
        />
      ))}

      {/* Scattered Crosses */}
      {crosses.map((c) => (
        <div 
          key={c.id} 
          className="absolute w-4 h-4 flex items-center justify-center mix-blend-screen"
          style={{ left: `${c.x}%`, top: `${c.y}%`, opacity: c.opacity, transform: `scale(${c.scale})` }}
        >
          <div className="absolute w-full h-[1px] bg-[#d9ff00]" />
          <div className="absolute h-full w-[1px] bg-[#d9ff00]" />
        </div>
      ))}

      {/* Mouse Follow Glow */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full opacity-40 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(217,255,0,0.05) 0%, rgba(5,5,5,0) 60%)',
          left: -400,
          top: -400,
        }}
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 1.5 }}
      />
    </div>
  );
}

export function ClickRipples() {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Don't spawn ripples if clicking inside an input
      if ((e.target as HTMLElement).tagName === 'INPUT') return;
      
      const newRipple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev, newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 1000);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute flex items-center justify-center"
            style={{
              left: ripple.x - 50,
              top: ripple.y - 50,
              width: 100,
              height: 100,
            }}
          >
            {/* Box expanding out */}
            <motion.div 
              className="absolute border border-[#d9ff00]"
              initial={{ width: 0, height: 0 }}
              animate={{ width: 80, height: 80, rotate: 90 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            {/* Cross fading out */}
            <div className="absolute w-[120%] h-[1px] bg-[#d9ff00]/50" />
            <div className="absolute h-[120%] w-[1px] bg-[#d9ff00]/50" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

