"use client";

import "@videojs/themes/dist/city/index.css";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

interface LazyVideoProps {
  src: string;
  title?: string;
  poster?: string;
  className?: string;
}

export default function LazyVideo({
  src,
  title,
  poster,
  className = "w-full h-full",
}: LazyVideoProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<ReturnType<typeof videojs> | null>(null);

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

  useEffect(() => {
    if (!shouldLoad || !videoRef.current) return;

    // Initialize Video.js player
    const player = videojs(videoRef.current, {
      controls: true,
      fill: true,
      poster: poster,
      preload: "metadata",
      playbackRates: [0.5, 1, 1.25, 1.5, 2],
    });

    playerRef.current = player;

    // Add city theme class
    player.ready(() => {
      if (videoRef.current) {
        videoRef.current.classList.add("vjs-theme-city");
      }
    });

    // Cleanup on unmount
    return () => {
      if (playerRef.current && !playerRef.current.isDisposed()) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [shouldLoad, poster]);

  return (
    <div className="w-full">
      <div className="h-[29vw] min-w-[194px]" ref={containerRef}>
        {shouldLoad ? (
          <div data-vjs-player className="h-full">
            <video
              ref={videoRef}
              className={`video-js h-full vjs-big-play-centered ${className}`}
              playsInline
              preload="metadata"
            >
              <source src={src} type="video/mp4" />
              <p className="vjs-no-js">
                To view this video please enable JavaScript, and consider
                upgrading to a web browser that{" "}
                <a
                  href="https://videojs.com/html5-video-support/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  supports HTML5 video
                </a>
                .
              </p>
            </video>
          </div>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            {poster ? (
              <Image
                src={poster}
                alt={title || "Video thumbnail"}
                fill
                className="object-cover"
                sizes="100vw"
                priority={false}
              />
            ) : (
              <div className="text-gray-500">Loading video...</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
