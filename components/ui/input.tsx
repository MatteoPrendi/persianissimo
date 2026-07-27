"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { WarningCircleIcon, CheckIcon } from "@phosphor-icons/react";
import { clsx } from "clsx";

export interface BaseInputProps {
  label?: string;
  required?: boolean;
  error?: string;
  touched?: boolean;
  isValid?: boolean;
  icon?: React.ReactNode;
  rightLabelElement?: React.ReactNode;
  containerClassName?: string;
}

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">,
    BaseInputProps {
  ref?: React.Ref<HTMLInputElement>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange">,
    BaseInputProps {
  ref?: React.Ref<HTMLTextAreaElement>;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function getFieldBorderClass(hasError?: boolean, isValid?: boolean) {
  return clsx(
    "border rounded-xl font-sans transition-all focus:ring-2 focus:outline-none",
    hasError &&
      "border-red-500 bg-red-50/20 text-foreground placeholder:text-foreground/40 focus:border-red-500 focus:ring-red-200/50",
    isValid &&
      !hasError &&
      "border-emerald-500/50 bg-white text-foreground placeholder:text-foreground/40 focus:border-emerald-500/70 focus:ring-emerald-200/40",
    !hasError &&
      !isValid &&
      "border-foreground/15 bg-white text-foreground placeholder:text-foreground/40 focus:border-accent focus:ring-accent/20"
  );
}

export function FieldHeader({
  htmlFor,
  label,
  required,
  rightElement,
}: {
  htmlFor?: string;
  label?: string;
  required?: boolean;
  rightElement?: React.ReactNode;
}) {
  if (!label && !rightElement) return null;

  return (
    <div className="flex items-center justify-between">
      {label && (
        <label
          htmlFor={htmlFor}
          className="text-foreground/90 block font-sans text-sm font-medium"
        >
          {label} {required && <span className="text-accent">*</span>}
        </label>
      )}
      {rightElement}
    </div>
  );
}

export function FieldError({
  error,
  touched,
}: {
  error?: string;
  touched?: boolean;
}) {
  return (
    <AnimatePresence>
      {touched && error && (
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
}

export function ValidBadge({ isValid }: { isValid?: boolean }) {
  return (
    <AnimatePresence>
      {isValid && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="text-emerald-600 absolute right-3.5 top-3.5 flex items-center justify-center rounded-full bg-emerald-100 p-0.5 pointer-events-none"
        >
          <CheckIcon size={12} weight="bold" />
        </motion.span>
      )}
    </AnimatePresence>
  );
}

export function Input({
  id,
  label,
  required,
  error,
  touched,
  isValid,
  icon,
  rightLabelElement,
  containerClassName,
  className,
  type = "text",
  ref,
  ...props
}: InputProps) {
  const hasError = Boolean(touched && error);
  const hasIcon = Boolean(icon);

  return (
    <div className={clsx("space-y-1.5", containerClassName)}>
      <FieldHeader
        htmlFor={id}
        label={label}
        required={required}
        rightElement={rightLabelElement}
      />
      <div className="relative">
        {icon && (
          <div className="text-foreground/40 pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          id={id}
          type={type}
          required={required}
          className={clsx(
            "w-full py-3 pr-10 autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)]",
            hasIcon ? "pl-10" : "pl-4",
            getFieldBorderClass(hasError, isValid),
            className
          )}
          {...props}
        />
        <ValidBadge isValid={isValid} />
      </div>
      <FieldError error={error} touched={touched} />
    </div>
  );
}

export function Textarea({
  id,
  label,
  required,
  error,
  touched,
  isValid,
  icon,
  rightLabelElement,
  containerClassName,
  className,
  rows = 5,
  ref,
  ...props
}: TextareaProps) {
  const hasError = Boolean(touched && error);
  const hasIcon = Boolean(icon);

  return (
    <div className={clsx("space-y-1.5", containerClassName)}>
      <FieldHeader
        htmlFor={id}
        label={label}
        required={required}
        rightElement={rightLabelElement}
      />
      <div className="relative">
        {icon && (
          <div className="text-foreground/40 pointer-events-none absolute left-3.5 top-3.5 flex items-center justify-center">
            {icon}
          </div>
        )}
        <textarea
          ref={ref}
          id={id}
          rows={rows}
          required={required}
          className={clsx(
            "w-full py-3 pr-10",
            hasIcon ? "pl-10" : "pl-4",
            getFieldBorderClass(hasError, isValid),
            className
          )}
          {...props}
        />
        <ValidBadge isValid={isValid} />
      </div>
      <FieldError error={error} touched={touched} />
    </div>
  );
}
