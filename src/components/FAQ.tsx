import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const { t } = useTranslation();

  const faqs = t("faq.questions", { returnObjects: true }) as Array<{
    question: string;
    answer: string;
  }>;

  return (
    <section className="py-20 sm:py-28 md:py-36 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h2
          className="font-light tracking-tight text-foreground mb-10 sm:mb-16"
          style={{ fontSize: "clamp(26px, 4vw, 48px)" }}
        >
          {t("faq.title")}
        </h2>

        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border border-border rounded-[16px] px-4 sm:px-6 data-[state=open]:border-primary/30 transition-colors"
            >
              <AccordionTrigger className="text-left text-sm sm:text-base font-medium text-foreground hover:no-underline py-4 sm:py-5 [&[data-state=open]>svg]:text-primary">
                {f.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4 sm:pb-5">
                {f.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
