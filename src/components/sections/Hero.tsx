"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { amount: 0.2 });
  const headerControls = useAnimation();

  useEffect(() => {
    headerControls.start(headerInView ? "show" : "hidden");
  }, [headerInView, headerControls]);

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
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero_img.jpg"
          alt="Modern interior design"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/50 to-foreground/10" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerControls}
          variants={containerVariants}
          className="max-w-2xl"
        >
          <motion.p
            variants={cardVariants}
            className="text-[#0D2893] font-medium tracking-wider uppercase mb-4"
          >
            Discover our
          </motion.p>

          <motion.h1
            variants={cardVariants}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-6 text-background"
          >
            Belisitas
            <br />
            <span className="text-[#0D2893]">Rattan Furniture</span>
          </motion.h1>

          <motion.p
            variants={cardVariants}
            className="text-lg md:text-xl text-muted-foreground max-w-lg mb-8 leading-relaxed"
          >
            Discover thoughtfully crafted pieces that bring warmth, character,
            and enduring beauty to your everyday spaces.
          </motion.p>

          <motion.div
            variants={cardVariants}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-terracotta-dark text-accent-foreground"
            >
              <Link href="/products">
                Explore Collection
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/about">Our Story</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 bg-foreground/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
