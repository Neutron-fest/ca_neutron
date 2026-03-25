"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CANavbar from "@/components/CANavbar";
import Noise from "@/components/Noise";
import { CaBento } from "@/components/CaBento";
import ScrollText from "@/components/ScrollText";
import { cn } from "@/lib/utils";
import DottedMap from "dotted-map";
import { Area, AreaChart, CartesianGrid } from "recharts";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ScrollRevealCards } from "@/components/scroll-reveal-cards";
import CAFooter from "@/components/CAFooter";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);


export default function CampusAmbassadorPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
    });

    // ── KEY FIX: let GSAP ticker drive Lenis (one shared frame loop) ──
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // ── Keep ScrollTrigger in sync with Lenis's virtual scroll ────────
    lenis.on("scroll", ScrollTrigger.update);

    // ── Prevent GSAP from adding catch-up frames (causes jitter) ──────
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.lagSmoothing(1000, 16); // restore default on unmount
    };
  }, []);

  useEffect(() => {
    // Simple GSAP entrance animation
    const ctx = gsap.context(() => {
      gsap.from(".hero-text", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
      });
      
      gsap.from(".feature-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".features-section",
          start: "top 80%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-black min-h-screen text-white dark">


      <CANavbar />

      <main className="w-full">
        <div className="h-screen w-full pointer-events-none" aria-hidden />
        <section
          id="home"
          className="fixed top-0 left-0 w-full h-screen z-0 overflow-hidden flex-col"
        >
          <CAFooter />
        </section>

        {/* <section
          id="home"
          className="fixed top-0 left-0 w-full h-screen z-0 overflow-hidden flex flex-col md:hidden"
        >
          <div
            className="absolute inset-0 md:hidden"
            style={{
              backgroundImage: "url('https://ik.imagekit.io/YatharthKhandelwal/COMPEBG.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              filter: "brightness(0.7)",
            }}
          />

          <div className="absolute inset-0 z-[1] pointer-events-none">
            <Noise patternAlpha={18} patternRefreshInterval={3} />
          </div>

          <div
            className="absolute inset-0 z-[2] pointer-events-none"
            style={{
              background: [
                "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 18%, transparent 70%, rgba(0,0,0,0.92) 100%)",
                "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 35%, rgba(0,0,0,0.50) 70%, rgba(0,0,0,0.88) 100%)",
              ].join(","),
            }}
          />

          <div className="relative z-[3] flex-1 flex flex-col items-center justify-center px-6 text-center">
            <p className="hero-text text-[11px] md:text-xs font-medium tracking-[0.4em] uppercase text-white/50 mb-8">
              Neutron Campus Ambassador Program &nbsp;·&nbsp; 2026
            </p>
            <h1
              className="hero-text leading-[1.05] text-white max-w-5xl"
              style={{
                fontSize: "clamp(2.6rem,7.5vw,6.5rem)",
                fontFamily: "'Georgia','Times New Roman',serif",
                fontWeight: 300,
                fontStyle: "italic",
              }}
            >
              The space between
              <br />
              <span
                style={{ fontStyle: "normal", fontWeight: 600 }}
                className="bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent"
              >
                ambition &amp; orbit.
              </span>
            </h1>
            <p className="hero-text mt-5 text-base md:text-lg text-white/40 font-light max-w-md">
              Where builders turn potential into momentum.
            </p>
          </div>

          <div className="relative z-[3] w-full px-8 pb-7 flex items-end justify-between">
            <span className="text-[11px] text-white/30 font-mono tracking-widest">IND · GLOBAL</span>
          </div>
        </section> */}

        <ScrollText
          label="About Neutron"
          text="Neutron is not just a fest. It is a launchpad for builders who want to create real impact. We take ideas beyond classrooms and push them into real-world execution through engineering, community, and leadership."
          scrollHeight="280vh"
        />

        <section
          id="about"
          className="relative z-10 w-full px-4 py-24"
          style={{
            backgroundColor: "#000",
            backgroundImage: "radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        >
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold text-white/90 leading-tight mb-6">
                Why Step Into <span className="text-blue-500">Orbit with Neutron?</span>
              </h2>
              <p className="text-xl text-white/50 max-w-3xl mx-auto font-light">
                Six reasons why top students across 50+ campuses have already made the leap.
              </p>
            </div>
            <CaBento />
          </div>
        </section>

        <div className="relative z-10 hidden md:block">
           <ScrollRevealCards 
             prizePool="Engineered for Impact"
             location="Feel the Frequency"
             teamSize="Step Into the Spotlight"
           />
        </div>

        <section
          id="benefits"
          className="features-section relative z-10 w-full px-4 py-24 border-t border-white/5"
          style={{
            backgroundColor: "#000",
            backgroundImage: "radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        >
          <div className="mx-auto grid max-w-6xl border border-white/10 md:grid-cols-2 rounded-3xl overflow-hidden bg-black/40 backdrop-blur-xl">
            
            <div className="feature-card relative overflow-hidden">
              <div className="p-8 sm:p-12">
                <span className="text-blue-400 font-medium tracking-wider text-sm uppercase">
                  Global Reach
                </span>
                <p className="mt-4 text-2xl font-semibold text-white/90">Build connections across campuses, cities, and industries.</p>
              </div>

              <div aria-hidden className="relative h-[300px] w-full mt-4">
                <div className="absolute inset-0 z-10 m-auto size-fit">
                  <div className="rounded-full bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2 text-xs font-medium text-white/80 shadow-2xl">
                    Expanding network
                  </div>
                </div>
                <div className="relative overflow-hidden w-full h-full flex items-center justify-center opacity-70 mask-fade-out">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                  <Map />
                </div>
              </div>
            </div>

            <div className="feature-card border-t border-white/10 bg-white/[0.02] p-8 sm:p-12 md:border-0 md:border-l relative overflow-hidden">
              <div className="relative z-10">
                <span className="text-blue-400 font-medium tracking-wider text-sm uppercase">
                  Mission Control
                </span>
                <p className="my-4 text-2xl font-semibold text-white/90">Get direct access to Neutron’s core team and resources.</p>
              </div>
              <div aria-hidden className="flex flex-col gap-8 mt-12 relative z-10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex justify-center items-center size-5 rounded-full border border-blue-500/30 bg-blue-500/10">
                      <span className="size-2 rounded-full bg-blue-500"/>
                    </span>
                    <span className="text-white/40 text-xs">Today</span>
                  </div>
                  <div className="rounded-2xl rounded-tl-sm bg-white/5 mt-2 w-3/4 border border-white/10 p-4 text-sm text-white/70">
                    How do we organize events?
                  </div>
                </div>

                <div>
                  <div className="rounded-2xl rounded-tr-sm ml-auto w-3/4 bg-blue-600/40 border border-blue-500/30 p-4 text-sm text-blue-50">
                    You’ll get a complete toolkit, budget support, and guidance from our team.
                  </div>
                  <span className="block text-right text-xs mt-2 text-white/40">Now</span>
                </div>
              </div>
            </div>

            <div className="feature-card col-span-full border-y border-white/10 p-12 bg-white/[0.01]">
              <p className="text-center text-4xl font-semibold lg:text-7xl text-white/90">
                <span className="text-blue-500">100+</span> Campuses
              </p>
            </div>

            <div className="feature-card relative col-span-full">
              <div className="absolute z-10 max-w-lg px-8 pt-8 md:px-12 md:pt-12">
                <span className="text-blue-400 font-medium tracking-wider text-sm uppercase">
                  Accelerated Growth
                </span>
                <p className="my-4 text-2xl font-semibold text-white/90">
                  Track your community impact. <span className="text-white/40">Watch your engagement multiply over time.</span>
                </p>
              </div>
              <div className="mt-24 w-full h-80 opacity-80">
                <MonitoringChart />
              </div>
            </div>
            
          </div>
        </section>
        
        <section>
          <div className="relative z-10 w-full px-10 md:px-16 py-6 flex items-center justify-between border-t border-white/10">
            <Link href="/" className="inline-flex items-center gap-2 text-white/60 text-sm font-semibold tracking-widest uppercase hover:text-white transition-colors">
              <Image src="/logo.jpeg" alt="Neutron" width={20} height={20} className="rounded-full" />
              Neutron
            </Link>

            <nav className="flex items-center gap-6 text-[11px] text-white/40 tracking-widest uppercase">
              <Link href="https://www.instagram.com/neutronfest/" target="_blank" className="hover:text-white transition-colors">Instagram</Link>
              <span className="text-white/20">|</span>
              <Link href="https://www.linkedin.com/company/neutronfest" target="_blank" className="hover:text-white transition-colors">LinkedIn</Link>
              <span className="text-white/20">|</span>
            </nav>
        </div>
      </section>

      </main>
    </div>
  );
}


const map = new DottedMap({ height: 50, grid: "diagonal" });
const points = map.getPoints();
const svgOptions = {
  backgroundColor: "transparent",
  color: "rgba(255, 255, 255, 0.3)",
  radius: 0.15,
};

const Map = () => {
  const viewBox = `0 0 120 60`;
  return (
    <svg viewBox={viewBox} style={{ background: svgOptions.backgroundColor }} className="w-full h-auto max-w-full">
      {points.map((point, index) => (
        <circle key={index} cx={point.x} cy={point.y} r={svgOptions.radius} fill={svgOptions.color} />
      ))}
    </svg>
  );
};

const chartConfig = {
  desktop: { label: "Reach", color: "#60a5fa" },
  mobile: { label: "Engagement", color: "#93c5fd" },
} satisfies ChartConfig;

const chartData = [
  { month: "Jan", desktop: 56, mobile: 14 },
  { month: "Feb", desktop: 126, mobile: 56 },
  { month: "Mar", desktop: 205, mobile: 120 },
  { month: "Apr", desktop: 400, mobile: 280 },
];

const MonitoringChart = () => {
  return (
    <ChartContainer className="h-full w-full aspect-auto bg-transparent border-0" config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{ left: 0, right: 0, top: 20, bottom: 0 }}
      >
        <defs>
          <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#93c5fd" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#93c5fd" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.05)" />
        <ChartTooltip active cursor={false} content={<ChartTooltipContent className="bg-black/80 border-white/10 text-white" />} />
        <Area strokeWidth={2} dataKey="mobile" type="monotone" fill="url(#fillMobile)" fillOpacity={1} stroke="#93c5fd" stackId="a" />
        <Area strokeWidth={2} dataKey="desktop" type="monotone" fill="url(#fillDesktop)" fillOpacity={1} stroke="#3b82f6" stackId="a" />
      </AreaChart>
    </ChartContainer>
  );
};
