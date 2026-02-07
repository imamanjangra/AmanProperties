import { useState } from 'react'
import './App.css'
import {Route, Routes} from "react-router-dom"
import Home from './pages/Home'
import ContactPage from './pages/ContactPage'
import PropertyPage from './pages/PropertyPage'
import Layout from './layout/layout.jsx'
// import PropertyPage from './pages/PropertyPage'

function App() {

  return (
   
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path='' element={<Home/>}/>
            <Route path='/contact' element={<ContactPage/>}/>
            <Route path='/propeties' element={<PropertyPage/>}/>
          </Route>
        </Routes>
     
  )
}

export default App
