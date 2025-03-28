
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './lib/firebase' // Import Firebase initialization

const root = createRoot(document.getElementById("root")!)
root.render(<App />)
