import { User } from "../Models/user.model.js"
// import { ApiError } from "../util/api-error.js";
import { ApiError } from "../util/api-error.js";
// import { asyncHandler } from "../util/async-handler.js";
import { asyncHandler } from "../util/async-handler.js";
import jwt from "jsonwebtoken"


export const Protect = asyncHandler(async (req , res , next) => {
 try {
       const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer " , "");
   
       if(!token){
           throw new ApiError(400 , "Token is not found anauthorized request ");
       }
   
       const decodedToken = jwt.verify(token ,  process.env.ACCESS_TOKEN_SECRET)
   
       if(!decodedToken){
           throw new ApiError(400 , "Not authorized token ");
       }
   
       const user = await User.findOne({_id : decodedToken._id});
   
       if(!user){
           throw new ApiError(400 , "user not found ")
       }
   
       req.user = user;
       next();
 } catch (error) {
    return res.status(500).json({message : "Somting went wrong" , error : error.message , stack : error.stack})
    // throw new ApiError(500 , "somthing went wrong " , error)
 }
})