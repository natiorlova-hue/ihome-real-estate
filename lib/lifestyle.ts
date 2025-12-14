// lib/lifestyle.ts

export type LifestyleKey =
  | "families"
  | "nomads"
  | "golf"
  | "golden"
  | "sea"
  | "investment";

export type LifestyleIconKey = LifestyleKey;

export interface LifestyleItem {
  key: LifestyleKey;
  path: string;
  iconKey: LifestyleIconKey;
  image: string;
}

export const lifestyleItems: LifestyleItem[] = [
  {
    key: "families",
    path: "live-your-way/families",
    iconKey: "families",
    image: "/image-lifestyle/families.png",
  },
  {
    key: "nomads",
    path: "live-your-way/nomads",
    iconKey: "nomads",
    image: "/image-lifestyle/nomads.png",
  },
  {
    key: "golf",
    path: "live-your-way/golf-slow-life",
    iconKey: "golf",
    image: "/image-lifestyle/golf-slow-life.png",
  },
  {
    key: "golden",
    path: "live-your-way/golden-years",
    iconKey: "golden",
    image: "/image-lifestyle/golden.png",
  },
  {
    key: "sea",
    path: "live-your-way/second-home",
    iconKey: "sea",
    image: "/image-lifestyle/second-home.png",
  },
  {
    key: "investment",
    path: "live-your-way/investment",
    iconKey: "investment",
    image: "/image-lifestyle/investment.png",
  },
];
