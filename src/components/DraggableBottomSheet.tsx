import React from "react";


import { useState, useRef, useEffect } from "react";
import { FileText, Users, AlertTriangle, BookOpen, ChevronUp, Bell, Clock } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface DraggableBottomSheetProps {
  onNavigate: (screen: string) => void;
}

export function DraggableBottomSheet({ onNavigate }: DraggableBottomSheetProps) {
  const [height, setHeight] = useState(180); // Initial collapsed height
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef(0);
  const startHeight = useRef(0);

  const maxHeight = window.innerHeight * 0.7; // 70% of screen
  const minHeight = 180;

  const recentAlerts = [
    {
      id: 1,
      title: "Suspicious activity near East Garage",
      time: "15 min ago",
      severity: "high",
    },
    {
      id: 2,
      title: "Weather alert: Heavy rain expected",
      time: "1 hour ago",
      severity: "medium",
    },
  ];

  const quickActions = [
    { id: "report", label: "Report Incident", icon: FileText, color: "bg-blue-500" },
    { id: "safewalk", label: "Safe Walk", icon: Users, color: "bg-green-500" },
    { id: "map", label: "Danger Zones", icon: AlertTriangle, color: "bg-orange-500" },
    { id: "resources", label: "Resources", icon: BookOpen, color: "bg-purple-500" },
  ];

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    startY.current = e.touches[0].clientY;
    startHeight.current = height;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const deltaY = startY.current - e.touches[0].clientY;
    const newHeight = Math.min(Math.max(startHeight.current + deltaY, minHeight), maxHeight);
    setHeight(newHeight);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    // Snap to positions
    if (height > maxHeight * 0.5) {
      setHeight(maxHeight);
    } else if (height < minHeight + 50) {
      setHeight(minHeight);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startY.current = e.clientY;
    startHeight.current = height;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const deltaY = startY.current - e.clientY;
    const newHeight = Math.min(Math.max(startHeight.current + deltaY, minHeight), maxHeight);
    setHeight(newHeight);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // Snap to positions
    if (height > maxHeight * 0.5) {
      setHeight(maxHeight);
    } else if (height < minHeight + 50) {
      setHeight(minHeight);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging]);

  return (
    <div
      className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl transition-all duration-200 z-50"
      style={{ height: `${height}px` }}
    >
      {/* Drag Handle */}
      <div
        className="w-full py-4 cursor-grab active:cursor-grabbing flex justify-center"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
      >
        <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
      </div>

      {/* Content */}
      <div className="px-6 pb-6 overflow-y-auto h-full">
        {/* Expand Indicator */}
        {height === minHeight && (
          <div className="flex items-center justify-center mb-4">
            <ChevronUp className="w-5 h-5 text-gray-400 animate-bounce" />
          </div>
        )}

        {/* Recent Alerts */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3>Recent Alerts</h3>
            <button
              onClick={() => onNavigate("alerts")}
              className="text-sm text-[#0c7f99] hover:underline"
            >
              View All
            </button>
          </div>
          <div className="space-y-2">
            {recentAlerts.map((alert) => (
              <Card
                key={alert.id}
                className={`p-3 border-l-4 ${
                  alert.severity === "high" ? "border-l-red-500" : "border-l-orange-500"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="text-sm">{alert.title}</p>
                    <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{alert.time}</span>
                    </div>
                  </div>
                  <Badge
                    className={
                      alert.severity === "high"
                        ? "bg-red-100 text-red-700"
                        : "bg-orange-100 text-orange-700"
                    }
                  >
                    {alert.severity.toUpperCase()}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Card
                  key={action.id}
                  className="p-4 hover:shadow-lg transition-all cursor-pointer active:scale-95"
                  onClick={() => onNavigate(action.id)}
                >
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className={`${action.color} p-3 rounded-2xl text-white`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="text-sm">{action.label}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Safety Tip - Only visible when expanded */}
        {height > minHeight + 100 && (
          <div className="mt-6">
            <Card className="p-4 bg-gradient-to-r from-[#0c7f99]/10 to-[#1e3a8a]/10 border-[#0c7f99]/20">
              <div className="flex items-start space-x-3">
                <div className="bg-[#0c7f99] text-white p-2 rounded-lg">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[#0c7f99]">Safety Tip</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Always walk in well-lit areas and stay aware of your surroundings. Use the Safe Walk feature when traveling alone at night.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
