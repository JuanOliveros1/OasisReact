import React from "react";


import { Bell, AlertTriangle, Info, CheckCircle, Clock, MapPin } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface AlertsScreenProps {
  onNavigate?: (screen: string) => void;
}

export function AlertsScreen({ onNavigate }: AlertsScreenProps) {
  const alerts = [
    {
      id: 1,
      title: "Suspicious person near East Parking Garage",
      description: "Campus police are investigating. Avoid the area if possible.",
      severity: "high",
      time: "15 min ago",
      type: "security",
      hasLocation: true,
    },
    {
      id: 2,
      title: "Weather Alert: Heavy Rain Expected",
      description: "Thunderstorms expected this evening. Plan your commute accordingly.",
      severity: "medium",
      time: "1 hour ago",
      type: "weather",
      hasLocation: false,
    },
    {
      id: 3,
      title: "Safe Walk Service Extended Hours",
      description: "Due to high demand, escort service will operate until 3 AM this week.",
      severity: "low",
      time: "3 hours ago",
      type: "info",
      hasLocation: false,
    },
    {
      id: 4,
      title: "All Clear: Library Area Incident Resolved",
      description: "Campus police have resolved the earlier reported incident.",
      severity: "resolved",
      time: "5 hours ago",
      type: "security",
      hasLocation: true,
    },
    {
      id: 5,
      title: "Bike Theft Reported in Stadium Area",
      description: "Multiple bike thefts reported. Use designated bike racks and locks.",
      severity: "medium",
      time: "1 day ago",
      type: "theft",
      hasLocation: true,
    },
  ];

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case "high":
        return {
          border: "border-l-4 border-l-red-500",
          badge: "bg-red-100 text-red-700",
          icon: AlertTriangle,
          iconColor: "text-red-500",
        };
      case "medium":
        return {
          border: "border-l-4 border-l-orange-500",
          badge: "bg-orange-100 text-orange-700",
          icon: Info,
          iconColor: "text-orange-500",
        };
      case "resolved":
        return {
          border: "border-l-4 border-l-green-500",
          badge: "bg-green-100 text-green-700",
          icon: CheckCircle,
          iconColor: "text-green-500",
        };
      default:
        return {
          border: "border-l-4 border-l-blue-500",
          badge: "bg-blue-100 text-blue-700",
          icon: Info,
          iconColor: "text-blue-500",
        };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 pt-12 pb-4 px-6 sticky top-0 z-40 backdrop-blur-lg bg-white/95">
        <div className="flex items-center justify-between">
          <div>
            <h1>Campus Alerts</h1>
            <p className="text-gray-500 text-sm mt-1">Stay informed and safe</p>
          </div>
          <div className="bg-[#0c7f99]/10 p-3 rounded-full">
            <Bell className="w-6 h-6 text-[#0c7f99]" />
          </div>
        </div>
      </div>
      
      {/* Active Alerts Counter */}
      <div className="px-6 mt-6">
        <Card className="p-4 bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-red-900">Active Alerts</h4>
              <p className="text-sm text-red-700 mt-1">
                2 high priority alerts require attention
              </p>
            </div>
            <div className="bg-red-500 text-white px-4 py-2 rounded-full min-w-[3rem] text-center">
              2
            </div>
          </div>
        </Card>
      </div>
      
      {/* Alerts List */}
      <div className="px-6 mt-6 space-y-4">
        {alerts.map((alert) => {
          const styles = getSeverityStyles(alert.severity);
          const Icon = styles.icon;
          
          return (
            <Card key={alert.id} className={`p-4 ${styles.border} hover:shadow-md transition-shadow`}>
              <div className="flex items-start space-x-3">
                <div className={`${styles.iconColor} mt-1 flex-shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="flex-1">{alert.title}</h4>
                    <Badge className={styles.badge}>
                      {alert.severity.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">
                    {alert.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{alert.time}</span>
                    </div>
                    
                    {alert.hasLocation && onNavigate && (
                      <Button
                        variant="link"
                        size="sm"
                        className="text-[#0c7f99] h-auto p-0 text-xs"
                        onClick={() => onNavigate("home")}
                      >
                        <MapPin className="w-3 h-3 mr-1" />
                        View on map
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      
      {/* Info Footer */}
      <div className="px-6 mt-6 pb-6">
        <Card className="p-4 bg-blue-50 border-blue-200">
          <p className="text-sm text-gray-700">
            You'll receive push notifications for all high-priority alerts. Update your notification preferences in settings.
          </p>
        </Card>
      </div>
    </div>
  );
}