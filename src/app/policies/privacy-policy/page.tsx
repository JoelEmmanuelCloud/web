import type { Metadata } from "next";
import { PolicyPage } from "@/components/policy-page";

export const metadata: Metadata = {
  title: "Privacy Policy | Paul Wayne Gregory Chocolates",
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage
      title="Privacy Policy"
      description="How we collect, use, and protect your information when you shop with us or get in touch."
    />
  );
}
