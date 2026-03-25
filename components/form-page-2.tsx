"use client";

import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowRight,
  Calendar,
  Heart,
  Target,
  Trophy,
  Truck,
  Bus,
  Megaphone,
  AlertTriangle,
  ClipboardCheck,
  Store,
  Handshake,
  Palette,
  Code,
  Brush,
  Lightbulb,
  CheckCircle2,
  CheckCircle,
  ShieldCheck,
  Users,
  Music,
} from "lucide-react";
import { FormData } from "./form-page-1";

const preFestDepartments = [
    {
    id: "management-content",
    name: "Management",
    description:
      "Handle content writing and scripting for brands, website, sponsor decks, scripts for events, and all fest-related documentation and communication materials.",
    shortDesc: "Content writing and scripting",
    icon: ClipboardCheck,
    color: "text-purple-400",
  },
  {
    id: "sponsorship-partnerships",
    name: "Sponsorship ",
    description:
      "Love talking to people and sealing the deal? Bring in exciting brands, secure sponsorships, and manage lasting partnerships for Neutron3.0.",
    shortDesc: "Secure sponsors and manage partnerships",
    icon: Handshake,
    color: "text-cyan-400",
  },
  {
    id: "outreach-community",
    name: "Outreach ",
    description:
      "Take Neutron3.0 beyond campus! Connect with colleges, student communities, and networks to spread the buzz far and wide.",
    shortDesc: "Connect with colleges and student networks",
    icon: Users,
    color: "text-green-600",
  },
  {
    id: "design-creative",
    name: "Design ",
    description:
      "If you’ve got an eye for aesthetics, this is your space. Work on everything from posters and digital creatives to on-ground branding.",
    shortDesc: "Design posters, creatives, and branding",
    icon: Palette,
    color: "text-cyan-400",
  },
  {
    id: "tech-digital",
    name: "Tech ",
    description:
      "Build and manage everything digital. From the fest website and registration systems to online platforms and experiences.",
    shortDesc: "Manage website, registrations, and tech",
    icon: Code,
    color: "text-blue-600",
  },
  {
    id: "decor-experience",
    name: "Decor ",
    description:
      "Bring the vibe! Transform the campus with themed décor, art installations, and creative setups that leave a mark.",
    shortDesc: "Transform campus with themed décor",
    icon: Brush,
    color: "text-cyan-600",
  },
  {
    id: "competitions-management",
    name: "Competitions",
    description:
      "Plan and manage a wide range of competitions, from talent showcases to quirky fun events and everything in between.",
    shortDesc: "Plan and manage competitions",
    icon: Trophy,
    color: "text-yellow-600",
  },
  {
    id: "events-programming",
    name: "Events",
    description:
      "Curate talks, guest lectures, creators summit and engaging interactive activities that spark creativity, broaden perspectives, and keep the audience actively involved",
    shortDesc: "Curate talks and guest lectures",
    icon: Music,
    color: "text-white",
  },
  {
    id: "marketing-promotion",
    name: "Marketing ",
    description:
      "Spread the word! Create campaigns, strategies, and social media buzz to make sure everyone knows about Neutron3.0.",
    shortDesc: "Run campaigns and spread the buzz",
    icon: Megaphone,
    color: "text-cyan-400",
  },
{
  id: "exhibition-workshops",
  name: "Exhibitions & Workshops",
  description:
    "Plan, design, and execute engaging exhibitions, stalls, and creative showcases while also organizing impactful workshops and sessions that inspire learning, interaction, and innovation at the fest.",
  shortDesc: "Host exhibitions and interactive workshops",
  icon: Lightbulb,
  color: "text-teal-600",
},
  {
    id: "vendor-management",
    name: "Vendor Management",
    description:
      "Work closely with external partners and vendors to ensure smooth coordination and successful execution.",
    shortDesc: "Coordinate with external vendors",
    icon: Truck,
    color: "text-cyan-600",
  },
  {
    id: "logistics-planning",
    name: "Logistics ",
    description:
      "The backbone of the fest! Manage resources, permissions, setups, and ensure everything runs like clockwork.",
    shortDesc: "Manage resources, permissions, and setups",
    icon: Calendar,
    color: "text-gray-400",
  },
];

