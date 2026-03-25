"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export interface ScrollRevealCardsProps {
  prizePool?: string;
  location?: string;
  teamSize?: string;
}

export function ScrollRevealCards({ prizePool, location, teamSize }: ScrollRevealCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef     = useRef<HTMLDivElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);

  const ASTR_IMG =
    "https://ik.imagekit.io/YatharthKhandelwal/Banner.jpeg";

  useEffect(() => {
    const container = containerRef.current;
    const pin       = pinRef.current;
    const title     = titleRef.current;
    const cards     = cardsRef.current;
    if (!container || !pin || !title || !cards) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: pin,
          pinSpacing: false,
          anticipatePin: 1,
        },
      });

      // Phase 1 (0–25 %): title fades in + cards scale from 1 → 0.85
      tl.from(title, { opacity: 0, y: 24, duration: 0.25 }, 0);
      tl.from(cards, { scale: 1,  duration: 0.25 }, 0);
      tl.to(cards,   { scale: 0.85, duration: 0.25 }, 0);

      // Phase 2 (70–90 %): cards flip individually
      const cardEls = cards.querySelectorAll<HTMLElement>(".flip-card-inner");
      cardEls.forEach((el, i) => {
        const rotZ = i === 0 ? -8 : i === 2 ? 8 : 0;
        const yOff = i === 1 ? -10 : 20;
        tl.to(
          el,
          {
            rotateY: 180,
            rotate: rotZ,
            y: yOff,
            duration: 0.2,
          },
          0.7
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const cards = [
    { value: location || "Rishihood University, India", backImage: "https://ik.imagekit.io/YatharthKhandelwal/CONCERT.png", textColor: "#fff", bgX: "0%" },
    { value: prizePool || "₹10,000+",                 backImage: "https://neutron-organization.vercel.app/Gallery/20250413_195722.jpg",    textColor: "#fff", bgX: "50%" },
    { value: teamSize  || "Open to All Students",      backImage: "https://ik.imagekit.io/YatharthKhandelwal/ARS06699.JPG", textColor: "#fff", bgX: "100%" },
  ];

  return (
    /* Outer sets scroll length; inner is pinned by GSAP */
    <div ref={containerRef} className="relative h-[400vh] w-full">
      <div
        ref={pinRef}
        className="h-screen w-full flex flex-col items-center justify-center overflow-hidden"
        style={{
          backgroundColor: "#000",
          backgroundImage: "radial-gradient(rgba(255,255,255,0.13) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      >
        {/* Title */}
        <h2
          ref={titleRef}
          className="text-white text-3xl md:text-5xl font-serif mb-12 tracking-wide text-center px-4"
          style={{ opacity: 1 }}
        >
          What stage <span className="italic text-gray-400">is</span> your mission in?
        </h2>

        {/* Cards row */}
        <div
          ref={cardsRef}
          className="flex w-full max-w-[1200px] h-[60vh] px-4 md:px-0"
          style={{ perspective: "1000px", gap: 0 }}
        >
          {cards.map((card, i) => {
            const radiusLeft  = i === 0 ? "24px 0 0 24px"   : "0";
            const radiusRight = i === 2 ? "0 24px 24px 0"   : "0";
            const borderRadius = i === 0 ? radiusLeft : i === 2 ? radiusRight : "0";

            return (
              <div
                key={i}
                className="relative flex-1 h-full -mr-px last:mr-0"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className="flip-card-inner absolute inset-0 w-full h-full"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Front face — panoramic slice of the banner image */}
                  <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                      borderRadius,
                      backgroundImage: `url('${ASTR_IMG}')`,
                      backgroundSize: "300% 100%",
                      backgroundPosition: card.bgX,
                      backgroundRepeat: "no-repeat",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  />
                  {/* Back face */}
                  <div
                    className="absolute inset-0 w-full h-full flex flex-col justify-end"
                    style={{
                      borderRadius: "24px",
                      backgroundImage: `url('${card.backImage}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      color: card.textColor,
                      transform: "rotateY(180deg)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent rounded-[24px]" />
                    <p className="relative z-10 text-white text-3xl font-semibold tracking-tight leading-tight p-8">
                      {card.value}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}