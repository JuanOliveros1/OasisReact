import React, { useMemo, useRef, useState } from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { ArrowLeft, Info, MapPin } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

interface DangerZonesScreenProps {
  onBack: () => void;
}

export function DangerZonesScreen({ onBack }: DangerZonesScreenProps) {
  const [timeFilter, setTimeFilter] = useState("30days");
  const mapRef = useRef<google.maps.Map | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: (import.meta as any).env?.VITE_GOOGLE_MAPS_API_KEY || "",
  });

  // Map container style
  const containerStyle = useMemo(
    () => ({ width: "100%", height: "100%" }),
    []
  );

  // UH Campus center
  const defaultCenter = useMemo<google.maps.LatLngLiteral>(
    () => ({ lat: 29.7205, lng: -95.3424 }),
    []
  );

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      clickableIcons: false,
      disableDefaultUI: true,
      zoomControl: false,
    }),
    []
  );
  
  const dangerZones = useMemo(() => [
    { id: 1, name: "East Parking Garage", risk: "high", incidents: 12, lat: 29.7212, lng: -95.3442 },
    { id: 2, name: "Science Building Area", risk: "medium", incidents: 5, lat: 29.7198, lng: -95.3408 },
    { id: 3, name: "Library Back Entrance", risk: "medium", incidents: 7, lat: 29.7221, lng: -95.3412 },
    { id: 4, name: "Athletic Complex", risk: "low", incidents: 2, lat: 29.7235, lng: -95.3384 },
    { id: 5, name: "Student Center", risk: "high", incidents: 15, lat: 29.7205, lng: -95.3424 },
    { id: 6, name: "Dormitory A", risk: "medium", incidents: 8, lat: 29.7175, lng: -95.3454 },
    { id: 7, name: "Business School", risk: "low", incidents: 3, lat: 29.7185, lng: -95.3444 },
    { id: 8, name: "Engineering Building", risk: "medium", incidents: 6, lat: 29.7225, lng: -95.3404 },
  ], []);


  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 pt-12 pb-4 px-6 sticky top-0 z-40 backdrop-blur-lg bg-white/95">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={onBack} className="hover:bg-gray-100 p-2 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1>Danger Zones</h1>
          </div>
        </div>
      </div>
      
      {/* Map Container */}
      <div className="relative">
        <div className="relative h-96 bg-gray-100">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={defaultCenter}
              zoom={15}
              options={mapOptions}
              onLoad={(map) => {
                mapRef.current = map;
              }}
              onUnmount={() => {
                mapRef.current = null;
              }}
            >
              {/* Simple Markers */}
              {dangerZones.map((zone) => (
                <MarkerF
                  key={zone.id}
                  position={{ lat: zone.lat, lng: zone.lng }}
                  options={{
                    icon: {
                      path: google.maps.SymbolPath.CIRCLE,
                      scale: zone.risk === 'high' ? 10 : zone.risk === 'medium' ? 8 : 6,
                      fillColor: zone.risk === 'high' ? '#ef4444' : zone.risk === 'medium' ? '#eab308' : '#22c55e',
                      fillOpacity: 0.8,
                      strokeColor: '#ffffff',
                      strokeWeight: 2
                    }
                  }}
                />
              ))}
            </GoogleMap>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <div className="text-gray-500">Loading map...</div>
            </div>
          )}
          
          {/* Legend */}
          <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
            <p className="text-xs mb-2 font-medium">Risk Level</p>
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span>Low</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <span>Medium</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span>High</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Time Filter */}
      <div className="px-6 mt-6">
        <div className="flex space-x-3">
          <Button
            variant={timeFilter === "30days" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeFilter("30days")}
            className={timeFilter === "30days" ? "bg-[#0c7f99] hover:bg-[#0a6a7f]" : ""}
          >
            Last 30 Days
          </Button>
          <Button
            variant={timeFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeFilter("all")}
            className={timeFilter === "all" ? "bg-[#0c7f99] hover:bg-[#0a6a7f]" : ""}
          >
            All Time
          </Button>
        </div>
      </div>
      
      {/* Danger Zone List */}
      <div className="px-6 mt-6 space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">
          Risk Areas ({timeFilter === "30days" ? "Last 30 Days" : "All Time"})
        </h3>
        {dangerZones
          .sort((a, b) => b.incidents - a.incidents) // Sort by incident count
          .map((zone) => (
          <Card key={zone.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1">
                <div className={`p-2 rounded-full ${
                  zone.risk === "high" 
                    ? "bg-red-100"
                    : zone.risk === "medium"
                    ? "bg-yellow-100"
                    : "bg-green-100"
                }`}>
                  <MapPin className={`w-5 h-5 ${
                    zone.risk === "high" 
                      ? "text-red-600"
                      : zone.risk === "medium"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{zone.name}</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    {zone.incidents} incidents reported
                  </p>
                </div>
              </div>
              <div className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                zone.risk === "high" 
                  ? "bg-red-100 text-red-700"
                  : zone.risk === "medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}>
                {zone.risk.toUpperCase()}
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Info Note */}
      <div className="px-6 mt-6 pb-6">
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-start space-x-2">
            <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-700">
              Data is based on recent incident reports. Always stay vigilant and use the Safe Walk feature when traveling through these areas.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}