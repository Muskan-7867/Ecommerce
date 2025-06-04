// AboutMission.tsx
import Lottie from "lottie-react";
import missionAnimation from "../../../../../public/animations/mission.json";
import { motion } from "framer-motion";

const AboutMission = () => {
  return (
    <div className="max-w-full mx-auto mb-24">
      <motion.div
        className="flex flex-col md:flex-row gap-8 items-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-[40rem]">
          <Lottie animationData={missionAnimation} loop={true} />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            At Omeg Bazaar, we're committed to revolutionizing your shopping experience by offering:
          </p>
          <ul className="text-gray-600 leading-relaxed space-y-2 mb-4">
            <li>• Carefully curated products with quality assurance</li>
            <li>• Competitive pricing with no hidden costs</li>
            <li>• Fast and reliable delivery services</li>
            <li>• Exceptional 24/7 customer support</li>
          </ul>
          <p className="text-gray-600 leading-relaxed">
            We believe in building lasting relationships with our customers through transparency, innovation, and continuous improvement.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutMission;