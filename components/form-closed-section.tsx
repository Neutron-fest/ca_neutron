"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, X, Heart, Sparkles } from "lucide-react";

interface FormClosedSectionProps {
  closingTime: string;
}

export default function FormClosedSection({ closingTime }: FormClosedSectionProps) {
  return (
    <section className="relative min-h-screen bg-black">
      {/* Background: tech grid + scan overlays */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black" />
        <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="absolute -top-28 left-1/2 h-72 w-[90vw] sm:w-[46rem] max-w-[46rem] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-[-7rem] right-[-7rem] h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute inset-0 neutron-scanlines" />
        <div className="absolute inset-0 neutron-noise" />
        <div className="absolute left-0 top-0 h-[42%] w-full neutron-sweep" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-4 py-10 sm:px-8">
        {/* Main translucent panel */}
        <div className="neutron-panel neutron-hud rounded-3xl px-6 py-8 sm:px-10 backdrop-blur-md bg-white/[0.03] border border-white/10">
          {/* Status badges at top */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <Badge className="border-red-600/30 bg-red-600/20 text-red-200 hover:bg-red-600/20 font-mono text-xs px-3 py-1">
              STATUS: CLOSED
            </Badge>
            <Badge className="border-teal-500/30 bg-teal-500/20 text-teal-200 hover:bg-teal-500/20 font-mono text-xs px-3 py-1">
              REGISTRATION ENDED
            </Badge>
          </div>

          {/* Circular X icon */}
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-red-600/30 via-red-500/25 to-red-700/30 rounded-full flex items-center justify-center mx-auto border border-red-500/40 shadow-[0_0_30px_rgba(239,68,68,0.4)] backdrop-blur-sm">
              <X className="w-16 h-16 sm:w-20 sm:h-20 text-red-400 font-bold" strokeWidth={3} />
            </div>
          </div>

          {/* Main heading */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center mb-4">
            Registration Closed
          </h2>
          
          {/* Closed time with clock icon */}
          <div className="flex items-center justify-center gap-2 text-white/80 mb-8">
            <Clock className="h-5 w-5 text-white/70" />
            <span className="text-base sm:text-lg">Closed at {closingTime}</span>
          </div>

          <Separator className="my-6 bg-white/10" />

          {/* Registration Period Has Ended section */}
          <div className="text-center space-y-6 mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Registration Period Has Ended
            </h3>
            
            <p className="text-white/80 leading-relaxed text-base sm:text-lg max-w-2xl mx-auto">
              Thank you for your interest in Neutron3.0 Festival! The registration period has officially closed. 
              We will be reviewing applications now and moving forward with the selection process accordingly.
            </p>
          </div>

          {/* Thank you button-like element at bottom */}
          <div className="mt-8 flex items-center justify-center">
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 sm:px-8 py-4 rounded-full hover:bg-white/10 transition-colors">
              <Heart className="w-5 h-5 text-white" />
              <span className="text-base sm:text-lg font-semibold text-white">Thank you for your interest!</span>
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
