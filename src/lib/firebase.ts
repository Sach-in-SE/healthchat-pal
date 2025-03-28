
// Import Firebase SDK functions
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtQ91h2E1BR-d1tZqSt2eniaCuf5xmIPw",
  authDomain: "ai-health-chatbot-b5c5b.firebaseapp.com",
  databaseURL: "https://ai-health-chatbot-b5c5b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ai-health-chatbot-b5c5b",
  storageBucket: "ai-health-chatbot-b5c5b.firebasestorage.app",
  messagingSenderId: "301033788054",
  appId: "1:301033788054:web:7fc7b93ca3e52186fe28b7",
  measurementId: "G-16H9BG8YCL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
