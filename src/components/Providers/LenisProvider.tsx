"use client";

import Lenis from "lenis";
import { ReactNode, useEffect } from "react";

interface Props {
  children: ReactNode;
}

type LenisInstance = {
  raf: (time: number) => void;
  destroy: () => void;
  start?: () => void;
  stop?: () => void;
};

declare global {
  interface Window {
    lenis?: LenisInstance;
  }
}

export default function LenisProvider({ children }: Props) {
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
    }) as unknown as LenisInstance;

    // ✅ expose globally (no any)
    window.lenis = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      window.lenis = undefined;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
