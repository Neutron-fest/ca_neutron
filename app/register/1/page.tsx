"use client";

import FormPage1 from "@/components/form-page-1";
import { useRegistrationFlow } from "@/components/registration-flow-provider";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isFormClosed } from "@/lib/deadline";
import FormClosedSection from "@/components/form-closed-section";
import { getFormattedDeadline } from "@/lib/deadline";

export default function RegisterPage1() {
  const router = useRouter();
  const { formData, setFormData, errors, setErrors } = useRegistrationFlow();
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (isFormClosed()) {
      setClosed(true);
    }
  }, []);

  const validateFormPage1 = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "University email is required";
    } else if (!formData.email.includes("rishihood.edu.in")) {
      newErrors.email = "Please use your Rishihood University email";
    }
    if (!formData.enrollmentId.trim())
      newErrors.enrollmentId = "Enrollment ID is required";
    if (!formData.year.trim()) newErrors.year = "Please select your year";
    if (!formData.whatsappNumber.trim()) {
      newErrors.whatsappNumber = "WhatsApp number is required";
    } else if (!/^\d{10}$/.test(formData.whatsappNumber.replace(/\D/g, ""))) {
      newErrors.whatsappNumber = "Please enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, setErrors]);

  const handleNext = useCallback(() => {
    if (isFormClosed()) {
      setClosed(true);
      return;
    }
    if (validateFormPage1()) router.push("/register/2");
  }, [router, validateFormPage1]);

  if (closed) {
    return <FormClosedSection closingTime={getFormattedDeadline()} />;
  }

  return (
    <FormPage1
      formData={formData}
      errors={errors}
      onFormDataChange={setFormData}
      onNext={handleNext}
      onBack={() => router.push("/register/method")}
    />
  );
}

