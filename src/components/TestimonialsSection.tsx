import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion } from "framer-motion";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  schoolName: string;
  quote: string;
  avatarUrl?: string;
  metrics?: string;
}

const TestimonialsSection = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Principal",
      schoolName: "Westfield Academy",
      quote:
        "The Perfect School App has transformed how we manage our administrative tasks. Our billing process is now 75% faster and parents love the transparency.",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      metrics: "Reduced administrative workload by 65%",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "IT Director",
      schoolName: "Oakridge International School",
      quote:
        "Implementation was seamless and the support team was exceptional. Our staff needed minimal training and we were up and running within days.",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      metrics: "Improved payment collection rate by 40%",
    },
    {
      id: 3,
      name: "Priya Sharma",
      role: "Administrative Head",
      schoolName: "Greenwood Elementary",
      quote:
        "The examination management module has been a game-changer for our teachers. Creating, distributing, and grading exams is now a breeze.",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
      metrics: "Saved 12 hours per week on exam management",
    },
    {
      id: 4,
      name: "David Wilson",
      role: "School Director",
      schoolName: "Riverside Montessori",
      quote:
        "Parents appreciate the easy access to their children's information and payment history. Our communication has improved dramatically.",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      metrics: "Parent engagement increased by 80%",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <section className="py-16 px-4 md:px-8 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">
            What Schools Are Saying
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Join hundreds of schools that have transformed their operations with
            The Perfect School App
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-none shadow-lg bg-white">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="md:w-1/3 flex flex-col items-center">
                      <Avatar className="h-24 w-24 mb-4">
                        <AvatarImage
                          src={testimonials[currentIndex].avatarUrl}
                          alt={testimonials[currentIndex].name}
                        />
                        <AvatarFallback>
                          {testimonials[currentIndex].name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="text-xl font-semibold text-center">
                        {testimonials[currentIndex].name}
                      </h3>
                      <p className="text-slate-600 text-center">
                        {testimonials[currentIndex].role}
                      </p>
                      <p className="text-primary font-medium text-center">
                        {testimonials[currentIndex].schoolName}
                      </p>
                      {testimonials[currentIndex].metrics && (
                        <div className="mt-4 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                          {testimonials[currentIndex].metrics}
                        </div>
                      )}
                    </div>
                    <div className="md:w-2/3">
                      <div className="relative">
                        <Quote className="text-primary/20 absolute -top-6 -left-6 h-12 w-12" />
                        <p className="text-lg md:text-xl text-slate-700 italic">
                          "{testimonials[currentIndex].quote}"
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="flex justify-center mt-8 gap-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex gap-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${index === currentIndex ? "w-6 bg-primary" : "w-2 bg-slate-300"}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
