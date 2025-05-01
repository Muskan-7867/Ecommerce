import { motion } from "motion/react";
import { cn } from "../../utills/cn";

const ShimmerEffect = ({ className }: { className?: string }) => {
  return (
    <div className="bg-blue-50 min-h-screen flex justify-center items-center overflow-hidden">
      <div
        className={cn(
          "relative w-[15rem] h-[20rem] bg-gray-200 rounded-lg overflow-hidden",
          className
        )}
      >
        <motion.div
          initial={{ translateX: -400 }}
          animate={{
            translateX: 400,
            transition: {
              duration: 0.8,
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
          className="absolute top-0 left-0 w-1/2 h-[40rem] bg-gradient-to-r from-transparent via-white/50 to-transparent -rotate-45"
        />
      </div>
    </div>
  );
};

export default ShimmerEffect;
