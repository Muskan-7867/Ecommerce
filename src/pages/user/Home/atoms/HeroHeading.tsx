import { motion, useScroll, useTransform } from "motion/react";
import { GoArrowRight} from "react-icons/go";
import { Link } from "react-router-dom";
const HeroHeading = ({
  containerRef
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const fontSizex = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 0.9, 1],
    ["10vw", "8vw", "6vw", "5vw", "4vw"]
  );

  const fontSizey = useTransform(
    scrollYProgress,
    [0.3, 0.5, 0.7, 0.9, 1],
    ["10vw", "9vw", "8vw", "7vw", "6vw"]
  );

  return (
    <div
      ref={containerRef}
      className="absolute left-0 w-full h-[10rem] flex flex-col justify-center items-center z-10  gap-22"
    >
      <div className="  flex flex-col justify-center items-center text-white ">
        <motion.h1
          style={{ fontSize: fontSizex }}
          className="text-[10vw] lg:[5rem] md:[5rem] leading-none font-bold font-serif text-center text-shadow-sm"
        >
          Omeg
        </motion.h1>
        <motion.h1
          style={{ fontSize: fontSizey }}
          className="text-[10vw] lg:[5rem] md:[5rem] leading-none font-semibold font-serif text-shadow-sm"
        >
          Bazaar
        </motion.h1>
      </div>

      <Link
        to="/products"
        className="bg-primary rounded-full text-sm text-white px-4 py-2 flex items-center lg:gap-2"
      >
        Our Products
        <GoArrowRight className="transition-transform duration-300 hover:translate-x-1 hover:-translate-y-1" />

      </Link>
    </div>
  );
};

export default HeroHeading;
