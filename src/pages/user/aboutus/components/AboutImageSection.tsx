import { motion } from "motion/react";
const AboutImageSection = () => {
  return (
    <motion.div
      className="relative h-64 md:h-96 w-full mb-16 rounded-lg overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <img
        src="https://colocandoideas.com/blog/wp-content/uploads/2022/02/AdobeStock_317749350-1-1920x1281.jpeg"
        alt="Omeg Bazaar team"
        className="object-cover w-full h-full"
      />
    </motion.div>
  );
};

export default AboutImageSection;
