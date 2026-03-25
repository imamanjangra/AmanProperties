
import bcrypt from "bcryptjs";
import {User} from "../Models/user.model.js";
import { asyncHandler } from "../util/async-handler.js";
// import {ApiResponse} from "../util/async-handler.js"

import { ApiError } from "../util/api-error.js";
import jwt from "jsonwebtoken";
import { options } from "../constant.js";
import { uploadOnCloudinary } from "../util/cloudinary.js";
// import { CreateUser } from "../../../../URL shortener/backend/src/controllers/user.controller.js";

export const generateAccessTokenAndRefreshToken = async (id) => {
  const user = await User.findById(id);
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;

  await user.save({ validateBeforeSave: false });
  return { accessToken, refreshToken };
};

export const registerUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, mobileno, email, password } = req.body;

  if (!firstname || !mobileno || !email || !password) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  const ImageLocalPath = req.files?.image?.[0]?.path;

  const ImageUpload = await uploadOnCloudinary(ImageLocalPath);

  // if (!ImageUpload) {
  //   return res.status(500).json({
  //     message: "image upload failed",
  //   });
  // }

  const userExists = await User.findOne({
    $or: [{ email }, { mobileno }],
  });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({
    firstname,
    lastname,
    mobileno,
    email,
    password,
    image: ImageUpload || null,
  });

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(user._id);

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  return res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
      message: "User registered successfully",
      user: createdUser,
    });
});

export const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password, mobileno } = req.body;
    if (!email && !mobileno) {
      throw new ApiError(400, "Email or Mobile number is required");
    }
    if (!password) {
      throw new ApiError(400, "Password is required");
    }
    const user = await User.findOne({ $or: [{ email }, { mobileno }] });
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const PasswordCheck = await user.isPassworCorrect(password);
      // console.log(PasswordCheck);
    if (!PasswordCheck) {
      return res
        .status(400)
        .json({ message: "Password and Username is not correct :( " });
    }

    const { accessToken, refreshToken } =
      await generateAccessTokenAndRefreshToken(user._id);
    const logginUser = await User.findById(user._id).select(
      "-password -refreshToken",
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        
          {
            user: logginUser,
            accessToken,
            refreshToken,
          },
          "User logged in Successfully",
       
      );
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

export const logoutUser = asyncHandler(async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          refreshToken: undefined,
        },
      },
      {
        new: true,
      },
    );

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({message :  "User Logout successfuly " });
  } catch (error) {
     throw new ApiError(500, error.message);
  }
});

export const changeCurrentPassword = asyncHandler(async (req , res) => {
    try {
        const {oldPassword , newPassword  , confirmPassword} = req.body;

        if(!(oldPassword || newPassword || confirmPassword)){
            throw new ApiError(400 , "To update password Enter All fields ")
        }
        const user = await User.findOne(req.user._id);

        if(!user){
            throw new ApiError(400 , "user not found ")
        }
        if(newPassword !== confirmPassword){
            throw new ApiError(400 , "new password and confirm password does not match ")
        }

        const PasswordCheck = await user.isPassworCorrect(oldPassword);
        console.log(PasswordCheck);
    if (!PasswordCheck) {
      return res
        .status(400)
        .json({ message: "Password and Username is not correct :( " });
    }
        user.password = newPassword ;
         user.save({ validateBeforeSave: false });
        return res.status(200).json({message : "password update succfully "})
    } catch (error) {
        return res.status(500).json({message : "internal server error " , error : error.message , stack : error.stack})
    }
})


export const getuserData = asyncHandler(async (req , res) => {
     return res
    .status(200)
    .json({ message: "Fetch user data successfully", user: req.user });
})

export const updateImage = asyncHandler(async (req , res) => {
    try {
    const ImageLocalPath = req.files?.image?.[0]?.path;
    const ImageUpload = await uploadOnCloudinary(ImageLocalPath);

    if (!ImageUpload) {
      throw new ApiError(500, "Failed to upload image");
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          image: ImageUpload.url,
        },
      },
      {
        new: true,
      }
    ).select("-password");

    return res.status(200).json({ message: "Image updated successfully", user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message, stack: error.stack });
  }
});


export const updateUserInfo = asyncHandler(async (req , res) => {
    try {
    const { firstname, lastname, mobileno, email } = req.body;

    if (!firstname && !lastname && !email && !mobileno ) {
      return res.status(401).json({ message: "Enter data for update " });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          firstname,
          lastname,
          email,
          mobileno,
        },
      },
      {
        new: true,
      },
    ).select("-password");

    return res.status(200).json({message : "user information is updates succfully " , user})
  } catch (error) {
          return res.status(500).json({message : "internal server error " , error : error.message , stack : error.stack})

  }
})



export const refreshAccessToken = asyncHandler(async (req  , res) => {
     const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    return res.status(401).json({ message: "unauthorized request" });
  }

  try {
    const decodedToken = await jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );
    const user = await User.findById(decodedToken._id);
    if (!user) {
      return res.status(400).json({ message: "unauthorized request " });
    }
    if (user.refreshToken !== incomingRefreshToken) {
      return res.status(401).json({ message: "Token is exipired or use" });
    }

    const { accessToken, refreshToken } =
      await generateAccessTokenAndRefreshToken(user._id);


    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({ message: "Refresh Token is updated" ,  accessToken, refreshToken});
  } catch (error) {
        return res.status(500).json({message : "internal server error " , error : error.message , stack : error.stack})
  }
})