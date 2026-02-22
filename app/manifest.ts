import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "iHome Real Estate",
    short_name: "iHome",
    description: "Premium Mediterranean Lifestyle",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#EF651A", // Наш terracotta-500
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
