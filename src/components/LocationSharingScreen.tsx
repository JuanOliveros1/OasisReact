import React, { useState } from "react";
import { ArrowLeft, MapPin, Users, Clock, Shield, Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner";

interface LocationSharingScreenProps {
  onBack: () => void;
}

export function LocationSharingScreen({ onBack }: LocationSharingScreenProps) {
  const [settings, setSettings] = useState({
    shareLocation: true,
    shareWithContacts: true,
    shareWithEmergency: true,
    shareWithCampus: false,
    shareDuration: "24", // hours
    shareAccuracy: "high",
    showOnMap: true,
    allowTracking: true,
  });

  const [recentShares, setRecentShares] = useState([
    {
      id: "1",
      contact: "Sarah Johnson",
      duration: "2 hours",
      status: "active",
      time: "2:30 PM",
    },
    {
      id: "2",
      contact: "Mike Johnson",
      duration: "1 day",
      status: "expired",
      time: "Yesterday",
    },
  ]);

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast.success("Setting updated");
  };

  const handleShareLocation = () => {
    toast.success("Location shared with emergency contacts");
  };

  const handleStopSharing = (id: string) => {
    setRecentShares(prev => prev.filter(share => share.id !== id));
    toast.success("Location sharing stopped");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 pt-12 pb-4 px-6 sticky top-0 z-40 backdrop-blur-lg bg-white/95">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className="hover:bg-gray-100 p-2 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1>Location Sharing</h1>
        </div>
      </div>

      {/* Current Location Card */}
      <div className="px-6 mt-6">
        <Card className="p-4 bg-gradient-to-r from-[#0c7f99] to-[#1e3a8a] text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white">Current Location</h4>
                <p className="text-sm text-white/90">University of Houston - Main Campus</p>
                <p className="text-xs text-white/80">Last updated: 2 minutes ago</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-white/90">Accuracy: High</p>
              <p className="text-xs text-white/80">GPS + WiFi</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mt-6">
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={handleShareLocation}
            className="bg-green-500 hover:bg-green-600 py-4 rounded-2xl"
          >
            <Users className="w-4 h-4 mr-2" />
            Share Now
          </Button>
          <Button
            variant="outline"
            className="py-4 rounded-2xl"
            onClick={() => toast.info("Location sharing paused")}
          >
            <EyeOff className="w-4 h-4 mr-2" />
            Pause Sharing
          </Button>
        </div>
      </div>

      {/* Sharing Settings */}
      <div className="px-6 mt-6 space-y-4">
        <h3>Sharing Settings</h3>
        
        <Card className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-xl">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4>Share Location</h4>
                <p className="text-sm text-gray-500">Allow location sharing</p>
              </div>
            </div>
            <Switch
              checked={settings.shareLocation}
              onCheckedChange={(checked) => handleSettingChange('shareLocation', checked)}
            />
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-xl">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4>Share with Emergency Contacts</h4>
                  <p className="text-sm text-gray-500">Always share with emergency contacts</p>
                </div>
              </div>
              <Switch
                checked={settings.shareWithContacts}
                onCheckedChange={(checked) => handleSettingChange('shareWithContacts', checked)}
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-2 rounded-xl">
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4>Share with Campus Security</h4>
                  <p className="text-sm text-gray-500">Share location with campus security</p>
                </div>
              </div>
              <Switch
                checked={settings.shareWithCampus}
                onCheckedChange={(checked) => handleSettingChange('shareWithCampus', checked)}
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-100 p-2 rounded-xl">
                  <Eye className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h4>Show on Campus Map</h4>
                  <p className="text-sm text-gray-500">Allow others to see your location</p>
                </div>
              </div>
              <Switch
                checked={settings.showOnMap}
                onCheckedChange={(checked) => handleSettingChange('showOnMap', checked)}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Sharing Duration */}
      <div className="px-6 mt-6">
        <Card className="p-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gray-100 p-2 rounded-xl">
                <Clock className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h4>Sharing Duration</h4>
                <p className="text-sm text-gray-500">How long to share location</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration">Default Duration</Label>
              <Select
                value={settings.shareDuration}
                onValueChange={(value) => handleSettingChange('shareDuration', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 hour</SelectItem>
                  <SelectItem value="4">4 hours</SelectItem>
                  <SelectItem value="8">8 hours</SelectItem>
                  <SelectItem value="24">24 hours</SelectItem>
                  <SelectItem value="72">3 days</SelectItem>
                  <SelectItem value="168">1 week</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Shares */}
      <div className="px-6 mt-6 space-y-4">
        <h3>Recent Location Shares</h3>
        
        {recentShares.map((share) => (
          <Card key={share.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${
                  share.status === 'active' ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <Users className={`w-4 h-4 ${
                    share.status === 'active' ? 'text-green-600' : 'text-gray-600'
                  }`} />
                </div>
                <div>
                  <h4>{share.contact}</h4>
                  <p className="text-sm text-gray-500">
                    {share.duration} • {share.time}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  share.status === 'active' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {share.status}
                </span>
                {share.status === 'active' && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleStopSharing(share.id)}
                    className="text-red-600 hover:bg-red-50"
                  >
                    Stop
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Privacy Notice */}
      <div className="px-6 mt-6 pb-6">
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-500 text-white p-2 rounded-lg flex-shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-blue-900">Privacy & Security</h4>
              <p className="text-sm text-blue-800 mt-2">
                Your location data is encrypted and only shared with authorized contacts. 
                You can stop sharing at any time. Location data is not stored permanently.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
