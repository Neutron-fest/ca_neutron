"use client";

import IntroSection from "@/components/intro-section";
import { useRouter } from "next/navigation";

export default function IntroPage() {
  const router = useRouter();
  return <IntroSection onNext={() => router.push("/committees")} />;
}

