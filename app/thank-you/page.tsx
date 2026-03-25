"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ThankYouSection from "@/components/thank-you-section";

export default function ThankYouPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Check if the user has actually submitted the form
    const hasSubmitted = sessionStorage.getItem("neutron.form.submitted");
    console.log("Thank you page - checking submission flag:", hasSubmitted);
    
    if (!hasSubmitted) {
      // Redirect to intro page if they haven't submitted
      console.log("No submission flag found, redirecting to intro");
      router.replace("/intro");
    } else {
      // Mark as authorized to show the page
      setIsAuthorized(true);
      // Clear the submission flag after a delay to ensure page is shown
      setTimeout(() => {
        sessionStorage.removeItem("neutron.form.submitted");
      }, 1000);
    }
  }, [router]);

  // Don't render anything until we've checked authorization
  if (!isAuthorized) {
    return null;
  }

  return <ThankYouSection />;
}

