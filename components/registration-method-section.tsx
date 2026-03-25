"use client";

import React, { memo, useCallback, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, Clipboard, Terminal, Globe2 } from "lucide-react";
import { isFormClosed } from "@/lib/deadline";

interface RegistrationMethodSectionProps {
  onWebsite: () => void;
  onBack: () => void;
}

function RegistrationMethodSection({
  onWebsite,
  onBack,
}: RegistrationMethodSectionProps) {
  const [showTerminal, setShowTerminal] = useState(false);

  const cliCommands = useMemo(() => {
    // Configure this in production via NEXT_PUBLIC_NEUTRON_CLI_COMMAND.
    // If unset, default to a 2-step flow (install -> run).
    const fromEnv = process.env.NEXT_PUBLIC_NEUTRON_CLI_COMMAND;
    if (fromEnv && fromEnv.trim().length > 0) {
      return [fromEnv.trim()];
    }
    return ["npm i neutron-apply-cli", "npx neutron-apply-cli"];
  }, []);

  const handleCopy = useCallback(async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast({
        title: "Copied",
        description: "Command copied to clipboard.",
      });
    } catch {
      toast({
        title: "Copy failed",
        description: "Please copy the command manually.",
        variant: "destructive",
      });
    }
  }, []);

  return (
    <section className="relative min-h-screen bg-black">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black" />
        <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="absolute -top-28 left-1/2 h-72 w-[90vw] sm:w-[46rem] max-w-[46rem] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-[-7rem] right-[-7rem] h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute inset-0 neutron-scanlines" />
        <div className="absolute inset-0 neutron-noise" />
        <div className="absolute left-0 top-0 h-[42%] w-full neutron-sweep" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-4 py-10 sm:px-8 lg:px-12">
        <div className="neutron-panel neutron-hud rounded-3xl px-6 py-8 sm:px-10">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="border-cyan-500/20 bg-cyan-500/10 text-cyan-200 hover:bg-cyan-500/10 font-mono">
              MODULE: REGISTRATION
            </Badge>
            <Badge className="border-white/10 bg-white/5 text-white/70 hover:bg-white/5 font-mono">
              CHOOSE METHOD
            </Badge>
          </div>

          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Continue registration
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
            Pick how you want to register: continue on the website, or use a
            terminal command.
          </p>

          <Separator className="my-6 bg-white/10" />

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="neutron-panel neutron-hud rounded-3xl bg-white/[0.03] p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-semibold text-white">
                    Website registration
                  </div>
                  <div className="mt-1 text-sm text-white/70">
                    Continue the form directly in the browser.
                  </div>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                  <Globe2 className="h-5 w-5 text-cyan-200" />
                </div>
              </div>
              <div className="mt-6">
                <Button
                  size="lg"
                  onClick={() => {
                    if (isFormClosed()) {
                      toast({
                        title: "Registration Closed",
                        description: "Sorry, the registration period has ended.",
                        variant: "destructive",
                      });
                    } else {
                      onWebsite();
                    }
                  }}
                  className="w-full h-12 rounded-2xl bg-white text-base font-semibold text-black hover:bg-white/90 shadow-[0_18px_70px_rgba(34,211,238,0.14)]"
                >
                  Proceed on website
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </Card>

            <Card className="neutron-panel neutron-hud rounded-3xl bg-white/[0.03] p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-semibold text-white">
                    Terminal-based registration
                  </div>
                  <div className="mt-1 text-sm text-white/70">
                    Get the command and copy-paste it into your terminal.
                  </div>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                  <Terminal className="h-5 w-5 text-cyan-200" />
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setShowTerminal(true)}
                  className="w-full h-12 rounded-2xl border-white/10 bg-white/5 text-base font-semibold text-white hover:bg-white/10"
                >
                  Show command
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                {showTerminal && (
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <div className="text-xs text-white/60 font-mono">
                      Copy & paste:
                    </div>
                    {cliCommands.length === 1 ? (
                      <div className="mt-3">
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <div className="text-xs text-white/60 font-mono">
                            Step 1
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleCopy(cliCommands[0])}
                            className="h-9 rounded-2xl border-white/10 bg-white/5 px-3 text-xs text-white/80 hover:bg-white/10 font-mono"
                          >
                            <Clipboard className="mr-2 h-4 w-4" />
                            Copy
                          </Button>
                        </div>
                        <pre className="overflow-x-auto rounded-xl bg-black/50 p-3 text-sm text-cyan-100/90">
                          <code>{cliCommands[0]}</code>
                        </pre>
                      </div>
                    ) : (
                      <div className="mt-3 grid gap-3">
                        {cliCommands.map((command, idx) => (
                          <div key={`${idx}-${command}`}>
                            <div className="mb-2 flex items-center justify-between gap-3">
                              <div className="text-xs text-white/60 font-mono">
                                {`Step ${idx + 1}`}
                              </div>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => handleCopy(command)}
                                className="h-9 rounded-2xl border-white/10 bg-white/5 px-3 text-xs text-white/80 hover:bg-white/10 font-mono"
                              >
                                <Clipboard className="mr-2 h-4 w-4" />
                                Copy
                              </Button>
                            </div>
                            <pre className="overflow-x-auto rounded-xl bg-black/50 p-3 text-sm text-cyan-100/90">
                              <code>{command}</code>
                            </pre>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="mt-2 text-xs text-white/55">
                      If you’re on Windows PowerShell, paste and run the same
                      command.
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="h-11 rounded-2xl border-white/10 bg-white/5 px-5 text-sm text-white/80 hover:bg-white/10"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(RegistrationMethodSection);

