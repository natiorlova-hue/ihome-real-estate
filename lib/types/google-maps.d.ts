export {};

declare global {
  namespace google {
    namespace maps {
      type MapOptions = {
        center: { lat: number; lng: number };
        zoom: number;
        disableDefaultUI?: boolean;
        mapTypeControl?: boolean;
        streetViewControl?: boolean;
        fullscreenControl?: boolean;
      };

      class Map {
        constructor(el: Element, opts: MapOptions);
        setCenter(latLng: { lat: number; lng: number }): void;
        panTo(latLng: { lat: number; lng: number }): void;
      }

      type MarkerOptions = {
        position: { lat: number; lng: number };
        map: Map;
        title?: string;
      };

      class Marker {
        constructor(opts: MarkerOptions);
      }
    }
  }

  interface Window {
    google?: typeof google;
  }
}
