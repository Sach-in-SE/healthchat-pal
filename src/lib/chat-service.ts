
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

// Define the Together AI API key
const TOGETHER_API_KEY = "343084b5b60711aacaa2995ffd57bd11478a7d4970b7743c7174ac6972c05cb4";
const API_URL = "https://api.together.xyz/v1/chat/completions";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface ChatRequest {
  userId: string;
  messages: ChatMessage[];
  symptomContext?: string;
}

export async function sendChatMessage({ userId, messages, symptomContext }: ChatRequest) {
  try {
    // Include symptom context if provided
    const contextualizedMessages = [...messages];
    
    if (symptomContext) {
      contextualizedMessages.unshift({
        role: "system",
        content: `The user has reported the following symptoms: ${symptomContext}. Consider this context when providing health advice.`
      });
    } else {
      contextualizedMessages.unshift({
        role: "system",
        content: "You are a helpful AI health assistant. Provide accurate information and always remind users to consult healthcare professionals for medical advice."
      });
    }
    
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${TOGETHER_API_KEY}`
      },
      body: JSON.stringify({
        model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
        messages: contextualizedMessages,
        temperature: 0.7,
        max_tokens: 800
      })
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    const assistantMessage = data.choices[0].message.content;
    
    // Save chat history
    const userMessage = messages[messages.length - 1].content;
    await saveChatHistory(userId, userMessage, assistantMessage);
    
    return assistantMessage;
  } catch (error) {
    console.error("Error sending chat message:", error);
    throw error;
  }
}

async function saveChatHistory(userId: string, userMessage: string, assistantResponse: string) {
  try {
    // Get first 50 characters or the first sentence as title
    const title = userMessage.split('.')[0].substring(0, 50) + (userMessage.length > 50 ? '...' : '');
    
    await addDoc(collection(db, "chatHistory"), {
      userId,
      title,
      preview: userMessage.substring(0, 100) + (userMessage.length > 100 ? '...' : ''),
      userMessage,
      assistantResponse,
      date: serverTimestamp()
    });
  } catch (error) {
    console.error("Error saving chat history:", error);
  }
}
