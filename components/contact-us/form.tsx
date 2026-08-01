"use client";

import { motion, AnimatePresence } from "motion/react";
import type { ContactUs } from "@/payload-types";
import {
  WarningCircleIcon,
  UserIcon,
  EnvelopeSimpleIcon,
  ChatTeardropTextIcon,
} from "@phosphor-icons/react";
import { clsx } from "clsx";
import { Input, Textarea } from "@/components/ui/input";
import { useContactForm } from "@/components/contact-us/use-contact-form";
import { SuccessState } from "@/components/contact-us/SuccessState";
import { SubmitButton } from "@/components/contact-us/SubmitButton";

interface FormProps {
  fields: ContactUs["fields"];
}

export default function ContactForm({ fields }: FormProps) {
  const {
    formData,
    errors,
    touched,
    isSubmitting,
    isSubmitted,
    errorMessage,
    handleChange,
    handleBlur,
    handleSubmit,
    isFieldValid,
  } = useContactForm();

  if (isSubmitted) {
    return <SuccessState />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-foreground/10 space-y-6 rounded-3xl border bg-white p-6 shadow-xl sm:p-10"
      noValidate
    >
      {/* Honeypot anti-spam field */}
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

      {/* Global error message banner */}
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

      <SubmitButton isSubmitting={isSubmitting} submitText={fields.submit} />
    </form>
  );
}
