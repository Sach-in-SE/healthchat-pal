
import { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Pencil, User } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock user profile data
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    dob: "1985-06-15",
    gender: "male",
    height: "175",
    weight: "70",
    bloodType: "O+",
    medicalConditions: "Mild asthma, seasonal allergies",
    medications: "Albuterol (as needed), Loratadine (10mg daily during spring/summer)",
    allergies: "Pollen, dust, penicillin",
    familyHistory: "Father: Type 2 diabetes, Mother: Hypertension",
    language: "en",
    notificationsEnabled: true,
    dataSharing: false,
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setProfile(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setProfile(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSaveChanges = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
  };
  
  return (
    <MainLayout>
      <div className="container py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              <p className="text-muted-foreground">{profile.email}</p>
            </div>
          </div>
          
          <Button 
            variant={isEditing ? "outline" : "default"} 
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? (
              "Cancel Editing"
            ) : (
              <>
                <Pencil className="mr-2 h-4 w-4" />
                Edit Profile
              </>
            )}
          </Button>
        </div>
        
        <Tabs defaultValue="personal">
          <TabsList className="mb-4">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="medical">Medical History</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Your basic information helps us personalize your health recommendations.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={profile.name} 
                      onChange={handleInputChange} 
                      disabled={!isEditing} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={profile.email} 
                      onChange={handleInputChange} 
                      disabled={!isEditing} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input 
                      id="dob" 
                      name="dob" 
                      type="date" 
                      value={profile.dob} 
                      onChange={handleInputChange} 
                      disabled={!isEditing} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <RadioGroup 
                      value={profile.gender} 
                      onValueChange={(value) => handleSelectChange("gender", value)} 
                      disabled={!isEditing}
                    >
                      <div className="flex space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="male" />
                          <Label htmlFor="male">Male</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="female" />
                          <Label htmlFor="female">Female</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="other" id="other" />
                          <Label htmlFor="other">Other</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input 
                      id="height" 
                      name="height" 
                      type="number" 
                      value={profile.height} 
                      onChange={handleInputChange} 
                      disabled={!isEditing} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input 
                      id="weight" 
                      name="weight" 
                      type="number" 
                      value={profile.weight} 
                      onChange={handleInputChange} 
                      disabled={!isEditing} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bloodType">Blood Type</Label>
                    <Select 
                      value={profile.bloodType} 
                      onValueChange={(value) => handleSelectChange("bloodType", value)} 
                      disabled={!isEditing}
                    >
                      <SelectTrigger id="bloodType">
                        <SelectValue placeholder="Select blood type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                        <SelectItem value="unknown">Unknown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              {isEditing && (
                <CardFooter>
                  <Button onClick={handleSaveChanges}>Save Changes</Button>
                </CardFooter>
              )}
            </Card>
          </TabsContent>
          
          <TabsContent value="medical">
            <Card>
              <CardHeader>
                <CardTitle>Medical History</CardTitle>
                <CardDescription>
                  Your medical information helps us provide more accurate health recommendations. 
                  This information is private and secure.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="medicalConditions">Medical Conditions</Label>
                  <Textarea 
                    id="medicalConditions" 
                    name="medicalConditions" 
                    placeholder="List any diagnosed medical conditions" 
                    value={profile.medicalConditions} 
                    onChange={handleInputChange} 
                    disabled={!isEditing} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="medications">Current Medications</Label>
                  <Textarea 
                    id="medications" 
                    name="medications" 
                    placeholder="List current medications and dosages" 
                    value={profile.medications} 
                    onChange={handleInputChange} 
                    disabled={!isEditing} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="allergies">Allergies</Label>
                  <Textarea 
                    id="allergies" 
                    name="allergies" 
                    placeholder="List any allergies (medications, food, environmental)" 
                    value={profile.allergies} 
                    onChange={handleInputChange} 
                    disabled={!isEditing} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="familyHistory">Family Medical History</Label>
                  <Textarea 
                    id="familyHistory" 
                    name="familyHistory" 
                    placeholder="List relevant family medical history" 
                    value={profile.familyHistory} 
                    onChange={handleInputChange} 
                    disabled={!isEditing} 
                  />
                </div>
              </CardContent>
              {isEditing && (
                <CardFooter>
                  <Button onClick={handleSaveChanges}>Save Changes</Button>
                </CardFooter>
              )}
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Application Settings</CardTitle>
                <CardDescription>
                  Manage your preferences and account settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Language and Region</h3>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select 
                      value={profile.language} 
                      onValueChange={(value) => handleSelectChange("language", value)} 
                      disabled={!isEditing}
                    >
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                        <SelectItem value="zh">中文</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Notifications</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notifications">Enable Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive important health reminders and updates
                      </p>
                    </div>
                    <Switch 
                      id="notifications" 
                      checked={profile.notificationsEnabled}
                      onCheckedChange={(checked) => handleSwitchChange("notificationsEnabled", checked)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Privacy & Data</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dataSharing">Anonymous Data Sharing</Label>
                      <p className="text-sm text-muted-foreground">
                        Help improve our AI by sharing anonymized data
                      </p>
                    </div>
                    <Switch 
                      id="dataSharing" 
                      checked={profile.dataSharing}
                      onCheckedChange={(checked) => handleSwitchChange("dataSharing", checked)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Account Actions</h3>
                  <div className="flex space-x-2">
                    <Button variant="outline">Change Password</Button>
                    <Button variant="outline" className="text-destructive hover:text-destructive">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
              {isEditing && (
                <CardFooter>
                  <Button onClick={handleSaveChanges}>Save Changes</Button>
                </CardFooter>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Profile;
