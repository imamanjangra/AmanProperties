import mongoose from "mongoose";

const propertiesSchema = new mongoose.Schema(
  {
    images: [
      {
        url: String,
        public_id: String,
      },
    ],
    propertyName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: String,
    price: {
      type: String,
      required: true,
    },
    propertyType: {
      type: String,
      enum: ["Plot", "Home", "Floor", "Villa"],
      required: true,
    },
    size : {
      type : String,
    },
    Bedroom : {
      type : Number,
    },
    Bathroom : {
      type : Number,
    },
    Floor : {
      type : Number,
    },
    Facing : {
      type : String,
    },
    PropertyAge : {
      type : String,
    },
    isShow : {
      type : Boolean,
      default : true
    },
      owner : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "User"
    },
    isverifed : {
      type : Boolean,
      default : false
    },
    rejectedreason : {
      type : String,
    },
     status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    isrejected : {
      type : Boolean,
      default : false
    }


  },
  { timestamps: true }
);

export const Properties = mongoose.model("Properties", propertiesSchema);
