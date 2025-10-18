import { Home, Bell, Map, User } from "lucide-react";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "alerts", label: "Alerts", icon: Bell },
    { id: "map", label: "Map", icon: Map },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-md mx-auto flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full space-y-1 transition-colors ${
                isActive ? "text-[#0c7f99]" : "text-gray-500"
              }`}
            >
              <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-xs">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
