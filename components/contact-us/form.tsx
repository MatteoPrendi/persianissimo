"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { ContactUs } from "@/payload-types";
import {
  PaperPlaneRightIcon,
  CheckCircleIcon,
  SpinnerIcon,
  WarningCircleIcon,
  CheckIcon,
} from "@phosphor-icons/react";

interface FormProps {
  fields: ContactUs["fields"];
}

interface FieldErrors {
  name?: string;
  lastName?: string;
  email?: string;
  message?: string;
}

interface TouchedFields {
  name?: boolean;
  lastName?: boolean;
  email?: boolean;
  message?: boolean;
}

export default function ContactForm({ fields }: FormProps) {
  const formRenderTime = useRef<number>(Date.now());
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    message: "",
    website: "", // Anti-spam honeypot
  });

  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Field validation rules
  const validateField = (name: string, value: string): string | undefined => {
    const trimmed = value.trim();
    switch (name) {
      case "name":
        if (!trimmed) return "Il nome è un campo obbligatorio.";
        if (trimmed.length < 2) return "Il nome deve contenere almeno 2 caratteri.";
        return undefined;
      case "lastName":
        if (!trimmed) return "Il cognome è un campo obbligatorio.";
        if (trimmed.length < 2) return "Il cognome deve contenere almeno 2 caratteri.";
        return undefined;
      case "email":
        if (!trimmed) return "L'indirizzo email è un campo obbligatorio.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
          return "Inserisci un indirizzo email valido (es. nome@dominio.it).";
        }
        return undefined;
      case "message":
        if (!trimmed) return "Il messaggio è un campo obbligatorio.";
        if (trimmed.length < 10) return "Il messaggio deve contenere almeno 10 caratteri.";
        return undefined;
      default:
        return undefined;
    }
  };

  const validateAll = (data = formData): FieldErrors => {
    const newErrors: FieldErrors = {};
    const nameErr = validateField("name", data.name);
    if (nameErr) newErrors.name = nameErr;

    const lastNameErr = validateField("lastName", data.lastName);
    if (lastNameErr) newErrors.lastName = lastNameErr;

    const emailErr = validateField("email", data.email);
    if (emailErr) newErrors.email = emailErr;

    const messageErr = validateField("message", data.message);
    if (messageErr) newErrors.message = messageErr;

    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name as keyof TouchedFields]) {
      const fieldErr = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: fieldErr }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldErr = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: fieldErr }));
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      name: true,
      lastName: true,
      email: true,
      message: true,
    });

    const validationErrors = validateAll();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setErrorMessage("Per favore, correggi gli errori nel modulo prima di inviare.");
      return;
    }

    // Client-side honeypot check (fake success for bots)
    if (formData.website) {
      setIsSubmitted(true);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          _renderTime: formRenderTime.current,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Si è verificato un errore durante l'invio del messaggio."
        );
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setErrorMessage(
        err.message ||
          "Si è verificato un errore durante l'invio del messaggio. Riprova più tardi."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputClassName = (fieldKey: keyof FieldErrors) => {
    const hasError = touched[fieldKey] && errors[fieldKey];
    const isValid =
      touched[fieldKey] &&
      !errors[fieldKey] &&
      formData[fieldKey].trim().length > 0;

    if (hasError) {
      return "border-red-500 bg-red-50/20 text-foreground placeholder:text-foreground/40 focus:border-red-500 focus:ring-red-200/50 w-full rounded-xl border px-4 py-3 font-sans transition-all focus:ring-2 focus:outline-none";
    }
    if (isValid) {
      return "border-emerald-500/50 bg-white text-foreground placeholder:text-foreground/40 focus:border-emerald-500/70 focus:ring-emerald-200/40 w-full rounded-xl border px-4 py-3 font-sans transition-all focus:ring-2 focus:outline-none";
    }
    return "border-foreground/15 bg-white text-foreground placeholder:text-foreground/40 focus:border-accent focus:ring-accent/20 w-full rounded-xl border px-4 py-3 font-sans transition-all focus:ring-2 focus:outline-none";
  };

  const renderFieldError = (fieldKey: keyof FieldErrors) => {
    const error = errors[fieldKey];
    const isTouched = touched[fieldKey];

    return (
      <AnimatePresence>
        {isTouched && error && (
          <motion.div
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="text-red-600 font-sans text-xs font-medium flex items-center gap-1.5 pt-1.5">
              <WarningCircleIcon size={14} className="shrink-0 text-red-500" />
              <span>{error}</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  const renderValidBadge = (fieldKey: keyof FieldErrors) => {
    const isValid =
      touched[fieldKey] &&
      !errors[fieldKey] &&
      formData[fieldKey].trim().length > 0;

    return (
      <AnimatePresence>
        {isValid && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="text-emerald-600 absolute right-3.5 top-3.5 flex items-center justify-center rounded-full bg-emerald-100 p-0.5"
          >
            <CheckIcon size={12} weight="bold" />
          </motion.span>
        )}
      </AnimatePresence>
    );
  };

  if (isSubmitted) {
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

  return (
    <form
      onSubmit={handleSubmit}
      className="border-foreground/10 space-y-6 rounded-3xl border bg-white p-6 shadow-xl sm:p-10"
      noValidate
    >
      {/* Anti-spam Honeypot field */}
      <div className="sr-only hidden absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website}
          onChange={handleChange}
        />
      </div>

      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700 flex items-center gap-2">
              <WarningCircleIcon size={18} className="shrink-0 text-red-500" />
              <span>{errorMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="space-y-1.5"
        >
          <label
            htmlFor="name"
            className="text-foreground/90 block font-sans text-sm font-medium"
          >
            {fields.name.label} <span className="text-accent">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={fields.name.placeholder}
              className={getInputClassName("name")}
            />
            {renderValidBadge("name")}
          </div>
          {renderFieldError("name")}
        </motion.div>

        {/* Last Name */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="space-y-1.5"
        >
          <label
            htmlFor="lastName"
            className="text-foreground/90 block font-sans text-sm font-medium"
          >
            {fields.lastName.label} <span className="text-accent">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={fields.lastName.placeholder}
              className={getInputClassName("lastName")}
            />
            {renderValidBadge("lastName")}
          </div>
          {renderFieldError("lastName")}
        </motion.div>
      </div>

      {/* Email */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.45 }}
        className="space-y-1.5"
      >
        <label
          htmlFor="email"
          className="text-foreground/90 block font-sans text-sm font-medium"
        >
          {fields.email.label} <span className="text-accent">*</span>
        </label>
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={fields.email.placeholder}
            className={getInputClassName("email")}
          />
          {renderValidBadge("email")}
        </div>
        {renderFieldError("email")}
      </motion.div>

      {/* Message */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="space-y-1.5"
      >
        <label
          htmlFor="message"
          className="text-foreground/90 block font-sans text-sm font-medium"
        >
          {fields.message.label} <span className="text-accent">*</span>
        </label>
        <div className="relative">
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={fields.message.placeholder}
            className={`min-h-30 resize-y ${getInputClassName("message")}`}
          />
          {renderValidBadge("message")}
        </div>
        {renderFieldError("message")}
      </motion.div>

      {/* Submit Button */}
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
              <span>{fields.submit}</span>
              <PaperPlaneRightIcon size={18} weight="bold" />
            </>
          )}
        </motion.button>
      </motion.div>
    </form>
  );
}
