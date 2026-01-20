"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { getCategoriesFromSanity } from "@/lib/categories";

export function Footer() {

  const [categories, setCategories] = useState<string[]>(["All"]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const data = await getCategoriesFromSanity();
      if (mounted) setCategories(data);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const footerRef = useRef(null);
  const footerInView = useInView(footerRef, { amount: 0.2 });
  const footerControls = useAnimation();

  useEffect(() => {
    footerControls.start(footerInView ? "show" : "hidden");
  }, [footerInView, footerControls]);

  const navRef = useRef(null);
  const navInView = useInView(navRef, { amount: 0.2 });
  const navControls = useAnimation();

  useEffect(() => {
    navControls.start(navInView ? "show" : "hidden");
  }, [navInView, navControls]);

  const categoryRef = useRef(null);
  const categoryInView = useInView(categoryRef, { amount: 0.2 });
  const categoryControls = useAnimation();

  useEffect(() => {
    categoryControls.start(categoryInView ? "show" : "hidden");
  }, [categoryInView, categoryControls]);

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
    <footer className="bg-[#efebe7] border-t border-gray-200">
      <div className="container mx-auto px-6 pt-16 pb-10">
        <motion.div
          ref={footerRef}
          initial="hidden"
          animate={footerControls}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-4 gap-12"
        >
          {/* Brand */}
          <motion.div variants={cardVariants} className="md:col-span-2">
            <Link href="/" className="font-serif text-2xl font-semibold">
              <img
                src="/belisitas-logo.png"
                alt="Belisitas logo"
                width={150}
                height={100}
              />
            </Link>
            <motion.p
              variants={cardVariants}
              className="mt-4 text-muted-foreground max-w-sm leading-relaxed"
            >
              Curated collection of timeless design objects for modern living.
              Thoughtfully crafted, sustainably sourced.
            </motion.p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            ref={navRef}
            initial="hidden"
            animate={navControls}
            variants={containerVariants}
          >
            <motion.h4
              variants={cardVariants}
              className="font-serif text-lg font-medium mb-4 text-background"
            >
              Explore
            </motion.h4>
            <ul className="space-y-3">
              {["Products", "About", "Contact"].map((item) => (
                <motion.li key={item} variants={cardVariants}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-muted-foreground hover:text-background transition-colors"
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div
            ref={categoryRef}
            initial="hidden"
            animate={categoryControls}
            variants={containerVariants}
          >
            <motion.h4
              variants={cardVariants}
              className="font-serif text-lg font-medium mb-4 text-background"
            >
              Categories
            </motion.h4>
            <ul className="space-y-3">
              {categories
                .filter((c) => c !== "All")
                .map((category) => (
                  <motion.li key={category} variants={cardVariants}>
                    <Link
                      href={`/products?category=${encodeURIComponent(category)}`}
                      className="text-muted-foreground hover:text-background transition-colors"
                    >
                      {category}
                    </Link>
                  </motion.li>
                ))}
              {/* {Categories.map((item) => (
                <motion.li variants={cardVariants} key={item.name}>
                  <Link
                    href={`/products?category=${encodeURIComponent(item.name)}`}
                    className="text-muted-foreground hover:text-background transition-colors"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))} */}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-gray-200 flex justify-center items-center gap-4">
          <p className="text-sm text-muted-foreground">
            Copyright © 2025 by Belisitas Handicraft Philippines
          </p>
        </div>
      </div>
    </footer>
  );
}
