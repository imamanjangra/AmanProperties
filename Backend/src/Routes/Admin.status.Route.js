import { getDashboardStats } from "../controllers/AdminStatus.js"
import { adminAuth } from "../middleware/loginAdmin.js"
import express from "express"
const router = express.Router()


router.get("/admin/user/status" , adminAuth ,getDashboardStats )

export default router   