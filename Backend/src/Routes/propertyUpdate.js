import express from "express";
import {
  updateProperty,
  approveUpdateRequest,
} from "../controllers/propertyupdate.controller.js";
import { upload } from "../middleware/multer.js";
import { adminAuth } from "../middleware/loginAdmin.js";
import { Protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.put(
  "/:id",
  upload.fields([
  { name: "images", maxCount: 5 }
]),
  Protect,
  updateProperty,
);

router.put("/approveUpdate/:id", approveUpdateRequest);

export default router;
