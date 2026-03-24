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
} from "../controllers/properties.js";
import { upload } from "../middleware/multer.js";
import { adminAuth } from "../middleware/loginAdmin.js";
import {Protect} from "../middleware/auth.middleware.js"

const router = express.Router();
router.get("/verifyProperty/:id"  ,  adminAuth ,  verifyProperty);
router.get("/getverifiedProperties" ,Protect ,  getverifiedProperties);
router.get("/getuserproperties" ,Protect ,  getUserProperties );
router.get("/hideProperty/:id"  ,Protect ,   hideProperty);
router.get("/searchProperties" ,Protect ,   serachProperties);
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
  Protect,
  updateProperty
);

router.delete("/:id",Protect ,  deleteProperty);






export default router;
