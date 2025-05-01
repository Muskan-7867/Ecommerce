import { MotionValue, useTransform, motion, useSpring } from "framer-motion";
import {Bag, Bottle,cover,perfume} from "../../../src/constants/imagePath.ts";
import HeroHeading from "../../pages/user/Home/atoms/HeroHeading.tsx";
import { useWindowSize } from "../../hooks/useWindowSize.ts";
import GradientLight from "../../pages/user/Home/components/GradientLight.tsx";


const AnimatedUi = ({
  x1,
  y1,
  containerRef
}: {
  x1: MotionValue<number>;
  y1: MotionValue<number>;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const { width: windowWidth, height: windowHeight } = useWindowSize();

  // Spring transforms for horizontal movement
  const springedBag = useSpring(useTransform(x1, [0, windowWidth], [16, -16]));

  const springedPerfume = useSpring(
    useTransform(x1, [0, windowWidth], [20, -20])
  );

  const springedCover = useSpring(
    useTransform(x1, [0, windowWidth], [40, -40])
  );

  // Spring transforms for vertical movement
  const springedy1 = useSpring(useTransform(y1, [0, windowHeight], [20, -20]));
  const springedy2 = useSpring(useTransform(y1, [0, windowHeight], [10, -10]));
  const rotate = useSpring(useTransform(x1, [0, windowWidth], [0, 20]));

  // Responsive size classes
  const mediumImageClass = "w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28";
  const largeImageClass = "w-20 h-20 sm:w-28 sm:h-28 md:w-34 md:h-34";

  return (
    <div className="flex justify-center items-center w-full overflow-x-hidden">
      <div className="w-full lg:min-h-screen md:h-[40rem] h-[30rem] flex justify-center relative ">
        {/* Outer blurred images - hidden on mobile */}
        <motion.img
          src={Bag}
          className={`${mediumImageClass} object-cover absolute top-24 left-5 right-0 blur-[2px] hidden sm:block`}
          style={{ x: springedBag, y: springedy1, rotate: rotate }}
        />

        <motion.img
          src={perfume} className={`${largeImageClass} object-cover absolute top-[6rem] left-[10rem] md:left-[20rem] blur-[1px] hidden sm:block`}
          style={{ x: springedPerfume, y: springedy2 }}
        />

        <motion.img
          src={Bottle}  className={`${largeImageClass} object-cover absolute top-[16rem] sm:top-[26rem] lg:left-[8rem] md:left-[20rem] blur-[2px] hidden sm:block`}
          style={{ x: springedPerfume, y: springedy2 }}
        />

        <GradientLight x1={x1} windowWidth={windowWidth}  rotate={rotate} springedPerfume={springedPerfume } springedCover={springedCover } springedBag={springedBag} springedy1={springedy1} springedy2={springedy2} />
      </div>

      {/* Outer decorative elements - hidden on mobile */}
      <motion.img
        src={Bag}  className={`${mediumImageClass} object-cover absolute top-[10rem] md:top-[24rem] right-[1rem] sm:right-[2rem] md:right-[6rem] blur-[2px] hidden sm:block`}
        style={{ x: springedBag, rotate: rotate, y: springedy2 }}
      />

      <motion.img
        src={perfume}
        className={`${largeImageClass} object-cover absolute top-[6rem] right-[0.5rem] sm:right-[1rem] md:right-[4rem] blur-[1px] opacity-40 hidden sm:block`}
        style={{ x: springedPerfume , y: springedy1 }}
      />

      <HeroHeading containerRef={containerRef} />

      <motion.img
        src={cover}  className={`${mediumImageClass} object-cover absolute top-[10rem] right-[4rem] sm:right-[8rem] md:right-[22rem] blur-[2px] hidden sm:block`}
        style={{ x: springedCover, y: springedy2 }}
      />
    </div>
  );
};

export default AnimatedUi;
