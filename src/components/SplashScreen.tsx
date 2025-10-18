import React from "react";


import { Shield } from "lucide-react";
import { Button } from "./ui/button";

interface SplashScreenProps {
  onGetStarted: () => void;
}

export function SplashScreen({ onGetStarted }: SplashScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c7f99] via-[#1e3a8a] to-[#0c7f99] flex flex-col items-center justify-center px-6 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-40 h-40 rounded-full bg-white blur-3xl"></div>
      </div>
      
      <div className="z-10 flex flex-col items-center space-y-8">
        {/* Logo/Icon */}
        <div className="bg-white/20 backdrop-blur-sm p-8 rounded-full shadow-2xl">
          <Shield className="w-24 h-24 text-white" strokeWidth={1.5} />
        </div>
        
        {/* App Name */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl tracking-tight">Oasis Campus Safety</h1>
          <p className="text-lg text-white/90">Your safety, one tap away.</p>
        </div>
        
        {/* Get Started Button */}
        <div className="pt-8">
          <Button 
            onClick={onGetStarted}
            size="lg"
            className="bg-white text-[#0c7f99] hover:bg-white/90 shadow-xl px-12 py-6 rounded-full"
          >
            Get Started
          </Button>
        </div>
      </div>
      
      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/10 to-transparent"></div>
    </div>
  );
}
