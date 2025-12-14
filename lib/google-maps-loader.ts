declare global {
  interface Window {
    __ihomeGoogleMapsPromise?: Promise<typeof google>;
  }
}

export function loadGoogleMaps(): Promise<typeof google> {
  if (typeof window === "undefined") {
    return Promise.reject(
      new Error("Google Maps can only load in the browser.")
    );
  }

  if (window.google?.maps) {
    return Promise.resolve(window.google);
  }

  if (window.__ihomeGoogleMapsPromise) {
    return window.__ihomeGoogleMapsPromise;
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return Promise.reject(
      new Error("Missing NEXT_PUBLIC_GOOGLE_MAPS_API_KEY env variable.")
    );
  }

  window.__ihomeGoogleMapsPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-ihome="google-maps"]'
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(window.google));
      existing.addEventListener("error", () =>
        reject(new Error("Failed to load Google Maps script."))
      );
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}`;
    script.async = true;
    script.defer = true;
    script.dataset.ihome = "google-maps";

    script.onload = () => resolve(window.google);
    script.onerror = () =>
      reject(new Error("Failed to load Google Maps script."));

    document.head.appendChild(script);
  });

  return window.__ihomeGoogleMapsPromise;
}
