"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { ContactUs } from "@/payload-types";
import {
  PaperPlaneRightIcon,
  CheckCircleIcon,
  SpinnerIcon,
  WarningCircleIcon,
  UserIcon,
  EnvelopeSimpleIcon,
  ChatTeardropTextIcon,
} from "@phosphor-icons/react";
import { clsx } from "clsx";
import { Input, Textarea } from "@/components/ui/input";

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
    website: "",
  });

  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
        if (value.length > 500) return "Il messaggio non può superare i 500 caratteri.";
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

  const isFieldValid = (fieldKey: keyof FieldErrors): boolean => {
    return Boolean(
      touched[fieldKey] &&
        !errors[fieldKey] &&
        formData[fieldKey].trim().length > 0
    );
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

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
      <div className="sr-only hidden absolute left-[-9999px]" aria-hidden="true">
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
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
        >
          <Input
            id="name"
            name="name"
            label={fields.name.label}
            placeholder={fields.name.placeholder}
            required
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name}
            touched={touched.name}
            isValid={isFieldValid("name")}
            icon={<UserIcon size={18} />}
            autoComplete="off"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Input
            id="lastName"
            name="lastName"
            autoComplete="off"
            label={fields.lastName.label}
            placeholder={fields.lastName.placeholder}
            required
            value={formData.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.lastName}
            touched={touched.lastName}
            isValid={isFieldValid("lastName")}
            icon={<UserIcon size={18} />}
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.45 }}
      >
        <Input
          type="email"
          id="email"
          name="email"
          label={fields.email.label}
          placeholder={fields.email.placeholder}
          required
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          touched={touched.email}
          isValid={isFieldValid("email")}
          icon={<EnvelopeSimpleIcon size={18} />}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <Textarea
          id="message"
          name="message"
          label={fields.message.label}
          placeholder={fields.message.placeholder}
          required
          rows={5}
          maxLength={500}
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.message}
          touched={touched.message}
          isValid={isFieldValid("message")}
          icon={<ChatTeardropTextIcon size={18} />}
          className="min-h-30 max-h-75 resize-y"
          rightLabelElement={
            <span
              className={clsx(
                "font-sans text-xs font-medium transition-colors",
                formData.message.length >= 480
                  ? "font-bold text-red-500"
                  : formData.message.length >= 400
                  ? "text-amber-600"
                  : "text-foreground/50"
              )}
            >
              {formData.message.length}/500
            </span>
          }
        />
      </motion.div>

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
