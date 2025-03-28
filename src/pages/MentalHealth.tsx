
import MainLayout from "@/components/layouts/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Brain, Coffee, Heart, Lightbulb, Users } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MentalHealth = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  
  const questions = [
    {
      id: "q1",
      text: "How often have you been feeling down, depressed, or hopeless over the past two weeks?",
      options: [
        { value: "not-at-all", label: "Not at all" },
        { value: "several-days", label: "Several days" },
        { value: "more-than-half", label: "More than half the days" },
        { value: "nearly-every-day", label: "Nearly every day" },
      ],
    },
    {
      id: "q2",
      text: "How often have you had little interest or pleasure in doing things over the past two weeks?",
      options: [
        { value: "not-at-all", label: "Not at all" },
        { value: "several-days", label: "Several days" },
        { value: "more-than-half", label: "More than half the days" },
        { value: "nearly-every-day", label: "Nearly every day" },
      ],
    },
    {
      id: "q3",
      text: "How would you rate your ability to cope with stress over the past month?",
      options: [
        { value: "excellent", label: "Excellent" },
        { value: "good", label: "Good" },
        { value: "fair", label: "Fair" },
        { value: "poor", label: "Poor" },
      ],
    },
    {
      id: "q4",
      text: "How often do you feel excessively worried or anxious?",
      options: [
        { value: "rarely", label: "Rarely or never" },
        { value: "occasionally", label: "Occasionally" },
        { value: "frequently", label: "Frequently" },
        { value: "constantly", label: "Constantly" },
      ],
    },
    {
      id: "q5",
      text: "How would you rate your sleep quality over the past month?",
      options: [
        { value: "very-good", label: "Very good" },
        { value: "fairly-good", label: "Fairly good" },
        { value: "fairly-bad", label: "Fairly bad" },
        { value: "very-bad", label: "Very bad" },
      ],
    },
  ];
  
  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };
  
  // Determine if user has answered all questions
  const isComplete = questions.every(q => answers[q.id]);
  
  // Determine stress level based on answers
  const getStressLevel = () => {
    const highStressAnswers = [
      answers.q1 === "nearly-every-day" || answers.q1 === "more-than-half",
      answers.q2 === "nearly-every-day" || answers.q2 === "more-than-half",
      answers.q3 === "fair" || answers.q3 === "poor",
      answers.q4 === "frequently" || answers.q4 === "constantly",
      answers.q5 === "fairly-bad" || answers.q5 === "very-bad",
    ];
    
    const highStressCount = highStressAnswers.filter(Boolean).length;
    
    if (highStressCount >= 4) return "high";
    if (highStressCount >= 2) return "moderate";
    return "low";
  };
  
  return (
    <MainLayout>
      <div className="container py-6">
        <h1 className="text-2xl font-bold mb-6">Mental Health Resources</h1>
        
        <Tabs defaultValue="assessment">
          <TabsList className="mb-4">
            <TabsTrigger value="assessment">Stress Assessment</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="techniques">Coping Techniques</TabsTrigger>
          </TabsList>
          
          <TabsContent value="assessment">
            {!showResults ? (
              <Card>
                <CardHeader>
                  <CardTitle>Mental Wellness Assessment</CardTitle>
                  <CardDescription>
                    This brief assessment will help identify your current stress and mood levels. 
                    Your answers are private and not stored.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {questions.map((question) => (
                      <div key={question.id} className="space-y-3">
                        <Label className="text-base">{question.text}</Label>
                        <RadioGroup 
                          value={answers[question.id]} 
                          onValueChange={(value) => handleAnswerChange(question.id, value)}
                        >
                          {question.options.map((option) => (
                            <div key={option.value} className="flex items-center space-x-2">
                              <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                              <Label htmlFor={`${question.id}-${option.value}`}>{option.label}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    ))}
                  </form>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleSubmit} 
                    disabled={!isComplete}
                  >
                    View Results
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Your Assessment Results</CardTitle>
                  <CardDescription>
                    Based on your responses, here's an overview of your current mental wellness.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 rounded-lg bg-muted">
                    <h3 className="font-medium mb-2">Current Stress Level:</h3>
                    <div className="flex items-center space-x-4">
                      <div className={`w-full h-3 bg-gray-200 rounded-full overflow-hidden`}>
                        <div 
                          className={`h-full rounded-full ${
                            getStressLevel() === "high" 
                              ? "bg-red-500 w-4/5" 
                              : getStressLevel() === "moderate" 
                                ? "bg-amber-500 w-1/2" 
                                : "bg-green-500 w-1/5"
                          }`}
                        ></div>
                      </div>
                      <span className="font-medium">
                        {getStressLevel() === "high" 
                          ? "High" 
                          : getStressLevel() === "moderate" 
                            ? "Moderate" 
                            : "Low"}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">What This Means:</h3>
                    
                    {getStressLevel() === "high" && (
                      <div className="p-4 border-l-4 border-red-500 bg-red-50">
                        <p className="text-sm">
                          Your responses suggest you're experiencing significant stress or mood challenges. 
                          Consider speaking with a mental health professional for personalized support. 
                          The techniques in the "Coping Techniques" tab may help in the meantime.
                        </p>
                      </div>
                    )}
                    
                    {getStressLevel() === "moderate" && (
                      <div className="p-4 border-l-4 border-amber-500 bg-amber-50">
                        <p className="text-sm">
                          Your responses indicate moderate stress or mood challenges. 
                          The coping techniques provided may be helpful, and if symptoms persist 
                          or worsen, consider consulting with a mental health professional.
                        </p>
                      </div>
                    )}
                    
                    {getStressLevel() === "low" && (
                      <div className="p-4 border-l-4 border-green-500 bg-green-50">
                        <p className="text-sm">
                          Your responses suggest relatively low stress levels. 
                          Continue practicing good self-care and the preventive techniques 
                          provided to maintain your mental wellness.
                        </p>
                      </div>
                    )}
                    
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">Recommended Next Steps:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Explore the coping techniques in the next tab</li>
                        <li>Establish a regular self-care routine</li>
                        <li>Consider tracking your mood daily to identify patterns</li>
                        {(getStressLevel() === "high" || getStressLevel() === "moderate") && (
                          <li>Chat with our AI assistant about mental health strategies</li>
                        )}
                        {getStressLevel() === "high" && (
                          <li>Reach out to a mental health professional for personalized support</li>
                        )}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <Button variant="outline" onClick={() => setShowResults(false)}>
                      Retake Assessment
                    </Button>
                    <Button onClick={() => navigate("/chat")}>
                      Discuss with HealthChat
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="resources">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Crisis Resources</CardTitle>
                  <CardDescription>
                    If you're experiencing a mental health crisis, these resources provide immediate support.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="font-medium">National Suicide Prevention Lifeline</div>
                    <p className="text-sm">24/7, free and confidential support for people in distress.</p>
                    <p className="font-medium mt-2">Call: 988 or 1-800-273-8255</p>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="font-medium">Crisis Text Line</div>
                    <p className="text-sm">Free 24/7 support via text message.</p>
                    <p className="font-medium mt-2">Text HOME to 741741</p>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="font-medium">Emergency Services</div>
                    <p className="text-sm">For immediate danger to yourself or others.</p>
                    <p className="font-medium mt-2">Call: 911</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Finding Professional Help</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Mental Health Provider Types</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li><span className="font-medium">Psychiatrists</span> - Medical doctors who can diagnose and prescribe medication</li>
                      <li><span className="font-medium">Psychologists</span> - Provide therapy and psychological testing</li>
                      <li><span className="font-medium">Licensed Counselors</span> - Provide therapy for various mental health concerns</li>
                      <li><span className="font-medium">Social Workers</span> - Provide therapy and help with accessing resources</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">How to Find a Provider</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Through your health insurance provider directory</li>
                      <li>Ask your primary care physician for a referral</li>
                      <li>Use online therapist directories like Psychology Today</li>
                      <li>Check community mental health centers for affordable options</li>
                      <li>Employee Assistance Programs (EAPs) through your workplace</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Digital Mental Health Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="font-medium">Mental Health Apps</div>
                      <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                        <li>Headspace (meditation)</li>
                        <li>Calm (sleep, meditation)</li>
                        <li>Woebot (AI therapy chatbot)</li>
                        <li>MoodMission (mood improvement strategies)</li>
                        <li>Daylio (mood tracking)</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="font-medium">Online Therapy Platforms</div>
                      <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                        <li>BetterHelp</li>
                        <li>Talkspace</li>
                        <li>Amwell</li>
                        <li>MDLive</li>
                        <li>Open Path (affordable therapy)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="techniques">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <Brain className="h-6 w-6 text-health-primary mb-2" />
                  <CardTitle>Mindfulness & Meditation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">Simple Breathing Exercise</h3>
                    <ol className="list-decimal pl-5 space-y-1 text-sm">
                      <li>Find a comfortable position and close your eyes</li>
                      <li>Breathe in slowly through your nose for 4 counts</li>
                      <li>Hold your breath for 1-2 counts</li>
                      <li>Exhale slowly through your mouth for 6 counts</li>
                      <li>Repeat for 2-5 minutes</li>
                    </ol>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-1">Body Scan Meditation</h3>
                    <p className="text-sm">
                      Starting from your toes and working up to your head, focus attention on each part of your body,
                      noticing sensations without judgment. Spend 10-20 seconds on each body part.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-1">Grounding Technique (5-4-3-2-1)</h3>
                    <p className="text-sm">When anxious, identify:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm mt-1">
                      <li>5 things you can see</li>
                      <li>4 things you can touch/feel</li>
                      <li>3 things you can hear</li>
                      <li>2 things you can smell</li>
                      <li>1 thing you can taste</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <Heart className="h-6 w-6 text-health-secondary mb-2" />
                  <CardTitle>Self-Care Practices</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">Physical Self-Care</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Aim for 7-9 hours of sleep nightly</li>
                      <li>Engage in regular physical activity</li>
                      <li>Maintain a balanced diet</li>
                      <li>Stay hydrated</li>
                      <li>Take breaks from screens</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-1">Emotional Self-Care</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Journal about your feelings</li>
                      <li>Practice self-compassion</li>
                      <li>Engage in activities you enjoy</li>
                      <li>Set healthy boundaries</li>
                      <li>Allow yourself to experience emotions without judgment</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <Coffee className="h-6 w-6 text-health-warning mb-2" />
                  <CardTitle>Stress Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">Time Management</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Prioritize tasks with a to-do list</li>
                      <li>Break large tasks into smaller steps</li>
                      <li>Set realistic goals and deadlines</li>
                      <li>Use time blocking for focused work</li>
                      <li>Build in buffer time between activities</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-1">Progressive Muscle Relaxation</h3>
                    <p className="text-sm">
                      Tense each muscle group for 5 seconds, then relax for 30 seconds.
                      Start with feet and work upward to your face.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <Users className="h-6 w-6 text-health-accent mb-2" />
                  <CardTitle>Social Connection</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">Building Support Networks</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Schedule regular check-ins with friends or family</li>
                      <li>Join groups related to your interests</li>
                      <li>Consider support groups for specific challenges</li>
                      <li>Volunteer for causes you care about</li>
                      <li>Practice active listening in conversations</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-1">Asking for Help</h3>
                    <p className="text-sm">
                      Be specific about what you need, whether emotional support, 
                      practical assistance, or just someone to listen. Remember that
                      seeking help is a sign of strength, not weakness.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader className="pb-2">
                  <Lightbulb className="h-6 w-6 text-health-primary mb-2" />
                  <CardTitle>Cognitive Techniques</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">Challenging Negative Thoughts</h3>
                    <ol className="list-decimal pl-5 space-y-1 text-sm">
                      <li>Identify the negative thought</li>
                      <li>Examine the evidence for and against it</li>
                      <li>Consider alternative perspectives</li>
                      <li>Develop a more balanced thought</li>
                    </ol>
                    <p className="text-sm mt-2">
                      Example: Instead of "I always mess everything up," try "I made a mistake, but I've also succeeded at many things."
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium mb-1">Common Cognitive Distortions</h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li><span className="font-medium">All-or-nothing thinking:</span> Seeing things in black and white categories</li>
                        <li><span className="font-medium">Overgeneralization:</span> Viewing a single negative event as a never-ending pattern</li>
                        <li><span className="font-medium">Catastrophizing:</span> Expecting disaster, blowing things out of proportion</li>
                        <li><span className="font-medium">Emotional reasoning:</span> Believing something is true because it "feels" true</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-1">Thought Journal Template</h3>
                      <ol className="list-decimal pl-5 space-y-1 text-sm">
                        <li>Situation: What happened?</li>
                        <li>Emotion: What did you feel? (Rate intensity 1-10)</li>
                        <li>Thought: What went through your mind?</li>
                        <li>Evidence: What supports/contradicts this thought?</li>
                        <li>Alternative: What's a more balanced perspective?</li>
                        <li>Outcome: How do you feel now? (Rate 1-10)</li>
                      </ol>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => navigate("/chat")}>
                    Discuss Mental Health with AI Assistant
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default MentalHealth;
