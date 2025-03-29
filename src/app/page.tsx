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

function App() {
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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const featuresContainerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);

  const handleFeatureChange = (index: number) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setActiveFeature(index);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 400); // Match this with the CSS transition duration
  };

  useEffect(() => {
    const container = featuresContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isScrolling.current || isTransitioning) return;
      isScrolling.current = true;

      if (e.deltaY > 0) {
        handleFeatureChange(
          Math.min(activeFeature + 1, content.features.length - 1)
        );
      } else {
        handleFeatureChange(Math.max(activeFeature - 1, 0));
      }

      setTimeout(() => {
        isScrolling.current = false;
      }, 500);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [
    activeFeature,
    content.features.length,
    handleFeatureChange,
    isTransitioning,
  ]);

  return (
    <main className="bg-gradient-to-br from-purple-900 to-black">
      <section className="md:p-12 h-screen flex items-center relative overflow-hidden">
        <div
          style={{
            backgroundImage: `url(${bg.src})`,
          }}
          className="absolute inset-0 bg-cover bg-center"
        ></div>

        <div className="max-w-[1072px] mx-auto relative z-10  px-10">
          <div className="flex items-center md:justify-start justify-center mb-3 md:mb-4">
            <span className="px-4 py-1  bg-white/10 backdrop-blur-sm border border-white/40 rounded-xl text-white font-bold transform hover:scale-105 transition-transform duration-300">
              {content.tag}
            </span>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2 transform transition-all duration-500">
              <h1 className="text-center md:text-left text-xl sm:text-3xl md:text-4xl font-semibold text-[#FFFCFF] mb-14">
                {content.title}
              </h1>
              <div className="relative h-[60px] overflow-hidden flex justify-center md:justify-start">
                <p
                  className="text-white/70 text-lg absolute transition-all duration-500 ease-in-out "
                  style={{
                    transform: `translateY(${-activeFeature * 100}%)`,
                    opacity: isTransitioning ? 0 : 1,
                  }}
                >
                  {content.features[activeFeature].description}
                </p>
              </div>
            </div>

            <div className="md:w-1/2 space-y-6" ref={featuresContainerRef}>
              {content.features.map((feature, index) => (
                <div
                  key={index}
                  className={`
                    relative pl-10 transition-all duration-500 ease-in-out 
                    flex flex-col justify-center cursor-pointer 
                    transform hover:translate-x-2
                    ${
                      index === activeFeature
                        ? "border-[#EDEDED]/30 bg-[#CBA9FF]/30 backdrop-blur-sm p-6 rounded-xl scale-105"
                        : "opacity-70 hover:opacity-90"
                    }
                  `}
                  onClick={() => handleFeatureChange(index)}
                >
                  <div
                    className={`
                      absolute left-1 top-1/2 transform -translate-y-1/2 
                      w-1 h-[54px] bg-white transition-all duration-500 
                      ${index === activeFeature ? "opacity-100" : "opacity-0"}
                    `}
                  />
                  <h2 className="text-[28px] font-bold text-white transform transition-all duration-300">
                    {feature.title}
                  </h2>
                  <p className="mt-2 text-white/70 transition-all duration-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
