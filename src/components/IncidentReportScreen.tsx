import React from "react";


import { useState } from "react";
import { ArrowLeft, Camera, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";


interface IncidentReportScreenProps {
  onBack: () => void;
}

export function IncidentReportScreen({ onBack }: IncidentReportScreenProps) {
  const [incidentType, setIncidentType] = useState("");
  const [description, setDescription] = useState("");
  const [photoAdded, setPhotoAdded] = useState(false);

  const handleSubmit = () => {
    if (!incidentType || !description) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    toast.success("Report submitted successfully! Campus security has been notified.");
    setIncidentType("");
    setDescription("");
    setPhotoAdded(false);
    setTimeout(() => onBack(), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 pt-12 pb-4 px-6 sticky top-0 z-40 backdrop-blur-lg bg-white/95">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className="hover:bg-gray-100 p-2 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1>Report Incident</h1>
        </div>
      </div>
      
      {/* Form */}
      <div className="px-6 mt-6 space-y-6">
        <Card className="p-6 space-y-6">
          <div className="space-y-2">
            <label htmlFor="incident-type" className="block text-sm text-gray-700">
              Incident Type *
            </label>
            <Select value={incidentType} onValueChange={setIncidentType}>
              <SelectTrigger id="incident-type">
                <SelectValue placeholder="Select incident type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="theft">Theft</SelectItem>
                <SelectItem value="harassment">Harassment</SelectItem>
                <SelectItem value="suspicious">Suspicious Activity</SelectItem>
                <SelectItem value="hazard">Hazard</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm text-gray-700">
              Description *
            </label>
            <Textarea
              id="description"
              placeholder="Please describe what happened..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className="resize-none"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm text-gray-700">
              Photo Evidence (Optional)
            </label>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setPhotoAdded(!photoAdded)}
            >
              <Camera className="w-4 h-4 mr-2" />
              {photoAdded ? "Photo Added ✓" : "Add Photo"}
            </Button>
          </div>
        </Card>
        
        {/* Info Card */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <p className="text-sm text-gray-700">
            Your report will be sent to campus security immediately. For emergencies, please call 911 or use the PANIC button.
          </p>
        </Card>
        
        {/* Submit Button */}
        <Button 
          onClick={handleSubmit}
          className="w-full bg-[#0c7f99] hover:bg-[#0a6a7f] py-6 rounded-2xl"
          size="lg"
        >
          <Send className="w-4 h-4 mr-2" />
          Submit Report
        </Button>
      </div>
    </div>
  );
}