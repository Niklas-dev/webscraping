"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

const faqs = [
  {
    question: "How does TrendPilot generate content ideas?",
    answer:
      "TrendPilot uses advanced AI algorithms to analyze trending topics across social media platforms. It considers your niche, audience preferences, and current trends to generate highly relevant content ideas that are likely to perform well.",
  },
  {
    question: "Can I use TrendPilot for multiple social media accounts?",
    answer:
      "Yes! With our Pro and Business plans, you can manage multiple social media accounts across different platforms. The Free plan allows you to use TrendPilot for one account on either Instagram or TikTok.",
  },
  {
    question: "How many content ideas can I generate?",
    answer:
      "The Free plan includes 5 content ideas per day. The Pro and Business plans offer unlimited idea generation, allowing you to create as many content ideas as you need.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes, we offer a 7-day free trial of our Pro plan so you can experience all the premium features before committing. No credit card is required to start your trial.",
  },
  {
    question: "Can I cancel my subscription at any time?",
    answer:
      "Absolutely. You can cancel your subscription at any time with no questions asked. If you cancel within 30 days of your initial purchase, we'll provide a full refund.",
  },
  {
    question: "Do you offer support if I need help?",
    answer:
      "Yes, we provide email support for all plans. Pro users receive faster response times, while Business plan subscribers get priority support with dedicated account managers.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-20 bg-[#fffdf7]">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about TrendPilot
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-b border-gray-200"
            >
              <AccordionTrigger className="text-left text-lg font-medium text-gray-900 py-6 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Still have questions? We&apos;re here to help.
          </p>
          <Link
            href="#contact"
            className="text-yellow-600 font-medium hover:text-yellow-700 underline underline-offset-4"
          >
            Contact our support team
          </Link>
        </div>
      </div>
    </section>
  );
}
