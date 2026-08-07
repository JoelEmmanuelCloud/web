import type { Metadata } from "next";
import { PolicyPage } from "@/components/policy-page";

export const metadata: Metadata = {
  title: "Refund Policy | Paul Wayne Gregory Chocolates",
};

export default function RefundPolicyPage() {
  return (
    <PolicyPage
      title="Refund Policy"
      description="Our approach to returns, refunds, and order issues."
    />
  );
}
