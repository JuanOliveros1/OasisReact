import React from "react";


import { useState } from "react";
import { Toaster } from "./components/ui/sonner";
import { SplashScreen } from "./components/SplashScreen";
import { MapHomeScreen } from "./components/MapHomeScreen";
import { BottomNav } from "./components/BottomNav";
import { IncidentReportScreen } from "./components/IncidentReportScreen";
import { DangerZonesScreen } from "./components/DangerZonesScreen";
import { SafeWalkScreen } from "./components/SafeWalkScreen";
import { ResourcesScreen } from "./components/ResourcesScreen";
import { AlertsScreen } from "./components/AlertsScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { IncidentProvider } from "./contexts/IncidentContext";

type Screen =
  | "splash"
  | "home"
  | "alerts"
  | "map"
  | "profile"
  | "report"
  | "safewalk"
  | "resources";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("splash");

  const handleGetStarted = () => {
    setCurrentScreen("home");
  };

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  const handleTabChange = (tab: string) => {
    setCurrentScreen(tab as Screen);
  };

  const handleBack = () => {
    setCurrentScreen("home");
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "splash":
        return <SplashScreen onGetStarted={handleGetStarted} />;
      case "home":
        return (
          <MapHomeScreen
            onNavigate={handleNavigate}
            onOpenProfile={() => setCurrentScreen("profile")}
          />
        );
      case "alerts":
        return <AlertsScreen onNavigate={handleNavigate} />;
      case "map":
        return <DangerZonesScreen onBack={handleBack} onTabChange={handleTabChange} />;
      case "profile":
        return <ProfileScreen />;
      case "report":
        return <IncidentReportScreen onBack={handleBack} />;
      case "safewalk":
        return <SafeWalkScreen onBack={handleBack} />;
      case "resources":
        return <ResourcesScreen onBack={handleBack} />;
      default:
        return (
          <MapHomeScreen
            onNavigate={handleNavigate}
            onOpenProfile={() => setCurrentScreen("profile")}
          />
        );
    }
  };

  const showBottomNav =
    currentScreen !== "splash" &&
    currentScreen !== "report" &&
    currentScreen !== "safewalk" &&
    currentScreen !== "resources" &&
    currentScreen !== "map";

  return (
    <IncidentProvider>
      <div className="relative min-h-screen max-w-md mx-auto bg-white shadow-2xl overflow-hidden">
        {renderScreen()}
        {showBottomNav && (
          <BottomNav
            activeTab={currentScreen}
            onTabChange={handleTabChange}
          />
        )}
        <Toaster position="top-center" />
      </div>
    </IncidentProvider>
  );
}