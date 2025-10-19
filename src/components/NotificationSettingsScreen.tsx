import React, { useState } from "react";
import { ArrowLeft, Bell, AlertTriangle, Shield, MapPin, Clock, Volume2, Vibrate } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { toast } from "sonner";

interface NotificationSettingsScreenProps {
  onBack: () => void;
}

export function NotificationSettingsScreen({ onBack }: NotificationSettingsScreenProps) {
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emergencyAlerts: true,
    incidentReports: true,
    dangerZoneAlerts: true,
    weatherAlerts: true,
    safeWalkReminders: true,
    locationUpdates: false,
    marketingUpdates: false,
    soundEnabled: true,
    vibrationEnabled: true,
    notificationSound: "default",
    volume: 80,
    quietHours: false,
    quietStart: "22:00",
    quietEnd: "07:00",
  });

  const [recentNotifications, setRecentNotifications] = useState([
    {
      id: "1",
      type: "emergency",
      title: "Suspicious activity near East Garage",
      time: "2 minutes ago",
      read: false,
    },
    {
      id: "2",
      type: "weather",
      title: "Weather Alert: Heavy Rain Expected",
      time: "1 hour ago",
      read: true,
    },
    {
      id: "3",
      type: "safety",
      title: "Safe Walk Service Extended Hours",
      time: "3 hours ago",
      read: true,
    },
  ]);

  const handleSettingChange = (key: string, value: boolean | string | number) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast.success("Setting updated");
  };

  const handleTestNotification = () => {
    toast.success("Test notification sent!");
  };

  const handleClearAll = () => {
    setRecentNotifications([]);
    toast.success("All notifications cleared");
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "emergency":
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case "weather":
        return <Shield className="w-4 h-4 text-blue-500" />;
      case "safety":
        return <Bell className="w-4 h-4 text-green-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 pt-12 pb-4 px-6 sticky top-0 z-40 backdrop-blur-lg bg-white/95">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className="hover:bg-gray-100 p-2 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1>Notification Settings</h1>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mt-6">
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={handleTestNotification}
            className="bg-[#0c7f99] hover:bg-[#0a6a7f] py-4 rounded-2xl"
          >
            <Bell className="w-4 h-4 mr-2" />
            Test Notification
          </Button>
          <Button
            variant="outline"
            className="py-4 rounded-2xl"
            onClick={handleClearAll}
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        </div>
      </div>

      {/* Alert Types */}
      <div className="px-6 mt-6 space-y-4">
        <h3>Alert Types</h3>
        
        <Card className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 p-2 rounded-xl">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h4>Emergency Alerts</h4>
                <p className="text-sm text-gray-500">Critical safety notifications</p>
              </div>
            </div>
            <Switch
              checked={settings.emergencyAlerts}
              onCheckedChange={(checked) => handleSettingChange('emergencyAlerts', checked)}
            />
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-100 p-2 rounded-xl">
                  <Shield className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h4>Incident Reports</h4>
                  <p className="text-sm text-gray-500">Reports of incidents on campus</p>
                </div>
              </div>
              <Switch
                checked={settings.incidentReports}
                onCheckedChange={(checked) => handleSettingChange('incidentReports', checked)}
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-yellow-100 p-2 rounded-xl">
                  <MapPin className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h4>Danger Zone Alerts</h4>
                  <p className="text-sm text-gray-500">Alerts about high-risk areas</p>
                </div>
              </div>
              <Switch
                checked={settings.dangerZoneAlerts}
                onCheckedChange={(checked) => handleSettingChange('dangerZoneAlerts', checked)}
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-xl">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4>Weather Alerts</h4>
                  <p className="text-sm text-gray-500">Weather-related safety alerts</p>
                </div>
              </div>
              <Switch
                checked={settings.weatherAlerts}
                onCheckedChange={(checked) => handleSettingChange('weatherAlerts', checked)}
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-xl">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4>Safe Walk Reminders</h4>
                  <p className="text-sm text-gray-500">Reminders for active safe walks</p>
                </div>
              </div>
              <Switch
                checked={settings.safeWalkReminders}
                onCheckedChange={(checked) => handleSettingChange('safeWalkReminders', checked)}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Sound & Vibration */}
      <div className="px-6 mt-6">
        <Card className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-xl">
                <Volume2 className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h4>Sound</h4>
                <p className="text-sm text-gray-500">Enable notification sounds</p>
              </div>
            </div>
            <Switch
              checked={settings.soundEnabled}
              onCheckedChange={(checked) => handleSettingChange('soundEnabled', checked)}
            />
          </div>

          {settings.soundEnabled && (
            <div className="space-y-3">
              <div>
                <Label htmlFor="sound">Notification Sound</Label>
                <Select
                  value={settings.notificationSound}
                  onValueChange={(value) => handleSettingChange('notificationSound', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select sound" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="chime">Chime</SelectItem>
                    <SelectItem value="bell">Bell</SelectItem>
                    <SelectItem value="alert">Alert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="volume">Volume: {settings.volume}%</Label>
                <Slider
                  value={[settings.volume]}
                  onValueChange={(value) => handleSettingChange('volume', value[0])}
                  max={100}
                  step={10}
                  className="mt-2"
                />
              </div>
            </div>
          )}

          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-gray-100 p-2 rounded-xl">
                  <Vibrate className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h4>Vibration</h4>
                  <p className="text-sm text-gray-500">Enable vibration for notifications</p>
                </div>
              </div>
              <Switch
                checked={settings.vibrationEnabled}
                onCheckedChange={(checked) => handleSettingChange('vibrationEnabled', checked)}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Quiet Hours */}
      <div className="px-6 mt-6">
        <Card className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-100 p-2 rounded-xl">
                <Clock className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h4>Quiet Hours</h4>
                <p className="text-sm text-gray-500">Silence non-emergency notifications</p>
              </div>
            </div>
            <Switch
              checked={settings.quietHours}
              onCheckedChange={(checked) => handleSettingChange('quietHours', checked)}
            />
          </div>

          {settings.quietHours && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="quietStart">Start Time</Label>
                <Select
                  value={settings.quietStart}
                  onValueChange={(value) => handleSettingChange('quietStart', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Start time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="20:00">8:00 PM</SelectItem>
                    <SelectItem value="21:00">9:00 PM</SelectItem>
                    <SelectItem value="22:00">10:00 PM</SelectItem>
                    <SelectItem value="23:00">11:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="quietEnd">End Time</Label>
                <Select
                  value={settings.quietEnd}
                  onValueChange={(value) => handleSettingChange('quietEnd', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="End time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="06:00">6:00 AM</SelectItem>
                    <SelectItem value="07:00">7:00 AM</SelectItem>
                    <SelectItem value="08:00">8:00 AM</SelectItem>
                    <SelectItem value="09:00">9:00 AM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Recent Notifications */}
      <div className="px-6 mt-6 space-y-4">
        <h3>Recent Notifications</h3>
        
        {recentNotifications.map((notification) => (
          <Card key={notification.id} className={`p-4 ${
            !notification.read ? 'bg-blue-50 border-blue-200' : ''
          }`}>
            <div className="flex items-start space-x-3">
              <div className="mt-1">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1">
                <h4 className={!notification.read ? 'font-medium' : ''}>
                  {notification.title}
                </h4>
                <p className="text-sm text-gray-500 mt-1">{notification.time}</p>
              </div>
              {!notification.read && (
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Privacy Notice */}
      <div className="px-6 mt-6 pb-6">
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-500 text-white p-2 rounded-lg flex-shrink-0">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-blue-900">Notification Privacy</h4>
              <p className="text-sm text-blue-800 mt-2">
                Emergency alerts will always be sent regardless of your notification settings. 
                You can customize other notification types to suit your preferences.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
