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
      type: Number,
      required: true,
    },
    propertyType: {
      type: String,
      enum: ["Plot", "Home", "Floor", "Villa"],
      required: true,
    },
    Bedroom : {
      type : Number,
    },
    Bathroom : {
      type : Number,
    },

  },
  { timestamps: true }
);

export const Properties = mongoose.model("Properties", propertiesSchema);
