import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { siteEmails } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Refund Policy | Paul Wayne Gregory Chocolates",
  description:
    "Our promise if something isn't right with your order, and how returns, replacements, and refunds work.",
  alternates: { canonical: "/policies/refund-policy" },
};

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund Policy"
      lastUpdated="27 August 2026"
      intro="Indulgence is only truly enjoyed when you're happy. If you're not completely happy with your order, your chocolates, or if we've missed an important delivery date, please let us know — we promise to listen, take care of the matter, and do our very best to put things right."
      sections={[
        {
          heading: "Our Promise To You",
          paragraphs: [
            "Depending on the circumstances, putting things right may mean arranging a replacement, offering a refund, or providing a gift card where appropriate. We believe that when something goes wrong, it should be handled with honesty, care, and a positive solution — our aim is always to resolve any mistake as quickly and smoothly as possible, with the minimum fuss for you.",
            "Our team are here to help and are empowered to deal with your concerns personally. Whatever the circumstances, you can expect a prompt, helpful, and friendly response from us.",
          ],
        },
        {
          heading: "Before You Return Anything",
          paragraphs: [
            `If your order, or anything within it, isn't quite as you expected, please contact us at ${siteEmails.general} and tell us what's happened — we'll take a look and come back to you as quickly as we can. Please don't return any items without contacting us first; we'll guide you through what to do and make sure the matter is dealt with in the right way.`,
          ],
        },
        {
          heading: "Faulty, Damaged, Or Incorrect Orders",
          paragraphs: [
            "Please inspect your order as soon as it arrives. If anything is faulty, damaged in transit, or not what you ordered, contact us straightaway so we can put it right — this is always covered, whatever else applies below.",
          ],
        },
        {
          heading: "Because Our Chocolates Are Perishable",
          paragraphs: [
            "Our products are handmade, perishable food items, and Bespoke Box orders are made to order. Because of this, the standard 14-day change-of-mind cancellation right under the Consumer Contracts Regulations 2013 does not apply once your order has been dispatched, except where the products are faulty, damaged, or not as described — this matches our Terms of Service and does not affect your other statutory rights. For food safety reasons, we're also unable to accept the return of chocolates once they've left us, other than in those same circumstances.",
          ],
        },
        {
          heading: "Bespoke Box Personalisation Proofs",
          paragraphs: [
            "If you've ordered a personalised Bespoke Box, production only begins once you've approved a proof of the artwork. If you reject the first proof, you'll receive a full refund. If a reworked proof is rejected a second time, a deduction may apply to cover the work already carried out — we'll always confirm the exact amount with you directly before any further rework begins, so there are no surprises.",
          ],
        },
        {
          heading: "How Refunds Are Issued",
          paragraphs: [
            "Once we've agreed a refund is due, we'll process it back to your original payment method as promptly as we can. Please bear in mind it can take your bank or card provider a little longer to show the funds on your end.",
          ],
        },
        {
          heading: "Changes To This Policy",
          paragraphs: [
            "We may update this policy from time to time, for example as we finalise the details flagged above. The “Last Updated” date at the top of this page reflects the most recent version.",
          ],
        },
      ]}
    />
  );
}
