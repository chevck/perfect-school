import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreditCard, Receipt, GraduationCap, Users } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = (
  { icon, title, description }: FeatureCardProps = {
    icon: <CreditCard className="h-8 w-8" />,
    title: "Feature Title",
    description: "Feature description goes here.",
  },
) => {
  return (
    <Card className="h-full bg-white">
      <CardHeader>
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: <CreditCard className="h-6 w-6 text-primary" />,
      title: "Billing Management",
      description:
        "Create, manage, and track all school bills in one place. Generate reports and get insights on financial performance.",
    },
    {
      icon: <Receipt className="h-6 w-6 text-primary" />,
      title: "Payment Processing",
      description:
        "Accept various payment methods, automate receipts, and reconcile accounts with our secure payment processing system.",
    },
    {
      icon: <GraduationCap className="h-6 w-6 text-primary" />,
      title: "Examination Management",
      description:
        "Schedule exams, record grades, generate report cards, and analyze performance trends across classes and subjects.",
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Student & Parent Portal",
      description:
        "Maintain comprehensive student profiles, enable parent communication, and provide secure access to academic information.",
    },
  ];

  return (
    <section id="features" className="py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features for Modern Schools
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our comprehensive suite of tools helps schools streamline
            operations, improve efficiency, and enhance communication.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block p-1 bg-gray-100 rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80"
              alt="School management dashboard"
              className="rounded-lg w-full max-w-4xl mx-auto shadow-lg"
            />
          </div>
          <p className="mt-6 text-gray-500 max-w-2xl mx-auto">
            Our intuitive dashboard gives you a complete overview of your
            school's operations at a glance.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
