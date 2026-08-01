"use client";

import { useState, useRef } from "react";

export interface FieldErrors {
  name?: string;
  lastName?: string;
  email?: string;
  message?: string;
}

export interface TouchedFields {
  name?: boolean;
  lastName?: boolean;
  email?: boolean;
  message?: boolean;
}

export interface FormData {
  name: string;
  lastName: string;
  email: string;
  message: string;
  website: string;
}

export function useContactForm() {
  const formRenderTime = useRef<number>(Date.now());
  const [formData, setFormData] = useState<FormData>({
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

  return {
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
  };
}
