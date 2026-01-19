"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const values = [
  {
    title: "Craftsmanship",
    description:
      "We partner with artisans who have mastered their craft over generations, ensuring each piece meets our exacting standards for quality and durability.",
  },
  {
    title: "Sustainability",
    description:
      "Every material is thoughtfully sourced with respect for the environment. We prioritize natural, renewable, and recyclable materials in our collection.",
  },
  {
    title: "Timeless Design",
    description:
      "We curate pieces that transcend trends. Our collection focuses on enduring aesthetics that will remain beautiful and relevant for years to come.",
  },
  {
    title: "Intentional Living",
    description:
      "We believe in surrounding ourselves with fewer, better things. Each object in our collection is chosen for its ability to enhance daily life.",
  },
];

const About = () => {
  const leftRef = useRef(null);
  const leftInView = useInView(leftRef, { amount: 0.1 });
  const leftControls = useAnimation();

  useEffect(() => {
    leftControls.start(leftInView ? "show" : "hidden");
  }, [leftInView, leftControls]);

  const rightRef = useRef(null);
  const rightInView = useInView(rightRef, { amount: 0.1 });
  const rightControls = useAnimation();

  useEffect(() => {
    rightControls.start(
      rightInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 },
    );
  }, [rightInView, rightControls]);

  const leftRef1 = useRef(null);
  const leftInView1 = useInView(leftRef1, { amount: 0.2 });
  const leftControls1 = useAnimation();

  useEffect(() => {
    leftControls1.start(
      leftInView1 ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 },
    );
  }, [leftInView1, leftControls1]);

  const rightRef1 = useRef(null);
  const rightInView1 = useInView(rightRef1, { amount: 0.2 });
  const rightControls1 = useAnimation();

  useEffect(() => {
    rightControls1.start(
      rightInView1 ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 },
    );
  }, [rightInView1, rightControls1]);

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

  const valuesRef = useRef(null);
  const valuesInView = useInView(valuesRef, { amount: 0.2 });
  const valuesControls = useAnimation();

  useEffect(() => {
    valuesControls.start(valuesInView ? "show" : "hidden");
  }, [valuesInView, valuesControls]);

  const cardRef = useRef(null);
  const cardInView = useInView(cardRef, { amount: 0.2 });
  const cardControls = useAnimation();

  useEffect(() => {
    cardControls.start(cardInView ? "show" : "hidden");
  }, [cardInView, cardControls]);

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-foreground overflow-x-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            ref={headerRef}
            initial="hidden"
            animate={headerControls}
            variants={containerVariants}
            className="text-center  max-w-2xl mx-auto"
          >
            <motion.p
              variants={cardVariants}
              className="text-accent font-medium tracking-wider uppercase mb-4"
            >
              About us
            </motion.p>
            <motion.h1
              variants={cardVariants}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 text-background"
            >
              Design Objects for
              <br />
              Modern Living
            </motion.h1>
            <motion.p
              variants={cardVariants}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              We bring passion and purpose to every project — focused on
              delivering the best for our customers.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24 overflow-x-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              ref={leftRef}
              initial="hidden"
              animate={leftControls}
              variants={containerVariants}
              className="order-2 lg:order-1"
            >
              <motion.h2
                variants={cardVariants}
                className="font-serif text-3xl md:text-4xl font-semibold mb-6 text-background"
              >
                A Passion for Quality
              </motion.h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <motion.p variants={cardVariants} className="flex flex-wrap">
                  Provide best quality of Furniture and we always focus on
                  quality, technology and try to make our customer happy
                </motion.p>
                  <motion.p variants={cardVariants}>
                  Belisitas is a DIRECT manufacturer of Rattan Furniture and
                  Home Decor. Based in the Philippines, we pride ourselves on
                  producing high-quality products using traditional techniques,
                  showcasing talented craftsmanship, and offering the LOWEST
                  deals.
                </motion.p>
                <motion.p variants={cardVariants}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                  vel hendrerit eros. Pellentesque habitant morbi tristique
                  senectus et netus et malesuada fames ac turpis egestas. Sed
                  iaculis sed metus quis vulputate.
                </motion.p>
              </div>
            </motion.div>

            <motion.div
              ref={rightRef}
              initial={{ opacity: 0, x: 50 }}
              animate={rightControls}
              transition={{ duration: 0.5 }}
              className="order-1 lg:order-2"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-lg">
                <img
                  src="/images/banner-img.png"
                  alt="Our studio"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-[#0d2893] text-primary-background overflow-x-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            ref={valuesRef}
            initial="hidden"
            animate={valuesControls}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2
              variants={cardVariants}
              className="font-serif text-3xl md:text-4xl font-semibold mb-4"
            >
              Our Values
            </motion.h2>
            <motion.p
              variants={cardVariants}
              className="text-primary-background/80 max-w-xl mx-auto"
            >
              These principles guide every decision we make, from the products
              we select to how we serve our community.
            </motion.p>
          </motion.div>

          <motion.div
            ref={valuesRef}
            initial="hidden"
            animate={valuesControls}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="p-8 rounded-lg bg-white/5 border border-white/20"
              >
                <h3 className="font-serif text-xl font-medium mb-3">
                  {value.title}
                </h3>
                <p className="text-primary-background/70 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team/Studio Section */}
      {/* <section className="py-16 md:py-24 overflow-x-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              ref={leftRef1}
              initial={{ opacity: 0, x: -50 }}
              animate={leftControls1}
              transition={{ duration: 0.5 }}
            >
              <div className="aspect-[4/3] overflow-hidden rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
                  alt="Our showroom"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              ref={rightRef1}
              initial={{ opacity: 0, x: 50 }}
              animate={rightControls1}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-6">
                Visit Our Showroom
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Experience our collection in person at our showroom, where you
                  can see and feel the quality of each piece firsthand.
                </p>
                <p>
                  Our team is available to provide personalized guidance,
                  helping you find the perfect pieces for your space and
                  answering any questions about materials, care, and styling.
                </p>
              </div>
              <div className="mt-8 p-6 bg-secondary rounded-lg">
                <p className="font-medium mb-2">Studio Hours</p>
                <p className="text-muted-foreground text-sm">
                  Monday – Friday: 10am – 6pm
                  <br />
                  Saturday: 11am – 5pm
                  <br />
                  Sunday: By appointment
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default About;
