"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { primaryNav } from "@/lib/site-config";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav-scrim fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 sm:px-10">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="tracked-label flex items-center gap-3 text-xs text-paper md:hidden"
        >
          <span className="flex h-4 w-6 flex-col justify-between">
            <span className="h-px w-full bg-paper" />
            <span className="h-px w-full bg-paper" />
            <span className="h-px w-full bg-paper" />
          </span>
          Menu
        </button>

        <Link href="/" className="shrink-0">
          <Image
            src="/images/brand/pwg-logo-GRY.png"
            alt="Paul Wayne Gregory"
            width={220}
            height={122}
            className="h-14 w-auto invert"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {primaryNav.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="tracked-label text-xs text-paper-dim transition-colors hover:text-paper"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/shop"
          className="tracked-label hidden text-xs text-paper-dim transition-colors hover:text-paper md:block"
        >
          Cart
        </Link>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-line bg-ink px-6 py-6 md:hidden">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="tracked-label py-3 text-xs text-paper-dim transition-colors hover:text-paper"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
