
// This is a placeholder service that simulates AI responses
// In a real implementation, this would connect to an API like OpenAI

const RESPONSE_DELAY = 1000; // Simulated delay in milliseconds

const healthResponses = [
  "Based on your symptoms, it sounds like you might be experiencing a common cold. Rest, hydration, and over-the-counter medications can help manage your symptoms. If they persist for more than a week, consider consulting with a healthcare provider.",
  
  "Your symptoms could be related to seasonal allergies. I'd recommend avoiding known allergens, trying an over-the-counter antihistamine, and keeping indoor air clean. If symptoms worsen, a doctor can help with prescription options.",
  
  "It's important to maintain a balanced diet rich in fruits, vegetables, whole grains, and lean proteins. Aim for 150 minutes of moderate exercise weekly, stay hydrated, and ensure you're getting 7-9 hours of quality sleep each night.",
  
  "For stress management, consider practicing mindfulness meditation, deep breathing exercises, or progressive muscle relaxation. Regular physical activity, adequate sleep, and connecting with supportive people can also significantly reduce stress levels.",
  
  "While I can provide general health information, I'm not a replacement for professional medical advice. If you're experiencing concerning symptoms, please consult with a healthcare provider for proper diagnosis and treatment.",
  
  "A Mediterranean-style diet has been shown to support heart health. This includes plenty of fruits, vegetables, whole grains, fish, olive oil, and nuts, while limiting red meat, processed foods, and added sugars.",
  
  "Regular screenings are important for preventive health. Depending on your age, gender, and risk factors, these might include blood pressure, cholesterol, diabetes, various cancers, and mental health assessments. Your primary care provider can recommend an appropriate screening schedule.",
  
  "For improving sleep quality, maintain a consistent sleep schedule, create a restful environment, limit daytime naps, manage stress, and avoid caffeine, alcohol, and large meals before bedtime. If sleep problems persist, consider speaking with a healthcare provider.",
];

export const generateAIResponse = async (userMessage: string): Promise<string> => {
  // In a real implementation, this would send the user message to an API
  // and return the response
  
  // For now, we'll simulate a response with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simplified response selection - in a real app, this would be a call to an AI API
      const randomResponse = healthResponses[Math.floor(Math.random() * healthResponses.length)];
      
      // Attempt basic contextual responses for common health questions
      let response = randomResponse;
      
      const lowerMessage = userMessage.toLowerCase();
      
      if (lowerMessage.includes("headache") || lowerMessage.includes("head pain")) {
        response = "Headaches can have many causes, including stress, dehydration, lack of sleep, or eye strain. For occasional headaches, rest, hydration, and over-the-counter pain relievers may help. If you're experiencing severe, persistent, or unusual headaches, particularly if they're accompanied by other symptoms like fever, confusion, or vision changes, you should seek medical attention promptly.";
      } else if (lowerMessage.includes("diet") || lowerMessage.includes("nutrition") || lowerMessage.includes("food")) {
        response = "A balanced diet typically includes a variety of fruits and vegetables, whole grains, lean proteins, and healthy fats. It's generally recommended to limit processed foods, added sugars, and excessive sodium. Individual dietary needs can vary based on factors like age, sex, activity level, and health conditions. If you have specific dietary concerns or requirements, consulting with a registered dietitian can provide personalized guidance.";
      } else if (lowerMessage.includes("exercise") || lowerMessage.includes("workout")) {
        response = "Regular physical activity is important for overall health. Adults are generally recommended to get at least 150 minutes of moderate-intensity aerobic activity or 75 minutes of vigorous activity each week, along with muscle-strengthening activities at least twice a week. If you're new to exercise or have health concerns, start slowly and consider consulting with a healthcare provider before beginning a new exercise regimen.";
      } else if (lowerMessage.includes("stress") || lowerMessage.includes("anxiety") || lowerMessage.includes("depress")) {
        response = "Mental health is as important as physical health. Stress, anxiety, and depression are common conditions that can benefit from various approaches, including therapy, lifestyle changes, and sometimes medication. Techniques like mindfulness meditation, deep breathing exercises, regular physical activity, and ensuring adequate sleep can help manage stress and anxiety. If you're experiencing persistent mental health concerns, please reach out to a mental health professional for proper assessment and support.";
      }
      
      resolve(response);
    }, RESPONSE_DELAY);
  });
};
