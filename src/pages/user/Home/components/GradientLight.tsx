import { MotionValue, useTransform, motion, useSpring } from "framer-motion";
import {
  Bag,
  Bottle,
  cover,
  laptop,
  perfume,
  phone
} from "../../../../constants/imagePath.ts";
import { cn } from "../../../../utills/cn.ts";

const GradientLight = ({
  x1,
  windowWidth,
  springedBag,
  springedCover,
  springedPerfume,
  springedy1,
  springedy2,
  rotate
}: {
  x1: MotionValue<number>;
  windowWidth: number;
  springedBag: MotionValue<number>;
  springedy1: MotionValue<number>;
  springedy2: MotionValue<number>;
  rotate: MotionValue<number>;
  springedCover: MotionValue<number>;
  springedPerfume: MotionValue<number>;
}) => {
  const springedBottle = useSpring(
    useTransform(x1, [0, windowWidth], [18, -18])
  );
  const springedLaptop = useSpring(
    useTransform(x1, [0, windowWidth], [60, -60])
  );
  const springedPhone = useSpring(
    useTransform(x1, [0, windowWidth], [30, -30])
  );
  const smallImageClass = "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20";
  const mediumImageClass = "w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28";
  const largeImageClass = "w-20 h-20 sm:w-28 sm:h-28 md:w-34 md:h-34";

  return (
    <motion.div
      className="relative z-10 w-full min-h-[30rem] md:min-h-[40rem] md:w-[60vw]"
      style={{
        clipPath: "polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)"
      }}
    >
      <motion.img
        src={phone}
        className={cn(` object-cover absolute top-[12rem] md:top-[20rem] left-8 sm:left-16 lg:left-[34rem] md:left-[12rem] md:scale-150 scale-110 lg:top-[28rem] z-[150]`, mediumImageClass)}
        // className={`${mediumImageClass} object-cover absolute top-[12rem] md:top-[20rem] left-8 sm:left-16 lg:left-[34rem] md:left-[12rem] md:scale-150 scale-110 lg:top-[28rem] z-[150]`}
        style={{
          x: springedPhone,
          y: springedy1
        }}
      />
      {/* Gradient background */}
      <div
        className="absolute inset-0 "
        style={{
          background: "linear-gradient(to bottom, #ca8888, transparent)",
          filter: "brightness(1.5)"
        }}
      />

      {/* Product images */}
      <motion.img
        src={Bag}
        className={`${mediumImageClass} object-cover absolute top-32 left-24 sm:left-44 lg:left-[20rem] right-0 z-10`}
        style={{
          x: springedBag,
          rotate: rotate,
          y: springedy2
        }}
      />
      <motion.img
        src={laptop}
        className={`${smallImageClass} object-cover absolute top-[16rem] md:top-[12rem] right-24 lg:right-[20rem]`}
        style={{
          x: springedLaptop,
          rotate: rotate,
          y: springedy1
        }}
      />
      <motion.img
        src={cover}
        className={`${mediumImageClass} object-cover absolute top-[10rem] md:top-[16rem] right-[5rem] sm:right-[4rem] md:right-[12rem] lg:right-[30rem] lg:top-[6rem]`}
        style={{
          x: springedCover,
          y: springedy2
        }}
      />

      <motion.img
        src={perfume}
        className={`${largeImageClass} object-cover absolute top-[18rem] md:top-[30rem] left-[2rem] sm:left-[4rem] md:left-[12rem]`}
        style={{
          x: springedPerfume,
          y: springedy2
        }}
      />
      <motion.img
        src={Bottle}
        className={`${mediumImageClass} object-cover absolute top-[23rem] md:top-[24rem] left-22 sm:left-32 right-4 md:scale-150 scale-110`}
        style={{
          x: springedBottle,
          rotate: rotate,
          y: springedy1
        }}
      />
      <motion.img
        src={phone}
        className={`${mediumImageClass} object-cover absolute top-[18rem] blur-[1px] left-[15rem] sm:left-[6rem] md:left-[14rem]`}
        style={{
          x: springedPhone,
          y: springedy2
        }}
      />
      <motion.img
        src={Bag}
        className={`${largeImageClass} object-cover absolute top-[22rem] md:top-[30rem] right-[2rem] sm:right-[4rem] md:right-[13rem] lg:right-[14rem] lg:top-[40rem]`}
        style={{
          x: springedBag,
          y: springedy1
        }}
      />
      <motion.img
        src={laptop}
        className={`${largeImageClass} object-cover absolute top-[4rem] md:top-[24rem] right-[6rem] sm:right-[2rem] md:right-[8rem] lg:right-[10rem]`}
        style={{
          x: springedLaptop,
          rotate: rotate,
          y: springedy2
        }}
      />
      <motion.img
        src={Bottle}
        className={`${mediumImageClass} object-cover absolute top-[2rem] right-[1rem] sm:right-[2rem] md:right-[8rem] md:scale-150 scale-110`}
        style={{
          x: springedBottle,
          rotate: rotate,
          y: springedy1
        }}
      />
    </motion.div>
  );
};

export default GradientLight;
