import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { siteEmails } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Shipping Policy | Paul Wayne Gregory Chocolates",
  description:
    "Where we deliver, who carries your order, and how Bespoke Box production timelines work.",
  alternates: { canonical: "/policies/shipping-policy" },
};

export default function ShippingPolicyPage() {
  return (
    <LegalPage
      title="Shipping Policy"
      lastUpdated="27 August 2026"
      intro="This page covers where we deliver, who carries your order, and how our production and dispatch timelines work."
      sections={[
        {
          heading: "Where We Deliver",
          paragraphs: [
            "We currently deliver within the UK only. We're working towards shipping further afield as the business grows, and we'll update this page as soon as that changes.",
          ],
        },
        {
          heading: "Courier",
          paragraphs: [
            "Orders are delivered via UPS. We arrange shipping for each order individually, with the cost calculated by weight at checkout.",
          ],
        },
        {
          heading: "Bespoke Box Production & Dispatch",
          paragraphs: [
            "Bespoke Box orders are made to order once your design (and, for personalised boxes, your approved proof) is confirmed. Production takes 2 weeks for boxes without personalisation, and 3 weeks for boxes with a personalised logo. These timelines can vary seasonally — for example around unforeseen circumstances, seasonal rush, or third-party ingredient delays — and we'll notify you in advance if that affects your order.",
            "We're not able to take responsibility for delays caused by incorrect information provided at checkout, or by the courier once your order has been dispatched, though we'll always help however we can if something goes wrong in transit.",
          ],
        },
        {
          heading: "Standard Orders",
          paragraphs: [
            `Dispatch and delivery timeframes for standard (non-Bespoke Box) orders will be confirmed at checkout. If you need a firm estimate before ordering, contact us at ${siteEmails.general} and we'll let you know.`,
          ],
        },
        {
          heading: "Tracking & Delivery Issues",
          paragraphs: [
            `If your order hasn't arrived when expected, or arrives damaged, please contact us at ${siteEmails.general} and we'll sort it out — see our Refund Policy for how replacements and refunds work.`,
          ],
        },
        {
          heading: "Changes To This Policy",
          paragraphs: [
            "We may update this policy from time to time, for example once our shipping rates and international coverage are finalised. The “Last Updated” date at the top of this page reflects the most recent version.",
          ],
        },
      ]}
    />
  );
}
