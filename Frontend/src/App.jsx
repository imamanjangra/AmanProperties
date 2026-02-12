import { useState } from 'react'
import './App.css'
import {Route, Routes} from "react-router-dom"
import Home from './pages/Home.jsx'
import ContactPage from './pages/ContactPage.jsx'
import PropertyPage from './pages/PropertyPage.jsx'
import Layout from './layout/layout.jsx'
import PropertyDetails from './pages/PropertyDetails.jsx'
import NotFound from './pages/NotFound.jsx'
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

  <Route path="*" element={<NotFound />} />
</Routes>
     
  )
}

export default App
