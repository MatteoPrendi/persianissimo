"use client";

import { motion } from "motion/react";
import ContactForm from "./form";
import type { ContactUs } from "@/payload-types";

interface ContactUsClientProps {
  heading: string;
  subtitle: string;
  fields: ContactUs["fields"];
}

export default function ContactUsClient({
  heading,
  subtitle,
  fields,
}: ContactUsClientProps) {
  return (
    <main className="min-h-[80vh] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-12">
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-12 max-w-2xl space-y-4 text-center sm:mt-16"
        >
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-foreground font-serif text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            {heading}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-foreground/75 font-sans text-lg leading-relaxed sm:text-xl"
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {/* Animated Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <ContactForm fields={fields} />
        </motion.div>
      </div>
    </main>
  );
}
