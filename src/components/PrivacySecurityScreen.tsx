import React, { useState } from "react";
import { ArrowLeft, Shield, Lock, Eye, EyeOff, Key, Database, Trash2, Download, AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { toast } from "sonner";

interface PrivacySecurityScreenProps {
  onBack: () => void;
}

export function PrivacySecurityScreen({ onBack }: PrivacySecurityScreenProps) {
  const [settings, setSettings] = useState({
    dataSharing: false,
    analytics: false,
    crashReports: true,
    locationHistory: true,
    biometricAuth: false,
    twoFactorAuth: false,
    sessionTimeout: "30", // minutes
    dataRetention: "90", // days
  });

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showDeleteAccount, setShowDeleteAccount] = useState(false);

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast.success("Setting updated");
  };

  const handleChangePassword = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    
    toast.success("Password changed successfully");
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setShowChangePassword(false);
  };

  const handleDeleteAccount = () => {
    toast.success("Account deletion request submitted");
    setShowDeleteAccount(false);
  };

  const handleExportData = () => {
    toast.success("Data export started. You'll receive an email when ready.");
  };

  const handleClearData = () => {
    toast.success("All personal data cleared");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 pt-12 pb-4 px-6 sticky top-0 z-40 backdrop-blur-lg bg-white/95">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className="hover:bg-gray-100 p-2 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1>Privacy & Security</h1>
        </div>
      </div>

      {/* Security Status */}
      <div className="px-6 mt-6">
        <Card className="p-4 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-green-500 text-white p-2 rounded-lg">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-green-900">Security Status</h4>
                <p className="text-sm text-green-800">Your account is secure</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-green-800">Last login: 2 hours ago</p>
              <p className="text-xs text-green-600">From: iPhone 15 Pro</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Privacy Settings */}
      <div className="px-6 mt-6 space-y-4">
        <h3>Privacy Settings</h3>
        
        <Card className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-xl">
                <Eye className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4>Data Sharing</h4>
                <p className="text-sm text-gray-500">Share anonymized data for app improvement</p>
              </div>
            </div>
            <Switch
              checked={settings.dataSharing}
              onCheckedChange={(checked) => handleSettingChange('dataSharing', checked)}
            />
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-2 rounded-xl">
                  <Database className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4>Analytics</h4>
                  <p className="text-sm text-gray-500">Help improve the app with usage analytics</p>
                </div>
              </div>
              <Switch
                checked={settings.analytics}
                onCheckedChange={(checked) => handleSettingChange('analytics', checked)}
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-100 p-2 rounded-xl">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h4>Crash Reports</h4>
                  <p className="text-sm text-gray-500">Automatically send crash reports</p>
                </div>
              </div>
              <Switch
                checked={settings.crashReports}
                onCheckedChange={(checked) => handleSettingChange('crashReports', checked)}
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-xl">
                  <Eye className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4>Location History</h4>
                  <p className="text-sm text-gray-500">Keep location history for safety features</p>
                </div>
              </div>
              <Switch
                checked={settings.locationHistory}
                onCheckedChange={(checked) => handleSettingChange('locationHistory', checked)}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Security Settings */}
      <div className="px-6 mt-6 space-y-4">
        <h3>Security Settings</h3>
        
        <Card className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 p-2 rounded-xl">
                <Lock className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h4>Biometric Authentication</h4>
                <p className="text-sm text-gray-500">Use fingerprint or face ID</p>
              </div>
            </div>
            <Switch
              checked={settings.biometricAuth}
              onCheckedChange={(checked) => handleSettingChange('biometricAuth', checked)}
            />
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-xl">
                  <Key className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4>Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-500">Add extra security to your account</p>
                </div>
              </div>
              <Switch
                checked={settings.twoFactorAuth}
                onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="bg-gray-100 p-2 rounded-xl">
                  <Shield className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h4>Session Timeout</h4>
                  <p className="text-sm text-gray-500">Auto-logout after inactivity</p>
                </div>
              </div>
              
              <div className="ml-12">
                <Label htmlFor="timeout">Timeout Duration</Label>
                <select
                  value={settings.sessionTimeout}
                  onChange={(e) => handleSettingChange('sessionTimeout', e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="120">2 hours</option>
                  <option value="0">Never</option>
                </select>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Account Actions */}
      <div className="px-6 mt-6 space-y-4">
        <h3>Account Actions</h3>
        
        <Card className="p-4 space-y-4">
          <Dialog open={showChangePassword} onOpenChange={setShowChangePassword}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                <Key className="w-4 h-4 mr-2" />
                Change Password
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Change Password</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    placeholder="Confirm new password"
                  />
                </div>
                <div className="flex space-x-3">
                  <Button onClick={handleChangePassword} className="flex-1">
                    Change Password
                  </Button>
                  <Button variant="outline" onClick={() => setShowChangePassword(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="outline" className="w-full justify-start" onClick={handleExportData}>
            <Download className="w-4 h-4 mr-2" />
            Export My Data
          </Button>

          <Button variant="outline" className="w-full justify-start" onClick={handleClearData}>
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Personal Data
          </Button>

          <Dialog open={showDeleteAccount} onOpenChange={setShowDeleteAccount}>
            <DialogTrigger asChild>
              <Button variant="destructive" className="w-full justify-start">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Delete Account</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  This action cannot be undone. All your data will be permanently deleted.
                </p>
                <div className="flex space-x-3">
                  <Button variant="destructive" onClick={handleDeleteAccount} className="flex-1">
                    Delete Account
                  </Button>
                  <Button variant="outline" onClick={() => setShowDeleteAccount(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </Card>
      </div>

      {/* Data Retention */}
      <div className="px-6 mt-6">
        <Card className="p-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="bg-gray-100 p-2 rounded-xl">
                <Database className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h4>Data Retention</h4>
                <p className="text-sm text-gray-500">How long to keep your data</p>
              </div>
            </div>
            
            <div className="ml-12">
              <Label htmlFor="retention">Retention Period</Label>
              <select
                value={settings.dataRetention}
                onChange={(e) => handleSettingChange('dataRetention', e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
              >
                <option value="30">30 days</option>
                <option value="90">90 days</option>
                <option value="180">6 months</option>
                <option value="365">1 year</option>
                <option value="0">Forever</option>
              </select>
            </div>
          </div>
        </Card>
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
                Your data is encrypted and stored securely. We never share your personal information 
                without your consent. Emergency contacts are only notified in genuine emergency situations.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
