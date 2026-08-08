"use client";

import Link from "next/link";
import { useState } from "react";

const STORAGE_KEY = "pwg-cookie-consent";

type Preferences = {
  analytics: boolean;
};

export function CookieConsent() {
  const [visible, setVisible] = useState(
    () => !window.localStorage.getItem(STORAGE_KEY),
  );
  const [managing, setManaging] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  function save(preferences: Preferences) {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ necessary: true, ...preferences }),
    );
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] border-t border-line bg-ink-raised px-6 py-6 sm:px-10">
      <div className="mx-auto max-w-6xl">
        {managing ? (
          <div className="flex flex-col gap-6">
            <p className="tracked-label text-xs text-paper-dim">
              Manage Cookie Preferences
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-4 border-t border-line pt-4">
                <div>
                  <p className="text-sm text-paper">Strictly Necessary</p>
                  <p className="mt-1 text-xs text-paper-dim">
                    Required for the site to function. Always on.
                  </p>
                </div>
                <span className="tracked-label shrink-0 text-[10px] text-paper-dim">
                  Always On
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-line pt-4">
                <div>
                  <p className="text-sm text-paper">Analytics &amp; Marketing</p>
                  <p className="mt-1 text-xs text-paper-dim">
                    Not currently in use on this site. Your choice is saved
                    for if that changes.
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={analytics}
                  aria-label="Toggle analytics and marketing cookies"
                  onClick={() => setAnalytics((v) => !v)}
                  className={`relative h-6 w-11 shrink-0 rounded-full border transition-colors ${
                    analytics
                      ? "border-accent bg-accent"
                      : "border-line bg-transparent"
                  }`}
                >
                  <span
                    className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-paper transition-transform ${
                      analytics ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setManaging(false)}
                className="tracked-label flex h-[44px] items-center justify-center rounded-full border border-line px-6 text-xs text-paper-dim transition-colors hover:border-paper-dim hover:text-paper"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => save({ analytics })}
                className="tracked-label flex h-[44px] items-center justify-center rounded-full bg-paper px-6 text-xs text-ink transition-colors hover:bg-accent hover:text-accent-ink"
              >
                Save Preferences
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="max-w-2xl text-sm leading-7 text-paper-dim">
              We use cookies to run this site and, where you allow it, to
              understand how it&rsquo;s used. Read our{" "}
              <Link
                href="/policies/privacy-policy"
                className="text-paper underline underline-offset-4 transition-colors hover:text-accent"
              >
                Privacy Policy
              </Link>{" "}
              for details.
            </p>
            <div className="flex shrink-0 flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setManaging(true)}
                className="tracked-label text-xs text-paper-dim underline underline-offset-4 transition-colors hover:text-paper"
              >
                Manage
              </button>
              <button
                type="button"
                onClick={() => save({ analytics: false })}
                className="tracked-label flex h-[44px] items-center justify-center rounded-full border border-line px-6 text-xs text-paper-dim transition-colors hover:border-paper-dim hover:text-paper"
              >
                Reject
              </button>
              <button
                type="button"
                onClick={() => save({ analytics: true })}
                className="tracked-label flex h-[44px] items-center justify-center rounded-full bg-paper px-6 text-xs text-ink transition-colors hover:bg-accent hover:text-accent-ink"
              >
                Accept
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
