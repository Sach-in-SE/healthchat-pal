
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './lib/firebase' // Import Firebase initialization

// Import RTL styles for Arabic support
import './rtl.css'

// Wrap the app with the required providers
const root = createRoot(document.getElementById("root")!)
root.render(<App />)
