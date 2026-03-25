"use client";

import React, { memo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  Calendar,
  Handshake,
  Code,
  Users,
  Megaphone,
  Palette,
  Brush,
  Trophy,
  Store,
  Lightbulb,
  Truck,
  Heart,
  Bus,
  ClipboardCheck,
  AlertTriangle,
  ShieldCheck,
  Search,
} from "lucide-react";

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
    shortDesc: "Plan and execute competitions",
    icon: Trophy,
    color: "text-yellow-600",
  },
  {
    id: "events-programming",
    name: "Events",
    description:
      "Curate talks, guest lectures, creators summit and engaging interactive activities that spark creativity, broaden perspectives, and keep the audience actively involved.",
    shortDesc: "Curate talks, guest lectures, and creators summit",
    icon: Calendar,
    color: "text-white",
  },
  {
    id: "marketing-promotion",
    name: "Marketing ",
    description:
      "Spread the word! Create campaigns, strategies, and social media buzz to make sure everyone knows about Neutron3.0.",
    shortDesc: "Promote events and maintain buzz",
    icon: Megaphone,
    color: "text-white",
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
    shortDesc: "Coordinate vendors and stalls",
    icon: Store,
    color: "text-cyan-600",
  },
  {
    id: "logistics-planning",
    name: "Logistics",
    description:
      "The backbone of the fest! Manage resources, permissions, setups, and ensure everything runs like clockwork.",
    shortDesc: "Manage resources, permissions, and setups",
    icon: Truck,
    color: "text-gray-600",
  },
  {
    id: "hospitality",
    name: "Hospitality",
    description:
      "Take care of guests, judges, and performers. Ensure everyone feels welcome.",
    shortDesc: "Manage guests, judges, and performers",
    icon: Heart,
    color: "text-cyan-400",
  },
  {
    id: "transportation",
    name: "Transportation",
    description:
      "Manage transport for guests, judges, and essential fest logistics.",
    shortDesc: "Arrange transport for guests and logistics",
    icon: Bus,
    color: "text-green-600",
  },
  {
    id: "regdesk",
    name: "Registration Desk",
    description:
      "Handle participant registrations, queries, and provide information on fest days.",
    shortDesc: "Handle registrations and queries",
    icon: ClipboardCheck,
    color: "text-cyan-600",
  },

];

interface CommitteesSectionProps {
  onNext: () => void;
}

