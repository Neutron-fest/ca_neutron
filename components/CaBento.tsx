"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";

const caCardData = [
  {
    label: "Lead",
    title: "Drive Campus Innovation",
    description:
      "Build and lead a tech-first community on your campus.",
  },
  {
    label: "Learn",
    title: "Exclusive Access",
    description:
      "Get insider access to tools, mentorship, and real engineering workflows.",
  },
  {
    label: "Network",
    title: "Global Community",
    description:
      "Connect with 1000+ ambassadors, startup founders, and senior engineers across 50+ campuses worldwide.",
  },
  {
    label: "Earn",
    title: "Real Rewards",
    description:
      "Earn monthly stipends, exclusive swag, performance bonuses, and letters of recommendation for your work.",
  },
  {
    label: "Grow",
    title: "Career Launchpad",
    description:
      "Ambassadors get priority referrals to Neutron internships and full-time roles — your leadership here counts.",
  },
  {
    label: "Impact",
    title: "Measurable Results",
    description:
      "Track the reach of your events through your personal dashboard. Over 10,000 students impacted in the last cycle.",
  },
];

const GLOW_COLOR = "30, 80, 255";
const DEFAULT_PARTICLE_COUNT = 10;

const createParticle = (x: number, y: number): HTMLDivElement => {
  const el = document.createElement("div");
  el.style.cssText = `
    position:absolute;width:4px;height:4px;border-radius:50%;
    background:rgba(${GLOW_COLOR},0.9);
    box-shadow:0 0 6px rgba(${GLOW_COLOR},0.6);
    pointer-events:none;z-index:100;left:${x}px;top:${y}px;
  `;
  return el;
};

const ParticleCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}> = ({ children, className = "", style }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isHoveredRef = useRef(false);

  const clearParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    particlesRef.current.forEach((p) =>
      gsap.to(p, { scale: 0, opacity: 0, duration: 0.3, onComplete: () => p.remove() })
    );
    particlesRef.current = [];
  }, []);

  const spawnParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;
    const { width, height } = cardRef.current.getBoundingClientRect();
    Array.from({ length: DEFAULT_PARTICLE_COUNT }).forEach((_, i) => {
      const id = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;
        const p = createParticle(Math.random() * width, Math.random() * height);
        cardRef.current.appendChild(p);
        particlesRef.current.push(p);
        gsap.fromTo(p, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" });
        gsap.to(p, { x: (Math.random() - 0.5) * 80, y: (Math.random() - 0.5) * 80, rotation: Math.random() * 360, duration: 2 + Math.random() * 2, repeat: -1, yoyo: true, ease: "none" });
        gsap.to(p, { opacity: 0.2, duration: 1.5, repeat: -1, yoyo: true, ease: "power2.inOut" });
      }, i * 90);
      timeoutsRef.current.push(id);
    });
  }, []);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const enter = () => { isHoveredRef.current = true; spawnParticles(); gsap.to(el, { rotateX: 4, rotateY: 4, duration: 0.3, ease: "power2.out", transformPerspective: 1200 }); };
    const leave = () => { isHoveredRef.current = false; clearParticles(); gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.3, ease: "power2.out" }); };
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const rx = ((e.clientY - r.top) / r.height - 0.5) * -12;
      const ry = ((e.clientX - r.left) / r.width - 0.5) * 12;
      gsap.to(el, { rotateX: rx, rotateY: ry, duration: 0.1, ease: "power2.out", transformPerspective: 1200 });
    };
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    el.addEventListener("mousemove", move);
    return () => { el.removeEventListener("mouseenter", enter); el.removeEventListener("mouseleave", leave); el.removeEventListener("mousemove", move); clearParticles(); };
  }, [spawnParticles, clearParticles]);

  return (
    <div ref={cardRef} className={`relative overflow-hidden ${className}`} style={style}>
      {children}
    </div>
  );
};

