"use client";

import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  GraduationCap,
  ShieldCheck,
  User,
} from "lucide-react";

export interface FormData {
  name: string;
  email: string;
  enrollmentId: string;
  year: string;
  whatsappNumber: string;
  preFestDepartments: string[];
  festDayDepartment: string;
  motivation: string;
  workSample: string;
}

interface FormPage1Props {
  formData: FormData;
  errors: Record<string, string>;
  onFormDataChange: (formData: FormData) => void;
  onNext: () => void;
  onBack: () => void;
}

function FormPage1({
  formData,
  errors,
  onFormDataChange,
  onNext,
  onBack,
}: FormPage1Props) {
  const handleYearSelect = (yearValue: string) => {
    onFormDataChange({ ...formData, year: yearValue });
  };

  return (
    <section
      className={[
        "relative bg-black",
        "min-h-[100svh]",
      ].join(" ")}
    >
      {/* Tech background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black" />
        <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="absolute -top-28 left-1/2 h-72 w-[90vw] sm:w-[46rem] max-w-[46rem] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-[-7rem] right-[-7rem] h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute inset-0 neutron-scanlines" />
        <div className="absolute inset-0 neutron-noise" />
        <div className="absolute left-0 top-0 h-[42%] w-full neutron-sweep" />
      </div>

      <div className="relative mx-auto flex h-full max-w-6xl flex-col px-4 py-8 sm:px-8 lg:px-12 lg:py-10">
        {/* Top shell */}
        <header className="neutron-panel neutron-hud rounded-3xl px-6 py-6 sm:px-8 sm:py-7">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="border-cyan-500/20 bg-cyan-500/10 text-cyan-200 hover:bg-cyan-500/10 font-mono">
                  MODULE: APPLICATION
                </Badge>
                <Badge className="border-white/10 bg-white/5 text-white/80 hover:bg-white/5 font-mono">
                  STEP: 3/4
                </Badge>
                <Badge className="border-white/10 bg-white/5 text-white/70 hover:bg-white/5 font-mono">
                  PROFILE
                </Badge>
              </div>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Personal Information
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
                Enter accurate details. We’ll use these for shortlisting and communication.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                <ShieldCheck className="h-5 w-5 text-cyan-200" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">System</div>
                <div className="text-xs text-white/60 font-mono">
                  autosave: local • validate: on next
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-5 bg-white/10" />

          {/* Stepper (compact) */}
          <div className="grid gap-3 sm:grid-cols-4">
            {[
              { label: "Intro", state: "done" as const },
              { label: "Departments", state: "done" as const },
              { label: "Profile", state: "active" as const },
              { label: "Preferences", state: "next" as const },
            ].map((s) => (
              <div
                key={s.label}
                className={[
                  "flex items-center gap-3 rounded-2xl border bg-black/20 px-4 py-3",
                  s.state === "done"
                    ? "border-cyan-500/25"
                    : s.state === "active"
                    ? "border-white/15"
                    : "border-white/10",
                ].join(" ")}
              >
                <div
                  className={[
                    "flex h-9 w-9 items-center justify-center rounded-xl ring-1",
                    s.state === "done"
                      ? "bg-cyan-500/10 ring-cyan-500/25"
                      : s.state === "active"
                      ? "bg-white/5 ring-white/12"
                      : "bg-white/5 ring-white/10 opacity-70",
                  ].join(" ")}
                >
                  {s.state === "done" ? (
                    <CheckCircle2 className="h-4 w-4 text-cyan-200" />
                  ) : (
                    <span className="text-xs font-semibold text-white/80 font-mono">
                      {s.state === "active" ? "03" : "04"}
                    </span>
                  )}
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-white">
                    {s.label}
                  </div>
                  <div className="text-[11px] text-white/55 font-mono">
                    {s.state === "done"
                      ? "status: complete"
                      : s.state === "active"
                      ? "status: in_progress"
                      : "status: queued"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </header>

        {/* Main layout */}
        <div className="mt-6 grid flex-1 gap-5 lg:grid-cols-[1fr_360px] lg:items-stretch">
          {/* Form pane */}
          <Card className="neutron-panel neutron-hud rounded-3xl p-5 sm:p-7 lg:flex lg:min-h-0 lg:flex-col">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold text-white">Registration</div>
              <div className="text-[11px] text-white/55 font-mono">
                required fields marked *
              </div>
            </div>
            <Separator className="my-4 bg-white/10" />

            <div className="space-y-6 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pr-2">
              {/* Personal */}
              <div className="neutron-hud rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <User className="h-4 w-4 text-cyan-200" />
                  Personal
                </div>
                <div className="mt-4 grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm text-white/80">
                      Full name <span className="text-cyan-200">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        onFormDataChange({ ...formData, name: e.target.value })
                      }
                      aria-invalid={!!errors.name}
                      className={[
                        "h-12 rounded-2xl border-white/10 bg-black/40 text-white placeholder:text-white/40",
                        "focus-visible:ring-1 focus-visible:ring-cyan-500/40",
                        "[&:not(:placeholder-shown)]:text-white [&:not(:placeholder-shown)]:font-medium",
                        errors.name ? "border-red-500/40" : "",
                      ].join(" ")}
                      placeholder="Enter your complete name"
                    />
                    {errors.name && (
                      <p className="text-xs text-red-300 font-mono">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="enrollmentId"
                      className="text-sm text-white/80"
                    >
                      Enrollment ID <span className="text-cyan-200">*</span>
                    </Label>
                    <Input
                      id="enrollmentId"
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={formData.enrollmentId}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) {
                          onFormDataChange({
                            ...formData,
                            enrollmentId: value,
                          });
                        }
                      }}
                      onKeyDown={(e) => {
                        if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
                          e.preventDefault();
                        }
                      }}
                      aria-invalid={!!errors.enrollmentId}
                      className={[
                        "h-12 rounded-2xl border-white/10 bg-black/40 text-white placeholder:text-white/40",
                        "focus-visible:ring-1 focus-visible:ring-cyan-500/40",
                        "[&:not(:placeholder-shown)]:text-white [&:not(:placeholder-shown)]:font-medium",
                        errors.enrollmentId ? "border-red-500/40" : "",
                      ].join(" ")}
                      placeholder="Your university enrollment ID"
                    />
                    {errors.enrollmentId && (
                      <p className="text-xs text-red-300 font-mono">
                        {errors.enrollmentId}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-5 space-y-2">
                  <Label htmlFor="email" className="text-sm text-white/80">
                    University email <span className="text-cyan-200">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.name@rishihood.edu.in"
                    value={formData.email}
                    onChange={(e) =>
                      onFormDataChange({ ...formData, email: e.target.value })
                    }
                    aria-invalid={!!errors.email}
                    className={[
                      "h-12 rounded-2xl border-white/10 bg-black/40 text-white placeholder:text-white/40",
                      "focus-visible:ring-1 focus-visible:ring-cyan-500/40",
                      "[&:not(:placeholder-shown)]:text-white [&:not(:placeholder-shown)]:font-medium",
                      errors.email ? "border-red-500/40" : "",
                    ].join(" ")}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-300 font-mono">{errors.email}</p>
                  )}
                </div>

                <div className="mt-5 space-y-2">
                  <Label htmlFor="whatsappNumber" className="text-sm text-white/80">
                    WhatsApp number <span className="text-cyan-200">*</span>
                  </Label>
                  <Input
                    id="whatsappNumber"
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="10-digit number"
                    maxLength={10}
                    value={formData.whatsappNumber}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        onFormDataChange({
                          ...formData,
                          whatsappNumber: value,
                        });
                      }
                    }}
                    onKeyDown={(e) => {
                      if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
                        e.preventDefault();
                      }
                    }}
                    aria-invalid={!!errors.whatsappNumber}
                    className={[
                      "h-12 rounded-2xl border-white/10 bg-black/40 text-white placeholder:text-white/40",
                      "focus-visible:ring-1 focus-visible:ring-cyan-500/40",
                      "[&:not(:placeholder-shown)]:text-white [&:not(:placeholder-shown)]:font-medium",
                      errors.whatsappNumber ? "border-red-500/40" : "",
                    ].join(" ")}
                  />
                  {errors.whatsappNumber && (
                    <p className="text-xs text-red-300 font-mono">
                      {errors.whatsappNumber}
                    </p>
                  )}
                </div>
              </div>

              {/* Academic */}
              <div className="neutron-hud rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <GraduationCap className="h-4 w-4 text-cyan-200" />
                  Academic
                </div>
                <div className="mt-4 space-y-3">
                  <Label className="text-sm text-white/80">
                    Current year <span className="text-cyan-200">*</span>
                    <span className="ml-2 text-[11px] text-white/45 font-mono">
                      select one
                    </span>
                  </Label>
                  <RadioGroup
                    value={formData.year}
                    onValueChange={handleYearSelect}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                  >
                    {["1st Year", "2nd Year"].map((year) => {
                      const selected = formData.year === year;
                      return (
                        <div
                          key={year}
                          className={[
                            "flex items-center gap-3 rounded-2xl border px-4 py-3 cursor-pointer bg-black/20",
                            selected
                              ? "border-cyan-500/25"
                              : "border-white/10 hover:border-white/20",
                          ].join(" ")}
                          onClick={() => handleYearSelect(year)}
                        >
                          <RadioGroupItem value={year} id={year} className="h-5 w-5" />
                          <div className="min-w-0">
                            <Label
                              htmlFor={year}
                              className="cursor-pointer text-sm font-semibold text-white"
                            >
                              {year}
                            </Label>
                            <div className="text-[11px] text-white/55 font-mono">
                              {selected ? "status: selected" : "status: available"}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </RadioGroup>
                  {errors.year && (
                    <p className="text-xs text-red-300 font-mono">{errors.year}</p>
                  )}
                </div>
              </div>
            </div>

            <Separator className="my-5 bg-white/10" />

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                variant="outline"
                onClick={onBack}
                className="h-11 flex-1 rounded-2xl border-white/15 bg-white/5 text-white/85 hover:bg-white/10"
              >
                <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                Back
              </Button>
              <Button
                onClick={onNext}
                className="h-11 flex-1 rounded-2xl bg-white text-black hover:bg-white/90 shadow-[0_18px_70px_rgba(34,211,238,0.14)]"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>

          {/* Side summary */}
          <aside className="grid gap-5 lg:min-h-0">
            <Card className="neutron-panel neutron-hud rounded-3xl p-5 sm:p-7 lg:min-h-0">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-white">Summary</div>
                <div className="text-[11px] text-white/55 font-mono">step: 3/4</div>
              </div>
              <Separator className="my-4 bg-white/10" />

              <div className="grid gap-3 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-white/60 font-mono">name</span>
                  <span className="truncate text-white/85 max-w-[16rem]">
                    {formData.name || "—"}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-white/60 font-mono">enrollment</span>
                  <span className="truncate text-white/85 max-w-[16rem]">
                    {formData.enrollmentId || "—"}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-white/60 font-mono">email</span>
                  <span className="truncate text-white/85 max-w-[16rem]">
                    {formData.email || "—"}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-white/60 font-mono">whatsapp</span>
                  <span className="truncate text-white/85 max-w-[16rem]">
                    {formData.whatsappNumber || "—"}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-white/60 font-mono">year</span>
                  <span className="truncate text-white/85 max-w-[16rem]">
                    {formData.year || "—"}
                  </span>
                </div>
              </div>

              <Separator className="my-4 bg-white/10" />

              <div className="text-[11px] leading-relaxed text-white/55 font-mono">
                <div>
                  <span className="text-white/45">$</span> tip: use your{" "}
                  <span className="text-cyan-200/80">rishihood.edu.in</span> email.
                </div>
                <div className="mt-1 flex items-center gap-2 text-white/55">
                  <CalendarDays className="h-4 w-4 text-cyan-200/80" />
                  timeline: shortlist within ~1 week after interview
                </div>
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default memo(FormPage1);
