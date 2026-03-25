"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Noise from "@/components/Noise";
import Image from "next/image";
import Link from "next/link";

interface FormData {
  name: string;
  email: string;
  whatsapp: string;
  gender: string;
  college: string;
  stream: string;
  yearOfStudy: string;
  previousExperience: string;
  whyAmbassador: string;
  instagramUrl: string;
  linkedinUrl: string;
}

interface FormErrors {
  [key: string]: string;
}

const GENDER_OPTIONS = ["Male", "Female"];
const YEAR_OPTIONS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year +"];

const inputBase =
  "w-full bg-white/[0.04] border rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 outline-none transition-all duration-300 focus:bg-white/[0.07]";
const inputNormal = `${inputBase} border-white/10 focus:border-cyan-400/60 focus:shadow-[0_0_0_2px_rgba(34,211,238,0.12)]`;
const inputError  = `${inputBase} border-red-500/50 bg-red-500/[0.04] focus:border-red-400/70 focus:shadow-[0_0_0_2px_rgba(239,68,68,0.12)]`;

function Field({
  id,
  label,
  required = false,
  children,
  hint,
  error,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
  hint?: string;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="flex items-center gap-1.5 text-sm font-semibold text-white/80 tracking-wide">
        {label}
        {required && <span className="text-cyan-400 text-xs">*</span>}
      </label>
      {hint && <p className="text-xs text-white/35 -mt-1">{hint}</p>}
      {children}
      {error && (
        <p className="text-xs text-red-400 flex items-center gap-1.5 mt-0.5">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    whatsapp: "",
    gender: "",
    college: "",
    stream: "",
    yearOfStudy: "",
    previousExperience: "",
    whyAmbassador: "",
    instagramUrl: "",
    linkedinUrl: "",
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      requestAnimationFrame(() => {
        el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });
    }
  }, []);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "WhatsApp number is required";
    } else if (!/^\+?[\d\s\-()]{7,15}$/.test(formData.whatsapp)) {
      newErrors.whatsapp = "Enter a valid phone number";
    }
    if (!formData.gender) newErrors.gender = "Please select your gender";
    if (!formData.college.trim()) newErrors.college = "College name is required";
    if (!formData.stream.trim()) newErrors.stream = "Stream is required";
    if (!formData.yearOfStudy.trim()) newErrors.yearOfStudy = "Year of study is required";
    if (!formData.whyAmbassador.trim()) newErrors.whyAmbassador = "Please tell us why you want to be an ambassador";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleGenderSelect = (gender: string) => {
    setFormData((prev) => ({ ...prev, gender }));
    if (errors.gender) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated.gender;
        return updated;
      });
    }
  };

  const handleYearSelect = (year: string) => {
    setFormData((prev) => ({ ...prev, yearOfStudy: year }));
    if (errors.yearOfStudy) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated.yearOfStudy;
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/thank-you");
      } else {
        const data = await res.json();
        setErrors({ submit: data.error || "Something went wrong. Please try again." });
      }
    } catch {
      setErrors({ submit: "Network error. Please check your connection and try again." });
    } finally {
      setSubmitting(false);
    }
  };



  return (
    <div className="min-h-screen bg-black text-white dark relative overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 60% at 20% 20%, rgba(34,211,238,0.04) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 80%, rgba(59,130,246,0.05) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <Noise patternAlpha={15} patternRefreshInterval={4} />
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 border-b border-white/[0.06] backdrop-blur-xl bg-black/60">
        <Link href="/campus-ambassador" className="flex items-center gap-2.5 group">
          <Image
            src="/logo.jpeg"
            alt="Neutron"
            width={30}
            height={30}
            className="rounded-full border border-white/20 group-hover:border-cyan-400/40 transition-colors duration-300"
          />
          <span className="text-sm font-semibold text-white/80 tracking-widest uppercase group-hover:text-white transition-colors duration-300">
            Neutron
          </span>
        </Link>
        <div className="flex items-center gap-2 text-[11px] text-white/30 tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Campus Ambassador · 2026
        </div>
      </header>

      <main className="relative z-10 min-h-screen pt-24 pb-20 px-4">
        <div className="max-w-2xl mx-auto">

          <div ref={containerRef} className="mb-12 text-center">
            <p className="text-[11px] font-medium tracking-[0.45em] uppercase text-cyan-400/70 mb-4">
              Neutron Campus Ambassador Program · 2026
            </p>
            <h1
              className="leading-[1.05] text-white mb-4"
              style={{
                fontSize: "clamp(2.2rem, 6vw, 4rem)",
                fontFamily: "'Georgia','Times New Roman',serif",
                fontWeight: 300,
                fontStyle: "italic",
              }}
            >
              Join the{" "}
              <span
                style={{ fontStyle: "normal", fontWeight: 700 }}
                className="text-white"
              >
                Orbit.
              </span>
            </h1>
            <p className="text-sm text-white/40 max-w-md mx-auto font-light leading-relaxed">
              Fill in the details below to apply as a Campus Ambassador for Neutron 2026.
              Selected candidates will be notified within 5–7 business days.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="relative rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.7)]"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

            <div className="p-8 md:p-12 flex flex-col gap-8">

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-cyan-400/60">
                    01  ·  Personal Information
                  </span>
                  <div className="flex-1 h-px bg-white/[0.06]" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="sm:col-span-2">
                    <Field id="name" label="Full Name" required error={errors.name}>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={errors.name ? inputError : inputNormal}
                        autoComplete="name"
                      />
                    </Field>
                  </div>

                  <Field id="email" label="Email Address" required error={errors.email}>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={errors.email ? inputError : inputNormal}
                      autoComplete="email"
                    />
                  </Field>

                  <Field id="whatsapp" label="WhatsApp Number" required error={errors.whatsapp}>
                    <input
                      id="whatsapp"
                      name="whatsapp"
                      type="tel"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className={errors.whatsapp ? inputError : inputNormal}
                      autoComplete="tel"
                    />
                  </Field>

                  <div className="sm:col-span-2">
                    <Field id="gender" label="Gender" required error={errors.gender}>
                      <div className="flex flex-wrap gap-3 mt-1">
                        {GENDER_OPTIONS.map((option) => {
                          const selected = formData.gender === option;
                          return (
                            <button
                              key={option}
                              type="button"
                              onClick={() => handleGenderSelect(option)}
                              className={`
                                px-5 py-2.5 rounded-xl text-sm font-medium border transition-all duration-300
                                ${selected
                                  ? "bg-cyan-400/15 border-cyan-400/50 text-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.15)]"
                                  : "bg-white/[0.03] border-white/10 text-white/50 hover:border-white/25 hover:text-white/80 hover:bg-white/[0.06]"
                                }
                              `}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>
                    </Field>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-cyan-400/60">
                    02  ·  Academic Details
                  </span>
                  <div className="flex-1 h-px bg-white/[0.06]" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="sm:col-span-2">
                    <Field id="college" label="College Name" required error={errors.college}>
                      <input
                        id="college"
                        name="college"
                        type="text"
                        value={formData.college}
                        onChange={handleChange}
                        placeholder="Your college / university"
                        className={errors.college ? inputError : inputNormal}
                      />
                    </Field>
                  </div>

                  <Field id="stream" label="Stream" required error={errors.stream}>
                    <input
                      id="stream"
                      name="stream"
                      type="text"
                      value={formData.stream}
                      onChange={handleChange}
                      placeholder="e.g. Computer Science"
                      className={errors.stream ? inputError : inputNormal}
                    />
                  </Field>

                  <div className="sm:col-span-2">
                    <Field id="yearOfStudy" label="Year of Study" required error={errors.yearOfStudy}>
                      <div className="flex flex-wrap gap-3 mt-1">
                        {YEAR_OPTIONS.map((option) => {
                          const selected = formData.yearOfStudy === option;
                          return (
                            <button
                              key={option}
                              type="button"
                              onClick={() => handleYearSelect(option)}
                              className={`
                                px-5 py-2.5 rounded-xl text-sm font-medium border transition-all duration-300
                                ${selected
                                  ? "bg-cyan-400/15 border-cyan-400/50 text-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.15)]"
                                  : "bg-white/[0.03] border-white/10 text-white/50 hover:border-white/25 hover:text-white/80 hover:bg-white/[0.06]"
                                }
                              `}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>
                    </Field>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-cyan-400/60">
                    03  ·  Your Story
                  </span>
                  <div className="flex-1 h-px bg-white/[0.06]" />
                </div>

                <div className="flex flex-col gap-6">
                  <Field id="previousExperience" label="Previous Experience" hint="Any relevant clubs, ambassador roles, or leadership positions" error={errors.previousExperience}>
                    <textarea
                      id="previousExperience"
                      name="previousExperience"
                      value={formData.previousExperience}
                      onChange={handleChange}
                      placeholder="Tell us about your past experience..."
                      rows={3}
                      className={`${errors.previousExperience ? inputError : inputNormal} resize-none`}
                    />
                  </Field>

                  <Field id="whyAmbassador" label="Why do you want to be a CA?" required hint="Convince us — what makes you the right fit?" error={errors.whyAmbassador}>
                    <textarea
                      id="whyAmbassador"
                      name="whyAmbassador"
                      value={formData.whyAmbassador}
                      onChange={handleChange}
                      placeholder="Share your vision and motivation..."
                      rows={4}
                      className={`${errors.whyAmbassador ? inputError : inputNormal} resize-none`}
                    />
                  </Field>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-cyan-400/60">
                    04  ·  Social Presence
                  </span>
                  <div className="flex-1 h-px bg-white/[0.06]" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Field id="instagramUrl" label="Instagram Profile URL" hint="Your public Instagram profile link" error={errors.instagramUrl}>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 text-sm pointer-events-none">
                        IG
                      </span>
                      <input
                        id="instagramUrl"
                        name="instagramUrl"
                        type="url"
                        value={formData.instagramUrl}
                        onChange={handleChange}
                        placeholder="instagram.com/yourhandle"
                        className={`${errors.instagramUrl ? inputError : inputNormal} pl-10`}
                      />
                    </div>
                  </Field>

                  <Field id="linkedinUrl" label="LinkedIn Profile URL" hint="Your LinkedIn profile link" error={errors.linkedinUrl}>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 text-sm pointer-events-none">
                        in
                      </span>
                      <input
                        id="linkedinUrl"
                        name="linkedinUrl"
                        type="url"
                        value={formData.linkedinUrl}
                        onChange={handleChange}
                        placeholder="linkedin.com/in/yourname"
                        className={`${errors.linkedinUrl ? inputError : inputNormal} pl-10`}
                      />
                    </div>
                  </Field>
                </div>
              </div>

              {errors.submit && (
                <div className="rounded-xl bg-red-500/10 border border-red-500/30 px-5 py-4 text-sm text-red-300 flex items-start gap-3">
                  <span className="text-lg">⚠</span>
                  <span>{errors.submit}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-white/[0.06]">
                <p className="text-xs text-white/25 text-center sm:text-left leading-relaxed max-w-xs">
                  Your information is securely stored and used solely for the selection process.
                </p>
                <button
                  type="submit"
                  disabled={submitting}
                  className={`
                    group relative inline-flex items-center gap-3 rounded-full text-sm font-semibold tracking-wide
                    px-8 py-4 transition-all duration-300 shrink-0 overflow-hidden
                    ${submitting
                      ? "bg-white/10 text-white/40 cursor-not-allowed border border-white/10"
                      : "bg-white text-black hover:bg-cyan-50 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(34,211,238,0.25)] border border-white"
                    }
                  `}
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white/60 animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    <>
                      Submit Application
                      <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-base">
                        ↗
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
          </form>

          <p className="mt-8 text-center text-[11px] text-white/20 tracking-wide">
            © 2026 Neutron Fest · All rights reserved
          </p>
        </div>
      </main>
    </div>
  );
}
