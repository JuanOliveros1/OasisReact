import React from "react";


import { useState, useEffect } from "react";
import { ArrowLeft, Clock, Share2, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { toast } from "sonner";

interface SafeWalkScreenProps {
  onBack: () => void;
}

export function SafeWalkScreen({ onBack }: SafeWalkScreenProps) {
  const [isActive, setIsActive] = useState(false);
  const [selectedTime, setSelectedTime] = useState(10);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            toast.success("Check-in completed! You're safe.");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeRemaining]);

  const handleStart = () => {
    setTimeRemaining(selectedTime * 60);
    setIsActive(true);
    toast.success(`Safe Walk started for ${selectedTime} minutes`);
  };

  const handleStop = () => {
    setIsActive(false);
    setTimeRemaining(0);
    toast.info("Safe Walk cancelled");
  };

  const handleCheckIn = () => {
    setIsActive(false);
    setTimeRemaining(0);
    toast.success("Checked in safely!");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 pt-12 pb-4 px-6 sticky top-0 z-40 backdrop-blur-lg bg-white/95">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className="hover:bg-gray-100 p-2 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1>Safe Walk</h1>
        </div>
      </div>
      
      <div className="px-6 mt-8 space-y-6">
        {/* Info Card */}
        <Card className="p-6 bg-gradient-to-r from-green-50 to-teal-50 border-green-200">
          <div className="flex items-start space-x-3">
            <div className="bg-green-500 text-white p-2 rounded-lg flex-shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-green-900">How it works</h3>
              <p className="text-sm text-green-800 mt-2">
                Start a timed check-in before walking. If you don't check in before time runs out, campus security will be notified.
              </p>
            </div>
          </div>
        </Card>
        
        {!isActive ? (
          <>
            {/* Time Selection */}
            <Card className="p-6 space-y-4">
              <h3>Select Duration</h3>
              <div className="grid grid-cols-3 gap-3">
                {[5, 10, 15].map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-4 rounded-2xl border-2 transition-all ${
                      selectedTime === time
                        ? "border-[#0c7f99] bg-[#0c7f99]/10 shadow-md"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <Clock className="w-6 h-6 text-[#0c7f99] mb-2" />
                      <span className="text-sm">{time} min</span>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
            
            {/* Start Button */}
            <Button
              onClick={handleStart}
              size="lg"
              className="w-full bg-green-500 hover:bg-green-600 py-6 rounded-2xl"
            >
              Start Safe Walk
            </Button>
            
            {/* Share Location */}
            <Button
              variant="outline"
              size="lg"
              className="w-full py-6 rounded-2xl"
              onClick={() => toast.success("Location shared with emergency contact")}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Location with Friend
            </Button>
          </>
        ) : (
          <>
            {/* Active Timer */}
            <Card className="p-8">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-48 h-48 rounded-full bg-gradient-to-br from-green-400 to-teal-500 text-white shadow-2xl">
                  <div>
                    <p className="text-5xl tracking-tight">{formatTime(timeRemaining)}</p>
                    <p className="text-sm text-white/80 mt-2">Time Remaining</p>
                  </div>
                </div>
                
                <div className="pt-4 space-y-2">
                  <p className="text-gray-600">Walking to your destination...</p>
                  <p className="text-sm text-gray-500">
                    Check in when you arrive safely
                  </p>
                </div>
              </div>
            </Card>
            
            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleCheckIn}
                size="lg"
                className="w-full bg-green-500 hover:bg-green-600 py-6 rounded-2xl"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                I'm Safe - Check In
              </Button>
              
              <Button
                onClick={handleStop}
                variant="outline"
                size="lg"
                className="w-full py-6 border-red-300 text-red-600 hover:bg-red-50 rounded-2xl"
              >
                Cancel Safe Walk
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}