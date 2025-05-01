import Lottie from "lottie-react";
import missionAnimation from "../../../../../public/animations/mission.json";
import { motion} from "motion/react";

const AboutMission = () => {
  return (
    <div className="max-w-4xl mx-auto mb-24">
    <motion.div
      className="flex flex-col md:flex-row gap-8 items-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="md:w-1/2">
        <Lottie animationData={missionAnimation} loop={true} />
      </div>
      <div className="md:w-1/2">
        <h2 className="text-2xl font-medium text-gray-800 mb-4">
          Our Mission
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          At omeg.in, we're redefining online shopping by bringing you
          carefully selected products that combine quality, innovation, and
          style.
        </p>
        <p className="text-gray-600 leading-relaxed">
          We believe in transparent pricing, exceptional customer service,
          and creating a community around the products we love.
        </p>
      </div>
    </motion.div>
  </div>
  )
}

export default AboutMission