const festDayDepartments = [
  {
    id: "competitions",
    name: "Competitions",
    description:
      "Plan, organize, and execute competitions smoothly during fest days.",
    icon: Trophy,
    color: "text-yellow-600",
  },
  {
    id: "logistics",
    name: "Logistics",
    description:
      "Ensure all resources, equipment, and setups are in place during the fest.",
    icon: Truck,
    color: "text-cyan-400",
  },
  {
    id: "events",
    name: "Events",
    description:
      "Manage performances, activities, and ensure events run as scheduled.",
    icon: Calendar,
    color: "text-white",
  },
  {
    id: "hospitality",
    name: "Hospitality",
    description:
      "Take care of guests, judges, and performers. Ensure everyone feels welcome.",
    icon: Heart,
    color: "text-cyan-400",
  },
  {
    id: "transportation",
    name: "Transportation",
    description:
      "Manage transport for guests, judges, and essential fest logistics.",
    icon: Bus,
    color: "text-green-600",
  },
  {
    id: "marketing",
    name: "Marketing",
    description:
      "Promote events during fest days and keep the buzz alive with campaigns.",
    icon: Megaphone,
    color: "text-cyan-400",
  },
  {
    id: "qrt",
    name: "QRT",
    description:
      " (Quick Response Team) Be the first responders to any issues. Ensure quick solutions for fest-day problems.",
    icon: AlertTriangle,
    color: "text-cyan-400",
  },
  {
    id: "regdesk",
    name: "Registration Desk",
    description:
      "Handle participant registrations, queries, and provide information on fest days.",
    icon: ClipboardCheck,
    color: "text-cyan-600",
  },
  {
    id: "vendor-management",
    name: "Vendor Management",
    description:
      "Coordinate with vendors to ensure smooth services and stall setups during fest.",
    icon: Store,
    color: "text-teal-600",
  },
];

