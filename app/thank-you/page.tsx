"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Noise from "@/components/Noise";

export default function ThankYouPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const checkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
      requestAnimationFrame(() => {
        el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });
    }

    // Check mark bounce in
    const check = checkRef.current;
    if (check) {
      check.style.transform = "scale(0) rotate(-15deg)";
      check.style.opacity = "0";
      setTimeout(() => {
        check.style.transition = "transform 0.6s cubic-bezier(0.34,1.56,0.64,1), opacity 0.5s ease";
        check.style.transform = "scale(1) rotate(0deg)";
        check.style.opacity = "1";
      }, 200);
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white dark relative overflow-x-hidden flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 70% 70% at 50% 30%, rgba(34,211,238,0.06) 0%, transparent 65%), radial-gradient(ellipse 60% 60% at 50% 80%, rgba(59,130,246,0.05) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <Noise patternAlpha={15} patternRefreshInterval={4} />
      </div>

      {/* Floating orbs */}
      <div className="fixed top-1/3 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-10 bg-cyan-400 pointer-events-none" style={{ animation: "nebula-pulse 6s ease-in-out infinite" }} />
      <div className="fixed bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-8 bg-blue-500 pointer-events-none" style={{ animation: "nebula-pulse 8s ease-in-out infinite 2s" }} />

      {/* Navbar strip */}
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

      {/* Main content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center min-h-screen px-4 py-20">
        <div ref={containerRef} className="max-w-lg w-full text-center">

          {/* Check icon */}
          <div ref={checkRef} className="mx-auto mb-10 relative">
            {/* Glow rings */}
            <div className="absolute inset-0 rounded-full bg-cyan-400/10 blur-xl scale-150" />
            <div
              className="relative w-24 h-24 rounded-full border-2 border-cyan-400/40 flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(34,211,238,0.2)]"
              style={{ background: "radial-gradient(circle, rgba(34,211,238,0.12) 0%, rgba(34,211,238,0.02) 100%)" }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-10 h-10 text-cyan-400"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>

          {/* Text */}
          <p className="text-[11px] font-semibold tracking-[0.45em] uppercase text-cyan-400/70 mb-5">
            Application Received
          </p>
          <h1
            className="text-white mb-5 leading-[1.05]"
            style={{
              fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
              fontFamily: "'Georgia','Times New Roman',serif",
              fontWeight: 300,
              fontStyle: "italic",
            }}
          >
            You&apos;re in{" "}
            <span
              style={{ fontStyle: "normal", fontWeight: 700 }}
              className="bg-gradient-to-r from-white via-blue-100 to-cyan-300 bg-clip-text text-transparent"
            >
              Orbit.
            </span>
          </h1>
          <p className="text-base text-white/45 max-w-sm mx-auto font-light leading-relaxed mb-12">
            Thank you for applying to the Neutron Campus Ambassador Program 2026.
            Our team will review your application and reach out within{" "}
            <span className="text-white/70">5–7 business days</span>.
          </p>

          {/* Info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {[
              { label: "Check your inbox", desc: "Your confirmation and next steps will land in your inbox soon." },
              { label: "Stay connected", desc: "Follow @neutronfest on Instagram" },
              { label: "Patience pays", desc: "Results within 5–7 business days" },
            ].map((card) => (
              <div
                key={card.label}
                className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5 flex flex-col items-center gap-2 hover:border-cyan-400/20 hover:bg-white/[0.04] transition-all duration-300"
              >
                <span className="text-xs font-semibold text-white/70 text-center">{card.label}</span>
                <span className="text-[11px] text-white/30 text-center leading-relaxed">{card.desc}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/campus-ambassador"
              className="group inline-flex items-center gap-3 rounded-full bg-white text-black px-7 py-3.5 text-sm font-semibold tracking-wide hover:bg-cyan-50 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] transition-all duration-300"
            >
              Back to Home
              <span className="text-base transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </Link>
            <a
              href="https://www.instagram.com/neutronfest/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 text-white/50 px-7 py-3.5 text-sm font-medium tracking-wide hover:border-white/35 hover:text-white/80 transition-all duration-300"
            >
              Follow Neutron ↗
            </a>
          </div>
        </div>

        {/* Stars decoration */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-white/60"
              style={{
                width: Math.random() * 2 + 1 + "px",
                height: Math.random() * 2 + 1 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                animation: `twinkle ${2 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 3}s`,
                opacity: Math.random() * 0.6 + 0.1,
              }}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 border-t border-white/[0.06] text-center">
        <p className="text-[11px] text-white/20 tracking-wide">
          © 2026 Neutron Fest · All rights reserved
        </p>
      </footer>
    </div>
  );
}
