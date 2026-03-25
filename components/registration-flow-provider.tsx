"use client";

import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { FormData } from "@/components/form-page-1";

type RegistrationErrors = Record<string, string>;

type RegistrationFlowContextValue = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  errors: RegistrationErrors;
  setErrors: React.Dispatch<React.SetStateAction<RegistrationErrors>>;
  reset: () => void;
};

const STORAGE_KEY = "neutron.registration.flow.v1";

const defaultFormData: FormData = {
  name: "",
  email: "",
  enrollmentId: "",
  year: "",
  whatsappNumber: "",
  preFestDepartments: [],
  festDayDepartment: "",
  motivation: "",
  workSample: "",
};

const RegistrationFlowContext =
  createContext<RegistrationFlowContextValue | null>(null);

export function useRegistrationFlow() {
  const ctx = useContext(RegistrationFlowContext);
  if (!ctx) {
    throw new Error(
      "useRegistrationFlow must be used within RegistrationFlowProvider"
    );
  }
  return ctx;
}

function RegistrationFlowProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [errors, setErrors] = useState<RegistrationErrors>({});

  // hydrate once
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as {
        formData?: Partial<FormData>;
        errors?: RegistrationErrors;
      };
      if (parsed?.formData) {
        setFormData({ ...defaultFormData, ...parsed.formData });
      }
      if (parsed?.errors) setErrors(parsed.errors);
    } catch {
      // ignore storage issues
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // persist
  useEffect(() => {
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          formData,
          errors,
        })
      );
    } catch {
      // ignore storage issues
    }
  }, [formData, errors]);

  const reset = useCallback(() => {
    setFormData(defaultFormData);
    setErrors({});
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const value = useMemo<RegistrationFlowContextValue>(
    () => ({ formData, setFormData, errors, setErrors, reset }),
    [formData, errors, reset]
  );

  return (
    <RegistrationFlowContext.Provider value={value}>
      {children}
    </RegistrationFlowContext.Provider>
  );
}

export default memo(RegistrationFlowProvider);

