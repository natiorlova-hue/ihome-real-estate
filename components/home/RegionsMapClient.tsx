"use client";

import { loadGoogleMaps } from "@/lib/google-maps-loader";
import type { LatLngLiteral } from "@/lib/types/geo";
import { cn } from "@/lib/utils";
import * as React from "react";

export type RegionMapItem = {
  key: string;
  label: string;
  center: LatLngLiteral;
};

type Props = {
  items: RegionMapItem[];
  a11y: {
    tabsLabel: string;
    mapLabel: string;
  };
};

export default function RegionsMapClient({ items, a11y }: Props) {
  const [activeKey, setActiveKey] = React.useState(items[0]?.key ?? "");
  const mapRef = React.useRef<HTMLDivElement | null>(null);
  const mapInstance = React.useRef<google.maps.Map | null>(null);
  const markers = React.useRef<Map<string, google.maps.Marker>>(new Map());

  const active = React.useMemo(
    () => items.find(i => i.key === activeKey) ?? items[0],
    [items, activeKey]
  );

  React.useEffect(() => {
    let cancelled = false;

    async function init() {
      const google = await loadGoogleMaps();
      if (cancelled) return;
      if (!mapRef.current) return;

      if (!mapInstance.current) {
        mapInstance.current = new google.maps.Map(mapRef.current, {
          center: active.center,
          zoom: 11,
          disableDefaultUI: true,
        });

        items.forEach(item => {
          const marker = new google.maps.Marker({
            position: item.center,
            map: mapInstance.current!,
            title: item.label,
          });
          markers.current.set(item.key, marker);
        });
      } else {
        mapInstance.current.setCenter(active.center);
      }
    }

    void init();

    return () => {
      cancelled = true;
    };
  }, [active.center, items]);

  React.useEffect(() => {
    if (!mapInstance.current) return;
    mapInstance.current.panTo(active.center);
  }, [active.center]);

  // Ref for tab elements
  const tabRefs = React.useRef<Array<HTMLButtonElement | null>>([]);

  // Keyboard nav (ArrowLeft / ArrowRight)
  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight" && index < items.length - 1) {
      tabRefs.current[index + 1]?.focus();
      setActiveKey(items[index + 1].key);
      e.preventDefault();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      tabRefs.current[index - 1]?.focus();
      setActiveKey(items[index - 1].key);
      e.preventDefault();
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div
        role="tablist"
        aria-label={a11y.tabsLabel}
        className="flex flex-wrap gap-2 justify-center max-w-tabs mx-auto"
      >
        {items.map((item, index) => {
          const selected = item.key === activeKey;
          return (
            <button
              ref={el => {
                tabRefs.current[index] = el;
              }}
              key={item.key}
              role="tab"
              aria-selected={selected}
              aria-controls={`map-panel-${item.key}`}
              id={`tab-${item.key}`}
              tabIndex={selected ? 0 : -1}
              className={cn(
                "px-4 py-2 rounded-full text-sm border transition-colors",
                selected
                  ? "bg-brandBlue-600 text-white border-brandBlue-700"
                  : "bg-gray-50 text-tertiary-900 border-gray-200 hover:bg-gray-50"
              )}
              onClick={() => setActiveKey(item.key)}
              onKeyDown={e => onKeyDown(e, index)}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div
        id={`map-panel-${active.key}`}
        role="region"
        aria-labelledby={`tab-${active.key}`}
        className="overflow-hidden rounded-2xl border border-tertiary-200 bg-tertiary-50"
      >
        <div
          ref={mapRef}
          aria-label={a11y.mapLabel}
          aria-live="polite"
          aria-busy="false"
          className="h-[340px] w-full md:h-[460px]"
        />
      </div>
    </div>
  );
}
