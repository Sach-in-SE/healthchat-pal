
import { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Mock symptom data
const commonSymptoms = [
  "Headache", "Fever", "Cough", "Fatigue", "Sore throat", 
  "Shortness of breath", "Nausea", "Vomiting", "Diarrhea", 
  "Body aches", "Chills", "Congestion", "Loss of taste or smell"
];

const Symptoms = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  
  const filteredSymptoms = commonSymptoms.filter(symptom => 
    symptom.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms(prevSymptoms => 
      prevSymptoms.includes(symptom)
        ? prevSymptoms.filter(s => s !== symptom)
        : [...prevSymptoms, symptom]
    );
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSymptoms.length > 0) {
      setShowResults(true);
    }
  };
  
  return (
    <MainLayout>
      <div className="container py-6">
        <h1 className="text-2xl font-bold mb-6">Symptom Checker</h1>
        
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            This symptom checker is for informational purposes only and is not a qualified medical opinion. 
            Always consult with a healthcare professional for proper diagnosis and treatment.
          </AlertDescription>
        </Alert>
        
        <Tabs defaultValue="select">
          <TabsList className="mb-4">
            <TabsTrigger value="select">Select Symptoms</TabsTrigger>
            <TabsTrigger value="results" disabled={!showResults}>Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="select">
            <Card>
              <CardHeader>
                <CardTitle>What symptoms are you experiencing?</CardTitle>
                <CardDescription>
                  Select all symptoms that apply to help us provide more accurate information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <Label htmlFor="search-symptoms">Search symptoms</Label>
                    <Input
                      id="search-symptoms"
                      placeholder="Type to search symptoms..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="mb-2"
                    />
                  </div>
                  
                  <div className="space-y-2 max-h-60 overflow-y-auto p-2 border rounded-md">
                    {filteredSymptoms.length > 0 ? (
                      filteredSymptoms.map((symptom) => (
                        <div key={symptom} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`symptom-${symptom}`} 
                            checked={selectedSymptoms.includes(symptom)}
                            onCheckedChange={() => handleSymptomToggle(symptom)}
                          />
                          <label
                            htmlFor={`symptom-${symptom}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {symptom}
                          </label>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground text-sm">No symptoms match your search.</p>
                    )}
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="font-medium mb-2">Selected symptoms ({selectedSymptoms.length}):</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSymptoms.map((symptom) => (
                        <div 
                          key={`selected-${symptom}`}
                          className="bg-primary/10 px-2 py-1 rounded-full text-sm flex items-center"
                        >
                          {symptom}
                          <button
                            type="button"
                            onClick={() => handleSymptomToggle(symptom)}
                            className="ml-1 text-primary hover:text-primary/80"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      {selectedSymptoms.length === 0 && (
                        <p className="text-muted-foreground text-sm">No symptoms selected yet.</p>
                      )}
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  onClick={handleSubmit}
                  disabled={selectedSymptoms.length === 0}
                >
                  Check Symptoms
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="results">
            <Card>
              <CardHeader>
                <CardTitle>Symptom Analysis</CardTitle>
                <CardDescription>
                  Based on the symptoms you selected: {selectedSymptoms.join(", ")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Possible Conditions</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      These conditions are possibilities based on your symptoms. This is not a diagnosis.
                    </p>
                    
                    {/* Mock results based on common symptoms */}
                    {selectedSymptoms.includes("Headache") && selectedSymptoms.includes("Fever") && (
                      <div className="p-3 border rounded-md mb-2">
                        <div className="font-medium">Common Cold or Flu</div>
                        <p className="text-sm text-muted-foreground">
                          Headache and fever are common symptoms of viral infections like the common cold or flu.
                        </p>
                      </div>
                    )}
                    
                    {selectedSymptoms.includes("Cough") && selectedSymptoms.includes("Shortness of breath") && (
                      <div className="p-3 border rounded-md mb-2">
                        <div className="font-medium">Respiratory Infection</div>
                        <p className="text-sm text-muted-foreground">
                          Coughing and shortness of breath may indicate a respiratory infection or condition.
                        </p>
                      </div>
                    )}
                    
                    {selectedSymptoms.includes("Nausea") && selectedSymptoms.includes("Vomiting") && (
                      <div className="p-3 border rounded-md mb-2">
                        <div className="font-medium">Gastroenteritis</div>
                        <p className="text-sm text-muted-foreground">
                          Nausea and vomiting are common with gastroenteritis or food poisoning.
                        </p>
                      </div>
                    )}
                    
                    {/* Default response if no specific combination matched */}
                    {!((selectedSymptoms.includes("Headache") && selectedSymptoms.includes("Fever")) || 
                       (selectedSymptoms.includes("Cough") && selectedSymptoms.includes("Shortness of breath")) ||
                       (selectedSymptoms.includes("Nausea") && selectedSymptoms.includes("Vomiting"))) && (
                      <div className="p-3 border rounded-md">
                        <div className="font-medium">Multiple Possibilities</div>
                        <p className="text-sm text-muted-foreground">
                          Your combination of symptoms could indicate various conditions. Consider consulting with a healthcare professional for proper evaluation.
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">What to Do Next</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Rest and stay hydrated</li>
                      <li>Monitor your symptoms for any changes</li>
                      <li>Consider over-the-counter remedies appropriate for your symptoms</li>
                      <li>Consult with a healthcare provider for personalized advice</li>
                    </ul>
                  </div>
                  
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Seek medical attention if:</AlertTitle>
                    <AlertDescription>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Your symptoms are severe or worsening rapidly</li>
                        <li>You have difficulty breathing</li>
                        <li>You experience chest pain</li>
                        <li>You have a high fever that doesn't respond to medication</li>
                        <li>You feel confused or disoriented</li>
                      </ul>
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setShowResults(false)}>
                  Back to Symptoms
                </Button>
                <Button onClick={() => window.location.href = "/chat"}>
                  Discuss with HealthChat
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Symptoms;
