import { motion, MotionProps } from 'framer-motion';
import React, { useRef } from 'react';

export type Props = Omit<MotionProps, 'children'> & {
  children: ({ ref }: { ref: React.ForwardedRef<any> }) => any;
};

export default motion(
  React.forwardRef<MotionProps, any>(function Motion(
    { children }: Pick<Props, 'children'>,
    ref
  ) {
    return <motion.div ref={ref}>{children}</motion.div>;
  }) as unknown as FC<Props> // 👈 Conversión explícita a 'unknown' y luego a 'FC<Props>'
);