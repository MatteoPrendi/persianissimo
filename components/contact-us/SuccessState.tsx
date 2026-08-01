"use client";

import { motion, AnimatePresence } from "motion/react";
import { CheckCircleIcon } from "@phosphor-icons/react";

export function SuccessState() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="success"
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="border-foreground/10 bg-white rounded-3xl border p-8 text-center shadow-xl sm:p-12"
      >
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 18,
            delay: 0.1,
          }}
          className="bg-accent/10 text-accent mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full shadow-inner"
        >
          <CheckCircleIcon size={48} weight="fill" />
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-foreground mb-3 font-serif text-2xl font-bold sm:text-3xl"
        >
          Messaggio inviato!
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-foreground/75 mx-auto max-w-md font-sans text-base leading-relaxed"
        >
          Grazie per averci contattato. Abbiamo ricevuto la tua richiesta e ti
          risponderemo il prima possibile.
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
