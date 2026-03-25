"use client";

import CommitteesSection from "@/components/committees-section";
import { useRouter } from "next/navigation";

export default function CommitteesPage() {
  const router = useRouter();
  return <CommitteesSection onNext={() => router.push("/register/method")} />;
}

