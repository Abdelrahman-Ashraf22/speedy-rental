"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useSearch } from "../context/SearchContext";

// GSAP Types (keep same as before)
interface GSAPInstance {
  set: (target: unknown, vars: Record<string, unknown>) => void;
  timeline: (vars?: Record<string, unknown>) => GSAPTimeline;
  registerPlugin: (plugin: unknown) => void;
  utils: {
    toArray: (selector: string) => unknown[];
    wrap: (min: number, max: number) => (value: number) => number;
  };
}

interface GSAPTimeline {
  set: (
    target: unknown,
    vars: Record<string, unknown>,
    position?: number
  ) => GSAPTimeline;
  to: (
    target: unknown,
    vars: Record<string, unknown>,
    position?: number
  ) => GSAPTimeline;
  fromTo: (
    target: unknown,
    fromVars: Record<string, unknown>,
    toVars: Record<string, unknown>,
    position?: number
  ) => GSAPTimeline;
  timeScale: (value: number) => GSAPTimeline;
}

interface ObserverInstance {
  create: (config: {
    type: string;
    preventDefault: boolean;
    wheelSpeed: number;
    onUp: () => void;
    onDown: () => void;
    tolerance: number;
  }) => { kill: () => void };
}

interface WindowWithGSAP extends Window {
  gsap?: GSAPInstance;
  Observer?: ObserverInstance;
}

export const slides = [
  {
    brand: "BMW",
    image: "/images/bmw.webp",
    bgColor: "#31672f",
    overlayImage: "/images/bmw2.webp",
  },
  {
    brand: "AUDI",
    image: "/images/audi2.webp",
    bgColor: "#232323",
    overlayImage: "/images/audi.webp",
  },
  {
    brand: "MERCEDES",
    image: "/images/benz1.webp",
    bgColor: "#2d2d2d",
    overlayImage: "/images/benz2.webp",
  },
  {
    brand: "TESLA",
    image: "/images/jetour2.webp",
    bgColor: "#959595",
    overlayImage: "/images/jetour.webp",
  },
  {
    brand: "FERRARI",
    image: "/images/ferrari.webp",
    bgColor: "#6a2727",
    overlayImage: "/images/ferrari2.webp",
  },
  {
    brand: "DODGE",
    image: "/images/dodge.webp",
    bgColor: "#2f2a6b",
    overlayImage: "/images/dodge2.webp",
  },
  {
    brand: "CHEVROLET",
    image: "/images/chevo.webp",
    bgColor: "#303030",
    overlayImage: "/images/chevo2.webp",
  },
  {
    brand: "VOLKSWAGEN",
    image: "/images/volks.webp",
    bgColor: "#6a2727",
    overlayImage: "/images/volks2.webp",
  },
];

const GSAPSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gsapLoaded, setGsapLoaded] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const animatingRef = useRef(false);
  const gsapRef = useRef<GSAPInstance | null>(null);
  const observerRef = useRef<ObserverInstance | null>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const slideImagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const outerWrappersRef = useRef<(HTMLDivElement | null)[]>([]);
  const innerWrappersRef = useRef<(HTMLDivElement | null)[]>([]);
  const headingsRef = useRef<(HTMLHeadingElement | null)[]>([]);
  const countRef = useRef<HTMLSpanElement>(null);

  // Get setCurrentBgColor from context
  const { setOnSearch, setCurrentBgColor } = useSearch();

  const wrap = (index: number) => {
    return ((index % slides.length) + slides.length) % slides.length;
  };

  // Reset to initial state
  const resetToInitialState = useCallback(() => {
    if (!gsapRef.current) return;

    const gsap = gsapRef.current;
    animatingRef.current = false;

    // Set initial state for all elements immediately
    gsap.set(outerWrappersRef.current, { xPercent: 100 });
    gsap.set(innerWrappersRef.current, { xPercent: -100 });
    gsap.set(outerWrappersRef.current[0], { xPercent: 0 });
    gsap.set(innerWrappersRef.current[0], { xPercent: 0 });

    gsap.set(sectionsRef.current, { zIndex: 0, autoAlpha: 0 });
    gsap.set(sectionsRef.current[0], { zIndex: 2, autoAlpha: 1 });

    // Initialize ALL overlay images as hidden first
    gsap.set(imagesRef.current, { zIndex: 0, autoAlpha: 0 });
    // Then show only the first one
    gsap.set(imagesRef.current[0], { zIndex: 2, autoAlpha: 1 });

    gsap.set(slideImagesRef.current, { scale: 1 });
    gsap.set(headingsRef.current, { "--width": 200, xPercent: 0 });

    if (countRef.current) {
      countRef.current.textContent = "1";
    }

    setCurrentIndex(0);
    setIsInitialized(true);
  }, []);

  const gotoSection = useCallback(
    (index: number, direction: number) => {
      if (animatingRef.current || !gsapRef.current) return;

      animatingRef.current = true;
      index = wrap(index);

      const gsap = gsapRef.current;
      const tl = gsap.timeline({
        defaults: { duration: 1, ease: "expo.inOut" },
        onComplete: () => {
          animatingRef.current = false;
        },
      });

      const heading = headingsRef.current[currentIndex];
      const nextHeading = headingsRef.current[index];

      gsap.set([sectionsRef.current, imagesRef.current], {
        zIndex: 0,
        autoAlpha: 0,
      });
      gsap.set([sectionsRef.current[currentIndex], imagesRef.current[index]], {
        zIndex: 1,
        autoAlpha: 1,
      });
      gsap.set([sectionsRef.current[index], imagesRef.current[currentIndex]], {
        zIndex: 2,
        autoAlpha: 1,
      });

      tl.set(countRef.current, { textContent: String(index + 1) }, 0.32)
        .fromTo(
          outerWrappersRef.current[index],
          { xPercent: 100 * direction },
          { xPercent: 0 },
          0
        )
        .fromTo(
          innerWrappersRef.current[index],
          { xPercent: -100 * direction },
          { xPercent: 0 },
          0
        )
        .to(heading, { "--width": 800, xPercent: 30 * direction }, 0)
        .fromTo(
          nextHeading,
          { "--width": 800, xPercent: -30 * direction },
          { "--width": 200, xPercent: 0 },
          0
        )
        .fromTo(
          imagesRef.current[index],
          { xPercent: 125 * direction, scaleX: 1.5, scaleY: 1.3 },
          { xPercent: 0, scaleX: 1, scaleY: 1, duration: 1 },
          0
        )
        .fromTo(
          imagesRef.current[currentIndex],
          { xPercent: 0, scaleX: 1, scaleY: 1 },
          { xPercent: -125 * direction, scaleX: 1.5, scaleY: 1.3 },
          0
        )
        .fromTo(slideImagesRef.current[index], { scale: 2 }, { scale: 1 }, 0)
        .timeScale(0.8);

      setCurrentIndex(index);
    },
    [currentIndex]
  );

  // Update background color whenever currentIndex changes
  useEffect(() => {
    if (setCurrentBgColor && slides[currentIndex]) {
      setCurrentBgColor(slides[currentIndex].bgColor);
    }
  }, [currentIndex, setCurrentBgColor]);

  // Load GSAP scripts
  useEffect(() => {
    const loadGSAP = async () => {
      if (typeof window === "undefined") return;

      const win = window as WindowWithGSAP;

      if (win.gsap && win.Observer) {
        gsapRef.current = win.gsap;
        observerRef.current = win.Observer;
        setGsapLoaded(true);
        return;
      }

      const script1 = document.createElement("script");
      script1.src =
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
      script1.async = true;

      const script2 = document.createElement("script");
      script2.src =
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/Observer.min.js";
      script2.async = true;

      script1.onload = () => {
        script2.onload = () => {
          if (win.gsap && win.Observer) {
            win.gsap.registerPlugin(win.Observer);
            gsapRef.current = win.gsap;
            observerRef.current = win.Observer;
            setGsapLoaded(true);
          }
        };
        document.head.appendChild(script2);
      };
      document.head.appendChild(script1);
    };

    loadGSAP();
  }, []);

  // Initialize GSAP when loaded
  useEffect(() => {
    if (!gsapLoaded || !gsapRef.current) return;

    const timer = setTimeout(() => {
      resetToInitialState();
    }, 50);

    return () => clearTimeout(timer);
  }, [gsapLoaded, resetToInitialState]);

  // Setup Observer for scroll/touch interactions
  useEffect(() => {
    if (!isInitialized || !observerRef.current) return;

    const Observer = observerRef.current;

    const observer = Observer.create({
      type: "wheel,touch,pointer",
      preventDefault: true,
      wheelSpeed: -1,
      onUp: () => {
        if (animatingRef.current) return;
        gotoSection(currentIndex + 1, 1);
      },
      onDown: () => {
        if (animatingRef.current) return;
        gotoSection(currentIndex - 1, -1);
      },
      tolerance: 20,
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.code === "ArrowUp" || e.code === "ArrowLeft") &&
        !animatingRef.current
      ) {
        gotoSection(currentIndex - 1, -1);
      }
      if (
        (e.code === "ArrowDown" ||
          e.code === "ArrowRight" ||
          e.code === "Space" ||
          e.code === "Enter") &&
        !animatingRef.current
      ) {
        gotoSection(currentIndex + 1, 1);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      if (observer && observer.kill) {
        observer.kill();
      }
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isInitialized, currentIndex, gotoSection]);

  // Search function
  const handleSearch = useCallback(
    (query: string): boolean => {
      if (!query || !isInitialized) return false;

      const index = slides.findIndex(
        (slide) => slide.brand?.toLowerCase() === query.toLowerCase()
      );

      if (index !== -1) {
        if (index !== currentIndex) {
          const direction = index > currentIndex ? 1 : -1;
          gotoSection(index, direction);
        }
        return true;
      }
      return false;
    },
    [currentIndex, gotoSection, isInitialized]
  );

  // Register search handler
  useEffect(() => {
    setOnSearch(handleSearch);
  }, [handleSearch, setOnSearch]);

  return (
    <>
      {!isInitialized && (
        <div
          className="loading"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: slides[0].bgColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            color: "white",
          }}
        >
          Loading...
        </div>
      )}

      {slides.map((slide, index) => (
        <section
          key={index}
          className="slide"
          ref={(el) => {
            sectionsRef.current[index] = el;
          }}
        >
          <div
            className="slide__outer"
            ref={(el) => {
              outerWrappersRef.current[index] = el;
            }}
          >
            <div
              className="slide__inner"
              ref={(el) => {
                innerWrappersRef.current[index] = el;
              }}
            >
              <div className={`slide__content slide__content--${index + 1}`}>
                <div className="slide__container">
                  <h2
                    className="slide__heading "
                    ref={(el) => {
                      headingsRef.current[index] = el;
                    }}
                  >
                    {slide.brand}
                  </h2>
                  <figure className="slide__img-cont">
                    <Image
                      className="slide__img"
                      src={slide.image}
                      alt={slide.brand}
                      width={400}
                      height={600}
                      fetchPriority="high"
                      quality={70}
                      ref={(el) => {
                        slideImagesRef.current[index] = el;
                      }}
                    />
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="overlay">
        <div className="overlay__content">
          <p className="overlay__count">
            0
            <span
              className="count"
              ref={countRef}
            >
              1
            </span>
          </p>
          <figure className="overlay__img-cont">
            {slides.map((slide, index) => (
              <Image
                key={index}
                className="image"
                src={slide.overlayImage}
                alt={`${slide.brand} overlay`}
                width={800}
                height={600}
                priority={true}
                fetchPriority="high"
                quality={70}
                ref={(el) => {
                  imagesRef.current[index] = el;
                }}
              />
            ))}
          </figure>
        </div>
      </section>
    </>
  );
};

export default GSAPSlider;
