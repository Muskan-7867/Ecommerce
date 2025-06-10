import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import {
  FaBusinessTime,
  FaShoppingCart,
  FaSmile,
  FaTrophy
} from "react-icons/fa";

interface CountUpProps {
  from?: number;
  to: number;
  duration?: number;
}
interface StatCard {
  id: number;
  title: string;
  value: number;
  icon: React.ElementType | string;
}

export default function Count({ from = 0, to, duration = 2 }: CountUpProps) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, Math.floor);

  useEffect(() => {
    const animation = animate(count, to, { duration });
    return animation.stop;
  }, [count, to, duration]);

  const stats: StatCard[] = [
    {
      id: 1,
      title: "Happy Customers",
      value: 1200,
      icon: FaSmile
    },
    {
      id: 2,
      title: "Orders Shipped",
      value: 3500,
      icon: FaShoppingCart
    },
    {
      id: 3,
      title: "Years in Business",
      value: 5,
      icon: FaBusinessTime
    },
    {
      id: 4,
      title: "Awards Won",
      value: 12,
      icon: FaTrophy
    }
  ];

  return (
    <motion.div className="w-full h-auto min-h-[20rem] backdrop-blur-lg flex justify-center items-center text-white rounded-2xl lg:gap-16 gap-4 flex-wrap bg-red-50 mt-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.id}
            className="lg:w-[16rem] w-[14rem] lg:h-[12rem] h-[9rem] rounded-md p-4 mb-2 border border-white transition-all duration-300 ease-in-out hover:scale-105 flex flex-col items-center border-b-[8px] border-b-primary bg-white hover:border-primary mt-4 hover:bg-gradient-to-t hover:from-white hover:to-red-100"
          >
            <Icon className="w-10 h-10 text-primary mb-2" />
            <motion.span className="text-primary font-serif font-semibold lg:text-5xl text-2xl">
              {rounded}
            </motion.span>
            <p className="text-neutral-600/50 text-center mt-2">{stat.title}</p>
          </div>
        );
      })}
    </motion.div>
  );
}
