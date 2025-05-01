"use client";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { Bag } from "../../../../constants/imagePath";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start center"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["80%", "100%"]);
  const translateY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const cards = [
    {
      id: 1,
      title: "xyzxyzxyz",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit Lorem, ipsum dolor sit amet consectetur adipisicing elit..",
    },
    {
      id: 2,
      title: "xyzxyzxyz",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit Lorem, ipsum dolor sit amet consectetur adipisicing elit..",
    },
    {
      id: 3,
      title: "xyzxyzxyz",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit Lorem, ipsum dolor sit amet consectetur adipisicing elit..",
    },
    {
      id: 4,
      title: "xyzxyzxyz",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit Lorem, ipsum dolor sit amet consectetur adipisicing elit..",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="w-full relative min-h-[25rem] h-auto bg-red-50"
    >
      <motion.div
        style={{ scaleX: x, y: translateY }}
        className="w-full  h-auto min-h-[25rem] backdrop-blur-lg flex justify-center items-center text-white rounded-2xl lg:gap-16 md:gap-6 flex-wrap bg-white mt-14 gap-2 "
      >
        {cards.map((card) => (
          <div
            key={card.id}
            className="lg:w-[18rem] lg:h-[18rem] w-[16rem] h-[16rem] bg-white rounded-3xl p-4 mb-4 mt-4 overflow-hidden border-1 border-primary hover:bg-red-50 transition-all duration-300 ease-in-out hover:scale-105"
          >
            <img
              src={Bag}
              alt="Bag icon"
              className="lg:w-20 lg:h-20 w-14 h-14 rounded-full border-1 border-primary"
            />
            <h2 className="text-primary font-serif font-semibold lg:text-2xl sm:text-xl">
              {card.title}
            </h2>
            <p className="text-neutral-600/40 lg:text-lg sm:text-base">
              {card.description}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default HeroSection;