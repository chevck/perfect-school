import React from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  imageUrl?: string;
}

const HeroSection = ({
  title = "Streamline Your School Operations",
  subtitle = "The Perfect School App provides comprehensive digital management tools to transform how schools operate. From billing to student information, we've got you covered.",
  imageUrl = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80",
}: HeroSectionProps) => {
  return (
    <section className="relative w-full h-[700px] bg-white overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content container */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-start max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl text-white"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">{title}</h1>

          <p className="text-xl md:text-2xl mb-8 text-gray-100">{subtitle}</p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
            >
              Sign Up Now
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/20 px-8 py-6 text-lg"
            >
              Learn More
            </Button>
          </div>
        </motion.div>

        {/* Floating devices mockup */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden lg:block absolute right-10 bottom-0 w-[500px]"
        >
          <img
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80"
            alt="School management app on devices"
            className="rounded-t-lg shadow-2xl"
          />
        </motion.div>
      </div>

      {/* Wave shape divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-[60px] text-white fill-current"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
