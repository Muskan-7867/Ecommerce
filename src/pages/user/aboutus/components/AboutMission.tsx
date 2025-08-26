import Lottie from "lottie-react";
import missionAnimation from "../../../../../public/animations/mission.json";
import { motion } from "framer-motion";

const AboutMission = () => {
  return (
    <div className="max-w-full mx-auto mb-12 md:mb-24 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="flex flex-col lg:flex-row gap-6 md:gap-8 items-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full lg:w-[40rem] max-w-[500px] mx-auto lg:max-w-none">
          <Lottie animationData={missionAnimation} loop={true} />
        </div>
        <div className="lg:w-1/2">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 md:mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-3 md:mb-4">
            Welcome to <strong>omegbazaar.com</strong> – your ultimate destination for discovering unique and trending products!
          </p>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-3 md:mb-4">
            At <strong>omegbazaar.com</strong>, we're passionate about curating a collection of one-of-a-kind items you won't find anywhere else.
          </p>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-3 md:mb-4">
            Our goal is to offer a shopping experience that blends convenience, affordability, and the excitement of finding something truly special.
          </p>
          <ul className="text-gray-600 text-sm md:text-base leading-relaxed space-y-1 md:space-y-2 mb-3 md:mb-4">
            <li>• Unique, curated product collections</li>
            <li>• Competitive pricing – no hidden costs</li>
            <li>• Fast, reliable delivery across regions</li>
            <li>• Friendly, responsive customer support</li>
          </ul>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-3 md:mb-4">
            Whether you're hunting for the perfect gift or simply treating yourself, <strong>omegbazaar.com</strong> makes it effortless and fun.
          </p>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Join our community of savvy shoppers and elevate your lifestyle with Omeg Bazaar.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutMission;