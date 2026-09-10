import { motion } from 'framer-motion';

export default function AnimatedSection({ children, id, className = '' }) {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.section
      id={id}
      className={`py-20 ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      {children}
    </motion.section>
  );
}
