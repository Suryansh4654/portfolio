import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function CountUp({ end, suffix = '', duration = 2, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const spring = useSpring(0, { duration: duration * 1000, bounce: 0 });
  const displayValue = useTransform(spring, (current) => {
    if (Number.isInteger(end)) {
      return Math.floor(current) + suffix;
    }
    // Preserve decimal places for float values like CGPA 8.23
    const decimals = (String(end).split('.')[1] || '').length;
    return current.toFixed(decimals) + suffix;
  });

  useEffect(() => {
    if (isInView) {
      spring.set(end);
    }
  }, [isInView, end, spring]);

  return (
    <motion.span ref={ref} className={className}>
      {displayValue}
    </motion.span>
  );
}
