import express from "express";
import {
  createProperty,
  getProperties,
  getSingleProperty,
  updateProperty,
  deleteProperty,
} from "../controllers/properties.js";
import { upload } from "../middleware/multer.js";
import { adminAuth } from "../middleware/loginAdmin.js";

const router = express.Router();

// Public
router.get("/", getProperties);
router.get("/:id", getSingleProperty);

// Admin
router.post(
  "/",
  adminAuth,
  upload.array("images", 5),
  createProperty
);

router.put(
  "/:id",
  adminAuth,
  upload.array("images", 5),
  updateProperty
);

router.delete("/:id", adminAuth, deleteProperty);

export default router;
