
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layouts/MainLayout";
import { Activity, BrainCircuit, Heart, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Heart className="h-10 w-10 text-health-primary" />,
      title: "AI Health Assistant",
      description: "Get instant answers to your health questions and concerns from our advanced AI."
    },
    {
      icon: <Activity className="h-10 w-10 text-health-secondary" />,
      title: "Symptom Checker",
      description: "Describe your symptoms and get information about possible conditions."
    },
    {
      icon: <Shield className="h-10 w-10 text-health-accent" />,
      title: "Personalized Recommendations",
      description: "Receive tailored health advice based on your profile and history."
    },
    {
      icon: <BrainCircuit className="h-10 w-10 text-health-warning" />,
      title: "Mental Health Support",
      description: "Access resources and guidance for managing stress, anxiety, and more."
    }
  ];

  return (
    <MainLayout>
      <div className="container py-6 space-y-10">
        {/* Hero Section */}
        <section className="py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent health-gradient">
            Your Personal Health Assistant
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
            Get reliable health information, check symptoms, and receive personalized recommendations with AI-powered precision.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" onClick={() => navigate('/chat')}>
              Start Chatting
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/symptoms')}>
              Check Symptoms
            </Button>
          </div>
        </section>

        {/* Features */}
        <section>
          <h2 className="text-2xl font-bold text-center mb-8">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="transition-all hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="mb-2">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-muted rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to take control of your health?</h2>
          <p className="mb-6 text-muted-foreground">
            Your wellness journey starts with a simple conversation.
          </p>
          <Button size="lg" onClick={() => navigate('/chat')}>
            Get Started Now
          </Button>
        </section>
      </div>
    </MainLayout>
  );
};

export default Index;
