"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { primaryNav } from "@/lib/site-config";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="nav-scrim absolute inset-0" aria-hidden />
      <div
        aria-hidden
        className={`absolute inset-0 border-b border-line bg-ink/95 backdrop-blur-sm transition-opacity duration-300 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="relative mx-auto flex h-24 max-w-7xl items-center justify-between px-6 sm:px-10">
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
          {primaryNav.slice(1).map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`tracked-label relative pb-1 text-xs transition-colors ${
                  active
                    ? "text-paper"
                    : "text-paper-dim hover:text-paper"
                }`}
              >
                {item.label}
                <span
                  aria-hidden
                  className={`absolute inset-x-0 -bottom-0.5 h-px bg-accent transition-transform duration-300 ${
                    active ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <Link
          href="/shop"
          className="tracked-label hidden items-center gap-2 text-xs text-paper-dim transition-colors hover:text-paper md:flex"
        >
          <CartIcon />
          Cart
        </Link>
      </div>

      {open && (
        <nav className="relative flex flex-col gap-1 border-t border-line bg-ink px-6 py-6 md:hidden">
          {primaryNav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`tracked-label py-3 text-xs transition-colors ${
                  active ? "text-paper" : "text-paper-dim hover:text-paper"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/shop"
            onClick={() => setOpen(false)}
            className="tracked-label flex items-center gap-2 border-t border-line py-3 pt-4 text-xs text-paper-dim transition-colors hover:text-paper"
          >
            <CartIcon />
            Cart
          </Link>
        </nav>
      )}
    </header>
  );
}

function CartIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M4.5 5.5H11.5L11.1 13.2C11.07 13.78 10.59 14.25 10 14.25H6C5.41 14.25 4.93 13.78 4.9 13.2L4.5 5.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M6 5.5V4.25C6 3.14 6.9 2.25 8 2.25C9.1 2.25 10 3.14 10 4.25V5.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
