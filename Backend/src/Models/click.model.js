import mongoose from "mongoose";

const clickSchema = new mongoose.Schema(
  {
   
    browser: String,
    os: String,
    device: String,
    cpu : String
  },
  { timestamps: true }
);



export const Click =  mongoose.model("Click", clickSchema);