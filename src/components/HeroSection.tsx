"use client";

import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";

export function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
    }
  };

  return (
    <section>
      <div className="relative pt-20 pb-32 sm:pt-32 sm:pb-40 lg:pt-40 lg:pb-48"> hello
        </div>
    </section>
  );
}