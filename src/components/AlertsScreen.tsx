import React, { useState } from "react";


import { Bell, AlertTriangle, Info, CheckCircle, Clock, MapPin, ChevronDown } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useIncidents } from "../contexts/IncidentContext";

interface AlertsScreenProps {
  onNavigate?: (screen: string) => void;
}

export function AlertsScreen({ onNavigate }: AlertsScreenProps) {
  const { alerts, resolveAlert } = useIncidents();
  const [showAll, setShowAll] = useState(false);
  
  // Format time for display
  const formatTime = (timeString: string) => {
    const now = new Date();
    const time = new Date(timeString);
    const diffMs = now.getTime() - time.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };
  
  const displayedAlerts = showAll ? alerts : alerts.slice(0, 10);

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case "medium":
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case "low":
        return <Info className="w-5 h-5 text-blue-500" />;
      case "resolved":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "low":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "resolved":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "security":
        return <AlertTriangle className="w-4 h-4" />;
      case "weather":
        return <Info className="w-4 h-4" />;
      case "theft":
        return <AlertTriangle className="w-4 h-4" />;
      case "emergency":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 pt-12 pb-4 px-6 sticky top-0 z-40 backdrop-blur-lg bg-white/95">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-red-100 p-2 rounded-xl">
              <Bell className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Campus Alerts</h1>
              <p className="text-sm text-gray-500">Stay informed about campus safety</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Active Alerts Count */}
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">Active Alerts</h3>
              <p className="text-sm text-gray-500">
                {alerts.filter(alert => alert.status === 'active').length} active alerts
              </p>
            </div>
            <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
              {alerts.filter(alert => alert.status === 'active').length}
            </div>
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-3">
          {displayedAlerts.map((alert) => (
            <Card
              key={alert.id}
              className={`p-4 border-l-4 ${
                alert.severity === "high"
                  ? "border-l-red-500"
                  : alert.severity === "medium"
                  ? "border-l-orange-500"
                  : alert.severity === "low"
                  ? "border-l-blue-500"
                  : "border-l-green-500"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="mt-1">
                    {getSeverityIcon(alert.severity)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {alert.title}
                      </h3>
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {alert.description}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{formatTime(alert.time)}</span>
                      </div>
                      {alert.location && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{alert.location.name}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1">
                        {getTypeIcon(alert.type)}
                        <span className="capitalize">{alert.type}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {alert.status === 'active' && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => resolveAlert(alert.id)}
                    className="text-xs"
                  >
                    Mark Resolved
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* View More Button */}
        {alerts.length > 10 && !showAll && (
          <div className="flex justify-center pt-4">
            <Button
              variant="outline"
              onClick={() => setShowAll(true)}
              className="flex items-center space-x-2"
            >
              <span>View More Alerts</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Show Less Button */}
        {showAll && alerts.length > 10 && (
          <div className="flex justify-center pt-4">
            <Button
              variant="outline"
              onClick={() => setShowAll(false)}
              className="flex items-center space-x-2"
            >
              <span>Show Less</span>
              <ChevronDown className="w-4 h-4 rotate-180" />
            </Button>
          </div>
        )}

        {/* No Alerts Message */}
        {alerts.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Alerts</h3>
            <p className="text-gray-500">All clear! No active alerts at this time.</p>
          </div>
        )}
      </div>
    </div>
  );
}