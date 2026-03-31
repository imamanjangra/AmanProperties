import express from "express";
import {
  createProperty,
  getProperties,
  getSingleProperty,
  updateProperty,
  deleteProperty,
  getUserProperties,
  verifyProperty,
  hideProperty,
  getverifiedProperties,
  serachProperties,
  getUnverifiedProperties,
  rejectProperty,
} from "../controllers/properties.js";
import { upload } from "../middleware/multer.js";
import { adminAuth } from "../middleware/loginAdmin.js";
import {Protect} from "../middleware/auth.middleware.js"

const router = express.Router();
router.put("/verifyProperty/:id", adminAuth, verifyProperty);
router.get("/getverifiedProperties" ,Protect ,  getverifiedProperties);
router.get("/getuserproperties" ,Protect ,  getUserProperties );
router.get("/hideProperty/:id"  ,Protect ,   hideProperty);
router.get("/searchProperties" ,Protect ,   serachProperties);
router.get("/unverified", adminAuth, getUnverifiedProperties);
router.put("/reject/:id", adminAuth, rejectProperty);
// Public
router.get("/", getProperties);
router.get("/:id", getSingleProperty);

// Admin
router.post(
  "/",
  Protect,
  upload.fields([
    { name: "images", maxCount: 5 },
  ]),
  createProperty
);

router.put(
  "/:id",
  upload.fields([
    { name: "images", maxCount: 5 },
  ]),
  adminAuth,
  updateProperty
);

router.delete("/:id",Protect ,  deleteProperty);






export default router;
