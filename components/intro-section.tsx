"use client";

import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, CalendarDays, Heart, MapPin, ShieldCheck, Users, Zap } from "lucide-react";

interface IntroSectionProps {
  onNext: () => void;
}

function IntroSection({ onNext }: IntroSectionProps) {
  return (
    <section
      className={[
        // Mobile: allow scroll. Desktop: lock viewport (no scroll).
        "relative bg-black",
        "min-h-[100svh] overflow-y-auto lg:h-[100svh] lg:overflow-hidden",
      ].join(" ")}
    >
      {/* Background: tech grid + scan overlays */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-black to-black" />
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute -top-28 left-1/2 h-72 w-[90vw] sm:w-[46rem] max-w-[46rem] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-[-6rem] left-[-6rem] h-72 w-72 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-[-8rem] right-[-8rem] h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute inset-0 neutron-scanlines" />
        <div className="absolute inset-0 neutron-noise" />
        <div className="absolute left-0 top-0 h-[42%] w-full neutron-sweep" />
      </div>

      <div className="relative mx-auto flex h-full max-w-7xl flex-col px-5 py-5 sm:px-8 lg:px-12 lg:py-8">
        {/* Top bar */}
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/logo.jpeg"
              alt="Neutron Fest logo"
              className="h-10 w-10 rounded-lg object-cover ring-1 ring-white/12 shadow-[0_12px_40px_rgba(0,0,0,0.55)] sm:h-11 sm:w-11"
            />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight text-white">
                Neutron 3.0
              </div>
              <div className="text-xs text-white/60">
                Newton School of Technology
              </div>
            </div>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <Badge className="border-white/10 bg-white/5 text-white/80 hover:bg-white/5">
              Recruitment 2026
            </Badge>
            <Badge className="border-cyan-500/20 bg-cyan-500/10 text-cyan-200 hover:bg-cyan-500/10 font-mono">
              SYSTEM: LIVE
            </Badge>
          </div>
        </header>

        <Separator className="my-4 bg-white/10" />

        {/* Main: viewport-fit grid */}
        <div className="grid flex-1 items-stretch gap-4 lg:grid-cols-[1.25fr_0.75fr] lg:gap-6">
          {/* Hero */}
          <div className="neutron-panel neutron-hud flex flex-col justify-between rounded-2xl p-5 sm:p-7 lg:p-8">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="border-white/10 bg-white/5 text-white/80 hover:bg-white/5">
                  Tech Fest
                </Badge>
                <span className="text-xs text-white/50">•</span>
                <div className="flex items-center gap-1.5 text-xs text-white/65">
                  <MapPin className="h-3.5 w-3.5 text-cyan-200/90" />
                  NST Campus
                </div>
                <span className="text-xs text-white/50">•</span>
                <div className="flex items-center gap-1.5 text-xs text-white/65">
                  <CalendarDays className="h-3.5 w-3.5 text-cyan-200/90" />
                  2026 Season
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 text-[11px] font-medium text-white/55">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/80" />
                <span className="font-mono tracking-widest">NEUTRON::RECRUITMENT</span>
                <span className="hidden sm:inline text-white/35">/</span>
                <span className="hidden sm:inline font-mono text-white/50">v3.0</span>
              </div>

              <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Build the team.{" "}
                <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
                  Ship the fest
                </span>
                .
              </h1>
              <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-white/70 sm:text-base">
                This is a high-ownership crew: operations, content, design, outreach,
                sponsorship, and tech. You’ll work in a small team, ship deliverables,
                and learn by doing.
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <Card className="neutron-hud border-white/10 bg-black/20 p-4">
                <div>
                  <div className="text-sm font-semibold text-white">
                    Team-first
                  </div>
                  <div className="text-xs text-white/60">
                    Real collaboration
                  </div>
                </div>
              </Card>

              <Card className="neutron-hud border-white/10 bg-black/20 p-4">
                <div>
                  <div className="text-sm font-semibold text-white">
                    High-ownership
                  </div>
                  <div className="text-xs text-white/60">
                    Learn by doing
                  </div>
                </div>
              </Card>

              <Card className="neutron-hud border-white/10 bg-black/20 p-4">
                <div>
                  <div className="text-sm font-semibold text-white">
                    Big impact
                  </div>
                  <div className="text-xs text-white/60">
                    Campus-wide moments
                  </div>
                </div>
              </Card>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-xs text-white/55 font-mono">
                $ apply --time=~3min --committees=next
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Button
                  size="lg"
                  className="h-11 rounded-xl bg-white px-6 text-black hover:bg-white/90 shadow-[0_16px_60px_rgba(34,211,238,0.12)]"
                  onClick={onNext}
                >
                  Continue to committees
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Side panel */}
          <aside className="grid gap-4">
            <Card className="neutron-panel neutron-hud rounded-2xl p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-white">
                    What you’ll do
                  </div>
                  <div className="mt-1 text-xs text-white/60">
                    Commitments are manageable and team-based.
                  </div>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                  <ShieldCheck className="h-5 w-5 text-cyan-200" />
                </div>
              </div>

              <Separator className="my-4 bg-white/10" />

              <div className="grid gap-2 text-sm text-white/70">
                <div className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300/80" />
                  <span>Plan events, content, and on-ground execution</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300/80" />
                  <span>Coordinate with vendors, speakers, and internal teams</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300/80" />
                  <span>Own deliverables and ship on deadlines</span>
                </div>
              </div>
            </Card>

            <Card className="neutron-panel neutron-hud rounded-2xl p-5">
              <div className="text-sm font-semibold text-white">
                Good fit if you like…
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Badge className="justify-center border-white/10 bg-white/5 text-white/80 hover:bg-white/5">
                  Operations
                </Badge>
                <Badge className="justify-center border-white/10 bg-white/5 text-white/80 hover:bg-white/5">
                  Design
                </Badge>
                <Badge className="justify-center border-white/10 bg-white/5 text-white/80 hover:bg-white/5">
                  Outreach
                </Badge>
                <Badge className="justify-center border-white/10 bg-white/5 text-white/80 hover:bg-white/5">
                  Content
                </Badge>
                <Badge className="justify-center border-white/10 bg-white/5 text-white/80 hover:bg-white/5">
                  Sponsorship
                </Badge>
                <Badge className="justify-center border-white/10 bg-white/5 text-white/80 hover:bg-white/5">
                  Tech
                </Badge>
              </div>
              <div className="mt-4 text-xs text-white/55">
                You’ll choose committees on the next screen.
              </div>
            </Card>

            <Card className="neutron-hud rounded-2xl border-white/10 bg-black/30 p-4">
              <div className="flex items-center justify-between">
                <div className="text-[11px] font-semibold tracking-widest text-white/70 font-mono">
                  CONSOLE
                </div>
                <div className="text-[11px] text-cyan-200/80 font-mono">
                  neutron@nst
                </div>
              </div>
              <div className="mt-2 space-y-1 font-mono text-[11px] leading-relaxed text-white/60">
                <div>
                  <span className="text-white/45">$</span> status{" "}
                  <span className="text-white/35">--pipeline</span>
                </div>
                <div className="text-white/60">
                  ✔ committees → ✔ form → ✔ submit → ✦ shortlist
                </div>
                <div>
                  <span className="text-white/45">$</span> tip{" "}
                  <span className="text-white/55">
                    pick roles you can execute consistently
                  </span>
                </div>
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default memo(IntroSection);
