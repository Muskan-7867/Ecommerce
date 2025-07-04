import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import TermsContent from "./TermsContent";
import { PrivacyContent } from "./PrivacyContent";
import { ContactUs } from "./ContactUs";
import { Cancelation } from "./Cancelation";

type accordianProps = {
  title: string;
  content: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
};
const sections = [
  {
    title: "Privacy Policy",
    content: <PrivacyContent />
  },
  {
    title: "Terms & Conditions",
    content: <TermsContent />
  },
  {
    title: "Contact Us",
    content: <ContactUs />
  },
  {
    title: "Cancel & Return Policy",
    content: <Cancelation />
  }
];

const AccordionItem: React.FC<accordianProps> = ({
  title,
  content,
  isOpen,
  onClick
}) => (
  <div className="border-b border-primary">
    <button
      onClick={onClick}
      className="w-full flex justify-between items-center py-4 text-left focus:outline-none"
    >
      <span className="text-xl font-semibold text-gray-700">{title}</span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <ChevronDown color="#c68888" />
      </motion.div>
    </button>

    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="pb-4 text-gray-600"
        >
          {content}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const PrivacyPolicyPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-full mx-auto p-6 mt-20">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">
        Policy & Information
      </h1>
      <div className="space-y-4 text-black">
        {sections.map((section, index) => (
          <AccordionItem
            key={index}
            title={section.title}
            content={section.content}
            isOpen={openIndex === index}
            onClick={() => handleToggle(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
