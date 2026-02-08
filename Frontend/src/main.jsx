import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from "react-hot-toast";


createRoot(document.getElementById('root')).render(

    <BrowserRouter>
    <Toaster
  position="down-right"
  toastOptions={{
    duration: 4000,
    style: {
      background: "#1f2937", 
      color: "#fff",
      padding: "16px",
      borderRadius: "10px",
    },
    success: {
      style: {
        background: "#16a34a", 
      },
    },
    error: {
      style: {
        background: "#dc2626", 
      },
    },
  }}
/>
      <App />
    </BrowserRouter>

)
