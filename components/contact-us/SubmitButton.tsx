"use client";

import { motion } from "motion/react";
import { SpinnerIcon, PaperPlaneRightIcon } from "@phosphor-icons/react";

interface SubmitButtonProps {
  isSubmitting: boolean;
  submitText: string;
}

export function SubmitButton({ isSubmitting, submitText }: SubmitButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.55 }}
      className="pt-2"
    >
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isSubmitting}
        className="bg-accent hover:bg-accent/90 focus:ring-accent/50 inline-flex w-full min-w-50 cursor-pointer items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-base font-medium text-white shadow-md transition-all focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <SpinnerIcon className="animate-spin" size={20} />
            <span>In corso...</span>
          </>
        ) : (
          <>
            <span>{submitText}</span>
            <PaperPlaneRightIcon size={18} weight="bold" />
          </>
        )}
      </motion.button>
    </motion.div>
  );
}
