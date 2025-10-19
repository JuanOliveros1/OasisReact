import React, { useState } from "react";


import { User, Bell, Shield, MapPin, Phone, ChevronRight, LogOut } from "lucide-react";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Switch } from "./ui/switch";
import { toast } from "sonner";
import { EmergencyContactsScreen } from "./EmergencyContactsScreen";
import { LocationSharingScreen } from "./LocationSharingScreen";
import { NotificationSettingsScreen } from "./NotificationSettingsScreen";
import { PrivacySecurityScreen } from "./PrivacySecurityScreen";
import { EditProfileScreen } from "./EditProfileScreen";
import { useIncidents } from "../contexts/IncidentContext";

type ProfileScreenType = "main" | "emergency" | "location" | "notifications" | "privacy" | "edit";

export function ProfileScreen() {
  const [currentScreen, setCurrentScreen] = useState<ProfileScreenType>("main");
  const { clearAllData } = useIncidents();

  const menuItems = [
    { id: "emergency", label: "Emergency Contacts", icon: Phone },
    { id: "location", label: "Location Sharing", icon: MapPin },
    { id: "notifications", label: "Notification Settings", icon: Bell },
    { id: "privacy", label: "Privacy & Security", icon: Shield },
  ];

  const handleMenuClick = (item: string) => {
    setCurrentScreen(item as ProfileScreenType);
  };

  const handleBack = () => {
    setCurrentScreen("main");
  };

  // Render different screens based on current state
  if (currentScreen === "emergency") {
    return <EmergencyContactsScreen onBack={handleBack} />;
  }

  if (currentScreen === "location") {
    return <LocationSharingScreen onBack={handleBack} />;
  }

  if (currentScreen === "notifications") {
    return <NotificationSettingsScreen onBack={handleBack} />;
  }

  if (currentScreen === "privacy") {
    return <PrivacySecurityScreen onBack={handleBack} />;
  }

  if (currentScreen === "edit") {
    return <EditProfileScreen onBack={handleBack} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0c7f99] to-[#1e3a8a] text-white pt-12 pb-20 px-6">
        <h1 className="mb-6">Profile</h1>
        
        {/* User Info Card */}
        <Card className="bg-white p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="bg-[#0c7f99] text-white text-xl">
                JD
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-gray-900">John Doe</h3>
              <p className="text-sm text-gray-500 mt-1">john.doe@uh.edu</p>
              <p className="text-xs text-gray-400 mt-1">Student ID: 1234567</p>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Quick Settings */}
      <div className="px-6 -mt-10 space-y-6">
        <Card className="p-4 shadow-lg">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-xl">
                  <Bell className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4>Push Notifications</h4>
                  <p className="text-sm text-gray-500">Get alerts on your phone</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-xl">
                    <MapPin className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4>Share Location</h4>
                    <p className="text-sm text-gray-500">Share with emergency contacts</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </Card>
        
        {/* Menu Items */}
        <div className="space-y-3">
          <h3>Settings</h3>
          
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.id}
                className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleMenuClick(item.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gray-100 p-2 rounded-xl">
                      <Icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </Card>
            );
          })}
        </div>
        
        {/* Account Section */}
        <div className="space-y-3">
          <h3>Account</h3>
          
          <Card 
            className="p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleMenuClick("edit")}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-gray-100 p-2 rounded-xl">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                <span>Edit Profile</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Card>
          
          <Card
            className="p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => toast.info("Logging out...")}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-red-100 p-2 rounded-xl">
                  <LogOut className="w-5 h-5 text-red-600" />
                </div>
                <span className="text-red-600">Log Out</span>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Debug Section - Remove in production */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="text-sm font-medium text-yellow-800 mb-2">Debug Tools</h3>
          <button
            onClick={clearAllData}
            className="text-xs bg-yellow-200 text-yellow-800 px-3 py-1 rounded hover:bg-yellow-300 transition-colors"
          >
            Clear All Data & Reset
          </button>
          <p className="text-xs text-yellow-600 mt-1">
            This will reset all incidents and alerts to default values
          </p>
        </div>
        
        {/* App Info */}
        <div className="text-center pt-4 pb-6">
          <p className="text-sm text-gray-500">Oasis Campus Safety v1.0.0</p>
          <p className="text-xs text-gray-400 mt-1">© 2025 University of Houston</p>
        </div>
      </div>
    </div>
  );
}