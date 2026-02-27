"use client";

import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";

import Image from "next/image";
import { useState } from "react";

type PropertyGalleryProps = {
  images: string[];
  title: string;
};

export default function PropertyGallery({
  images,
  title,
}: PropertyGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  if (!images?.length) return null;

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-sm">
        <Image
          src={images[activeIdx]}
          fill
          className="object-cover transition-opacity duration-300"
          alt={title}
          priority
          sizes="(max-width: 1200px) 100vw, 1200px"
        />
      </div>

      {/* Thumbnails Row */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
        {images.slice(0, 3).map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveIdx(idx)}
            className={cn(
              "relative aspect-[4/3] w-32 md:w-40 shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-300",
              activeIdx === idx
                ? "border-terracotta-500 opacity-100 shadow-sm"
                : "border-transparent opacity-70 hover:opacity-100"
            )}
          >
            <Image
              src={img}
              fill
              className="object-cover"
              alt={`${title} - Thumbnail ${idx + 1}`}
              sizes="160px"
            />
          </button>
        ))}

        {images.length > 3 && (
          <button
            type="button"
            className="relative flex aspect-[4/3] w-32 md:w-40 shrink-0 flex-col items-center justify-center rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 shadow-sm"
          >
            <ImageIcon className="mb-2 h-6 w-6" />
            <span className="text-sm font-medium">+{images.length - 3}</span>
          </button>
        )}
      </div>
    </div>
  );
}
