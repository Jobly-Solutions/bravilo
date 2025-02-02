import Motion, { CustomMotionProps } from '@chaindesk/ui/Motion';
import React, { useRef } from 'react';

type Props = CustomMotionProps;

export default function MotionBottom({ children, ...props }: Props) {
  const ref = useRef(null);

  return (
    <Motion ref={ref} {...props}>
      {children}
    </Motion>
  );
}
