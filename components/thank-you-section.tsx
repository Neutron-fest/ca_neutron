"use client";

import { memo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Sparkles,
  Youtube,
} from "lucide-react";

interface ThankYouSectionProps {}

function ThankYouSection() {
  return (
    <section className="relative min-h-[100svh] bg-black overflow-hidden">
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

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl items-center px-4 py-10 sm:px-8 lg:px-12">
        <div className="w-full">
          <div className="grid gap-6 lg:grid-cols-[1fr_380px] lg:items-start">
            {/* Main confirmation */}
            <Card className="neutron-panel neutron-hud rounded-3xl p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="border-cyan-500/20 bg-cyan-500/10 text-cyan-200 hover:bg-cyan-500/10 font-mono">
                  MODULE: SUBMIT
                </Badge>
                <Badge className="border-white/10 bg-white/5 text-white/80 hover:bg-white/5 font-mono">
                  STATUS: OK
                </Badge>
              </div>

              <div className="mt-6 flex items-start gap-4">
                <div className="neutron-hud flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                  <CheckCircle2 className="h-7 w-7 text-cyan-200" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    Submission received.
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
                    Your Neutron application is in the system. If shortlisted,
                    you’ll be contacted on email/WhatsApp.
                  </p>
                </div>
              </div>

              <Separator className="my-6 bg-white/10" />

              {/* Next steps */}
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  {
                    icon: Mail,
                    title: "Confirmation",
                    body: "Keep an eye on your inbox for updates.",
                  },
                  {
                    icon: ClipboardCheck,
                    title: "Review + shortlist",
                    body: "Team reviews submissions and shares interview slots.",
                  },
                  {
                    icon: MessageCircle,
                    title: "Interview",
                    body: "You’ll get a quick round to discuss fit + ideas.",
                  },
                  {
                    icon: Sparkles,
                    title: "Onboarding",
                    body: "Selected members join an orientation session.",
                  },
                ].map((s, idx) => {
                  const Icon = s.icon;
                  return (
                    <div
                      key={idx}
                      className="neutron-hud rounded-2xl border border-white/10 bg-black/20 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                          <Icon className="h-5 w-5 text-cyan-200" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-white">
                            {s.title}
                          </div>
                          <div className="text-xs text-white/60 font-mono">
                            step {idx + 1}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 text-sm text-white/70">{s.body}</div>
                    </div>
                  );
                })}
              </div>

              <Separator className="my-6 bg-white/10" />

              <div className="text-center text-[11px] text-white/55 font-mono">
                $ tip: follow Neutron for announcements + timelines
              </div>
            </Card>

            {/* Side panel */}
            <aside className="grid gap-6">
              <Card className="neutron-panel neutron-hud rounded-3xl p-6">
                <div className="flex items-center gap-3">
                  <img
                    src="/logo.jpeg"
                    alt="Neutron Fest logo"
                    className="h-12 w-12 rounded-2xl object-cover ring-1 ring-white/12"
                  />
                  <div>
                    <div className="text-sm font-semibold text-white">
                      Neutron 3.0
                    </div>
                    <div className="text-xs text-white/60 font-mono">
                      console: neutron@nst
                    </div>
                  </div>
                </div>

                <Separator className="my-5 bg-white/10" />

                <div className="rounded-2xl border border-white/10 bg-black/20 p-4 font-mono text-[11px] leading-relaxed text-white/60">
                  <div>
                    <span className="text-white/45">$</span> submit --status
                  </div>
                  <div className="mt-1 text-white/70">ok: application queued</div>
                  <div className="mt-2">
                    <span className="text-white/45">$</span> next --action
                  </div>
                  <div className="mt-1">
                    wait for shortlist email → schedule interview
                  </div>
                </div>

                <Separator className="my-5 bg-white/10" />

                <div className="text-xs text-white/70">Follow for updates</div>
                <div className="mt-3 flex items-center gap-3">
                  <a
                    href="https://www.instagram.com/neutronfest/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neutron-hud inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/85 hover:bg-white/10"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="https://x.com/neutronfest"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neutron-hud inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/85 hover:bg-white/10"
                    aria-label="X (Twitter)"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.youtube.com/@neutronfest"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neutron-hud inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/85 hover:bg-white/10"
                    aria-label="YouTube"
                  >
                    <Youtube className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/neutronfest/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neutron-hud inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/85 hover:bg-white/10"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </Card>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(ThankYouSection);
