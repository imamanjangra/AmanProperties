import express from "express"
import { getForm , deleteForm } from '../controllers/form.js'
import { adminAuth } from "../middleware/loginAdmin.js"
import { adminLogin } from "../controllers/login.js"
// import {Protect} from "../middleware/auth.middleware.js"

const router = express.Router()

router.post('/admin/login' , adminLogin)

router.get('/forms' , adminAuth , getForm);
router.delete("/form/:id" , adminAuth , deleteForm)

export default router