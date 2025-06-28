import { motion, useInView } from "framer-motion"; // Fixed import (it's 'framer-motion' not 'motion/react')
import Mobile from "../../../../../public/assets/Mobile.png";
import React, { useRef } from "react";
import Lottie from "react-lottie";
import rippleAnimation from "../../../../../public/animations/rippleAnimation.json";

const MobileApp: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  const lottieRef = useRef<any>(null);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: rippleAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div className="relative h-full w-full flex justify-center items-center overflow-hidden">
      {/* Ripple Animation Layers */}
      <motion.div
        ref={ref}
        className="absolute -z-20 w-[26rem] aspect-square"
        animate={{ scale: isInView ? 1 : 0.8 }}
        transition={{ duration: 0.8 }}
      >
        <Lottie
          ref={lottieRef}
          options={defaultOptions}
          height="100%"
          width="100%"
          isClickToPauseDisabled={true}
        />
      </motion.div>

      <motion.div
        className="absolute -z-20 w-[22rem] aspect-square"
        animate={{ scale: isInView ? 1 : 0.8 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Lottie
          options={defaultOptions}
          height="100%"
          width="100%"
          isClickToPauseDisabled={true}
        />
      </motion.div>

      <motion.div
        className="absolute -z-20 w-[18rem] aspect-square"
        animate={{ scale: isInView ? 1 : 0.8 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Lottie
          options={defaultOptions}
          height="100%"
          width="100%"
          isClickToPauseDisabled={true}
        />
      </motion.div>

      <img className="h-[34rem]" src={Mobile} alt="Phone" />
    </div>
  );
};

export default MobileApp;
