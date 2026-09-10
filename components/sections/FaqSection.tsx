import { Accordion } from "@/components/ui/Accordion";
import { Section, SectionHeading } from "@/components/ui/Section";
import { faqSection, faqs } from "@/content/faq";

export function FaqSection() {
  return (
    <Section id="faq">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
        <SectionHeading
          title={faqSection.title}
          intro={faqSection.intro}
          className="lg:sticky lg:top-28 lg:self-start"
        />
        <div data-reveal>
          <Accordion
            items={faqs.map((faq) => ({
              question: faq.question,
              answer: faq.answer.map((paragraph) => (
                <p key={paragraph} className="mt-0 mb-3 last:mb-0">
                  {paragraph}
                </p>
              )),
            }))}
          />
        </div>
      </div>
    </Section>
  );
}
