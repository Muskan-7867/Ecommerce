import { motion } from "motion/react";
const AboutValue = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-2xl md:text-3xl font-light text-center mb-12 text-gray-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Our Core Values
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Quality First",
              description:
                "Every product undergoes rigorous quality checks before reaching you.",
              icon: "✨"
            },
            {
              title: "Customer Focus",
              description:
                "Your satisfaction is our top priority at every step.",
              icon: "❤️"
            },
            {
              title: "Innovation",
              description:
                "Constantly seeking new and better products for our customers.",
              icon: "🚀"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-medium text-gray-800 mb-3">
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
