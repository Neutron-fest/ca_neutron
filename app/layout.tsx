import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import RegistrationFlowProvider from "@/components/registration-flow-provider";
import FAQSection from "@/components/faq-section";
import "./globals.css";

export const metadata: Metadata = {
  title: "Neutron Fest 2026",
  description:
    "Join the most exciting Tech fest at Newton School of Technology! Register for Neutron Fest 2026 and be part of an unforgettable experience.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  minimumScale: 1.0,
  maximumScale: 5.0,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.jpeg" />
        <style>{`
html {
  font-family: 'Telegraf', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-sans: 'Telegraf', sans-serif;
  --font-mono: ${GeistMono.variable};
}
        `}</style>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Doto:wght@100..900&family=Outfit:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Press+Start+2P&family=Rubik:ital,wght@0,300..900;1,300..900&family=Sora:wght@100..800&family=Spinnaker&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
          storageKey="neutron3.0-theme"
        >
          <RegistrationFlowProvider>{children}</RegistrationFlowProvider>
          <Toaster />
          {/* <FAQSection buttonClassName="global-faq-button" /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