interface FormPage2Props {
  formData: FormData;
  errors: Record<string, string>;
  onFormDataChange: (formData: FormData) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

function FormPage2({
  formData,
  errors,
  onFormDataChange,
  onSubmit,
  onBack,
  isSubmitting = false,
}: FormPage2Props) {
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
                  STEP: 4/4
                </Badge>
                <Badge className="border-white/10 bg-white/5 text-white/70 hover:bg-white/5 font-mono">
                  PREFERENCES
                </Badge>
              </div>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Preferences + About you
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
                Pick up to 2 pre-fest departments and 1 fest-day department. Then tell us why you want to join.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                <ShieldCheck className="h-5 w-5 text-cyan-200" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Ready to submit</div>
                <div className="text-xs text-white/60 font-mono">
                  review → submit → done
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
              { label: "Profile", state: "done" as const },
              { label: "Preferences", state: "active" as const },
            ].map((s, idx) => (
              <div
                key={s.label}
                className={[
                  "flex items-center gap-3 rounded-2xl border bg-black/20 px-4 py-3",
                  s.state === "done" ? "border-cyan-500/25" : "border-white/15",
                ].join(" ")}
              >
                <div
                  className={[
                    "flex h-9 w-9 items-center justify-center rounded-xl ring-1",
                    s.state === "done"
                      ? "bg-cyan-500/10 ring-cyan-500/25"
                      : "bg-white/5 ring-white/12",
                  ].join(" ")}
                >
                  {s.state === "done" ? (
                    <CheckCircle2 className="h-4 w-4 text-cyan-200" />
                  ) : (
                    <span className="text-xs font-semibold text-white/80 font-mono">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  )}
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-white">
                    {s.label}
                  </div>
                  <div className="text-[11px] text-white/55 font-mono">
                    {s.state === "done" ? "status: complete" : "status: in_progress"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </header>

        <div className="mt-6 grid flex-1 gap-5 lg:grid-cols-[1fr_360px] lg:items-stretch">
          {/* Main form pane */}
          <Card className="neutron-panel neutron-hud rounded-3xl p-5 sm:p-7 lg:flex lg:min-h-0 lg:flex-col">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold text-white">Selections</div>
              <div className="text-[11px] text-white/55 font-mono">
                pre-fest: {formData.preFestDepartments.length}/2 • fest-day:{" "}
                {formData.festDayDepartment ? "1/1" : "0/1"}
              </div>
            </div>
            <Separator className="my-4 bg-white/10" />

            <div className="space-y-6 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pr-2">
              <div className="neutron-hud rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Target className="h-4 w-4 text-cyan-200" />
                  Department preferences
                </div>

              <div className="space-y-6 sm:space-y-8">
                <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <Label className="text-sm font-semibold text-white">
                      Pre-fest departments <span className="text-cyan-200">*</span>
                    </Label>
                    <div className="text-[11px] text-white/60 font-mono">
                      selected: {formData.preFestDepartments.length}/2
                    </div>
                  </div>

                  <p className="mt-2 text-white/60 text-sm leading-relaxed">
                    Choose up to 2 departments you'd like to work with during
                    the pre-fest preparation phase. Select departments that
                    align with your skills and interests.
                  </p>

                  <div className="grid gap-4 sm:gap-6">
                    <div className="space-y-3">
                      <Label className="text-sm sm:text-base font-medium text-white flex items-center gap-2">
                        First Preference
                      </Label>
                      <Select
                        value={formData.preFestDepartments[0] || ""}
                        onValueChange={(value) => {
                          const newDepartments = [
                            ...formData.preFestDepartments,
                          ];
                          if (value === "__clear__") {
                            newDepartments.splice(0, 1);
                          } else {
                            newDepartments[0] = value;
                            if (newDepartments[1] === value) {
                              newDepartments.splice(1, 1);
                            }
                          }
                          onFormDataChange({
                            ...formData,
                            preFestDepartments: newDepartments,
                          });
                        }}
                      >
                        <SelectTrigger className="h-12 rounded-2xl border-white/10 bg-black/20 text-white focus:ring-0 focus-visible:ring-1 focus-visible:ring-cyan-500/40">
                          <SelectValue placeholder="Select your preference">
                            {formData.preFestDepartments[0] && (
                              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                                {(() => {
                                  const selectedDept = preFestDepartments.find(
                                    (d) =>
                                      d.id === formData.preFestDepartments[0]
                                  );
                                  if (selectedDept) {
                                    const Icon = selectedDept.icon;
                                    return (
                                      <>
                                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/5 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
                                          <Icon
                                            className={`w-3 h-3 sm:w-5 sm:h-5 ${selectedDept.color}`}
                                          />
                                        </div>
                                        <span className="font-medium text-white truncate text-sm sm:text-base">
                                          {selectedDept.name}
                                        </span>
                                      </>
                                    );
                                  }
                                  return null;
                                })()}
                              </div>
                            )}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent className="max-h-80 border border-white/10 bg-black/80 shadow-2xl rounded-2xl">
                          <SelectItem
                            value="__clear__"
                            className="py-3 px-3 sm:px-4 cursor-pointer rounded-lg mx-1 sm:mx-2 mb-2"
                          >
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                              </div>
                              <span className="text-gray-400 font-medium text-sm sm:text-base">
                                Clear selection
                              </span>
                            </div>
                          </SelectItem>
                          {preFestDepartments
                            .filter(
                              (dept) =>
                                dept.id !== formData.preFestDepartments[1]
                            )
                            .map((dept) => (
                              <SelectItem
                                key={dept.id}
                                value={dept.id}
                                className="py-3 sm:py-4 px-3 sm:px-4 cursor-pointer rounded-xl mx-1 sm:mx-2 mb-1 border border-transparent"
                              >
                                <div className="flex items-start gap-3 sm:gap-4 w-full min-w-0">
                                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/5 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0 mt-0.5">
                                    <dept.icon
                                      className={`w-4 h-4 sm:w-5 sm:h-5 ${dept.color}`}
                                    />
                                  </div>
                                  <div className="flex-1 text-left min-w-0">
                                    <div className="font-medium text-sm sm:text-base text-white leading-tight">
                                      {dept.name}
                                    </div>
                                    <div className="text-xs sm:text-sm text-white/55 mt-1 leading-tight line-clamp-2 sm:line-clamp-3">
                                      {dept.description}
                                    </div>
                                  </div>
                                </div>
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-sm sm:text-base font-medium text-white flex items-center gap-2">
                        <Target className="w-4 h-4 text-cyan-400" />
                        Second Preference (Optional)
                      </Label>
                      <Select
                        value={formData.preFestDepartments[1] || ""}
                        onValueChange={(value) => {
                          const newDepartments = [
                            ...formData.preFestDepartments,
                          ];
                          if (value === "__clear__") {
                            newDepartments.splice(1, 1);
                          } else {
                            newDepartments[1] = value;
                          }
                          onFormDataChange({
                            ...formData,
                            preFestDepartments: newDepartments,
                          });
                        }}
                      >
                        <SelectTrigger className="h-12 rounded-2xl border-white/10 bg-black/20 text-white focus:ring-0 focus-visible:ring-1 focus-visible:ring-cyan-500/40">
                          <SelectValue placeholder="Select your preference">
                            {formData.preFestDepartments[1] && (
                              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                                {(() => {
                                  const selectedDept = preFestDepartments.find(
                                    (d) =>
                                      d.id === formData.preFestDepartments[1]
                                  );
                                  if (selectedDept) {
                                    const Icon = selectedDept.icon;
                                    return (
                                      <>
                                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/5 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
                                          <Icon
                                            className={`w-3 h-3 sm:w-5 sm:h-5 ${selectedDept.color}`}
                                          />
                                        </div>
                                        <span className="font-medium text-white truncate text-sm sm:text-base">
                                          {selectedDept.name}
                                        </span>
                                      </>
                                    );
                                  }
                                  return null;
                                })()}
                              </div>
                            )}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent className="max-h-80 border border-white/10 bg-black/80 shadow-2xl rounded-2xl">
                          <SelectItem
                            value="__clear__"
                            className="py-3 px-3 sm:px-4 cursor-pointer rounded-xl mx-1 sm:mx-2 mb-2 transition-all duration-200"
                          >
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                              </div>
                              <span className="text-gray-400 font-medium text-sm sm:text-base">
                                Clear selection
                              </span>
                            </div>
                          </SelectItem>
                          {preFestDepartments
                            .filter(
                              (dept) =>
                                dept.id !== formData.preFestDepartments[0]
                            )
                            .map((dept) => (
                              <SelectItem
                                key={dept.id}
                                value={dept.id}
                                className="py-3 sm:py-4 px-3 sm:px-4 cursor-pointer rounded-xl mx-1 sm:mx-2 mb-1 transition-all duration-200 border border-transparent"
                              >
                                <div className="flex items-start gap-3 sm:gap-4 w-full min-w-0">
                                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/5 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0 mt-0.5">
                                    <dept.icon
                                      className={`w-4 h-4 sm:w-5 sm:h-5 ${dept.color}`}
                                    />
                                  </div>
                                  <div className="flex-1 text-left min-w-0">
                                    <div className="font-medium text-sm sm:text-base text-white leading-tight">
                                      {dept.name}
                                    </div>
                                    <div className="text-xs sm:text-sm text-white/55 mt-1 leading-tight line-clamp-2 sm:line-clamp-3">
                                      {dept.description}
                                    </div>
                                  </div>
                                </div>
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {errors.preFestDepartments && (
                    <div className="mt-4 p-3 rounded-2xl border border-red-500/30 bg-red-500/10">
                      <p className="text-red-300 text-xs font-mono flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        {errors.preFestDepartments}
                      </p>
                    </div>
                  )}
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <Label
                      htmlFor="festDayDepartment"
                      className="text-sm font-semibold flex items-center gap-2 text-white"
                    >
                      <Calendar className="w-4 h-4 text-cyan-200" />
                      Fest day department <span className="text-cyan-200">*</span>
                    </Label>
                    <div className="text-[11px] text-white/60 font-mono">
                      {formData.festDayDepartment ? "status: selected" : "status: required"}
                    </div>
                  </div>

                  <p className="mt-2 text-white/60 text-sm leading-relaxed">
                    Choose the department you'd like to actively work with
                    during the fest days. This will be your primary
                    responsibility during the event.
                  </p>

                  <Select
                    value={formData.festDayDepartment}
                    onValueChange={(value) =>
                      onFormDataChange({
                        ...formData,
                        festDayDepartment: value,
                      })
                    }
                  >
                    <SelectTrigger
                      className={[
                        "h-12 rounded-2xl bg-black/20 text-white border",
                        errors.festDayDepartment ? "border-red-500/40" : "border-white/10",
                        "focus:ring-0 focus-visible:ring-1 focus-visible:ring-cyan-500/40",
                      ].join(" ")}
                    >
                      <SelectValue placeholder="Choose your department">
                        {formData.festDayDepartment && (
                          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                            {(() => {
                              const selectedDept = festDayDepartments.find(
                                (d) => d.id === formData.festDayDepartment
                              );
                              if (selectedDept) {
                                const Icon = selectedDept.icon;
                                return (
                                  <>
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/5 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
                                      <Icon
                                        className={`w-3 h-3 sm:w-5 sm:h-5 ${selectedDept.color}`}
                                      />
                                    </div>
                                    <span className="font-medium text-white truncate text-sm sm:text-base">
                                      {selectedDept.name}
                                    </span>
                                  </>
                                );
                              }
                              return null;
                            })()}
                          </div>
                        )}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="max-h-80 border border-white/10 bg-black/80 shadow-2xl rounded-2xl">
                      {festDayDepartments.map((dept) => (
                        <SelectItem
                          key={dept.id}
                          value={dept.id}
                          className="py-3 sm:py-4 px-3 sm:px-4 cursor-pointer rounded-xl mx-1 sm:mx-2 mb-1 transition-all duration-200 border border-transparent"
                        >
                          <div className="flex items-start gap-3 sm:gap-4 w-full min-w-0">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/5 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0 mt-0.5">
                              <dept.icon
                                className={`w-4 h-4 sm:w-5 sm:h-5 ${dept.color}`}
                              />
                            </div>
                            <div className="flex-1 text-left min-w-0">
                              <div className="font-medium text-sm sm:text-base text-white leading-tight">
                                {dept.name}
                              </div>
                              <div className="text-xs sm:text-sm text-white/55 mt-1 leading-tight line-clamp-2 sm:line-clamp-3">
                                {dept.description}
                              </div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {errors.festDayDepartment && (
                    <div className="mt-4 p-3 rounded-2xl border border-red-500/30 bg-red-500/10">
                      <p className="text-red-300 text-xs font-mono flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        {errors.festDayDepartment}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

              </div>

              <div className="neutron-hud rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Heart className="h-4 w-4 text-cyan-200" />
                  About you
                </div>

                <div className="mt-4 space-y-5">
                <div className="space-y-2">
                  <Label
                    htmlFor="motivation"
                    className="text-sm font-medium flex items-center gap-1 text-white/80"
                  >
                    Why do you want to join Neutron?{" "}
                    <span className="text-cyan-200">*</span>
                  </Label>
                  <Textarea
                    id="motivation"
                    placeholder="Share your motivation and what you want to contribute…"
                    value={formData.motivation}
                    onChange={(e) =>
                      onFormDataChange({
                        ...formData,
                        motivation: e.target.value,
                      })
                    }
                    aria-invalid={!!errors.motivation}
                    className={[
                      "min-h-32 resize-none rounded-2xl border bg-black/40 text-white placeholder:text-white/40",
                      "border-white/10 focus-visible:ring-1 focus-visible:ring-cyan-500/40",
                      "[&:not(:placeholder-shown)]:text-white [&:not(:placeholder-shown)]:font-medium",
                      errors.motivation ? "border-red-500/40" : "",
                    ].join(" ")}
                  />
                  {errors.motivation && (
                    <p className="text-xs text-red-300 font-mono">{errors.motivation}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="workSample"
                    className="text-sm font-medium flex items-center gap-1 text-white/80"
                  >
                    Work samples <span className="text-white/40">(optional)</span>
                  </Label>
                  <Textarea
                    id="workSample"
                    placeholder="Portfolio links, projects, experience, anything relevant…"
                    value={formData.workSample}
                    onChange={(e) =>
                      onFormDataChange({
                        ...formData,
                        workSample: e.target.value,
                      })
                    }
                    aria-invalid={!!errors.workSample}
                    className={[
                      "min-h-28 resize-none rounded-2xl border bg-black/40 text-white placeholder:text-white/40",
                      "border-white/10 focus-visible:ring-1 focus-visible:ring-cyan-500/40",
                      "[&:not(:placeholder-shown)]:text-white [&:not(:placeholder-shown)]:font-medium",
                      errors.workSample ? "border-red-500/40" : "",
                    ].join(" ")}
                  />
                  {errors.workSample && (
                    <p className="text-xs text-red-300 font-mono">{errors.workSample}</p>
                  )}
                </div>
              </div>
            </div>

            <Separator className="my-5 bg-white/10" />

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={onBack}
                disabled={isSubmitting}
                className="flex-1 h-11 rounded-2xl border-white/15 bg-white/5 text-white/85 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                Back
              </Button>
              <Button
                onClick={onSubmit}
                disabled={isSubmitting}
                className="flex-1 h-11 rounded-2xl bg-white text-black hover:bg-white/90 shadow-[0_18px_70px_rgba(34,211,238,0.14)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="mr-2 h-4 w-4 border-2 border-black/40 border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Submit Registration
                  </>
                )}
              </Button>
            </div>

          </Card>

          {/* Side summary */}
          <aside className="grid gap-5 lg:min-h-0">
            <Card className="neutron-panel neutron-hud rounded-3xl p-5 sm:p-7 lg:min-h-0 lg:flex lg:flex-col">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-white">Summary</div>
                <div className="text-[11px] text-white/55 font-mono">step: 4/4</div>
              </div>
              <Separator className="my-4 bg-white/10" />

              <div className="space-y-4 lg:overflow-y-auto lg:flex-1">
                {/* Personal Information */}
                <div className="grid gap-3 text-sm">
                  <div className="text-[11px] text-white/55 font-mono">personal_info</div>
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

                <Separator className="bg-white/10" />

                {/* Department Selections */}
                <div className="grid gap-3 text-sm">
                  <div className="text-[11px] text-white/55 font-mono">pre_fest</div>
                  <div className="flex flex-wrap gap-2">
                    {formData.preFestDepartments.length ? (
                      formData.preFestDepartments.map((id) => {
                        const d = preFestDepartments.find((x) => x.id === id);
                        return (
                          <Badge
                            key={id}
                            className="border-white/10 bg-white/5 text-white/80 hover:bg-white/5"
                          >
                            {d?.name?.trim() || id}
                          </Badge>
                        );
                      })
                    ) : (
                      <span className="text-sm text-white/45">—</span>
                    )}
                  </div>

                  <Separator className="my-2 bg-white/10" />

                  <div className="text-[11px] text-white/55 font-mono">fest_day</div>
                  <div className="flex flex-wrap gap-2">
                    {formData.festDayDepartment ? (
                      <Badge className="border-cyan-500/20 bg-cyan-500/10 text-cyan-200 hover:bg-cyan-500/10">
                        {festDayDepartments.find((x) => x.id === formData.festDayDepartment)?.name ||
                          formData.festDayDepartment}
                      </Badge>
                    ) : (
                      <span className="text-sm text-white/45">—</span>
                    )}
                  </div>
                </div>
              </div>

              <Separator className="my-4 bg-white/10" />

              <div className="text-[11px] leading-relaxed text-white/55 font-mono">
                <div>
                  <span className="text-white/45">$</span> tip: review all details before submitting.
                </div>
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default memo(FormPage2);
