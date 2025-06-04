import { motion } from "framer-motion";

const AboutImageSection = () => {
  const text = "ABOUT US".split("");
  
  const letterVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    },
    hover: {
      scale: 1.2,
      color: "#ffffff",
      textShadow: "0 0 10px rgba(255,255,255,0.8)",
      transition: { stiffness: 300  }
      
    }
  };

  return (
    <motion.div
      className="relative h-64 md:h-96 w-full mb-16 rounded-2xl overflow-hidden "
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary to-white flex justify-center items-center p-8">
        <motion.div 
          className="flex"
          initial="initial"
          animate="animate"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {text.map((char, index) => (
            char === " " ? (
              <div key={index} className="w-8" />
            ) : (
              <motion.span
                key={index}
                variants={letterVariants}
                whileHover="hover"
                className="text-white text-[80px] md:text-[100px] cursor-pointer font-bold"
              >
                {char}
              </motion.span>
            )
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutImageSection;