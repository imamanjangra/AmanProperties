import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const userSchema =  new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    image : {
      type : String,
    },
    mobileno: {
      type: String,
      required: true,
      unique: true,
    },
    isverified: {
      type: Boolean,
      default: false,
    },
    isblocked: {
      type: Boolean,
      default: false,
    },

    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    refreshToken : {
      type : String 
    }
  },
  { timestamps: true },
);

userSchema.pre("save" , async function () {
  if(!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password , 10); 
})


userSchema.methods.isPassworCorrect = async function(password) {
   return await bcrypt.compare(password , this.password)
}   

userSchema.methods.generateAccessToken = function() {
    return jwt.sign({

        _id : this._id,
        email : this.email,
        username : this.username,
        email : this.email
    } , 
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    })
}
userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {_id : this._id},// paylode
        process.env.REFRESH_TOKEN_SECRET,// secret
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY// expiry
        }
    )
}


export const User = mongoose.model("User", userSchema);