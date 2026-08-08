"use client";

import dynamic from "next/dynamic";

export const CookieConsent = dynamic(
  () => import("@/components/cookie-consent").then((mod) => mod.CookieConsent),
  { ssr: false },
);
