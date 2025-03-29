
import { sendChatMessage } from './chat-service';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '@/contexts/AuthContext';

// This is a simple function to generate responses without actual API calls
// for development and testing when the API is not available
export async function generateAIResponse(message: string): Promise<string> {
  // Simulate API response time
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Basic response patterns based on keywords in the message
  if (message.toLowerCase().includes('cold') || message.toLowerCase().includes('flu')) {
    return "Common cold symptoms typically include runny nose, sneezing, and mild fatigue, while flu symptoms are more severe with fever, body aches, and extreme fatigue. The flu tends to come on suddenly while a cold develops gradually. If you're experiencing symptoms, make sure to rest, stay hydrated, and consult a healthcare professional if symptoms worsen.";
  }
  
  if (message.toLowerCase().includes('diet') || message.toLowerCase().includes('diabetes')) {
    return "For type 2 diabetes, a balanced diet should focus on consistent carbohydrate intake, emphasizing complex carbs with high fiber. Include lean proteins with each meal, limit added sugars and processed foods, and monitor portion sizes. Regular meal timing is important to maintain stable blood sugar levels. Always consult with a registered dietitian or your healthcare provider for personalized guidance.";
  }
  
  if (message.toLowerCase().includes('anxious') || message.toLowerCase().includes('anxiety')) {
    return "It's common to experience anxiety. Some helpful strategies include: practicing deep breathing exercises, progressive muscle relaxation, mindfulness meditation, regular physical activity, maintaining a consistent sleep schedule, limiting caffeine and alcohol, and connecting with supportive people. If anxiety is significantly affecting your daily life, consider speaking with a mental health professional for additional support and treatment options.";
  }
  
  if (message.toLowerCase().includes('back pain') || message.toLowerCase().includes('exercise')) {
    return "For lower back pain, gentle exercises that strengthen core muscles can be helpful: try walking, swimming, or stationary biking for low-impact cardio. Specific exercises like partial crunches, bridge exercises, and gentle stretching of back and hamstring muscles can provide relief. Always start slowly and stop if pain increases. Consider consulting a physical therapist for personalized recommendations based on your specific condition.";
  }
  
  // Default response for other queries
  return "Thank you for your question. While I can provide general health information, remember that I'm an AI assistant and not a substitute for professional medical advice. For personalized guidance, please consult with a healthcare provider. Is there something specific about this topic you'd like to know more about?";
}
