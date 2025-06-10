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
        className="w-full h-auto min-h-[25rem] backdrop-blur-lg flex items-center text-white rounded-2xl bg-white mt-14  lg:gap-6 gap-2
             overflow-x-auto flex-nowrap lg:flex-wrap justify-start lg:justify-center px-4 scroll-smooth scrollbar-hide"
      >
        {cards.map((card) => (
          <motion.div
            key={card.id}
            initial={{
              background: "linear-gradient(to bottom, transparent, #fee1e1 )"
            }}
            whileHover={{
              scale: 1.05,
              background: "linear-gradient(to top, transparent, #ffe5e5)"
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="lg:w-[20rem] w-[16rem] h-[14rem] flex-shrink-0 rounded-3xl p-4 mb-4 mt-4 overflow-hidden border border-primary shadow-sm"
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
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default HeroSection;
