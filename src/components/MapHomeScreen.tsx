import { useState } from "react";
import { MapPin, ZoomIn, ZoomOut, Navigation, FileText, AlertCircle, User } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { DraggableBottomSheet } from "./DraggableBottomSheet";

interface MapHomeScreenProps {
  onNavigate: (screen: string) => void;
  onOpenProfile: () => void;
}

export function MapHomeScreen({ onNavigate, onOpenProfile }: MapHomeScreenProps) {
  const [zoomLevel, setZoomLevel] = useState(1);

  // Mock user locations on campus
  const userMarkers = [
    { id: 1, name: "Sarah M.", initials: "SM", x: "35%", y: "45%", color: "bg-blue-500" },
    { id: 2, name: "Mike R.", initials: "MR", x: "55%", y: "60%", color: "bg-green-500" },
    { id: 3, name: "Security", initials: "S", x: "70%", y: "35%", color: "bg-purple-500" },
  ];

  const handleZoomIn = () => setZoomLevel(Math.min(zoomLevel + 0.2, 2));
  const handleZoomOut = () => setZoomLevel(Math.max(zoomLevel - 0.2, 0.6));

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-100">
      {/* Top Bar */}
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
              <AvatarFallback className="bg-[#0c7f99] text-white">
                JD
              </AvatarFallback>
            </Avatar>
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&h=1600&fit=crop"
            alt="Campus map"
            className="w-full h-full object-cover"
          />
          
          {/* User Markers on Map */}
          {userMarkers.map((marker) => (
            <div
              key={marker.id}
              className="absolute"
              style={{ left: marker.x, top: marker.y, transform: "translate(-50%, -50%)" }}
            >
              <div className="relative group cursor-pointer">
                <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-75"></div>
                <Avatar className={`relative w-12 h-12 border-4 border-white shadow-lg ${marker.color}`}>
                  <AvatarFallback className="text-white">
                    {marker.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs">
                  {marker.name}
                </div>
              </div>
            </div>
          ))}

          {/* Current User Location Marker */}
          <div
            className="absolute"
            style={{ left: "45%", top: "55%", transform: "translate(-50%, -50%)" }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#0c7f99] rounded-full animate-pulse opacity-30 scale-150"></div>
              <div className="relative w-16 h-16 bg-gradient-to-br from-[#0c7f99] to-[#1e3a8a] rounded-full border-4 border-white shadow-2xl flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom-Left Floating Controls */}
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
          onClick={() => {}}
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

      {/* Bottom-Right PANIC Button */}
      <div className="absolute bottom-32 right-6 z-30">
        <button
          onClick={() => alert("Emergency services contacted! This is a demo.")}
          className="relative group"
        >
          <div className="absolute inset-0 bg-red-500 rounded-full blur-xl opacity-50 group-active:opacity-70 transition-opacity"></div>
          <div className="relative w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-2xl flex items-center justify-center border-4 border-white group-active:scale-95 transition-transform">
            <div className="text-center">
              <AlertCircle className="w-10 h-10 text-white" />
            </div>
          </div>
        </button>
      </div>

      {/* Draggable Bottom Sheet */}
      <DraggableBottomSheet onNavigate={onNavigate} />
    </div>
  );
}
