import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { siteEmails } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Service | Paul Wayne Gregory Chocolates",
  description:
    "The terms that govern using this site and ordering from Paul Wayne Gregory Chocolates.",
};

export default function TermsOfServicePage() {
  return (
    <LegalPage
      title="Terms of Service"
      lastUpdated="8 August 2026"
      intro="These terms govern your use of this website and any order you place with Paul Wayne Gregory Chocolates (“we”, “us”, “our”). By using this site or placing an order, you agree to them. Please read them alongside our Privacy Policy, Refund Policy, and Shipping Policy, linked in the footer."
      sections={[
        {
          heading: "Who We Are",
          paragraphs: [
            "Paul Wayne Gregory Chocolates is a UK chocolatier trading under this name. Our registered company details are being finalised and will be added here in full — in the meantime, you can reach us directly at " +
              siteEmails.general +
              ".",
            "[Registered company name, company number, registered office address, and VAT number to be confirmed and added here.]",
          ],
        },
        {
          heading: "Our Products",
          paragraphs: [
            "We sell handcrafted chocolates, truffles, and bespoke chocolate boxes. Every product page lists ingredients, allergens, and dietary information — please check these carefully before ordering, particularly if you have an allergy, as our kitchen handles nuts, dairy, gluten, and other allergens and cross-contamination is possible.",
            "Product photography is as accurate as we can make it, but hand-finished chocolates vary slightly piece to piece — that variation is part of what handmade means, not a fault.",
            "All products are subject to availability. We’ll tell you as early as possible if something you’ve ordered can’t be supplied.",
          ],
        },
        {
          heading: "Orders and Enquiries",
          paragraphs: [
            "Standard orders and Bespoke Box enquiries are currently placed by contacting us directly (including via the “Enquire to Order” links on product and Bespoke Box pages) rather than through an automated checkout. We’ll confirm pricing, availability, production timelines, and payment details with you personally before any order is placed.",
            "For Bespoke Box orders that include personalisation (a logo or name foil-stamped onto the box), production only begins once you’ve approved a proof of the artwork. We’ll agree the specifics — including timelines and what happens if a proof is rejected — with you directly as part of that process.",
            "No order is confirmed until we’ve acknowledged it to you directly, by email or otherwise.",
          ],
        },
        {
          heading: "Pricing and Payment",
          paragraphs: [
            "All prices on this site are shown in pounds sterling (GBP). We take reasonable care to ensure prices are correct, but if we discover an error in the price of something you’ve ordered, we’ll contact you before proceeding.",
            "Payment terms and accepted methods will be confirmed with you directly when your order is placed.",
          ],
        },
        {
          heading: "Delivery",
          paragraphs: [
            "Delivery is UK-only at this time. See our Shipping Policy for delivery areas, timelines, and costs.",
          ],
        },
        {
          heading: "Cancellations and Returns",
          paragraphs: [
            "See our Refund Policy for how cancellations, returns, and refunds work.",
            "Because our products are perishable food items made to order, the standard 14-day right to cancel under the Consumer Contracts Regulations 2013 does not apply once your order has been dispatched, except where the products are faulty, damaged, or not as described. This does not affect your other statutory rights.",
          ],
        },
        {
          heading: "Intellectual Property",
          paragraphs: [
            "The Paul Wayne Gregory name, logo, “Indulgence is everything,” and all site content — text, photography, video, and design — belong to us or our licensors. You may view and share pages for personal, non-commercial use, but you may not copy, reproduce, or repurpose our content or branding without our written permission.",
          ],
        },
        {
          heading: "Acceptable Use",
          list: [
            "Use this site only for lawful purposes.",
            "Don’t attempt to gain unauthorised access to any part of the site or its underlying systems.",
            "Don’t use the site in a way that could damage, disable, or impair it, or interfere with anyone else’s use of it.",
            "Don’t upload or submit content through the Bespoke Box builder that you don’t have the rights to use, or that is unlawful, offensive, or infringes someone else’s rights.",
          ],
        },
        {
          heading: "Liability",
          paragraphs: [
            "We provide this site on an “as is” basis and don’t guarantee it will always be available, uninterrupted, or error-free. Nothing in these terms excludes or limits our liability for death or personal injury caused by our negligence, fraud, or anything else that can’t lawfully be excluded.",
            "To the fullest extent permitted by law, we’re not liable for any indirect or consequential loss arising from your use of this site.",
          ],
        },
        {
          heading: "Changes to These Terms",
          paragraphs: [
            "We may update these terms from time to time, for example as we finalise the details flagged above or add new services. The “Last Updated” date at the top of this page reflects the most recent version. Continuing to use the site after a change means you accept the updated terms.",
          ],
        },
        {
          heading: "Governing Law",
          paragraphs: [
            "These terms are governed by the laws of England and Wales, and any dispute will be subject to the exclusive jurisdiction of the courts of England and Wales.",
          ],
        },
      ]}
    />
  );
}
