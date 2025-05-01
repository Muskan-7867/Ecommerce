// AboutUs.tsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import AboutValue from "./components/AboutValue";
import AboutMission from "./components/AboutMission";
import AboutImageSection from "./components/AboutImageSection";

const AboutUs = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/products");
  };
  return (
    <div className="min-h-screen bg-white py-16 px-6 md:px-12">
      {/* Minimal Header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
          Our Story
        </h1>
        <div className="w-24 h-1 bg-primary mx-auto"></div>
      </motion.div>

      {/* Full-width image section */}
      <AboutImageSection />
      {/* Mission section */}
      <AboutMission />
      {/* Value section */}
      <AboutValue />

      <motion.div
        className="max-w-3xl mx-auto text-center py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl md:text-3xl font-light text-gray-800 mb-6">
          Ready to experience omeg.in?
        </h2>
        <motion.button
          className="px-8 py-3 bg-primary text-white rounded-md text-lg hover:bg-primary transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleClick}
        >
          Shop Now
        </motion.button>
      </motion.div>
    </div>
  );
};

export default AboutUs;
