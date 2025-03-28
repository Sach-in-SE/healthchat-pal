
import MainLayout from "@/components/layouts/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const Diet = () => {
  const [activeTab, setActiveTab] = useState("finder");
  const [dietaryPreference, setDietaryPreference] = useState("");
  const [healthCondition, setHealthCondition] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [showResults, setShowResults] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
    setActiveTab("recommendations");
  };
  
  return (
    <MainLayout>
      <div className="container py-6">
        <h1 className="text-2xl font-bold mb-6">Diet Recommendations</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="finder">Diet Finder</TabsTrigger>
            <TabsTrigger value="recommendations" disabled={!showResults}>Recommendations</TabsTrigger>
            <TabsTrigger value="info">Dietary Info</TabsTrigger>
          </TabsList>
          
          <TabsContent value="finder">
            <Card>
              <CardHeader>
                <CardTitle>Personalized Diet Finder</CardTitle>
                <CardDescription>
                  Answer a few questions to get diet recommendations tailored to your needs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <Label>What is your dietary preference?</Label>
                    <RadioGroup value={dietaryPreference} onValueChange={setDietaryPreference}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="omnivore" id="omnivore" />
                        <Label htmlFor="omnivore">Omnivore (eat everything)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="vegetarian" id="vegetarian" />
                        <Label htmlFor="vegetarian">Vegetarian</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="vegan" id="vegan" />
                        <Label htmlFor="vegan">Vegan</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pescatarian" id="pescatarian" />
                        <Label htmlFor="pescatarian">Pescatarian</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="keto" id="keto" />
                        <Label htmlFor="keto">Keto</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="health-condition">Do you have any health conditions?</Label>
                    <Select value={healthCondition} onValueChange={setHealthCondition}>
                      <SelectTrigger id="health-condition">
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="diabetes">Diabetes</SelectItem>
                        <SelectItem value="hypertension">Hypertension</SelectItem>
                        <SelectItem value="heart-disease">Heart Disease</SelectItem>
                        <SelectItem value="digestive-issues">Digestive Issues</SelectItem>
                        <SelectItem value="allergies">Food Allergies</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="age-group">What is your age group?</Label>
                    <Select value={ageGroup} onValueChange={setAgeGroup}>
                      <SelectTrigger id="age-group">
                        <SelectValue placeholder="Select age group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="child">Child (under 12)</SelectItem>
                        <SelectItem value="teen">Teen (13-17)</SelectItem>
                        <SelectItem value="young-adult">Young Adult (18-30)</SelectItem>
                        <SelectItem value="adult">Adult (31-50)</SelectItem>
                        <SelectItem value="senior">Senior (50+)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={!dietaryPreference || !healthCondition || !ageGroup}
                  >
                    Get Recommendations
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="recommendations">
            <Card>
              <CardHeader>
                <CardTitle>Your Personalized Diet Plan</CardTitle>
                <CardDescription>
                  Based on your preferences and health conditions, here are dietary recommendations.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Recommended Diet Type</h3>
                  <div className="p-4 bg-muted rounded-lg">
                    {dietaryPreference === "vegetarian" && (
                      <p>Plant-based diet with dairy and eggs, rich in whole foods.</p>
                    )}
                    {dietaryPreference === "vegan" && (
                      <p>Plant-based diet with emphasis on diverse protein sources like legumes, tofu, and tempeh.</p>
                    )}
                    {dietaryPreference === "omnivore" && (
                      <p>Balanced diet with lean proteins, whole grains, and plenty of fruits and vegetables.</p>
                    )}
                    {dietaryPreference === "pescatarian" && (
                      <p>Plant-focused diet with fish and seafood as primary protein sources.</p>
                    )}
                    {dietaryPreference === "keto" && (
                      <p>Low-carb, high-fat diet with moderate protein intake.</p>
                    )}
                    
                    {/* Health condition specific recommendations */}
                    {healthCondition === "diabetes" && (
                      <p className="mt-2">With diabetes, focus on low glycemic index foods and consistent meal timing.</p>
                    )}
                    {healthCondition === "hypertension" && (
                      <p className="mt-2">For hypertension, limit sodium and focus on potassium-rich foods.</p>
                    )}
                    {healthCondition === "heart-disease" && (
                      <p className="mt-2">With heart disease concerns, emphasize heart-healthy fats and fiber.</p>
                    )}
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Foods to Include</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {dietaryPreference === "vegetarian" && (
                        <>
                          <li>Variety of colorful vegetables</li>
                          <li>Whole grains (quinoa, brown rice, oats)</li>
                          <li>Legumes (beans, lentils, chickpeas)</li>
                          <li>Nuts and seeds</li>
                          <li>Eggs and dairy products</li>
                          <li>Plant-based proteins</li>
                        </>
                      )}
                      {dietaryPreference === "vegan" && (
                        <>
                          <li>Wide variety of fruits and vegetables</li>
                          <li>Legumes and pulses</li>
                          <li>Tofu, tempeh, and seitan</li>
                          <li>Nutritional yeast</li>
                          <li>Plant-based milk alternatives</li>
                          <li>Whole grains</li>
                          <li>Nuts and seeds</li>
                        </>
                      )}
                      {dietaryPreference === "omnivore" && (
                        <>
                          <li>Lean meats and poultry</li>
                          <li>Fish and seafood</li>
                          <li>Eggs and dairy</li>
                          <li>Whole grains</li>
                          <li>Variety of fruits and vegetables</li>
                          <li>Legumes and beans</li>
                          <li>Healthy fats (olive oil, avocados)</li>
                        </>
                      )}
                      {dietaryPreference === "pescatarian" && (
                        <>
                          <li>Various fish and seafood</li>
                          <li>Eggs and dairy (optional)</li>
                          <li>Plant proteins (legumes, tofu)</li>
                          <li>Whole grains</li>
                          <li>Nuts and seeds</li>
                          <li>Abundant fruits and vegetables</li>
                        </>
                      )}
                      {dietaryPreference === "keto" && (
                        <>
                          <li>Healthy fats (avocados, olive oil, nuts)</li>
                          <li>Non-starchy vegetables</li>
                          <li>Moderate protein sources</li>
                          <li>Limited berries</li>
                          <li>Full-fat dairy</li>
                          <li>Eggs and meat (if not vegetarian)</li>
                        </>
                      )}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Foods to Limit</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {dietaryPreference === "vegetarian" && (
                        <>
                          <li>Processed meat alternatives</li>
                          <li>Excessive dairy</li>
                          <li>Refined carbohydrates</li>
                          <li>Added sugars</li>
                          <li>High-sodium foods</li>
                        </>
                      )}
                      {dietaryPreference === "vegan" && (
                        <>
                          <li>Processed vegan foods</li>
                          <li>Refined carbohydrates</li>
                          <li>Added sugars</li>
                          <li>Excessive salt</li>
                          <li>Fried foods</li>
                        </>
                      )}
                      {dietaryPreference === "omnivore" && (
                        <>
                          <li>Processed meats</li>
                          <li>Refined grains</li>
                          <li>Added sugars</li>
                          <li>Excessive sodium</li>
                          <li>Trans fats</li>
                          <li>Sugary beverages</li>
                        </>
                      )}
                      {dietaryPreference === "pescatarian" && (
                        <>
                          <li>High-mercury fish</li>
                          <li>Processed seafood</li>
                          <li>Refined grains</li>
                          <li>Added sugars</li>
                          <li>Excessive sodium</li>
                        </>
                      )}
                      {dietaryPreference === "keto" && (
                        <>
                          <li>Grains and starches</li>
                          <li>Most fruits</li>
                          <li>Root vegetables</li>
                          <li>Legumes</li>
                          <li>Added sugars</li>
                          <li>Low-fat products</li>
                        </>
                      )}
                      
                      {/* Condition-specific limitations */}
                      {healthCondition === "diabetes" && (
                        <>
                          <li>High-sugar foods and beverages</li>
                          <li>Refined carbohydrates</li>
                        </>
                      )}
                      {healthCondition === "hypertension" && (
                        <>
                          <li>High-sodium processed foods</li>
                          <li>Canned soups and sauces</li>
                        </>
                      )}
                      {healthCondition === "heart-disease" && (
                        <>
                          <li>Trans fats and saturated fats</li>
                          <li>High-cholesterol foods</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Sample Meal Plan</h3>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-md">
                      <div className="font-medium">Breakfast</div>
                      <p className="text-sm">
                        {dietaryPreference === "vegetarian" && "Greek yogurt with berries, nuts, and a drizzle of honey. Whole grain toast."}
                        {dietaryPreference === "vegan" && "Overnight oats with plant milk, chia seeds, and fresh fruit. Sprinkle of nuts."}
                        {dietaryPreference === "omnivore" && "Scrambled eggs with vegetables, whole grain toast, and a side of fruit."}
                        {dietaryPreference === "pescatarian" && "Avocado toast with scrambled eggs and a side of fresh berries."}
                        {dietaryPreference === "keto" && "Avocado and eggs with a side of sautéed spinach."}
                      </p>
                    </div>
                    
                    <div className="p-3 border rounded-md">
                      <div className="font-medium">Lunch</div>
                      <p className="text-sm">
                        {dietaryPreference === "vegetarian" && "Quinoa bowl with roasted vegetables, chickpeas, feta cheese, and tahini dressing."}
                        {dietaryPreference === "vegan" && "Buddha bowl with brown rice, roasted sweet potatoes, avocado, edamame, and tahini sauce."}
                        {dietaryPreference === "omnivore" && "Grilled chicken salad with mixed greens, vegetables, and olive oil vinaigrette."}
                        {dietaryPreference === "pescatarian" && "Tuna salad with mixed greens, olive oil dressing, and a side of quinoa."}
                        {dietaryPreference === "keto" && "Large salad with grilled chicken, avocado, cheese, and olive oil dressing."}
                      </p>
                    </div>
                    
                    <div className="p-3 border rounded-md">
                      <div className="font-medium">Dinner</div>
                      <p className="text-sm">
                        {dietaryPreference === "vegetarian" && "Vegetable stir-fry with tofu, brown rice, and a ginger-soy sauce."}
                        {dietaryPreference === "vegan" && "Lentil curry with coconut milk, served with brown rice and steamed broccoli."}
                        {dietaryPreference === "omnivore" && "Baked salmon with roasted vegetables and quinoa."}
                        {dietaryPreference === "pescatarian" && "Grilled fish with roasted vegetables and wild rice."}
                        {dietaryPreference === "keto" && "Baked salmon with asparagus sautéed in butter and garlic."}
                      </p>
                    </div>
                    
                    <div className="p-3 border rounded-md">
                      <div className="font-medium">Snacks</div>
                      <p className="text-sm">
                        {dietaryPreference === "vegetarian" && "Apple slices with almond butter, or Greek yogurt with honey."}
                        {dietaryPreference === "vegan" && "Hummus with vegetable sticks, or a small handful of mixed nuts."}
                        {dietaryPreference === "omnivore" && "Hard-boiled egg, or apple with nut butter."}
                        {dietaryPreference === "pescatarian" && "Trail mix with nuts and seeds, or hummus with vegetable sticks."}
                        {dietaryPreference === "keto" && "Cheese cubes, olives, or a small handful of mixed nuts."}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border-l-4 border-health-primary bg-health-primary/10">
                  <h3 className="font-medium mb-1">Important Note</h3>
                  <p className="text-sm">
                    These recommendations are general guidelines. Individual nutritional needs vary based on many factors. 
                    Consider consulting with a registered dietitian for personalized advice, especially if you have 
                    specific health conditions or dietary requirements.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="info">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Understanding Diet Types</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium">Mediterranean Diet</h3>
                    <p className="text-sm text-muted-foreground">
                      Rich in fruits, vegetables, whole grains, legumes, nuts, olive oil, and moderate amounts of fish, poultry, and dairy.
                      Known for heart health benefits.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">DASH Diet</h3>
                    <p className="text-sm text-muted-foreground">
                      Designed to help lower blood pressure. Emphasizes fruits, vegetables, whole grains, lean proteins, 
                      and low-fat dairy while limiting sodium, red meat, and added sugars.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Plant-Based Diets</h3>
                    <p className="text-sm text-muted-foreground">
                      Focuses on foods derived from plants with limited or no animal products. Includes vegetarian and vegan diets.
                      Associated with reduced risk of heart disease, certain cancers, and diabetes.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Ketogenic Diet</h3>
                    <p className="text-sm text-muted-foreground">
                      Very low in carbohydrates, moderate in protein, and high in fat. Causes the body to enter ketosis,
                      burning fat for energy instead of carbohydrates.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Nutrition Basics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium">Macronutrients</h3>
                    <p className="text-sm text-muted-foreground">
                      The three main macronutrients are carbohydrates, protein, and fat. Each plays essential roles
                      in the body and provides energy in varying amounts.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Micronutrients</h3>
                    <p className="text-sm text-muted-foreground">
                      Vitamins and minerals required in small amounts for normal growth, function, and health.
                      Different foods provide different micronutrients.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Hydration</h3>
                    <p className="text-sm text-muted-foreground">
                      Water is essential for nearly all bodily functions. Adults typically need 2-3 liters of water daily,
                      though needs vary based on activity level, climate, and individual factors.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Portion Control</h3>
                    <p className="text-sm text-muted-foreground">
                      Understanding appropriate portion sizes is key to maintaining a balanced diet. Even healthy
                      foods can contribute to weight gain when consumed in excess.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Diet;
