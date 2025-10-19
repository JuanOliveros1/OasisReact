// src/components/MapHomeScreen.tsx
import React from "react";

import { useEffect, useMemo, useRef, useState } from "react";
import { GoogleMap, MarkerF, OverlayView, useJsApiLoader } from "@react-google-maps/api";
import { MapPin, ZoomIn, ZoomOut, Navigation, FileText, AlertCircle, User, Clock, Activity } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { DraggableBottomSheet } from "./DraggableBottomSheet";

interface MapHomeScreenProps {
  onNavigate: (screen: string) => void;
  onOpenProfile: () => void;
}

export function MapHomeScreen({ onNavigate, onOpenProfile }: MapHomeScreenProps) {
  // User location
  const [position, setPosition] = useState<google.maps.LatLngLiteral | null>(null);
  const [error, setError] = useState<string | null>(null);
  

  // Keep a ref to the map to control zoom/pan from custom buttons
  const mapRef = useRef<google.maps.Map | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: (import.meta as any).env.VITE_GOOGLE_MAPS_API_KEY as string,
    // libraries: ["places"],
  });

  // Map container style — full screen behind your UI
  const containerStyle = useMemo(
    () => ({ width: "100%", height: "100%" }),
    []
  );

  // Fallback center (UH main campus approx)
  const defaultCenter = useMemo<google.maps.LatLngLiteral>(
    () => ({ lat: 29.7205, lng: -95.3424 }),
    []
  );

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      clickableIcons: false,
      disableDefaultUI: true,
      zoomControl: false, // we'll use our custom zoom buttons
      mapId: undefined,
    }),
    []
  );

  // Example “people on campus” markers (replace with your backend later)
  const userMarkers = useMemo(
    () => [
      { id: 1, name: "Sarah M.", initials: "SM", lat: 29.7212, lng: -95.3442, color: "bg-blue-500" },
      { id: 2, name: "Mike R.", initials: "MR", lat: 29.7198, lng: -95.3408, color: "bg-green-500" },
      { id: 3, name: "Security", initials: "S", lat: 29.7221, lng: -95.3412, color: "bg-purple-500" },
    ],
    []
  );

  // Ask for the user's current location (works on https or http://localhost)
  useEffect(() => {
    if (!isLoaded) return;

    if (!("geolocation" in navigator)) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition({ lat: latitude, lng: longitude });
        // Pan map if already loaded
        if (mapRef.current) mapRef.current.panTo({ lat: latitude, lng: longitude });
      },
      (err) => setError(err.message || "Failed to get your location."),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, [isLoaded]);

  const center = position ?? defaultCenter;

  // Custom control handlers
  const handleZoomIn = () => {
    if (!mapRef.current) return;
    const z = mapRef.current.getZoom() ?? 14;
    mapRef.current.setZoom(Math.min(z + 1, 20));
  };

  const handleZoomOut = () => {
    if (!mapRef.current) return;
    const z = mapRef.current.getZoom() ?? 14;
    mapRef.current.setZoom(Math.max(z - 1, 2));
  };

  const handleRecenter = () => {
    if (!("geolocation" in navigator)) {
      setError("Geolocation not supported.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const next = { lat: latitude, lng: longitude };
        setPosition(next);
        if (mapRef.current) {
          mapRef.current.panTo(next);
          mapRef.current.setZoom(15);
        }
      },
      (err) => setError(err.message || "Failed to get location."),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-100">
      {!(import.meta as any).env.VITE_GOOGLE_MAPS_API_KEY && (
        <div className="absolute top-2 left-2 z-[1000] text-red-600 bg-white/90 px-3 py-2 rounded-md shadow">
          Missing VITE_GOOGLE_MAPS_API_KEY. Add it to your .env and restart the dev server.
        </div>
      )}

      {error && (
        <div className="absolute top-2 right-2 z-[1000] text-amber-800 bg-amber-100 px-3 py-2 rounded-md shadow">
          {error}
        </div>
      )}

      {/* MAP LAYER */}
      <div className="absolute inset-0">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={position ? 15 : 13}
            options={mapOptions}
            onLoad={(map) => {
              mapRef.current = map;
            }}
            onUnmount={() => {
              mapRef.current = null;
            }}
            onClick={(e) => {
              if (!e.latLng) return;
              // optional: allow user to drop/move pin:
              // setPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() });
            }}
          >
            {/* Current user location marker */}
            {position && (
              <>
                <MarkerF position={position} />
                {/* Pulse overlay for current user */}
                <OverlayView
                  position={position}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >
                  <div className="relative -translate-x-1/2 -translate-y-1/2">
                    <div className="absolute inset-0 bg-[#0c7f99] rounded-full animate-pulse opacity-30 scale-150 w-10 h-10"></div>
                    <div className="relative w-8 h-8 bg-gradient-to-br from-[#0c7f99] to-[#1e3a8a] rounded-full border-2 border-white shadow-2xl flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </OverlayView>
              </>
            )}

            {/* Other users as custom avatar overlays */}
            {userMarkers.map((m) => (
              <React.Fragment key={m.id}>
                <OverlayView
                  position={{ lat: m.lat, lng: m.lng }}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >
                <div className="relative -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                  <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-75 w-12 h-12"></div>
                  <div className={`relative w-12 h-12 rounded-full border-4 border-white shadow-lg flex items-center justify-center ${m.color}`}>
                    <span className="text-white text-sm font-medium">{m.initials}</span>
                  </div>
                  <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs">
                    {m.name}
                  </div>
                </div>
                </OverlayView>
              </React.Fragment>
            ))}
          </GoogleMap>
        ) : (
          <div className="w-full h-full flex items-center justify-center">Loading map…</div>
        )}
      </div>

      {/* TOP BAR (over map) */}
      <div className="absolute top-0 left-0 right-0 z-40 bg-gradient-to-b from-white/95 via-white/90 to-transparent backdrop-blur-sm pt-12 pb-6 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-[#0c7f99]" />
            <div>
              <h3 className="text-gray-900">University of Houston</h3>
              <p className="text-xs text-gray-500">Main Campus</p>
            </div>
          </div>
          <button
            onClick={onOpenProfile}
            className="bg-white rounded-full shadow-lg p-1 hover:shadow-xl transition-shadow"
          >
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-[#0c7f99] text-white">JD</AvatarFallback>
            </Avatar>
          </button>
        </div>
      </div>

      {/* BOTTOM-LEFT FLOATING CONTROLS */}
      <div className="absolute bottom-32 left-6 z-30 space-y-3">
        <button
          onClick={handleZoomIn}
          className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow active:scale-95"
        >
          <ZoomIn className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={handleZoomOut}
          className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow active:scale-95"
        >
          <ZoomOut className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={handleRecenter}
          className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow active:scale-95"
        >
          <Navigation className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={() => onNavigate("report")}
          className="w-12 h-12 bg-[#0c7f99] rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow active:scale-95"
        >
          <FileText className="w-5 h-5 text-white" />
        </button>
      </div>


      {/* DRAGGABLE BOTTOM SHEET */}
      <DraggableBottomSheet onNavigate={onNavigate} />
    </div>
  );
}
