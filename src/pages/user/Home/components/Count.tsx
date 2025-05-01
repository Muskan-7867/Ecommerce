import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { cover } from "../../../../constants/imagePath";

interface CountUpProps {
  from?: number;
  to: number;
  duration?: number;
}

interface StatCard {
  id: number;
  title: string;
  value: number;
}

export default function Count({ from = 0, to, duration = 2 }: CountUpProps) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, Math.floor);

  useEffect(() => {
    const animation = animate(count, to, { duration });
    return animation.stop;
  }, [count, to, duration]);

  const stats: StatCard[] = [
    { id: 1, title: "Happy Clients", value: to },
    { id: 2, title: "Projects Completed", value: to },
    { id: 3, title: "Years Experience", value: to },
    { id: 4, title: "Awards Won", value: to }
  ];

  return (
    <motion.div className="w-full h-auto min-h-[20rem] backdrop-blur-lg flex justify-center items-center text-white rounded-2xl lg:gap-16 gap-4 flex-wrap bg-red-50 mt-4">
      {stats.map((stat, ) => (
        <div
          key={stat.id}
          className={`lg:w-[16rem] w-[14rem] lg:h-[10rem] h-[9rem] rounded-md p-4 mb-2 border-1 border-white hover:bg-red-50 transition-all duration-300 ease-in-out
          hover:scale-105 flex flex-col items-center border-b-[8px] border-b-primary bg-white hover:border-primary mt-4
          
          }`}
        >
          <img
            src={cover}
            alt={stat.title}
            className="w-12 h-12 rounded-full"
          />
          <motion.span className="text-primary font-serif font-semibold lg:text-6xl text-2xl">
            {rounded}
          </motion.span>
          <p className="text-neutral-600/50">{stat.title}</p>
        </div>
      ))}
    </motion.div>
  );
}
