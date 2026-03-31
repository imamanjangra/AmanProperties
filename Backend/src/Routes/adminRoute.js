import express from "express"
import { getForm , deleteForm } from '../controllers/form.js'
import { getAllUser , deleteUser ,  updateUserinfo , getAllProperties , getAllverfiedProperties , getAllUnverfiedProperties , iswhowingonhomepage , deleteProperty} from "../controllers/admin.controller.js"
import { adminAuth } from "../middleware/loginAdmin.js"
import { adminLogin } from "../controllers/login.js"
// import {Protect} from "../middleware/auth.middleware.js"

const router = express.Router()

router.post('/admin/login' , adminLogin)

router.get('/forms' , adminAuth , getForm);
router.delete("/form/:id" , adminAuth , deleteForm)
router.get("/admin/Users" , adminAuth , getAllUser)
router.delete("/admin/user/:id" , adminAuth , deleteUser)
router.put("/admin/user/:id" , adminAuth , updateUserinfo)  
router.get("/admin/getAllProperties" , adminAuth , getAllProperties)
router.get("/admin/getAllVerifiedProperties"  , getAllverfiedProperties)
router.get("/admin/getAllUnverifiedProperties"  , getAllUnverfiedProperties)
router.get("/admin/getPropertyOnHomepage"  , iswhowingonhomepage)
router.delete("/admin/deleteProperty/:id"  , deleteProperty)
export default router