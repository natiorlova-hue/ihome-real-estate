// lib/lifestyle.ts

export type LifestyleKey =
  | "families"
  | "nomads"
  | "golf"
  | "golden"
  | "secondHome"
  | "investment";

export type LifestyleStatus = "active" | "comingSoon";

export type LifestyleIconKey = LifestyleKey;

export interface LifestyleItem {
  key: LifestyleKey;
  path: string;
  iconKey: LifestyleIconKey;
  image: string;
  status: LifestyleStatus;
}

export const lifestyleItems: LifestyleItem[] = [
  {
    key: "families",
    path: "live-your-way/families",
    iconKey: "families",
    image: "/image-lifestyle/families.png",
    status: "active",
  },
  {
    key: "nomads",
    path: "live-your-way/nomads",
    iconKey: "nomads",
    image: "/image-lifestyle/nomads.png",
    status: "active",
  },
  {
    key: "golf",
    path: "live-your-way/golf-slow-life",
    iconKey: "golf",
    image: "/image-lifestyle/golf-slow-life.png",
    status: "active",
  },
  {
    key: "golden",
    path: "live-your-way/golden-years",
    iconKey: "golden",
    image: "/image-lifestyle/golden.png",
    status: "active",
  },
  {
    key: "secondHome",
    path: "live-your-way/second-home",
    iconKey: "secondHome",
    image: "/image-lifestyle/second-home.png",
    status: "active",
  },
  {
    key: "investment",
    path: "live-your-way/investment",
    iconKey: "investment",
    image: "/image-lifestyle/investment.png",
    status: "comingSoon",
  },
];
