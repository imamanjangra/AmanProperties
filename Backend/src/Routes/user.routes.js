import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  changeCurrentPassword,
  getuserData,
  updateUserInfo,
  refreshAccessToken,
  updateImage
} from "../controllers/user.controllers.js";
import { Protect } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.js";

const router = Router();

// Register with single profile picture
router.route("/register").post(
   upload.fields([{ name: "image", maxCount: 1 }])
  , registerUser);

router.route("/updateImage").post(
    Protect,
   upload.fields([{ name: "image", maxCount: 1 }])
  , updateImage);

// Auth routes
router.route("/login").post(loginUser);
router.route("/logout").post(Protect, logoutUser);
router.route("/changePassword").post(Protect, changeCurrentPassword);
router.route("/update").patch(Protect, updateUserInfo);
router.route("/userdata").get(Protect, getuserData);
router.route("/refreshTokens").get( refreshAccessToken);

export default router;