// components/properties/PropertyGallery.tsx
"use client";

import { cn } from "@/lib/utils";
import { ArrowRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type PropertyGalleryProps = {
  images: string[];
  title: string;
  location?: string;
  yearBuilt?: number | string;
};

export default function PropertyGallery({
  images,
  title,
  location,
  yearBuilt,
}: PropertyGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [thumbStartIndex, setThumbStartIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  const visibleCount = 3;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Блокування скролу сторінки, коли галерея відкрита
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsExpanded(false);
    };
    if (isExpanded) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isExpanded]);

  if (!images?.length) return null;

  // Логіка безкінечного прокручування вправо (тільки одна стрілка)
  const handleNextThumb = () => {
    setThumbStartIndex(prev => (prev + 1) % images.length);
  };

  const getVisibleThumbs = () => {
    const thumbs = [];
    const count = Math.min(visibleCount, images.length);
    for (let i = 0; i < count; i++) {
      thumbs.push((thumbStartIndex + i) % images.length);
    }
    return thumbs;
  };

  const openGallery = (idx: number) => {
    setActiveIdx(idx);
    setIsExpanded(true);
  };

  return (
    <>
      {/* --- INLINE VIEW (1st Mockup) --- */}
      <div className="flex flex-col gap-4">
        {/* Main Image with Overlay */}
        <div
          className="relative aspect-[16/9] w-full cursor-pointer overflow-hidden rounded-2xl bg-gray-100 shadow-sm transition-transform hover:opacity-95"
          onClick={() => openGallery(activeIdx)}
        >
          <Image
            src={images[activeIdx]}
            fill
            className="object-cover transition-opacity duration-300"
            alt={title}
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
          />

          {/* Gradient Overlay & Text */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 flex w-full flex-col justify-end p-6 text-white md:p-8">
            <h2 className="mb-2 text-2xl font-serif tracking-tight md:text-3xl lg:text-4xl">
              {title}
            </h2>
            {location && (
              <p className="mb-6 text-sm text-white/90 md:text-base">
                {location}
              </p>
            )}
            {yearBuilt && (
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold uppercase tracking-wider text-white/80">
                  Year Built:
                </span>
                <span className="text-sm font-semibold">{yearBuilt}</span>
              </div>
            )}
          </div>
        </div>

        {/* Thumbnails Row */}
        <div className="flex items-center gap-4 py-2">
          {getVisibleThumbs().map(actualIdx => (
            <button
              key={actualIdx}
              type="button"
              onClick={() => openGallery(actualIdx)}
              className={cn(
                "relative aspect-[4/3] w-32 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-300 md:w-40",
                activeIdx === actualIdx
                  ? "border-terracotta-500 opacity-100 shadow-sm"
                  : "border-transparent opacity-70 hover:opacity-100"
              )}
            >
              <Image
                src={images[actualIdx]}
                fill
                className="object-cover"
                alt={`${title} - Thumbnail ${actualIdx + 1}`}
                sizes="160px"
              />
            </button>
          ))}

          {/* Single Right Arrow Button */}
          {images.length > visibleCount && (
            <button
              type="button"
              onClick={handleNextThumb}
              aria-label="Next photos"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-400 shadow-sm transition-colors hover:border-gray-300 hover:text-gray-900"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* --- EXPANDED VIEW / MODAL (2nd Mockup) --- */}
      {mounted &&
        isExpanded &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex flex-col bg-white overflow-y-auto">
            <div className="container mx-auto px-4 py-8">
              {/* Top Bar with Boxed Close Button and Title */}
              <div className="mb-6 flex items-center gap-3">
                <button
                  onClick={() => setIsExpanded(false)}
                  className="flex h-8 w-8 items-center justify-center rounded border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900"
                >
                  <X className="h-4 w-4" />
                </button>
                <h2 className="text-xl font-sans font-medium text-gray-900 md:text-2xl">
                  {title}
                </h2>
              </div>

              {/* Main Content Layout */}
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Big Image (Left) */}
                <div className="relative flex-1 aspect-[16/9] overflow-hidden rounded-xl bg-gray-100">
                  <Image
                    src={images[activeIdx]}
                    fill
                    className="object-cover"
                    alt={title}
                    sizes="100vw"
                    priority
                  />
                </div>

                {/* Vertical Thumbnails (Right) */}
                <div className="flex flex-row overflow-x-auto lg:w-32 lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden gap-4 no-scrollbar pb-2 lg:pb-0 lg:max-h-[calc(100vh-160px)]">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIdx(idx)}
                      className={cn(
                        "relative aspect-[4/3] w-32 shrink-0 overflow-hidden rounded-xl border-2 transition-all",
                        activeIdx === idx
                          ? "border-terracotta-500 opacity-100"
                          : "border-transparent opacity-60 hover:opacity-100"
                      )}
                    >
                      <Image
                        src={img}
                        fill
                        className="object-cover"
                        alt={`Thumbnail ${idx + 1}`}
                        sizes="128px"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
