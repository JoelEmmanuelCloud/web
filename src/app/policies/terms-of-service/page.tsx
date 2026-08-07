import type { Metadata } from "next";
import { PolicyPage } from "@/components/policy-page";

export const metadata: Metadata = {
  title: "Terms of Service | Paul Wayne Gregory Chocolates",
};

export default function TermsOfServicePage() {
  return (
    <PolicyPage
      title="Terms of Service"
      description="The terms that govern using this site and ordering from Paul Wayne Gregory Chocolates."
    />
  );
}