function CommitteesSection({ onNext }: CommitteesSectionProps) {
  // Add a CSS class to hide global FAQ on mobile for this page
  React.useEffect(() => {
    document.body.classList.add("committees-page");
    return () => {
      document.body.classList.remove("committees-page");
    };
  }, []);

  const [query, setQuery] = React.useState("");
  const [activeTag, setActiveTag] = React.useState<
    "all" | "people" | "creative" | "ops" | "tech" | "growth"
  >("all");

  const TAGS: Array<{
    id: "all" | "people" | "creative" | "ops" | "tech" | "growth";
    label: string;
    hint: string;
  }> = [
    { id: "all", label: "All", hint: "show everything" },
    { id: "people", label: "People", hint: "outreach, hospitality" },
    { id: "creative", label: "Creative", hint: "design, decor" },
    { id: "ops", label: "Ops", hint: "logistics, vendor" },
    { id: "tech", label: "Tech", hint: "digital systems" },
    { id: "growth", label: "Growth", hint: "marketing, sponsorship" },
  ];

  const getDeptTags = (deptId: string) => {
    const id = deptId.toLowerCase();
    const tags: Array<
      "people" | "creative" | "ops" | "tech" | "growth"
    > = [];
    if (id.includes("outreach") || id.includes("hospital") || id.includes("transport"))
      tags.push("people");
    if (id.includes("design") || id.includes("decor") || id.includes("exhibition"))
      tags.push("creative");
    if (id.includes("logistics") || id.includes("vendor") || id.includes("regdesk") || id.includes("qrt") || id.includes("management"))
      tags.push("ops");
    if (id.includes("tech")) tags.push("tech");
    if (id.includes("marketing") || id.includes("sponsor")) tags.push("growth");
    return tags;
  };

  const filtered = preFestDepartments.filter((dept) => {
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      dept.name.toLowerCase().includes(q) ||
      dept.shortDesc.toLowerCase().includes(q) ||
      dept.description.toLowerCase().includes(q) ||
      dept.id.toLowerCase().includes(q);
    const tags = getDeptTags(dept.id);
    const matchesTag = activeTag === "all" ? true : tags.includes(activeTag);
    return matchesQuery && matchesTag;
  });

  return (
    <section className="relative min-h-screen bg-black">
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

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-8 lg:px-12 lg:py-14">
        {/* Header */}
        <div className="neutron-panel neutron-hud rounded-3xl px-6 py-6 sm:px-8 sm:py-7">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="border-cyan-500/20 bg-cyan-500/10 text-cyan-200 hover:bg-cyan-500/10 font-mono">
                  MODULE: COMMITTEES
                </Badge>
                <Badge className="border-white/10 bg-white/5 text-white/80 hover:bg-white/5 font-mono">
                  SYSTEM: LIVE
                </Badge>
                <Badge className="border-white/10 bg-white/5 text-white/70 hover:bg-white/5 font-mono">
                  TOTAL: {preFestDepartments.length}
                </Badge>
              </div>
              <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Explore your track.
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
                Every team here ships work that shows up on fest day. Filter by what you want to build, then continue.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                <ShieldCheck className="h-5 w-5 text-cyan-200" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">How it works</div>
                <div className="text-xs text-white/60 font-mono">
                  Explore → apply → shortlist
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6 bg-white/10" />

          {/* Search + filters */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search departments (e.g. tech, design, logistics)…"
                className="h-11 rounded-2xl border-white/10 bg-black/20 pl-10 text-white placeholder:text-white/40 focus-visible:ring-1 focus-visible:ring-cyan-500/40"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {TAGS.map((t) => {
                const active = activeTag === t.id;
                return (
                  <Button
                    key={t.id}
                    type="button"
                    variant="outline"
                    onClick={() => setActiveTag(t.id)}
                    className={[
                      "h-9 rounded-2xl border-white/10 bg-white/5 px-3 text-xs text-white/80 hover:bg-white/10",
                      "font-mono",
                      active ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-100" : "",
                    ].join(" ")}
                    title={t.hint}
                  >
                    {t.label}
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 grid gap-2 text-xs text-white/60 sm:grid-cols-3">
            <div className="font-mono">
              <span className="text-white/45">$</span> max_pre_fest = 2
            </div>
            <div className="font-mono">
              <span className="text-white/45">$</span> fest_day = 1
            </div>
            <div className="font-mono">
              <span className="text-white/45">$</span> results = {filtered.length}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((dept) => (
            <Card
              key={dept.id}
              className={[
                "neutron-panel neutron-hud group rounded-3xl bg-white/[0.03] p-5",
                "transition-transform duration-200 hover:-translate-y-1",
                "hover:shadow-[0_28px_110px_rgba(34,211,238,0.12)]",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="truncate text-lg font-semibold text-white">
                    {dept.name.trim()}
                  </div>
                  <div className="mt-1 text-xs text-white/60">
                    {dept.shortDesc}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {getDeptTags(dept.id)
                    .slice(0, 2)
                    .map((tag) => (
                      <Badge
                        key={tag}
                        className="border-white/10 bg-white/5 text-white/70 hover:bg-white/5 font-mono text-[10px]"
                      >
                        {tag.toUpperCase()}
                      </Badge>
                    ))}
                </div>
              </div>

              <Separator className="my-4 bg-white/10" />

              <p className="text-sm leading-relaxed text-white/70 line-clamp-4">
                {dept.description}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-[11px] text-white/55 font-mono">
                  status: <span className="text-cyan-200/80">open</span>
                </div>
                <div className="text-[11px] text-white/45 font-mono">
                  hover → inspect
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Fest Day Departments Section */}
        {/* <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 gradient-text">Fest Day Departments</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These departments are responsible for execution and ensuring everything runs smoothly during the fest.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {festDayDepartments.map((dept, index) => (
              <Card
                key={dept.id}
                className="bg-white border-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-4">
                  <div className="flex justify-start items-start gap-[0.8rem] h-full">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl flex items-center justify-center">
                      <dept.icon className={`w-8 h-8 ${dept.color}`} />
                    </div>
                    <div className="flex flex-col justify-center h-full">
                      <CardTitle
                        className="text-xl text-start text-gray-900"
                        style={{ fontFamily: "inter" }}
                      >
                        {dept.name}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-500 mt-1">
                        {dept.shortDesc}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {dept.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div> */}

        {/* Footer CTA */}
        <div className="mt-10 mb-20 sm:mb-0 flex flex-col items-center gap-4">
          <div className="text-center text-xs text-white/60 font-mono">
            Next: choose committees in the form.
          </div>
        </div>
      </div>

      {/* Fixed bottom button for mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-gradient-to-t from-black via-black to-black/80 backdrop-blur-sm border-t border-white/10 px-4 py-4">
        <Button
          size="lg"
          onClick={onNext}
          className="w-full h-12 rounded-2xl bg-white text-base font-semibold text-black hover:bg-white/90 shadow-[0_18px_70px_rgba(34,211,238,0.14)]"
        >
          Continue
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>

      {/* Desktop button - visible only on sm and above */}
      <div className="hidden sm:flex relative mx-auto max-w-7xl px-4 pb-10 sm:px-8 lg:px-12">
        <div className="mx-auto">
          <Button
            size="lg"
            onClick={onNext}
            className="h-12 rounded-2xl bg-white px-8 text-base font-semibold text-black hover:bg-white/90 shadow-[0_18px_70px_rgba(34,211,238,0.14)] transition-transform hover:-translate-y-0.5"
          >
            Continue
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default memo(CommitteesSection);
