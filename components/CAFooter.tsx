"use client";

import Link from "next/link";
import Image from "next/image";
import Noise from "@/components/Noise";

export default function CAFooter() {
  return (
    <section
      id="apply"
      className="relative z-10 w-full min-h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: "#000" }}
    >
      {/* Film grain overlay */}
      <div className="absolute inset-0 z-[50] pointer-events-none">
        <Noise patternAlpha={20} patternRefreshInterval={3} />
      </div>
      <div className="relative flex-1 flex items-center">

        <div className="absolute inset-y-0 left-0 w-1/2 pointer-events-none select-none">
          <Image
            src="https://ik.imagekit.io/YatharthKhandelwal/ASTR.png"
            alt="Campus Ambassador"
            fill
            className="object-cover hidden md:block left-10"
            priority
          />
          <Image
            src="https://ik.imagekit.io/YatharthKhandelwal/ASTR.png"
            alt="Campus Ambassador"
            fill
            className="object-cover md:hidden object-right"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black" />
        </div>

        <div className="relative z-10 ml-auto w-full md:w-1/2 px-10 md:px-16 lg:px-24 py-24 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-6">
            <p className="text-[11px] font-semibold tracking-[0.35em] uppercase text-white/50">
              Step into orbit. Lead what’s next.
            </p>
          </div>

          <h2
            className="text-white leading-[1.0] mb-10"
            style={{
              fontSize: "clamp(2.8rem, 7vw, 6rem)",
              fontFamily: "'Georgia','Times New Roman',serif",
            }}
          >
            Apply for<br />
            <span
              className="italic font-light bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent"
            >
              Ambassador.
            </span>
          </h2>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://forms.gle/placeholder"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full border border-white/80 bg-white text-black px-8 py-4 text-sm font-semibold tracking-wide hover:bg-black hover:text-white hover:border-white transition-all duration-300"
            >
              Apply Now
              <span className="text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 text-white/60 px-8 py-4 text-sm font-medium tracking-wide hover:border-white/50 hover:text-white transition-all duration-300"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

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
  );
}
