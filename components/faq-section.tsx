"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

// FAQ Data
const faqData = [
  {
    question: "Who can join the Crew and who can join the Direction Team?",
    answer: "Crew: Open for 1st-year students.\n\nDirection Team: Open for 2nd and 3rd year students."
  },
    {
    question: "Does Event include concert night also?",
    answer: "No, Event includes guest lectures, talks, creators summit and engaging activities only."
  },
  {
    question: "Can I change my department later on?",
    answer: "Department change requests will be considered only if required and at the discretion of your current Department Head and the Head of the department you wish to join."
  },
  {
    question: "Who will take my interview?",
    answer: "Crew Applicants (1st Year):\nRound 1: Department Heads\nRound 2: Panel\n\nDirection Applicants (2nd and 3rd Year):\nOne single round with the Panel."
  },
  {
    question: "When can I expect a reply back?",
    answer: "You will receive an update within one week of your interview."
  },
  {
    question: "What if I don't get selected?",
    answer: "You may be added to the waitlist, or you can apply again next year."
  },
  {
    question: "Do I need prior experience to apply?",
    answer: "No, prior experience is not mandatory. We value creativity, commitment, and willingness to learn."
  },
  {
    question: "Can I apply for more than one department?",
    answer: "You can mention multiple preferences in the form, but you will be allotted only one final department."
  },
  {
    question: "Will I get an Official Duty (OD) for recruitment or fest work?",
    answer: "ODs will be need-based. If your work requires it, they will be granted as per university policies and NEUTRON3.0 guidelines."
  },
  {
    question: "How much time commitment is expected?",
    answer: "Initially a few hours per week.\n\nThe workload will gradually increase as the fest approaches."
  },
  {
    question: "Will I get a certificate for being part of the team?",
    answer: "Yes, all members who fulfill their responsibilities will receive an official certificate of recognition."
  },
  {
    question: "What happens after selection?",
    answer: "We will have an official orientation and onboarding session.\n\nFurther steps and responsibilities will be discussed during onboarding."
  },
  {
    question: "Are there any rules or policies I should know about?",
    answer: "Yes. All members must follow NEUTRON3.0 General Guidelines (discipline, attendance, behavior) along with university policies.\n\nViolations may lead to removal from the team."
  }
];

interface FAQSectionProps {
  customFaqData?: Array<{
    question: string;
    answer: string;
  }>;
  buttonClassName?: string;
  dialogTitle?: string;
  dialogDescription?: string;
  isMobileInline?: boolean;
}

export default function FAQSection({ 
  customFaqData,
  buttonClassName,
  dialogTitle = "FAQ",
  dialogDescription = "Get answers to common questions about joining Neutron3.0 Fest 2025",
  isMobileInline = false
}: FAQSectionProps) {
  const faqs = customFaqData || faqData;

  const baseButtonClass = "w-16 h-16 rounded-full bg-gradient-to-r bg-white hover:bg-cyan-400 shadow-2xl hover:shadow-cyan-400/50 transition-all duration-300 hover:scale-110 p-0";
  const positionClass = isMobileInline ? "" : "fixed bottom-6 right-6 z-50";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className={`${baseButtonClass} ${positionClass} ${buttonClassName || ''}`}
        >
          <HelpCircle className="w-8 h-8 text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden bg-white rounded-3xl border-0 shadow-2xl [&>button]:w-10 [&>button]:h-10 [&>button]:top-5 [&>button]:right-5 [&>button>svg]:w-6 [&>button>svg]:h-6">
        {/* Custom Header */}
        <div className="p-8 pb-6 pr-16">
          {/* FAQ Icon and Title */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r bg-white rounded-full flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{dialogTitle}</h2>
              <p className="text-sm text-red-500 font-medium">Frequently Asked Questions</p>
            </div>
          </div>
          
          {/* Description */}
          <p className="text-gray-600 text-base">
            {dialogDescription}
          </p>
        </div>

        {/* FAQ Content */}
        <div className="px-8 pb-8 max-h-[60vh] overflow-y-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Accordion key={index} type="single" collapsible className="w-full">
                <AccordionItem value={`item-${index}`} className="border-none">
                  <AccordionTrigger className="text-left font-medium text-white hover:text-cyan-400 transition-colors p-4 hover:no-underline hover:bg-white/10 rounded-lg">
                    <div className="flex items-start gap-4 w-full pr-4">
                      <div className="w-8 h-8 bg-cyan-400 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-left leading-relaxed flex-1">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 whitespace-pre-line leading-relaxed ml-12 pr-8 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
