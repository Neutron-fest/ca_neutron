"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollTextProps {
  text: string;
  label?: string;
  scrollHeight?: string;
}

export default function ScrollText({
  text,
  label,
  scrollHeight = "300vh",
}: ScrollTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  // Split text into words
  const words = text.split(" ");

  useEffect(() => {
    const container = containerRef.current;
    const pin = pinRef.current;
    if (!container || !pin) return;

    const wordEls = pin.querySelectorAll<HTMLSpanElement>(".st-word");

    const tl = gsap.fromTo(
      wordEls,
      { opacity: 0.08, color: "rgba(255,255,255,0.15)" },
      {
        opacity: 1,
        color: "rgba(255,255,255,1)",
        stagger: 1,          
        duration: 1,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          pin: pin,         
          pinSpacing: false,
          anticipatePin: 1,
        },
      }
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ height: scrollHeight }}
      className="relative w-full"
    >
      <div
        ref={pinRef}
        className="flex h-screen w-full items-center justify-center px-6 md:px-16"
        style={{
          backgroundColor: "#000",
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      >
        <div className="max-w-4xl w-full text-center">
          {label && (
            <p className="mb-6 text-xs font-semibold tracking-[0.35em] uppercase text-blue-400/80">
              {label}
            </p>
          )}
          <p
            className="leading-relaxed font-light"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 3rem)",
              fontFamily: "'Georgia','Times New Roman',serif",
            }}
          >
            {words.map((word, i) => (
              <React.Fragment key={i}>
                <span
                  className="st-word inline-block"
                  style={{ opacity: 0.08, color: "rgba(255,255,255,0.15)" }}
                >
                  {word}
                </span>
                {i < words.length - 1 && " "}
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
