import React from "react";


import { ArrowLeft, Phone, MessageSquare, Shield, Bus, Heart, Building } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface ResourcesScreenProps {
  onBack: () => void;
}

export function ResourcesScreen({ onBack }: ResourcesScreenProps) {
  const resources = [
    {
      id: 1,
      name: "Campus Police",
      phone: "(713) 743-3333",
      available: "24/7",
      icon: Shield,
      color: "bg-blue-500",
    },
    {
      id: 2,
      name: "Escort Service",
      phone: "(713) 743-3333",
      available: "8 PM - 2 AM",
      icon: Building,
      color: "bg-purple-500",
    },
    {
      id: 3,
      name: "Counseling Center",
      phone: "(713) 743-5454",
      available: "Mon-Fri 8am-5pm",
      icon: Heart,
      color: "bg-pink-500",
    },
    {
      id: 4,
      name: "Emergency Shuttle",
      phone: "(713) 743-7433",
      available: "Mon-Fri 7am-11pm",
      icon: Bus,
      color: "bg-green-500",
    },
  ];

  const handleCall = (name: string, phone: string) => {
    toast.success(`Calling ${name}...`);
  };

  const handleText = (name: string) => {
    toast.success(`Opening text message to ${name}...`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 pt-12 pb-4 px-6 sticky top-0 z-40 backdrop-blur-lg bg-white/95">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className="hover:bg-gray-100 p-2 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1>Safety Resources</h1>
        </div>
      </div>
      
      {/* Emergency Banner */}
      <div className="px-6 mt-6">
        <Card className="p-4 bg-gradient-to-r from-red-500 to-red-600 text-white border-0 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white">Emergency?</h3>
              <p className="text-sm text-white/90 mt-1">Call 911 immediately</p>
            </div>
            <Button
              size="lg"
              className="bg-white text-red-600 hover:bg-white/90 rounded-2xl"
              onClick={() => toast.success("Calling 911...")}
            >
              <Phone className="w-5 h-5 mr-2" />
              Call 911
            </Button>
          </div>
        </Card>
      </div>
      
      {/* Resources List */}
      <div className="px-6 mt-6 space-y-4">
        <h3>Campus Resources</h3>
        
        {resources.map((resource) => {
          const Icon = resource.icon;
          return (
            <Card key={resource.id} className="p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                <div className={`${resource.color} p-3 rounded-2xl text-white flex-shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4>{resource.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{resource.phone}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Available: {resource.available}
                  </p>
                  
                  <div className="flex space-x-2 mt-3">
                    <Button
                      size="sm"
                      className="bg-[#0c7f99] hover:bg-[#0a6a7f] rounded-xl"
                      onClick={() => handleCall(resource.name, resource.phone)}
                    >
                      <Phone className="w-3 h-3 mr-1" />
                      Call
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-xl"
                      onClick={() => handleText(resource.name)}
                    >
                      <MessageSquare className="w-3 h-3 mr-1" />
                      Text
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      
      {/* Additional Info */}
      <div className="px-6 mt-6 pb-6">
        <Card className="p-4 bg-blue-50 border-blue-200">
          <h4 className="text-blue-900">Need someone to talk to?</h4>
          <p className="text-sm text-blue-800 mt-2">
            The UH Counseling Center provides free and confidential mental health services to all students.
          </p>
          <Button
            variant="link"
            className="text-blue-600 px-0 mt-2"
            onClick={() => toast.info("Opening counseling center website...")}
          >
            Learn more →
          </Button>
        </Card>
      </div>
    </div>
  );
}