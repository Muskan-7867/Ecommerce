import { useRef } from "react";
import AnimatedUi from "../../../../components/common/AnimatedUi";
import { useMotionValue } from "motion/react";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const x1 = useMotionValue(0);
  const y1 = useMotionValue(0);

  const handleMove = (e: React.MouseEvent) => {
    x1.set(e.clientX);
    y1.set(e.clientY);
  };

  return (
    <div
      onMouseMove={handleMove}
      ref={containerRef}
      className="w-full 2xl:h-[48rem] sm:h-[40rem] md:h-[40rem] lg:h-screen  relative overflow-hidden" 
    >
      <AnimatedUi x1={x1} y1={y1} containerRef={containerRef} />
    </div>
  );
};

export default Hero;
