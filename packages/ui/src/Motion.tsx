import { motion, MotionProps } from 'framer-motion';
import { forwardRef } from 'react';

export type CustomMotionProps = MotionProps; // Exporta la tipografía correctamente

const Motion = forwardRef<HTMLDivElement, MotionProps>((props, ref) => {
  return <motion.div ref={ref} {...props} />;
});

export default Motion;
