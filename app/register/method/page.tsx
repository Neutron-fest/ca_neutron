"use client";

import RegistrationMethodSection from "@/components/registration-method-section";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isFormClosed } from "@/lib/deadline";
import FormClosedSection from "@/components/form-closed-section";
import { getFormattedDeadline } from "@/lib/deadline";

export default function RegistrationMethodPage() {
  const router = useRouter();
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (isFormClosed()) {
      setClosed(true);
    }
  }, []);

  if (closed) {
    return <FormClosedSection closingTime={getFormattedDeadline()} />;
  }

  return (
    <RegistrationMethodSection
      onWebsite={() => {
        if (isFormClosed()) {
          setClosed(true);
        } else {
          router.push("/register/1");
        }
      }}
      onBack={() => router.push("/committees")}
    />
  );
}

