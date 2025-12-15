declare global {
  interface Window {
    __ihomeGoogleMapsPromise?: Promise<typeof google>;
  }
}

export function loadGoogleMaps(): Promise<typeof google> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Google Maps only loads in the browser"));
  }

  if (window.google?.maps) {
    return Promise.resolve(window.google);
  }

  if (window.__ihomeGoogleMapsPromise) {
    return window.__ihomeGoogleMapsPromise;
  }

  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!key) {
    throw new Error("Missing NEXT_PUBLIC_GOOGLE_MAPS_API_KEY");
  }

  window.__ihomeGoogleMapsPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-ihome="google-maps"]');
    if (existing) {
      existing.addEventListener("load", () => resolve(window.google));
      existing.addEventListener("error", () =>
        reject(new Error("Google Maps failed"))
      );
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}`;
    script.async = true;
    script.defer = true;
    script.dataset.ihome = "google-maps";
    script.onload = () => resolve(window.google);
    script.onerror = () => reject(new Error("Google Maps failed to load"));
    document.head.appendChild(script);
  });

  return window.__ihomeGoogleMapsPromise;
}
