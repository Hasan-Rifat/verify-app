/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState, useEffect, useRef } from "react";
import bg from "@/assets/bg.png";

interface Feature {
  title: string;
  description: string;
  isHighlighted?: boolean;
}

interface Content {
  tag: string;
  title: string;
  subtitle: string;
  features: Feature[];
}

export default function Home() {
  const content: Content = {
    tag: "Solution",
    title: "Verify - a simple invitation to check before you Trust",
    subtitle:
      "With Verify, users instantly verify content authenticity before trusting it",
    features: [
      {
        title: "Easy to Integrate",
        description: "A small code snippet on your site",
        isHighlighted: true,
      },
      {
        title: "Instant Validation",
        description: "Users click a button or scan QR Code",
      },
      {
        title: "Multilayer Security",
        description: "Copy-negating QR to prevent spoofing",
      },
    ],
  };

  const [activeFeature, setActiveFeature] = useState<number>(0);
  const featuresContainerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const scrollEndTimer = useRef<NodeJS.Timeout | null>(null);

  // Handle wheel events for tab switching
  useEffect(() => {
    const container = featuresContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isScrolling.current) return;
      isScrolling.current = true;

      if (e.deltaY > 0) {
        // Scroll down - next feature
        setActiveFeature((prev) =>
          Math.min(prev + 1, content.features.length - 1)
        );
      } else {
        // Scroll up - previous feature
        setActiveFeature((prev) => Math.max(prev - 1, 0));
      }

      setTimeout(() => {
        isScrolling.current = false;
      }, 500);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [content.features.length]);

  return (
    <main>
      <section className="md:p-12 h-screen flex items-center relative">
        {/* Background image with lower z-index */}
        <div
          className="w-full h-full absolute left-0 top-0"
          style={{
            backgroundImage: `url('${bg.src}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: 1, // Lower z-index
          }}
        ></div>

        {/* Content container with higher z-index */}
        <div className="max-w-[1072px] mx-auto relative z-10">
          {" "}
          {/* Added z-10 here */}
          {/* Tag */}
          <div className="inline-block px-4 py-1 mb-12 bg-white/10 border border-white/40 rounded-xl text-white font-bold">
            {content.tag}
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left side - Text content */}
            <div className="md:w-1/2">
              <h1 className="text-3xl md:text-4xl font-semibold text-[#FFFCFF] mb-14">
                {content.title}
              </h1>
              <p className="text-white/70 text-lg">
                {content.features[activeFeature].description}
              </p>
            </div>

            {/* Right side - Features (no scroll) */}
            <div className="md:w-1/2 space-y-6" ref={featuresContainerRef}>
              {content.features.map((feature, index) => (
                <div
                  key={index}
                  className={`relative pl-10 transition-all duration-300 flex flex-col justify-center cursor-pointer ${
                    index === activeFeature
                      ? " border-[#EDEDED]/30 bg-[#CBA9FF]/30 p-6 rounded-xl"
                      : "opacity-70 hover:opacity-90"
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  {index === activeFeature && (
                    <div className="absolute left-1 top-1/2 transform -translate-y-1/2 w-1 h-[54px] bg-white" />
                  )}
                  <h2 className="text-[28px] font-bold text-white">
                    {feature.title}
                  </h2>
                  <p className="mt-2 text-white/70">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
