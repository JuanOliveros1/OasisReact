import React, { useState } from "react";
import { ArrowLeft, User, Mail, Phone, MapPin, Camera, Save, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { toast } from "sonner";

interface EditProfileScreenProps {
  onBack: () => void;
}

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  studentId: string;
  major: string;
  year: string;
  emergencyContact: string;
  bio: string;
  avatar: string;
}

export function EditProfileScreen({ onBack }: EditProfileScreenProps) {
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@uh.edu",
    phone: "(713) 555-0123",
    studentId: "1234567",
    major: "Computer Science",
    year: "Senior",
    emergencyContact: "Sarah Johnson - (713) 555-0123",
    bio: "Computer Science student passionate about campus safety and technology.",
    avatar: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!profileData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!profileData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!profileData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!profileData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(profileData.phone)) {
      newErrors.phone = "Please enter a valid phone number (XXX) XXX-XXXX";
    }

    if (!profileData.studentId.trim()) {
      newErrors.studentId = "Student ID is required";
    } else if (!/^\d{7}$/.test(profileData.studentId)) {
      newErrors.studentId = "Student ID must be 7 digits";
    }

    if (!profileData.major.trim()) {
      newErrors.major = "Major is required";
    }

    if (!profileData.year.trim()) {
      newErrors.year = "Academic year is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      toast.error("Please fix the errors before saving");
      return;
    }

    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleCancel = () => {
    setIsEditing(false);
    toast.info("Changes cancelled");
  };

  const handleAvatarUpload = () => {
    toast.info("Avatar upload feature coming soon!");
  };

  const getInitials = () => {
    return `${profileData.firstName.charAt(0)}${profileData.lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 pt-12 pb-4 px-6 sticky top-0 z-40 backdrop-blur-lg bg-white/95">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={onBack} className="hover:bg-gray-100 p-2 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1>Edit Profile</h1>
          </div>
          {isEditing ? (
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleCancel}
                className="text-red-600 hover:bg-red-50"
              >
                <X className="w-4 h-4 mr-1" />
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                className="bg-[#0c7f99] hover:bg-[#0a6a7f]"
              >
                <Save className="w-4 h-4 mr-1" />
                Save
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              onClick={() => setIsEditing(true)}
              className="bg-[#0c7f99] hover:bg-[#0a6a7f]"
            >
              Edit
            </Button>
          )}
        </div>
      </div>

      {/* Profile Picture Section */}
      <div className="px-6 mt-6">
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="w-20 h-20">
                <AvatarImage src={profileData.avatar} />
                <AvatarFallback className="bg-[#0c7f99] text-white text-xl">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <button
                  onClick={handleAvatarUpload}
                  className="absolute -bottom-1 -right-1 bg-[#0c7f99] text-white p-2 rounded-full shadow-lg hover:bg-[#0a6a7f] transition-colors"
                >
                  <Camera className="w-3 h-3" />
                </button>
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium">
                {profileData.firstName} {profileData.lastName}
              </h3>
              <p className="text-sm text-gray-500">{profileData.email}</p>
              <p className="text-xs text-gray-400">Student ID: {profileData.studentId}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Personal Information */}
      <div className="px-6 mt-6 space-y-4">
        <h3>Personal Information</h3>
        
        <Card className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={profileData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                disabled={!isEditing}
                className={errors.firstName ? "border-red-500" : ""}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={profileData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                disabled={!isEditing}
                className={errors.lastName ? "border-red-500" : ""}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={profileData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              disabled={!isEditing}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              value={profileData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              disabled={!isEditing}
              placeholder="(713) 555-0123"
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <Label htmlFor="studentId">Student ID *</Label>
            <Input
              id="studentId"
              value={profileData.studentId}
              onChange={(e) => handleInputChange('studentId', e.target.value)}
              disabled={!isEditing}
              placeholder="1234567"
              className={errors.studentId ? "border-red-500" : ""}
            />
            {errors.studentId && (
              <p className="text-red-500 text-xs mt-1">{errors.studentId}</p>
            )}
          </div>
        </Card>
      </div>

      {/* Academic Information */}
      <div className="px-6 mt-6 space-y-4">
        <h3>Academic Information</h3>
        
        <Card className="p-4 space-y-4">
          <div>
            <Label htmlFor="major">Major *</Label>
            <Select
              value={profileData.major}
              onValueChange={(value) => handleInputChange('major', value)}
              disabled={!isEditing}
            >
              <SelectTrigger className={errors.major ? "border-red-500" : ""}>
                <SelectValue placeholder="Select your major" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Medicine">Medicine</SelectItem>
                <SelectItem value="Law">Law</SelectItem>
                <SelectItem value="Arts">Arts</SelectItem>
                <SelectItem value="Sciences">Sciences</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.major && (
              <p className="text-red-500 text-xs mt-1">{errors.major}</p>
            )}
          </div>

          <div>
            <Label htmlFor="year">Academic Year *</Label>
            <Select
              value={profileData.year}
              onValueChange={(value) => handleInputChange('year', value)}
              disabled={!isEditing}
            >
              <SelectTrigger className={errors.year ? "border-red-500" : ""}>
                <SelectValue placeholder="Select your year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Freshman">Freshman</SelectItem>
                <SelectItem value="Sophomore">Sophomore</SelectItem>
                <SelectItem value="Junior">Junior</SelectItem>
                <SelectItem value="Senior">Senior</SelectItem>
                <SelectItem value="Graduate">Graduate</SelectItem>
                <SelectItem value="PhD">PhD</SelectItem>
              </SelectContent>
            </Select>
            {errors.year && (
              <p className="text-red-500 text-xs mt-1">{errors.year}</p>
            )}
          </div>
        </Card>
      </div>

      {/* Emergency Contact */}
      <div className="px-6 mt-6 space-y-4">
        <h3>Emergency Contact</h3>
        
        <Card className="p-4">
          <div>
            <Label htmlFor="emergencyContact">Emergency Contact</Label>
            <Input
              id="emergencyContact"
              value={profileData.emergencyContact}
              onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
              disabled={!isEditing}
              placeholder="Name - (XXX) XXX-XXXX"
            />
            <p className="text-xs text-gray-500 mt-1">
              This contact will be notified in case of emergency
            </p>
          </div>
        </Card>
      </div>

      {/* Bio Section */}
      <div className="px-6 mt-6 space-y-4">
        <h3>About Me</h3>
        
        <Card className="p-4">
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={profileData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              disabled={!isEditing}
              placeholder="Tell us about yourself..."
              rows={4}
              className="resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              Optional: Share a bit about yourself
            </p>
          </div>
        </Card>
      </div>

      {/* Action Buttons */}
      {isEditing && (
        <div className="px-6 mt-6 pb-6">
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="py-4 rounded-2xl"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-[#0c7f99] hover:bg-[#0a6a7f] py-4 rounded-2xl"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      )}

      {/* Privacy Notice */}
      <div className="px-6 mt-6 pb-6">
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-500 text-white p-2 rounded-lg flex-shrink-0">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-blue-900">Profile Information</h4>
              <p className="text-sm text-blue-800 mt-2">
                Your profile information is used for campus safety features and emergency contacts. 
                Only authorized personnel can access this information during emergencies.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
