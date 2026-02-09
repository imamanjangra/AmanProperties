import { useContext } from 'react'
import './App.css'
import Dashbord from './Pages/Dashbord'
import Login from './Pages/Login'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import { AuthContext } from './context/Authcontext'

function App() {
   const {user} = useContext(AuthContext)
  return (
    <>
       <BrowserRouter>
      <Routes>
        <Route path="/login" element={!user ? <Login/> : <Navigate to='/admin/dashboard' />} />
        <Route path="/admin/dashboard" element={user ? <Dashbord/> : <Navigate to='/login'/>}/>
        <Route path="*" element={<Navigate to='/login' />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
