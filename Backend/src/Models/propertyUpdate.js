import mongoose from "mongoose";

const propertyUpdateRequestSchema = new mongoose.Schema(
  {
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Properties",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    updatedData: {
      type: Object, // store only changed fields ideally
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    adminComment: {
      type: String,
    },
  },
  { timestamps: true }
);


export const PropertyUpdateRequest = mongoose.model(
  "PropertyUpdateRequest",
  propertyUpdateRequestSchema
);