// ── Global spotlight ─────────────────────────────────────────────────────────
const GlobalSpotlight: React.FC<{ gridRef: React.RefObject<HTMLDivElement | null> }> = ({ gridRef }) => {
  useEffect(() => {
    const spot = document.createElement("div");
    spot.style.cssText = `position:fixed;width:700px;height:700px;border-radius:50%;pointer-events:none;
      background:radial-gradient(circle,rgba(${GLOW_COLOR},0.12) 0%,rgba(${GLOW_COLOR},0.06) 20%,rgba(${GLOW_COLOR},0.02) 40%,transparent 65%);
      z-index:200;opacity:0;transform:translate(-50%,-50%);mix-blend-mode:screen;`;
    document.body.appendChild(spot);

    const onMove = (e: MouseEvent) => {
      if (!gridRef.current) return;
      const sec = gridRef.current.closest(".ca-bento-section");
      const r = sec?.getBoundingClientRect();
      const inside = r && e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      gsap.to(spot, { left: e.clientX, top: e.clientY, opacity: inside ? 0.8 : 0, duration: inside ? 0.1 : 0.4, ease: "power2.out" });

      gridRef.current.querySelectorAll<HTMLElement>(".ca-card").forEach((card) => {
        const cr = card.getBoundingClientRect();
        const cx = cr.left + cr.width / 2;
        const cy = cr.top + cr.height / 2;
        const dist = Math.max(0, Math.hypot(e.clientX - cx, e.clientY - cy) - Math.max(cr.width, cr.height) / 2);
        const rx = ((e.clientX - cr.left) / cr.width) * 100;
        const ry = ((e.clientY - cr.top) / cr.height) * 100;
        const glow = dist < 200 ? 1 : dist < 350 ? (350 - dist) / 150 : 0;
        card.style.setProperty("--glow-x", `${rx}%`);
        card.style.setProperty("--glow-y", `${ry}%`);
        card.style.setProperty("--glow-intensity", String(glow));
      });
    };
    document.addEventListener("mousemove", onMove);
    return () => { document.removeEventListener("mousemove", onMove); spot.remove(); };
  }, [gridRef]);
  return null;
};

// ── Main component ────────────────────────────────────────────────────────────
export const CaBento: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [, setMobile] = useState(false);

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      <style>{`
        .ca-bento-grid {
          display: grid;
          gap: 8px;
          grid-template-columns: 1fr;
          width: 100%;
        }
        @media (min-width: 600px) {
          .ca-bento-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .ca-bento-grid { grid-template-columns: repeat(4, 1fr); }
          .ca-bento-grid .ca-card:nth-child(3) { grid-column: 3 / span 2; grid-row: 1 / span 2; }
          .ca-bento-grid .ca-card:nth-child(4) { grid-column: 1 / span 2; grid-row: 2 / span 2; }
          .ca-bento-grid .ca-card:nth-child(5) { grid-column: 3; grid-row: 3; }
          .ca-bento-grid .ca-card:nth-child(6) { grid-column: 4; grid-row: 3; }
        }
        .ca-card {
          --glow-x: 50%; --glow-y: 50%; --glow-intensity: 0; --glow-radius: 220px;
          background: #000;
          border: 1px solid #1a1a1a;
          border-radius: 20px;
          color: #fff;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s;
          min-height: 200px;
        }
        .ca-card::after {
          content:'';position:absolute;inset:0;padding:5px;
          background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
            rgba(${GLOW_COLOR}, calc(var(--glow-intensity) * 0.7)) 0%,
            rgba(${GLOW_COLOR}, calc(var(--glow-intensity) * 0.3)) 35%,
            transparent 65%);
          border-radius: inherit;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          pointer-events: none; z-index: 1;
        }
        .ca-card:hover { border-color: rgba(${GLOW_COLOR}, 0.4); }
      `}</style>

      <GlobalSpotlight gridRef={gridRef} />

      <div className="ca-bento-section w-full" ref={gridRef}>
        <div className="ca-bento-grid">
          {caCardData.map((card, i) => (
            <ParticleCard key={i} className="ca-card p-6 flex flex-col justify-between cursor-pointer">
              {/* Label at top */}
              <span className="text-sm font-medium text-white/50 block">{card.label}</span>
              {/* Title + description at bottom */}
              <div className="mt-auto pt-8">
                <h3 className="text-xl font-semibold text-white mb-1 leading-snug">{card.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{card.description}</p>
              </div>
            </ParticleCard>
          ))}
        </div>
      </div>

    </>
  );
};

export default CaBento;
