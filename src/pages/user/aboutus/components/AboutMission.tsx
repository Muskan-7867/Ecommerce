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
            Welcome to <strong>omegbazaar.com</strong> – your ultimate destination for discovering unique and trending products!
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            At <strong>omeg.in</strong>, we're passionate about curating a collection of one-of-a-kind items you won't find anywhere else. From the latest tech gadgets and fashion accessories to home decor and lifestyle must-haves, every product is handpicked with care.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Our goal is to offer a shopping experience that blends convenience, affordability, and the excitement of finding something truly special.
          </p>
          <ul className="text-gray-600 leading-relaxed space-y-2 mb-4">
            <li>• Unique, curated product collections</li>
            <li>• Competitive pricing – no hidden costs</li>
            <li>• Fast, reliable delivery across regions</li>
            <li>• Friendly, responsive customer support</li>
          </ul>
          <p className="text-gray-600 leading-relaxed mb-4">
            Whether you're hunting for the perfect gift, upgrading your essentials, or simply treating yourself, <strong>omeg.in</strong> makes it effortless and fun.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Join our community of savvy shoppers and elevate your lifestyle with Omeg Bazaar. Happy shopping!
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutMission;
