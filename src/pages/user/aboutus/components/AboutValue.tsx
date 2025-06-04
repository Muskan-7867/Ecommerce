// AboutValue.tsx
import { motion } from "framer-motion";

const AboutValue = () => {
  return (
    <div className=" py-16 w-full">
      <div className="max-w-full mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Our Core Values
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            These principles guide everything we do at Omeg Bazaar
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Quality First",
              description:
                "Every product undergoes rigorous quality checks before reaching you. We partner only with trusted suppliers and manufacturers.",
              icon: "✨",
              color: "bg-blue-100"
            },
            {
              title: "Customer Focus",
              description:
                "Your satisfaction drives our decisions. We offer easy returns, 24/7 support, and personalized recommendations.",
              icon: "❤️",
              color: "bg-red-100"
            },
            {
              title: "Innovation",
              description:
                "We constantly explore new technologies and trends to enhance your shopping experience and product selection.",
              icon: "🚀",
              color: "bg-purple-100"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              className={`${item.color} p-8 rounded-xl shadow-sm hover:shadow-md transition-all`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutValue;