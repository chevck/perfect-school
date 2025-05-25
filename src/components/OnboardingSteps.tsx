import React from "react";
import { motion } from "framer-motion";
import {
  Check,
  ArrowRight,
  UserPlus,
  Settings,
  Database,
  Laptop,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const OnboardingSteps = () => {
  const steps: Step[] = [
    {
      id: 1,
      title: "Sign Up",
      description: "Create your school account in less than 2 minutes",
      icon: <UserPlus className="h-8 w-8 text-primary" />,
    },
    {
      id: 2,
      title: "Configure",
      description: "Set up your school profile and customize settings",
      icon: <Settings className="h-8 w-8 text-primary" />,
    },
    {
      id: 3,
      title: "Import Data",
      description: "Easily import your existing school data",
      icon: <Database className="h-8 w-8 text-primary" />,
    },
    {
      id: 4,
      title: "Go Live",
      description: "Start using the platform across your school",
      icon: <Laptop className="h-8 w-8 text-primary" />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="w-full py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Get Started in 4 Simple Steps
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Our streamlined onboarding process gets your school up and running
            quickly with minimal effort
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map((step, index) => (
            <motion.div key={step.id} variants={itemVariants}>
              <Card className="h-full border-2 hover:border-primary/50 transition-all duration-300">
                <CardContent className="pt-6 flex flex-col items-center text-center h-full">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    {step.icon}
                  </div>
                  <div className="flex items-center mb-4">
                    <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                      {step.id}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block">
                        <ArrowRight className="h-5 w-5 mx-2 text-slate-400" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-slate-600">{step.description}</p>
                  {step.id === 4 && (
                    <div className="mt-4 flex items-center text-primary font-medium">
                      <Check className="h-5 w-5 mr-1" /> Ready to use
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <button className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
            Start Your Journey Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default OnboardingSteps;
