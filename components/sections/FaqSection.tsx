import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Section";
import { faqSection, faqs } from "@/content/faq";

export function FaqSection() {
  return (
    <Container as="section" id="faq" className="py-section">
      <div className="grid-12 gap-y-shelf">
        <SectionHeading
          title={faqSection.title}
          intro={faqSection.intro}
          className="col-span-12 lg:col-span-4"
        />
        <div data-reveal className="col-span-12 lg:col-span-7 lg:col-start-6">
          <Accordion
            items={faqs.map((faq) => ({
              question: faq.question,
              answer: faq.answer.map((p) => (
                <p key={p} className="mt-0 mb-4 max-w-read last:mb-0">
                  {p}
                </p>
              )),
            }))}
          />
        </div>
      </div>
    </Container>
  );
}
