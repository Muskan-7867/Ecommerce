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
    <div className="min-h-screen bg-white">
     

      <div className="py-16   max-w-full mt-20 mx-auto">
       <AboutImageSection />
         
        {/* Mission section */}
        <AboutMission />

        {/* Value section */}
        <AboutValue />

        {/* CTA Section */}
        <motion.div
          className="max-w-3xl mx-auto text-center py-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Join Our Growing Community
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover why thousands of customers trust Omeg Bazaar for their shopping needs.
          </p>
          <motion.button
            className="px-8 py-3 bg-primary text-white rounded-md text-lg font-medium hover:bg-primary-dark transition-colors shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleClick}
          >
            Start Shopping Now
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;