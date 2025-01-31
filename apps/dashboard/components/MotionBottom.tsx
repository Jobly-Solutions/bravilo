import React, { useRef } from 'react';
import Motion, { CustomMotionProps } from '@chaindesk/ui/Motion'; // Cambia 'Props' por 'CustomMotionProps'

type Props = CustomMotionProps & {}; // Ahora Props usa CustomMotionProps

export default function MotionBottom({ children, ...props }: Props) {
  const ref = useRef(null);

  return (
    <Motion ref={ref} {...props}>
      {children}
    </Motion>
  );
}
