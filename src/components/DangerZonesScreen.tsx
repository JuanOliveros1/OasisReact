import { useState } from "react";
import { ArrowLeft, Info, MapPin } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface DangerZonesScreenProps {
  onBack: () => void;
}

export function DangerZonesScreen({ onBack }: DangerZonesScreenProps) {
  const [timeFilter, setTimeFilter] = useState("30days");
  
  const dangerZones = [
    { id: 1, name: "East Parking Garage", risk: "high", incidents: 12 },
    { id: 2, name: "Science Building Area", risk: "medium", incidents: 5 },
    { id: 3, name: "Library Back Entrance", risk: "medium", incidents: 7 },
    { id: 4, name: "Athletic Complex", risk: "low", incidents: 2 },
  ];

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
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=600&fit=crop"
            alt="Campus map"
            className="w-full h-full object-cover"
          />
          
          {/* Heat markers overlay - semi-transparent zones */}
          <div className="absolute inset-0">
            {/* High risk zone */}
            <div className="absolute top-1/4 left-1/3 w-24 h-24 bg-red-500/30 rounded-full blur-2xl border-2 border-red-500/50"></div>
            {/* Medium risk zones */}
            <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-orange-500/30 rounded-full blur-xl border-2 border-orange-500/50"></div>
            <div className="absolute bottom-1/3 left-1/2 w-20 h-20 bg-orange-500/30 rounded-full blur-xl border-2 border-orange-500/50"></div>
            {/* Low risk zone */}
            <div className="absolute top-2/3 right-1/3 w-16 h-16 bg-yellow-500/30 rounded-full blur-lg border-2 border-yellow-500/50"></div>
          </div>
          
          {/* Legend */}
          <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
            <p className="text-xs mb-2">Risk Level</p>
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-yellow-400 rounded-full"></div>
                <span>Low</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
                <span>Medium</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-4 h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
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
        <h3>High Risk Areas</h3>
        {dangerZones.map((zone) => (
          <Card key={zone.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1">
                <div className={`p-2 rounded-full ${
                  zone.risk === "high" 
                    ? "bg-red-100"
                    : zone.risk === "medium"
                    ? "bg-orange-100"
                    : "bg-yellow-100"
                }`}>
                  <MapPin className={`w-5 h-5 ${
                    zone.risk === "high" 
                      ? "text-red-600"
                      : zone.risk === "medium"
                      ? "text-orange-600"
                      : "text-yellow-600"
                  }`} />
                </div>
                <div>
                  <h4>{zone.name}</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    {zone.incidents} incidents reported
                  </p>
                </div>
              </div>
              <div className={`px-3 py-1.5 rounded-full text-xs ${
                zone.risk === "high" 
                  ? "bg-red-100 text-red-700"
                  : zone.risk === "medium"
                  ? "bg-orange-100 text-orange-700"
                  : "bg-yellow-100 text-yellow-700"
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