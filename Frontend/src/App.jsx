import { useState } from 'react'
import './App.css'
import {Route, Routes} from "react-router-dom"
import Home from './pages/Home'
import ContactPage from './pages/ContactPage'
import PropertyPage from './pages/PropertyPage'
import Layout from './layout/layout.jsx'
import PropertyDetails from './pages/PropertyDetails.jsx'
// import PropertyPage from './pages/PropertyPage'

function App() {

  return (
   
       <Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />             {/* Instead of path="" */}
    <Route path="contact" element={<ContactPage />} />
    <Route path="properties" element={<PropertyPage />} />
    <Route path="properties/:id" element={<PropertyDetails />} />
  </Route>
</Routes>
     
  )
}

export default App
