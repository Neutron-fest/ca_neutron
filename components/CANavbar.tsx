"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const navLinks = [
  { label: "Home",     href: "#home" },
  { label: "About",   href: "#about" },
  { label: "Benefits", href: "#benefits" },
];

export default function CANavbar() {
  const navRef  = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]   = useState("#home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(`#${id}`); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  return (
    <div
      ref={navRef}
      className={`
        fixed left-0 right-0 z-[999] flex justify-center pointer-events-none
        transition-all duration-500
        ${scrolled ? "top-3" : "top-5"}
      `}
      style={{ opacity: 0 }}
    >
      <nav
        className={`
          pointer-events-auto
          flex items-center
          rounded-full
          border border-white/10
          backdrop-blur-xl
          shadow-[0_8px_40px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(255,255,255,0.05)]
          transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${scrolled ? "bg-black/70 px-3 py-2 gap-1" : "bg-white/5 px-3 py-2 gap-1"}
        `}
      >
        <a
          href="#home"
          className={`
            flex items-center justify-center rounded-full overflow-hidden
            bg-white/10 border border-white/10 shrink-0
            hover:bg-white/20 transition-all duration-300
            ${scrolled ? "w-8 h-8 mr-2" : "w-9 h-9 mr-3"}
          `}
        >
          <img
            src="/logo.jpeg"
            alt="Neutron"
            className="w-full h-full object-cover"
          />
        </a>

        {/* Brand name — hidden on mobile */}
        <a
          href="#home"
          className={`
            hidden sm:block
            font-semibold text-white/90 text-sm tracking-wide whitespace-nowrap
            transition-all duration-500 overflow-hidden
            ${scrolled ? "max-w-0 opacity-0 mr-0" : "max-w-[120px] opacity-100 mr-4"}
          `}
        >
          Neutron
        </a>

        {/* Nav links — hidden on mobile */}
        <div className={`hidden sm:flex items-center transition-all duration-500 cursor-pointer ${scrolled ? "gap-0.5" : "gap-0.5"}`}>
          {navLinks.map((link) => {
            const isActive = active === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActive(link.href)}
                className={`
                  relative px-4 py-1.5 rounded-full text-sm font-medium
                  transition-all duration-300 whitespace-nowrap
                  ${isActive
                    ? "text-white bg-white/15"
                    : "text-white/50 hover:text-white/90 hover:bg-white/8"
                  }
                `}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Divider — hidden on mobile */}
        <div className={`hidden sm:block w-px bg-white/10 self-stretch mx-2 transition-all duration-500 ${scrolled ? "opacity-0 w-0 mx-0" : "opacity-100"}`} />

        <a
          href="/register"
          className={`
            shrink-0 rounded-full font-semibold text-sm
            bg-white text-black
            hover:bg-blue-100 hover:scale-105
            transition-all duration-300 whitespace-nowrap shadow-md
            ${scrolled ? "px-4 py-1.5 text-xs" : "px-5 py-2"}
          `}
        >
          {scrolled ? "Apply" : "Apply Now"}
        </a>

        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="sm:hidden ml-2 flex flex-col items-center justify-center gap-[5px] w-9 h-9 rounded-full bg-white/10 border border-white/10 shrink-0"
          aria-label="Toggle menu"
        >
          <span className={`block w-4 h-px bg-white/80 transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
          <span className={`block w-4 h-px bg-white/80 transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-4 h-px bg-white/80 transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
        </button>
      </nav>

      <div
        className={`
          sm:hidden absolute top-full left-1/2 -translate-x-1/2 mt-2
          w-56 rounded-2xl border border-white/10
          bg-black/80 backdrop-blur-xl
          shadow-[0_16px_48px_rgba(0,0,0,0.6)]
          overflow-hidden
          transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${mobileOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}
        `}
      >
        {navLinks.map((link) => {
          const isActive = active === link.href;
          return (
            <a
              key={link.href}
              href={link.href}
              onClick={() => { setActive(link.href); setMobileOpen(false); }}
              className={`
                block px-5 py-3 text-sm font-medium transition-colors
                ${isActive ? "text-white bg-white/10" : "text-white/60 hover:text-white hover:bg-white/5"}
              `}
            >
              {link.label}
            </a>
          );
        })}
        <a
          href="/register"
          onClick={() => setMobileOpen(false)}
          className="block mx-3 mb-3 mt-1 px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold text-center hover:bg-blue-100 transition-colors"
        >
          Apply Now ↗
        </a>
      </div>
    </div>
  );
}
