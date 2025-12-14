"use client";

import type { LatLngLiteral } from "@/lib/geo";
import { loadGoogleMaps } from "@/lib/google-maps-loader";
import { type Locale } from "@/lib/locale-path";
import { cn } from "@/lib/utils";
import * as React from "react";

export type RegionMapItem = {
  key: string;
  label: string;
  center: LatLngLiteral;
};

type Props = {
  locale: Locale;
  items: RegionMapItem[];
  a11y: {
    tabsLabel: string;
    mapLabel: string;
  };
};

export default function RegionsMapClient({ items, a11y }: Props) {
  const [activeKey, setActiveKey] = React.useState(items[0]?.key ?? "");
  const mapRef = React.useRef<HTMLDivElement | null>(null);

  const mapInstanceRef = React.useRef<google.maps.Map | null>(null);
  const markersRef = React.useRef<Map<string, google.maps.Marker>>(new Map());

  const active = React.useMemo(
    () => items.find(i => i.key === activeKey) ?? items[0],
    [items, activeKey]
  );

  React.useEffect(() => {
    let cancelled = false;

    async function init() {
      const googleMaps = await loadGoogleMaps();
      if (cancelled) return;

      if (!mapRef.current) return;

      if (!mapInstanceRef.current) {
        mapInstanceRef.current = new googleMaps.maps.Map(mapRef.current, {
          center: active.center,
          zoom: 10,
          mapTypeControl: true,
          streetViewControl: false,
          fullscreenControl: false,
        });

        // markers once
        items.forEach(item => {
          const marker = new googleMaps.maps.Marker({
            position: item.center,
            map: mapInstanceRef.current!,
            title: item.label,
          });
          markersRef.current.set(item.key, marker);
        });
      } else {
        mapInstanceRef.current.setCenter(active.center);
      }
    }

    void init();

    return () => {
      cancelled = true;
    };
  }, [items, active.center, active.label]);

  React.useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.panTo(active.center);
  }, [active.center]);

  return (
    <div className="flex flex-col gap-6">
      {/* Tabs */}
      <div
        role="tablist"
        aria-label={a11y.tabsLabel}
        className="flex flex-wrap items-center justify-center gap-2"
      >
        {items.map(item => {
          const isActive = item.key === activeKey;

          return (
            <button
              key={item.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition",
                "border-gray-200 bg-white text-gray-800 hover:bg-gray-50",
                isActive &&
                  "border-transparent bg-brandBlue-500 text-white hover:bg-brandBlue-500"
              )}
              onClick={() => setActiveKey(item.key)}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Map */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
        <div
          ref={mapRef}
          aria-label={a11y.mapLabel}
          className="h-[320px] w-full md:h-[420px]"
        />
      </div>
    </div>
  );
}
