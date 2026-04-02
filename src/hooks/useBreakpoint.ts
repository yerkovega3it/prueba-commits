import { useEffect, useState } from "react";

const BREAKPOINTS = { sm: 480, md: 768, lg: 1024, xl: 1300 } as const;

export function useBreakpoint() {
  const [width, setWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    const handle = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  return {
    isSm: width >= BREAKPOINTS.sm,
    isMd: width >= BREAKPOINTS.md,
    isLg: width >= BREAKPOINTS.lg,
    isXl: width >= BREAKPOINTS.xl,
    width,
  };
}
