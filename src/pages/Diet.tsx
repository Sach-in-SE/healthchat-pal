
import React, { useEffect, useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Diet recommendations for various health conditions
const dietRecommendations = {
  general: {
    title: "General Healthy Diet",
    description: "Recommended for overall health and wellbeing",
    tips: [
      "Eat a variety of fruits and vegetables daily",
      "Choose whole grains over refined grains",
      "Include lean proteins like fish, poultry, beans, and nuts",
      "Limit saturated fats, added sugars, and sodium",
      "Stay hydrated by drinking plenty of water throughout the day"
    ],
    foods: {
      recommended: [
        "Colorful fruits and vegetables",
        "Whole grains (brown rice, oats, quinoa)",
        "Lean proteins (chicken, fish, beans, tofu)",
        "Healthy fats (olive oil, avocados, nuts)",
        "Low-fat dairy or calcium-fortified plant alternatives"
      ],
      avoid: [
        "Processed meats (bacon, sausage)",
        "Sugary beverages and desserts",
        "Highly processed snack foods",
        "Foods high in sodium",
        "Trans fats and excessive saturated fats"
      ]
    }
  },
  diabetes: {
    title: "Diabetes-Friendly Diet",
    description: "Helpful for managing blood sugar levels",
    tips: [
      "Focus on consistent carbohydrate intake throughout the day",
      "Choose high-fiber, low-glycemic index carbohydrates",
      "Include protein with meals to slow glucose absorption",
      "Monitor portion sizes carefully",
      "Eat regular meals and avoid skipping to prevent blood sugar fluctuations"
    ],
    foods: {
      recommended: [
        "Non-starchy vegetables (leafy greens, broccoli, peppers)",
        "Whole grains in moderation (brown rice, quinoa)",
        "Lean proteins (chicken, fish, tofu, eggs)",
        "Healthy fats (avocados, olive oil, nuts)",
        "Low-glycemic fruits like berries and apples"
      ],
      avoid: [
        "Sugary beverages and desserts",
        "Refined carbohydrates (white bread, pasta, rice)",
        "Processed snack foods",
        "Fruit juices and dried fruits (high sugar content)",
        "Full-fat dairy products"
      ]
    }
  },
  hypertension: {
    title: "Heart-Healthy Diet",
    description: "Designed to support healthy blood pressure",
    tips: [
      "Reduce sodium intake to less than 2,300mg daily",
      "Increase potassium intake through fruits and vegetables",
      "Choose lean proteins and limit red meat",
      "Include heart-healthy fats like omega-3s",
      "Maintain a healthy weight through portion control"
    ],
    foods: {
      recommended: [
        "Fruits and vegetables (especially leafy greens)",
        "Whole grains (oats, brown rice, quinoa)",
        "Low-fat dairy products",
        "Fatty fish (salmon, mackerel, sardines)",
        "Nuts, seeds, and legumes"
      ],
      avoid: [
        "High-sodium processed foods",
        "Canned soups and vegetables (unless low-sodium)",
        "Salty snacks (chips, pretzels)",
        "Processed meats (deli meats, bacon)",
        "Excessive alcohol"
      ]
    }
  },
  respiratory: {
    title: "Respiratory Support Diet",
    description: "May help support lung health and breathing",
    tips: [
      "Focus on anti-inflammatory foods",
      "Stay well-hydrated to keep airways moist",
      "Maintain a healthy weight to reduce pressure on lungs",
      "Include foods rich in antioxidants",
      "Consider smaller, more frequent meals if breathing affects eating"
    ],
    foods: {
      recommended: [
        "Colorful fruits and vegetables (berries, leafy greens)",
        "Fatty fish rich in omega-3s (salmon, sardines)",
        "Nuts and seeds (walnuts, flaxseeds)",
        "Garlic, onions, and ginger",
        "Green tea"
      ],
      avoid: [
        "Excessive dairy (may increase mucus production)",
        "Processed foods with artificial additives",
        "Sulfite-containing foods (wine, dried fruits, preserved foods)",
        "Very cold foods and beverages",
        "Salt and sodium-rich foods"
      ]
    }
  },
  digestive: {
    title: "Digestive Health Diet",
    description: "Supports a healthy digestive system",
    tips: [
      "Eat smaller, more frequent meals",
      "Stay well-hydrated throughout the day",
      "Incorporate soluble and insoluble fiber",
      "Consider probiotic-rich foods for gut health",
      "Chew food thoroughly and eat slowly"
    ],
    foods: {
      recommended: [
        "Probiotic foods (yogurt, kefir, sauerkraut)",
        "Prebiotic foods (bananas, onions, garlic, asparagus)",
        "Easily digestible foods (well-cooked vegetables, ripe fruits)",
        "Fiber-rich foods (oats, flaxseeds, vegetables)",
        "Herbal teas (peppermint, ginger)"
      ],
      avoid: [
        "Spicy, fatty, and fried foods",
        "Gas-producing foods (depending on sensitivity)",
        "Artificial sweeteners",
        "Carbonated beverages",
        "Caffeine and alcohol"
      ]
    }
  }
};

const Diet = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userConditions, setUserConditions] = useState<string[]>([]);
  const [recommendedDiets, setRecommendedDiets] = useState<string[]>([]);
  
  useEffect(() => {
    const fetchUserHealthData = async () => {
      if (!currentUser) return;
      
      try {
        setLoading(true);
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          
          // Extract medical conditions from user data
          const medicalConditions = userData.medicalConditions || "";
          const conditions = medicalConditions
            .split(",")
            .map((condition: string) => condition.trim().toLowerCase())
            .filter((condition: string) => condition);
          
          setUserConditions(conditions);
          
          // Determine diet recommendations based on conditions
          const diets: string[] = [];
          
          if (conditions.some(c => 
            c.includes("diabetes") || 
            c.includes("blood sugar") || 
            c.includes("insulin")
          )) {
            diets.push("diabetes");
          }
          
          if (conditions.some(c => 
            c.includes("hypertension") || 
            c.includes("high blood pressure") || 
            c.includes("heart") || 
            c.includes("cardiac")
          )) {
            diets.push("hypertension");
          }
          
          if (conditions.some(c => 
            c.includes("asthma") || 
            c.includes("copd") || 
            c.includes("respiratory") || 
            c.includes("lung") || 
            c.includes("breathing")
          )) {
            diets.push("respiratory");
          }
          
          if (conditions.some(c => 
            c.includes("ibs") || 
            c.includes("crohn") || 
            c.includes("colitis") || 
            c.includes("gerd") || 
            c.includes("acid reflux") || 
            c.includes("digestive")
          )) {
            diets.push("digestive");
          }
          
          setRecommendedDiets(diets.length > 0 ? diets : ["general"]);
        } else {
          setRecommendedDiets(["general"]);
        }
      } catch (error) {
        console.error("Error fetching user health data:", error);
        setRecommendedDiets(["general"]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserHealthData();
  }, [currentUser]);
  
  if (loading) {
    return (
      <MainLayout>
        <div className="container py-6 flex justify-center items-center min-h-[60vh]">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-health-primary border-t-transparent"></div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="container py-6">
        <h1 className="text-2xl font-bold mb-2">Dietary Recommendations</h1>
        
        {userConditions.length > 0 ? (
          <p className="text-muted-foreground mb-6">
            Based on your medical profile: {userConditions.join(", ")}
          </p>
        ) : (
          <p className="text-muted-foreground mb-6">
            General dietary guidelines for overall health
          </p>
        )}
        
        <div className="grid gap-6 md:grid-cols-2">
          {recommendedDiets.map((dietKey) => {
            const diet = dietRecommendations[dietKey as keyof typeof dietRecommendations];
            return (
              <Card key={dietKey} className="h-full">
                <CardHeader>
                  <CardTitle>{diet.title}</CardTitle>
                  <CardDescription>{diet.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Key Principles</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {diet.tips.map((tip, index) => (
                        <li key={index} className="text-sm">{tip}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Recommended Foods</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {diet.foods.recommended.map((food, index) => (
                        <li key={index} className="text-sm">{food}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Foods to Limit or Avoid</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {diet.foods.avoid.map((food, index) => (
                        <li key={index} className="text-sm">{food}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="mt-8 flex justify-center">
          <Button onClick={() => window.location.href = "/chat"}>
            Get Personalized Diet Advice in Chat
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Diet;
