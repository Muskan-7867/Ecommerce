"use client";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

import {
  FaCertificate,
  FaHeadset,
  FaShieldAlt,
  FaShippingFast
} from "react-icons/fa";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start center"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["80%", "100%"]);
  const translateY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const cards = [
    {
      id: 1,
      title: "Fast & Free Delivery",
      description:
        "Enjoy swift delivery at no extra cost. Get your items delivered in 1-3 business days.",
      icon: FaShippingFast,
      tag: "Fast"
    },
    {
      id: 2,
      title: "Secure Payments",
      description:
        "All transactions are encrypted and secure with multiple payment options available.",
      icon: FaShieldAlt,
      tag: "Safe"
    },
    {
      id: 3,
      title: "Quality Assurance",
      description:
        "Every product goes through a strict quality check to ensure it meets high standards before dispatch.",
      icon: FaCertificate,
      tag: "Verified"
    },

    {
      id: 4,
      title: "24/7 Customer Support",
      description:
        "Need help? Our support team is available around the clock for any query.",
      icon: FaHeadset,
      tag: "Support"
    }
  ];

  return (
    <div
      ref={containerRef}
      className="w-full relative min-h-[25rem] h-auto bg-red-50"
    >
      <motion.div
        style={{ scaleX: x, y: translateY }}
        className="w-full  h-auto min-h-[25rem] backdrop-blur-lg flex justify-center items-center text-white rounded-2xl lg:gap-16 md:gap-6 flex-wrap bg-white mt-14 gap-2 "
      >
        {cards.map((card) => (
          <div
            key={card.id}
            className="lg:w-[18rem] w-[16rem] h-[14rem] rounded-3xl p-4 mb-4 mt-4 overflow-hidden border border-primary transition-all duration-300 ease-in-out hover:scale-105 shadow-sm bg-gradient-to-b from-transparent to-red-50 hover:from-transparent hover:to-red-100"
          >
            <div className="flex items-center justify-center mb-3">
              <card.icon className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-primary font-serif font-semibold text-xl text-center mb-2">
              {card.title}
            </h2>
            <p className="text-neutral-600/80 text-sm text-center">
              {card.description}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default HeroSection;
