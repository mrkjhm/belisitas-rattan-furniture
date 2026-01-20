"use client";
import { useEffect, useRef, useState } from "react";

import { cubicBezier, motion, useAnimation, useInView } from "framer-motion";
import { Send, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const easeInOut = cubicBezier(0.42, 0, 0.58, 1);

const Contact = () => {
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
        ease: easeInOut,
      },
    },
  };

  const leftRef = useRef(null);
  const leftInView = useInView(leftRef, { amount: 0.2 });
  const leftControls = useAnimation();

  useEffect(() => {
    leftControls.start(leftInView ? "show" : "hidden");
  }, [leftInView, leftControls]);

  // useEffect(() => {
  //   leftControls.start(
  //     leftInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
  //   );
  // }, [leftInView, leftControls]);

  const rightRef = useRef(null);
  const rightInView = useInView(rightRef, { amount: 0.2 });
  const rightControls = useAnimation();

  useEffect(() => {
    rightControls.start(rightInView ? "show" : "hidden");
  }, [rightInView, rightControls]);

  // useEffect(() => {
  //   rightControls.start(
  //     rightInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }
  //   );
  // }, [rightInView, rightControls]);

  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formEl = event.currentTarget;
    const formData = new FormData(formEl);

    formData.append("access_key", "7b23a059-98bf-4c40-bea4-01d67ce111d0");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data: { success: boolean; message?: string } =
        await response.json();

      if (data.success) {
        toast({
          title: "Form Submitted Successfully",
          description: "We’ll get back to you as soon as possible.",
        });
        formEl.reset();
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast({
          variant: "destructive",
          title: "Submission failed",
          description: data.message ?? "Please try again.",
        });
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Network error",
        description: "Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-[#efebe7]">
        <div className="container mx-auto px-6">
          <motion.div
            ref={headerRef}
            initial="hidden"
            animate={headerControls}
            variants={containerVariants}
            className="text-center max-w-2xl mx-auto"
          >
            <motion.h1
              variants={cardVariants}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 text-background"
            >
              Get in Touch
            </motion.h1>
            <motion.p
              variants={cardVariants}
              className="text-lg text-muted-foreground"
            >
              Have questions about our collection? We'd love to hear from you.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              ref={leftRef}
              initial="hidden"
              animate={leftControls}
              variants={containerVariants}
            >
              <motion.h2 variants={cardVariants} className="font-serif text-2xl font-semibold mb-6 text-background">
                Send us a message
              </motion.h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div variants={cardVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2 ">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="bg-[#efebe7] border-transparent focus:border-accent"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="bg-[#efebe7] border-transparent focus:border-accent"
                    />
                  </div>
                </motion.div>

                <motion.div variants={cardVariants} className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                    className="bg-[#efebe7] border-transparent focus:border-accent"
                  />
                </motion.div>

                <motion.div variants={cardVariants} className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    required
                    className="bg-[#efebe7] border-transparent focus:border-accent resize-none"
                  />
                </motion.div>
                <motion.div variants={cardVariants}>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-accent hover:bg-terracotta-dark text-accent-foreground"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              ref={rightRef}
              initial="hidden"
              animate={rightControls}
              variants={containerVariants}
              className="lg:pl-8"
            >
              <motion.h2 variants={cardVariants} className="font-serif text-2xl font-semibold mb-6 text-background">
                Get In Touch
              </motion.h2>

              <div className="space-y-8 text-background">
                {/* Address */}
                <motion.div variants={cardVariants} className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#efebe7] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-background" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Address</h3>
                    <p className="text-muted-foreground">
                      123 Design District
                      <br />
                      Copenhagen, Denmark 1000
                    </p>
                  </div>
                </motion.div>

                {/* Phone */}
                <motion.div variants={cardVariants} className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#efebe7] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-background" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Phone</h3>
                    <p className="text-muted-foreground">+45 123 456 789</p>
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div variants={cardVariants} className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#efebe7] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-background" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <p className="text-muted-foreground">
                      belisitashandicraftph@gmail.com
                    </p>
                  </div>
                </motion.div>

                {/* Hours */}
                {/* <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Opening Hours</h3>
                    <p className="text-muted-foreground">
                      Mon – Fri: 10am – 6pm
                      <br />
                      Saturday: 11am – 5pm
                      <br />
                      Sunday: By appointment
                    </p>
                  </div>
                </div> */}
              </div>

              {/* Map Placeholder */}
              {/* <div className="mt-12 aspect-video rounded-lg overflow-hidden bg-muted">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2249.685716398768!2d12.568604!3d55.676098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4652531280f6eaf3%3A0xd9b50b0f8cb9e6a7!2sCopenhagen%2C%20Denmark!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Our location"
                />
              </div> */}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
