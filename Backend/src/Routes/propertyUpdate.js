import express from "express";
import {
  updateProperty,
  approveUpdateRequest,
  getUpdateRequests,
  rejectUpdateRequest,
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

router.put("/approve/:id", adminAuth, approveUpdateRequest);

router.get("/updateRequests", getUpdateRequests);
router.put("/reject/:id", adminAuth, rejectUpdateRequest);

export default router;
