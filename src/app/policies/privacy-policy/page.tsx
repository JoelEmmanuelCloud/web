import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { siteEmails } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy | Paul Wayne Gregory Chocolates",
  description:
    "How we collect, use, and protect your information when you shop with us or get in touch.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated="8 August 2026"
      intro="This policy explains what personal data we collect when you use this site or contact us, why we collect it, and the rights you have over it. We’re the data controller for the personal data described here."
      sections={[
        {
          heading: "Who We Are",
          paragraphs: [
            "Paul Wayne Gregory Chocolates is a UK chocolatier. Our registered company details are being finalised and will be added here in full. In the meantime, you can reach us about anything in this policy at " +
              siteEmails.general +
              ".",
            "[Registered company name, company number, and registered office address to be confirmed and added here.]",
          ],
        },
        {
          heading: "What We Collect",
          paragraphs: [
            "We collect personal data in a few ways:",
          ],
          list: [
            "Contact and order details you give us directly — name, email, delivery address, and order or enquiry details, when you get in touch or place an order.",
            "Bespoke Box builder content — any logo you upload or name you type in to preview on a box, and the choices you make while building a design.",
            "Newsletter sign-up — your email address, if you subscribe.",
            "Cookies and similar technologies — see the Cookies section below, and the cookie banner shown on this site, for the categories we use and how to control them.",
          ],
        },
        {
          heading: "How We Use It",
          paragraphs: ["We use your personal data to:"],
          list: [
            "Respond to enquiries and process orders, including Bespoke Box orders and any personalisation proofs.",
            "Send you order-related updates (confirmation, dispatch, delivery).",
            "Send marketing communications, but only if you’ve opted in — you can unsubscribe at any time.",
            "Understand how the site is used and improve it, where you’ve consented to analytics cookies.",
            "Meet our legal and regulatory obligations, including around food safety and allergen information.",
          ],
        },
        {
          heading: "Our Legal Basis for Using Your Data",
          paragraphs: [
            "We rely on: performance of a contract (fulfilling an order or enquiry you’ve made), consent (marketing emails and analytics/marketing cookies, which you can withdraw at any time), and legitimate interests (keeping the site secure and understanding how it’s used, balanced against your rights).",
          ],
        },
        {
          heading: "Cookies",
          paragraphs: [
            "We use strictly necessary cookies to run the site, which are always on because the site can’t function properly without them. Where you opt in via the cookie banner, we also use analytics and marketing cookies to understand how the site is used. You can change your preference at any time by clearing your browser’s local storage for this site and reloading the page, which will bring the cookie banner back.",
          ],
        },
        {
          heading: "Sharing Your Data",
          paragraphs: [
            "We don’t sell your personal data. We share it only with service providers who help us run the site and fulfil orders — for example, email delivery, hosting, and (for Bespoke Box personalisation) our packaging and foiling suppliers, who receive only what’s needed to produce your order. We require anyone we share data with to protect it properly.",
            "We may also disclose data where required by law.",
          ],
        },
        {
          heading: "How Long We Keep It",
          paragraphs: [
            "We keep order and enquiry data for as long as needed to fulfil your order, meet legal and accounting obligations, and handle any related questions afterwards. We keep marketing data until you unsubscribe or ask us to delete it.",
          ],
        },
        {
          heading: "Your Rights",
          paragraphs: [
            "Under UK data protection law, you have the right to:",
          ],
          list: [
            "Access the personal data we hold about you.",
            "Ask us to correct inaccurate data.",
            "Ask us to delete your data, in certain circumstances.",
            "Ask us to restrict or object to certain processing.",
            "Ask for your data in a portable format.",
            "Withdraw consent at any time, where we rely on consent.",
          ],
        },
        {
          heading: "Complaints",
          paragraphs: [
            "If you have concerns about how we handle your data, contact us first at " +
              siteEmails.general +
              " so we can try to put it right. You also have the right to complain to the UK’s data protection regulator, the Information Commissioner’s Office (ico.org.uk).",
          ],
        },
        {
          heading: "Keeping Your Data Secure",
          paragraphs: [
            "We use reasonable technical and organisational measures to protect your personal data against unauthorised access, loss, or misuse.",
          ],
        },
        {
          heading: "Children",
          paragraphs: [
            "This site is intended for adults. We don’t knowingly collect personal data from children.",
          ],
        },
        {
          heading: "Changes to This Policy",
          paragraphs: [
            "We may update this policy from time to time, for example as we finalise the details flagged above. The “Last Updated” date at the top of this page reflects the most recent version.",
          ],
        },
      ]}
    />
  );
}
