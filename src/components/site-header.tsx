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

const heroVideoByRoute: Record<string, string> = {
  "/philosophy": "/video/indulgence-melt.mp4",
  "/about": "/video/tempering-craft.mp4",
  "/gallery": "/video/gallery-reveal.mp4",
  "/shop": "/video/flavour-reveal.mp4",
  "/contact": "/video/our-craft.mp4",
  "/bespoke-box": "/video/bespoke-ribbon.mp4",
};

const preloadedVideos = new Set<string>();

function preloadHeroVideo(href: string) {
  const src = heroVideoByRoute[href];
  if (!src || preloadedVideos.has(src)) return;
  preloadedVideos.add(src);
  const video = document.createElement("video");
  video.preload = "auto";
  video.muted = true;
  video.src = src;
}

export function SiteHeader({ cartCount = 0 }: { cartCount?: number }) {
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

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

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
          aria-label={open ? "Close menu" : "Open menu"}
          className="tracked-label flex items-center gap-3 text-xs text-paper md:hidden"
        >
          <MenuIcon open={open} />
          {open ? "Close" : "Menu"}
        </button>

        <Link href="/" className="shrink-0">
          <Image
            src="/images/brand/pwg-logo-GRY.png"
            alt="Paul Wayne Gregory"
            width={220}
            height={122}
            className="h-20 w-auto invert"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {primaryNav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={() => preloadHeroVideo(item.href)}
                onFocus={() => preloadHeroVideo(item.href)}
                onTouchStart={() => preloadHeroVideo(item.href)}
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
          href="/cart"
          aria-label="Cart"
          className="tracked-label flex items-center gap-2 text-xs text-paper-dim transition-colors hover:text-paper"
        >
          <CartIcon count={cartCount} />
          <span className="hidden md:inline">Cart</span>
        </Link>
      </div>

      {open && (
        <div className="fixed inset-x-0 bottom-0 top-24 z-40 overflow-y-auto border-t border-line bg-ink md:hidden">
          <nav className="flex flex-col gap-1 px-6 py-6">
            {primaryNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  onTouchStart={() => preloadHeroVideo(item.href)}
                  aria-current={active ? "page" : undefined}
                  className={`tracked-label py-3 text-xs transition-colors ${
                    active ? "text-paper" : "text-paper-dim hover:text-paper"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="tracked-label flex items-center gap-3 border-t border-line px-6 py-6 text-xs text-paper-dim transition-colors hover:text-paper"
          >
            <MenuIcon open={true} />
            Close
          </button>
        </div>
      )}
    </header>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-4 w-6 flex-col items-center justify-center">
      <span
        className={`absolute h-px w-6 bg-paper transition-transform duration-200 ${
          open ? "rotate-45" : "-translate-y-1.5"
        }`}
      />
      <span
        className={`absolute h-px w-6 bg-paper transition-opacity duration-200 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute h-px w-6 bg-paper transition-transform duration-200 ${
          open ? "-rotate-45" : "translate-y-1.5"
        }`}
      />
    </span>
  );
}

function CartIcon({ count }: { count: number }) {
  return (
    <span className="relative inline-flex">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
        <path
          d="M2 2H4L6.3 12.7C6.45 13.4 7.05 13.9 7.75 13.9H15.1C15.79 13.9 16.38 13.42 16.53 12.75L18 6H5.2"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="8" cy="17" r="1.15" fill="currentColor" />
        <circle cx="15.5" cy="17" r="1.15" fill="currentColor" />
      </svg>
      {count > 0 && (
        <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] text-accent-ink">
          {count}
        </span>
      )}
    </span>
  );
}
