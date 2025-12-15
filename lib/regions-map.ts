import type { LatLngLiteral } from "@/lib/geo";

export type RegionKey =
  | "sotogrande"
  | "malaga"
  | "manilva"
  | "casaresCosta"
  | "estepona"
  | "benahavis"
  | "sanPedro"
  | "marbella"
  | "eastMarbella"
  | "mijas"
  | "fuengirola"
  | "benalmadena"
  | "torremolinos";

export const regionsConfig: {
  key: RegionKey;
  center: LatLngLiteral;
}[] = [
  { key: "sotogrande", center: { lat: 36.27833, lng: -5.29 } },
  { key: "malaga", center: { lat: 36.719444, lng: -4.42 } },
  { key: "manilva", center: { lat: 36.3764, lng: -5.2503 } },
  { key: "casaresCosta", center: { lat: 36.4224, lng: -5.2544 } },
  { key: "estepona", center: { lat: 36.4276, lng: -5.14589 } },
  { key: "benahavis", center: { lat: 36.518, lng: -5.031 } },
  { key: "sanPedro", center: { lat: 36.4867, lng: -4.992 } },
  { key: "marbella", center: { lat: 36.5167, lng: -4.8833 } },
  { key: "eastMarbella", center: { lat: 36.5, lng: -4.805 } },
  { key: "mijas", center: { lat: 36.597, lng: -4.629 } },
  { key: "fuengirola", center: { lat: 36.53998, lng: -4.62473 } },
  { key: "benalmadena", center: { lat: 36.595, lng: -4.579 } },
  { key: "torremolinos", center: { lat: 36.621, lng: -4.492 } },
];
