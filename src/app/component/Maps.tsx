"use client";
import { useEffect, useRef } from "react";

interface MarkerData {
  position: google.maps.LatLngLiteral;
  title?: string;
  infoContent?: string;
}

interface MapProps {
  center?: google.maps.LatLngLiteral;
  zoom?: number;
  markers?: MarkerData[];
}

export default function Map({
  center = { lat: 30.00944, lng: 31.20861 },
  zoom = 10,
  markers = [
    {
      position: { lat: 30.047503, lng: 31.233702 },
      title: "Tahrir Square",
      infoContent:
        '<h3 style="color: black;font-weight:bold">Tahrir Square</h3><p style="color: black;">123 Tahrir square building 18.</p>',
    },
    {
      position: { lat: 30.005493, lng: 31.477898 },
      title: "New Cairo",
      infoContent:
        '<h3 style="color: black;font-weight:bold">New Cairo</h3><p style="color: black;">New Cairo, Next to Plus Mall.</p>',
    },
    {
      position: { lat: 29.952654, lng: 30.921919 },
      title: "6 October",
      infoContent:
        '<h3 style="color: black;font-weight:bold">6 October</h3><p style="color: black;">186 the Sixth of October in front of El Maamon center.</p>',
    },
  ],
}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof google !== "undefined" && google.maps && google.maps.Marker) {
      if (mapRef.current) {
        const map = new google.maps.Map(mapRef.current, {
          center,
          zoom,
        });

        markers.forEach((markerData) => {
          const marker = new google.maps.Marker({
            position: markerData.position,
            map,
            title: markerData.title,
          });

          const infoWindow = new google.maps.InfoWindow({
            content:
              markerData.infoContent ||
              `<h3 style="color:#000">${markerData.title || "Marker"}</h3>`,
          });

          marker.addListener("mouseover", () => {
            infoWindow.open(map, marker);
          });

          marker.addListener("mouseout", () => {
            infoWindow.close();
          });
        });
      }
    } else {
      console.error("Google Maps API not loaded or Marker library missing.");
    }
  }, [center, zoom, markers]);

  return (
    <>
      <div
        ref={mapRef}
        className="map-container"
      />
    </>
  );
}
