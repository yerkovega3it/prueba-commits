import React, { useEffect, useRef } from "react";

type FitTextProps = {
  children: React.ReactNode;
  className?: string;
  maxFontSizePx?: number;
  minFontSizePx?: number;
};

export default function FitText({
  children,
  className,
  maxFontSizePx = 18,
  minFontSizePx = 12,
}: FitTextProps) {
  const elRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    let raf = 0;

    const fit = () => {
      if (!el) return;
      // Start from max and reduce until fits or reaches min
      let size = maxFontSizePx;
      el.style.whiteSpace = "nowrap";
      el.style.display = "inline-block";
      el.style.lineHeight = "1";
      el.style.fontSize = `${size}px`;

      // allow a few iterations; decrement by 1px until it fits
      const parentWidth = el.parentElement
        ? el.parentElement.clientWidth
        : el.clientWidth;
      // Guard: if no parent width, exit
      if (!parentWidth) return;

      // If content is already wider, shrink
      while (el.scrollWidth > parentWidth && size > minFontSizePx) {
        size -= 1;
        el.style.fontSize = `${size}px`;
      }
    };

    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(fit);
    });

    ro.observe(el);
    if (el.parentElement) ro.observe(el.parentElement);
    window.addEventListener("resize", fit);

    // initial fit
    fit();

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
      cancelAnimationFrame(raf);
    };
  }, [children, maxFontSizePx, minFontSizePx]);

  return (
    <div
      ref={elRef}
      className={className}
      // inline style will be updated by script; set sensible defaults
      style={{ fontSize: `${maxFontSizePx}px` }}
    >
      {children}
    </div>
  );
}
