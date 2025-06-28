
import React, { useRef } from "react";
import  Lottie  from "react-lottie";
import rippleAnimation from "../../../../../public/animations/rippleAnimation.json";

interface RippleAnimationProps {
  className?: string;
}

const RippleAnimation: React.FC<RippleAnimationProps> = ({ className }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lottieRef = useRef<any | null>(null);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: rippleAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleClick = () => {
    if (lottieRef.current) {
      // Force the animation to continue playing
      lottieRef.current.play();
    }
  };

  return (
    <div className={`${className ? className : ""}`} onClick={handleClick}>
      <Lottie
        ref={lottieRef}
        options={defaultOptions}
        height={400}
        width={400}
        isClickToPauseDisabled={true} // Disable the default click-to-pause behavior
      />
    </div>
  );
};

export default RippleAnimation;