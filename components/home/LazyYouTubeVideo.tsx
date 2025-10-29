"use client";

import { useEffect, useRef, useState } from "react";

interface LazyYouTubeVideoProps {
  videoId: string;
  title: string;
}

export default function LazyYouTubeVideo({
  videoId,
  title,
}: LazyYouTubeVideoProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldLoad) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "50px", // Start loading 50px before entering viewport
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div className="w-full">
      <div className="h-[29vw] min-w-[194px]" ref={containerRef}>
        {shouldLoad ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <div className="text-gray-500">Loading video...</div>
          </div>
        )}
      </div>
    </div>
  );
}
