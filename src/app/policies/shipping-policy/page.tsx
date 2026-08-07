import type { Metadata } from "next";
import { PolicyPage } from "@/components/policy-page";

export const metadata: Metadata = {
  title: "Shipping Policy | Paul Wayne Gregory Chocolates",
};

export default function ShippingPolicyPage() {
  return (
    <PolicyPage
      title="Shipping Policy"
      description="Delivery timelines, methods, and coverage for orders and Bespoke Box commissions."
    />
  );
}
