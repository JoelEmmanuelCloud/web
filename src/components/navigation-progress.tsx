"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const STALL_TIMEOUT_MS = 15000;

function routeKey(pathname: string, search: string) {
  return search ? `${pathname}?${search}` : pathname;
}

function navigationTarget(event: MouseEvent): URL | null {
  if (
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return null;
  }
  const anchor =
    event.target instanceof Element ? event.target.closest("a") : null;
  if (!anchor || !anchor.href || anchor.hasAttribute("download")) return null;
  if (anchor.target && anchor.target !== "_self") return null;
  const url = new URL(anchor.href, window.location.href);
  if (url.origin !== window.location.origin) return null;
  if (
    url.pathname === window.location.pathname &&
    url.search === window.location.search
  ) {
    return null;
  }
  return url;
}

export function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = routeKey(pathname, searchParams.toString());
  const currentRef = useRef(current);
  const [pendingFrom, setPendingFrom] = useState<string | null>(null);
  const [settledOn, setSettledOn] = useState(current);
  if (settledOn !== current) {
    setSettledOn(current);
    setPendingFrom(null);
  }
  const loading = pendingFrom !== null && pendingFrom === current;

  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  useEffect(() => {
    let stallTimer: ReturnType<typeof setTimeout> | undefined;
    function onClick(event: MouseEvent) {
      if (!navigationTarget(event)) return;
      setPendingFrom(currentRef.current);
      clearTimeout(stallTimer);
      stallTimer = setTimeout(() => setPendingFrom(null), STALL_TIMEOUT_MS);
    }
    window.addEventListener("click", onClick, { capture: true });
    return () => {
      window.removeEventListener("click", onClick, { capture: true });
      clearTimeout(stallTimer);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px]"
    >
      <div
        className={`nav-progress h-full bg-accent shadow-[0_0_8px_var(--color-accent)] ${
          loading ? "is-loading" : ""
        }`}
      />
    </div>
  );
}
