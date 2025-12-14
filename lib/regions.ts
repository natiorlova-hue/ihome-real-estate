import type { LatLngLiteral } from "@/lib/geo";

export type RegionKey =
  | "marbella"
  | "estepona"
  | "sotogrande"
  | "mijas"
  | "benahavis";

export const regionsConfig: Array<{
  key: RegionKey;
  center: LatLngLiteral;
}> = [
  // TODO: replace centers with your coordinates (Variant B)
  { key: "marbella", center: { lat: 36.5101, lng: -4.8825 } },
  { key: "estepona", center: { lat: 36.4277, lng: -5.1459 } },
  { key: "sotogrande", center: { lat: 36.2869, lng: -5.2795 } },
  { key: "mijas", center: { lat: 36.5954, lng: -4.6373 } },
  { key: "benahavis", center: { lat: 36.523, lng: -5.0463 } },
];
