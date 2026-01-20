"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

export function CallToAction() {
  const featureRef = useRef(null);
  const featureInView = useInView(featureRef, { amount: 0.1 });
  const featureControls = useAnimation();

  useEffect(() => {
    featureControls.start(featureInView ? "show" : "hidden");
  }, [featureInView, featureControls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.42, 0, 0.58, 1] as const,
      },
    },
  };

  return (
    <section className="py-24 bg-[#0D2893]">
      <motion.div
        ref={featureRef}
        initial="hidden"
        animate={featureControls}
        variants={containerVariants}
        className="container mx-auto px-6 text-center"
      >
        <motion.h2
          variants={cardVariants}
          className="font-serif text-4xl md:text-5xl font-semibold mb-6 max-w-2xl mx-auto text-foreground"
        >
          Ready to Transform Your Space?
        </motion.h2>
        <motion.p
          variants={cardVariants}
          className=" text-lg mb-8 max-w-xl mx-auto"
        >
          Discover our full collection of carefully curated design objects, each
          chosen for their quality, beauty, and lasting appeal.
        </motion.p>
        <motion.div
          variants={cardVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            asChild
            size="lg"
            className="bg-accent hover:bg-terracotta-dark text-accent-background"
          >
            <Link href="/products">
              Browse Collection
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className=" bg-white text-[#0D2893] hover:bg-terracotta-dark"
          >
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
