"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Lock, 
  Globe, 
  Shield, 
  Info, 
  Loader2, 
  Upload, 
  Trash2,
  EyeIcon,
  EyeOffIcon
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";

export default function AccountPage() {
  // Form states
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [isLoading, setIsLoading] = useState(false);
  const [formModified, setFormModified] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [announcement, setAnnouncement] = useState("");
  
  // Personal info states
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [username, setUsername] = useState("johndoe");
  const [bio, setBio] = useState("Web developer with 5 years of experience specializing in front-end technologies.");

  // Password states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0); // 0-4 scale
  
  // Preference states
  const [language, setLanguage] = useState("en-US");
  const [timezone, setTimezone] = useState("America/New_York");
  const [darkMode, setDarkMode] = useState(false);
  const [compactMode, setCompactMode] = useState(false);
  const [fontsize, setFontsize] = useState("14");
  
  // 2FA states
  const [useAuthenticator, setUseAuthenticator] = useState(false);
  const [useSMS, setUseSMS] = useState(true);
  
  const { toast } = useToast();

  // Calculate password strength
  const calculatePasswordStrength = (password: string) => {
    if (!password) return 0;
    
    let strength = 0;
    // Length check
    if (password.length >= 8) strength += 1;
    // Contains lowercase
    if (password.match(/[a-z]/)) strength += 1;
    // Contains uppercase
    if (password.match(/[A-Z]/)) strength += 1;
    // Contains number
    if (password.match(/[0-9]/)) strength += 1;
    // Contains special char
    if (password.match(/[^A-Za-z0-9]/)) strength += 1;
    
    return Math.min(strength, 4);
  };
  
  // Get password strength text and color
  const getPasswordStrengthInfo = (strength: number) => {
    const texts = ["", "Weak", "Fair", "Good", "Strong"];
    const colors = ["", "bg-destructive", "bg-orange-500", "bg-yellow-500", "bg-green-500"];
    const widths = ["w-0", "w-1/4", "w-2/4", "w-3/4", "w-full"];
    
    return {
      text: texts[strength],
      color: colors[strength],
      width: widths[strength]
    };
  };

  // Handle form validation
  useEffect(() => {
    const newErrors: Record<string, string> = {};
    
    // Only validate password fields if any of them have values
    if (currentPassword || newPassword || confirmPassword) {
      if (!currentPassword) newErrors.currentPassword = "Current password is required";
      if (!newPassword) newErrors.newPassword = "New password is required";
      if (newPassword && newPassword.length < 8) newErrors.newPassword = "Password must be at least 8 characters";
      if (newPassword && !confirmPassword) newErrors.confirmPassword = "Please confirm your password";
      if (newPassword && confirmPassword && newPassword !== confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }
    
    setFormErrors(newErrors);
  }, [currentPassword, newPassword, confirmPassword]);

  // Check if form is modified
  useEffect(() => {
    if (formModified) {
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  }, [formModified]);

  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = '';
  };

  // Create a component for screen reader announcements
  const ScreenReaderAnnouncement = ({ text }: { text: string }) => {
    return (
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {text}
      </div>
    );
  };

  // Handle form submissions
  const handleSaveGeneral = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
      variant: "default",
    });
    
    setAnnouncement("Profile information saved successfully.");
    setIsLoading(false);
    setFormModified(false);
  };
  
  const handleUpdatePassword = async () => {
    // Check for validation errors
    if (Object.keys(formErrors).length > 0) {
      toast({
        title: "Validation error",
        description: "Please fix the errors before submitting.",
        variant: "destructive",
      });
      setAnnouncement("Form has errors. Please fix them before submitting.");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
      variant: "default",
    });
    
    setAnnouncement("Password updated successfully.");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsLoading(false);
    setFormModified(false);
  };
  
  const handleSavePreferences = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    toast({
      title: "Preferences saved",
      description: "Your preferences have been updated successfully.",
      variant: "default",
    });
    
    setIsLoading(false);
    setFormModified(false);
  };
  
  const handleUploadPicture = () => {
    // This would be connected to a file upload component
    toast({
      title: "Upload started",
      description: "Please select an image to upload.",
      variant: "default",
    });
  };

  return (
    <TooltipProvider>
      <div className="container max-w-screen-xl mx-auto px-4" id="main-content">
        {/* Top Navigation Tabs */}
        <Tabs 
          value={activeTab} 
          onValueChange={(tab) => {
            if (formModified) {
              if (confirm("You have unsaved changes. Are you sure you want to leave?")) {
                setActiveTab(tab);
              }
            } else {
              setActiveTab(tab);
            }
          }}
          className="w-full"
        >
          <TabsList className="mb-6 w-full flex justify-start bg-background border-b pb-0 overflow-x-auto">
            <TabsTrigger 
              value="general" 
              className="flex items-center gap-2 rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger 
              value="security" 
              className="flex items-center gap-2 rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              <Lock className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger 
              value="preferences" 
              className="flex items-center gap-2 rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              <Globe className="h-4 w-4" />
              <span>Preferences</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Content Area */}
          <TabsContent value="general" className="mt-0 space-y-6 mb-8 w-full">
            {/* Profile Information */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Profile Information</h2>
                <Button
                  onClick={handleSaveGeneral}
                  disabled={isLoading || !formModified}
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Changes
                </Button>
              </div>
              
              <Card className="bg-card shadow-sm">
                <CardContent className="p-6">
                  {/* Profile Picture */}
                  <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 pb-6 border-b">
                    <div className="relative h-24 w-24 rounded-full overflow-hidden border group">
                      <div className="h-full w-full bg-muted flex items-center justify-center text-muted-foreground">
                        <User className="h-12 w-12" />
                      </div>
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                        <Upload className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <p className="text-sm text-muted-foreground">
                        JPG, GIF or PNG. Max size of 800K
                      </p>
                      <div className="flex gap-2">
                        <Button 
                          onClick={handleUploadPicture}
                          size="sm"
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Upload
                        </Button>
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "Picture removed",
                              description: "Your profile picture has been removed.",
                            });
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Personal Info Form */}
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="first-name" className="flex items-center">
                          First Name <span className="text-destructive ml-1">*</span>
                        </Label>
                        <Input 
                          id="first-name" 
                          value={firstName}
                          onChange={(e) => {
                            setFirstName(e.target.value);
                            setFormModified(true);
                          }}
                          placeholder="Enter your first name" 
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name" className="flex items-center">
                          Last Name <span className="text-destructive ml-1">*</span>
                        </Label>
                        <Input 
                          id="last-name" 
                          value={lastName}
                          onChange={(e) => {
                            setLastName(e.target.value);
                            setFormModified(true);
                          }}
                          placeholder="Enter your last name"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Input 
                          id="email" 
                          type="email" 
                          value="user@example.com" 
                          readOnly 
                          className="pr-9 bg-muted/30"
                        />
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 absolute right-3 top-3 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            Email address cannot be changed directly
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        To change your email address, please contact support
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input 
                        id="username" 
                        value={username}
                        onChange={(e) => {
                          setUsername(e.target.value);
                          setFormModified(true);
                        }}
                        placeholder="Choose a username"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <textarea 
                        id="bio"
                        className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        rows={3}
                        value={bio}
                        onChange={(e) => {
                          setBio(e.target.value);
                          setFormModified(true);
                        }}
                        placeholder="Tell us about yourself"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="security" className="mt-0 space-y-6 mb-8 w-full">
            {/* Password Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Password</h2>
                <Button
                  onClick={handleUpdatePassword}
                  disabled={
                    isLoading || 
                    Object.keys(formErrors).length > 0 || 
                    !currentPassword || 
                    !newPassword || 
                    !confirmPassword
                  }
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Update Password
                </Button>
              </div>
              
              <Card className="bg-card shadow-sm">
                <CardContent className="p-6 space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="current-password" className="flex justify-between">
                      Current Password
                      {formErrors.currentPassword && (
                        <span className="text-xs font-normal text-destructive">{formErrors.currentPassword}</span>
                      )}
                    </Label>
                    <div className="relative">
                      <Input 
                        id="current-password" 
                        type={passwordVisible ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => {
                          setCurrentPassword(e.target.value);
                          setFormModified(true);
                        }}
                        className={formErrors.currentPassword ? "border-destructive" : ""}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password" className="flex justify-between">
                      <span className="flex items-center">
                        New Password <span className="text-destructive ml-1">*</span>
                      </span>
                      {formErrors.newPassword && (
                        <span className="text-xs font-normal text-destructive">{formErrors.newPassword}</span>
                      )}
                    </Label>
                    <div className="relative">
                      <Input 
                        id="new-password" 
                        type={passwordVisible ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => {
                          const value = e.target.value;
                          setNewPassword(value);
                          setPasswordStrength(calculatePasswordStrength(value));
                          setFormModified(true);
                        }}
                        className={formErrors.newPassword ? "border-destructive" : ""}
                        aria-describedby="password-requirements"
                        required
                      />
                    </div>
                    
                    {/* Password strength meter */}
                    {newPassword && (
                      <div className="space-y-1">
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all ${getPasswordStrengthInfo(passwordStrength).color}`}
                            style={{ width: getPasswordStrengthInfo(passwordStrength).width }}
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-xs" id="password-requirements">
                            Password strength: <span className="font-medium">{getPasswordStrengthInfo(passwordStrength).text}</span>
                          </p>
                          <span className="text-xs text-muted-foreground">
                            {passwordStrength < 3 && "Add uppercase, numbers & symbols"}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="flex justify-between">
                      Confirm New Password
                      {formErrors.confirmPassword && (
                        <span className="text-xs font-normal text-destructive">{formErrors.confirmPassword}</span>
                      )}
                    </Label>
                    <div className="relative">
                      <Input 
                        id="confirm-password" 
                        type={passwordVisible ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          setFormModified(true);
                        }}
                        className={formErrors.confirmPassword ? "border-destructive" : ""}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-2">
                    <Switch 
                      id="show-password" 
                      checked={passwordVisible} 
                      onCheckedChange={setPasswordVisible} 
                    />
                    <Label htmlFor="show-password" className="flex items-center gap-2 cursor-pointer">
                      {passwordVisible ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                      {passwordVisible ? "Hide" : "Show"} password
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Two-Factor Authentication */}
            <div>
              <h2 className="text-lg font-medium mb-4">Two-Factor Authentication</h2>
              
              <Card className="bg-card shadow-sm">
                <CardContent className="p-6 space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Authenticator App</div>
                      <div className="text-sm text-muted-foreground">
                        Use an authenticator app to generate one-time codes
                      </div>
                    </div>
                    <Switch 
                      checked={useAuthenticator} 
                      onCheckedChange={(checked) => {
                        setUseAuthenticator(checked);
                        if (checked) {
                          toast({
                            title: "Setup required",
                            description: "You'll need to set up an authenticator app to continue.",
                          });
                        }
                      }} 
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">SMS Verification</div>
                      <div className="text-sm text-muted-foreground">
                        Receive a code to your phone when signing in
                      </div>
                    </div>
                    <Switch 
                      checked={useSMS} 
                      onCheckedChange={setUseSMS} 
                    />
                  </div>
                  
                  {useSMS && (
                    <div className="pl-4 border-l-2 border-muted mt-2">
                      <div className="text-sm">Phone number: +1 (XXX) XXX-XX89</div>
                      <Button 
                        variant="link" 
                        className="h-auto p-0 text-xs"
                        onClick={() => {
                          toast({
                            title: "Coming soon",
                            description: "This feature is not yet available.",
                          });
                        }}
                      >
                        Change phone number
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="preferences" className="mt-0 space-y-6 mb-8 w-full">
            {/* Language & Region */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Language & Region</h2>
                <Button
                  onClick={handleSavePreferences}
                  disabled={isLoading || !formModified}
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Preferences
                </Button>
              </div>
              
              <Card className="bg-card shadow-sm">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <select 
                        id="language"
                        className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={language}
                        onChange={(e) => {
                          setLanguage(e.target.value);
                          setFormModified(true);
                        }}
                      >
                        <option value="en-US">English (United States)</option>
                        <option value="en-GB">English (United Kingdom)</option>
                        <option value="fr-FR">French</option>
                        <option value="de-DE">German</option>
                        <option value="es-ES">Spanish</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Time Zone</Label>
                      <select 
                        id="timezone"
                        className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={timezone}
                        onChange={(e) => {
                          setTimezone(e.target.value);
                          setFormModified(true);
                        }}
                      >
                        <option value="America/New_York">Eastern Time (US & Canada)</option>
                        <option value="America/Chicago">Central Time (US & Canada)</option>
                        <option value="America/Denver">Mountain Time (US & Canada)</option>
                        <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
                        <option value="Europe/London">London</option>
                        <option value="Asia/Tokyo">Tokyo</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Display Settings */}
            <div>
              <h2 className="text-lg font-medium mb-4">Display Settings</h2>
              
              <Card className="bg-card shadow-sm">
                <CardContent className="p-6 space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium" id="dark-mode-label">Dark Mode</div>
                      <div className="text-sm text-muted-foreground" id="dark-mode-description">
                        Toggle between light and dark mode
                      </div>
                    </div>
                    <Switch 
                      id="dark-mode-switch"
                      checked={darkMode}
                      onCheckedChange={(checked) => {
                        setDarkMode(checked);
                        setFormModified(true);
                      }}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium" id="compact-mode-label">Compact Mode</div>
                      <div className="text-sm text-muted-foreground" id="compact-mode-description">
                        Display more content with less spacing
                      </div>
                    </div>
                    <Switch 
                      id="compact-mode-switch"
                      checked={compactMode}
                      onCheckedChange={(checked) => {
                        setCompactMode(checked);
                        setFormModified(true);
                      }}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium" id="font-size-label">Code Editor Font Size</div>
                      <div className="text-sm text-muted-foreground" id="font-size-description">
                        Adjust the font size in code editors
                      </div>
                    </div>
                    <select 
                      id="font-size-select"
                      className="w-24 rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={fontsize}
                      onChange={(e) => {
                        setFontsize(e.target.value);
                        setFormModified(true);
                      }}
                    >
                      <option value="12">12px</option>
                      <option value="14">14px</option>
                      <option value="16">16px</option>
                      <option value="18">18px</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <ScreenReaderAnnouncement text={announcement} />
    </TooltipProvider>
  );
} 