"use client";

import FormPage2 from "@/components/form-page-2";
import { useRegistrationFlow } from "@/components/registration-flow-provider";
import { submitFormToNotion } from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import { useCallback, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { isFormClosed } from "@/lib/deadline";
import FormClosedSection from "@/components/form-closed-section";
import { getFormattedDeadline } from "@/lib/deadline";

export default function RegisterPage2() {
  const router = useRouter();
  const { formData, setFormData, errors, setErrors, reset } =
    useRegistrationFlow();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (isFormClosed()) {
      setClosed(true);
    }
  }, []);

  const validateFormPage2 = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (formData.preFestDepartments.length === 0)
      newErrors.preFestDepartments =
        "Please select at least one pre-fest department (max 2)";
    if (formData.preFestDepartments.length > 2)
      newErrors.preFestDepartments = "You can select maximum 2 pre-fest departments";
    if (!formData.festDayDepartment)
      newErrors.festDayDepartment = "Please select a fest day department";
    if (!formData.motivation.trim())
      newErrors.motivation = "Please share why you want to work in Neutron3.0 Fest";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, setErrors]);

  const handleSubmit = useCallback(async () => {
    // Check if form is closed before allowing submission
    if (isFormClosed()) {
      toast({
        title: "Registration Closed",
        description: "Sorry, the registration period has ended.",
        variant: "destructive",
      });
      setClosed(true);
      return;
    }

    if (!validateFormPage2()) return;

    setIsSubmitting(true);
    try {
      toast({
        title: "Submitting registration...",
        description: "Please wait while we process your application.",
      });

      const result = await submitFormToNotion(formData);
      console.log("Submission result:", result);

      if (result.success) {
        console.log("Form submitted successfully, redirecting to thank-you page");
        
        // Mark that the form was successfully submitted BEFORE any navigation
        sessionStorage.setItem("neutron.form.submitted", "true");
        
        toast({
          title: "Registration successful! 🎉",
          description: result.message,
        });
        
        // Clear the form data after setting the flag
        reset();
        
        // Navigate to thank-you page
        router.replace("/thank-you");
      } else {
        console.error("Form submission failed:", result);
        toast({
          title: "Submission failed",
          description: result.error || "Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, router, reset, validateFormPage2]);

  if (closed) {
    return <FormClosedSection closingTime={getFormattedDeadline()} />;
  }

  return (
    <FormPage2
      formData={formData}
      errors={errors}
      onFormDataChange={setFormData}
      onSubmit={handleSubmit}
      onBack={() => router.push("/register/1")}
      isSubmitting={isSubmitting}
    />
  );
}

