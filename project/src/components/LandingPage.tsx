import React from "react";
import { motion } from "framer-motion";
import { Stethoscope, Heart, Users, Star } from "lucide-react";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <div className="container px-4 py-12 mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="inline-block p-4 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white mb-6"
          >
            <Stethoscope className="w-12 h-12" />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
            Find Your Perfect Doctor
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Connect with the best healthcare professionals in your area
          </p>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {[
            {
              icon: <Users className="w-8 h-8" />,
              title: "Expert Doctors",
              description:
                "Access to highly qualified and experienced medical professionals.",
            },
            {
              icon: <Star className="w-8 h-8" />,
              title: "Quality Care",
              description:
                "Top-rated healthcare services tailored to your needs.",
            },
            {
              icon: <Heart className="w-8 h-8" />,
              title: "Easy Booking",
              description:
                "Simple and convenient appointment scheduling at your fingertips.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="inline-block p-3 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
                {feature.title}
              </h3>
              <p className="text-neutral-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call-to-Action Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 text-lg font-medium text-white rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg"
            onClick={() =>
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
            }
          >
            Find Doctors Now
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
