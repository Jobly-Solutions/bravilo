import { motion } from "framer-motion";
import React, { forwardRef } from "react";

type Props = {
  children: React.ReactNode;
};

const Motion = forwardRef<HTMLDivElement, Props>(function Motion(
  { children },
  ref
) {
  return <motion.div ref={ref as React.Ref<HTMLDivElement>}>{children}</motion.div>;
});

export default Motion;
