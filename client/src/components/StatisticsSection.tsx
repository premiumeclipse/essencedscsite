import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { Statistic, Testimonial } from "@shared/schema";

export default function StatisticsSection() {
  const { data: statistics } = useQuery<Statistic>({
    queryKey: ['/api/statistics'],
  });
  
  const { data: testimonials } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
  });
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();
  
  const [animatedStats, setAnimatedStats] = useState({
    servers: 0,
    users: 0,
    commands_executed: 0,
    uptime: "0%"
  });
  
  useEffect(() => {
    if (isInView && statistics) {
      controls.start("visible");
      
      // Animate the statistics
      const duration = 2000; // 2 seconds
      const steps = 50;
      const interval = duration / steps;
      
      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        
        setAnimatedStats({
          servers: Math.floor(progress * statistics.servers),
          users: Math.floor(progress * statistics.users),
          commands_executed: Math.floor(progress * statistics.commands_executed),
          uptime: step === steps ? statistics.uptime : `${Math.floor(progress * 99.9)}%`
        });
        
        if (step >= steps) {
          clearInterval(timer);
        }
      }, interval);
      
      return () => clearInterval(timer);
    }
  }, [isInView, statistics, controls]);
  
  // Format numbers with commas for thousands
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M+`;
    }
    return num.toLocaleString();
  };
  
  // Render star ratings
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" />);
    }
    
    return stars;
  };
  
  return (
    <section id="statistics" className="py-20 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Growing Stronger Every Day</h2>
          <p className="text-muted-foreground">Join thousands of communities already using HarmonyBot to enhance their Discord experience.</p>
        </motion.div>
        
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div 
            className="bg-secondary p-6 rounded-xl border border-muted text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 20 }
            }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            <div className="text-4xl font-bold mb-2">{formatNumber(animatedStats.servers)}</div>
            <p className="text-muted-foreground">Active Servers</p>
          </motion.div>
          
          <motion.div 
            className="bg-secondary p-6 rounded-xl border border-muted text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 20 }
            }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="text-4xl font-bold mb-2">{formatNumber(animatedStats.users)}</div>
            <p className="text-muted-foreground">Users Reached</p>
          </motion.div>
          
          <motion.div 
            className="bg-secondary p-6 rounded-xl border border-muted text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 20 }
            }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-4xl font-bold mb-2">{formatNumber(animatedStats.commands_executed)}</div>
            <p className="text-muted-foreground">Commands Executed</p>
          </motion.div>
          
          <motion.div 
            className="bg-secondary p-6 rounded-xl border border-muted text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 20 }
            }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="text-4xl font-bold mb-2">{animatedStats.uptime}</div>
            <p className="text-muted-foreground">Uptime Reliability</p>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-16 bg-secondary p-8 rounded-xl border border-muted"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">What Our Users Say</h3>
            <p className="text-muted-foreground">Don't just take our word for it.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials?.map((testimonial, index) => (
              <motion.div 
                key={testimonial.id}
                className="bg-background p-5 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-muted"></div>
                  <div className="ml-3">
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-muted-foreground text-sm">{testimonial.community}</div>
                  </div>
                </div>
                <p className="text-muted-foreground">{testimonial.content}</p>
                <div className="mt-3 flex text-[#FEE75C]">
                  {renderStars(testimonial.rating)}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
