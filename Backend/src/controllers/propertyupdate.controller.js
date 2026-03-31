import { Properties } from "../Models/properties.js";
import { PropertyUpdateRequest } from "../Models/propertyUpdate.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// import { PropertyUpdateRequest } from "../Models/propertyUpdateRequest.js";

export const updateProperty = async (req, res) => {

  try {
    const property = await Properties.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // ❌ block if not owner
    if (property.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" }); 
    }

    // ❌ prevent multiple pending requests
    const existingRequest = await PropertyUpdateRequest.findOne({
      propertyId: property._id,
      status: "pending",
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "You already have a pending update request",
      });
    }

    // ✅ filter allowed fields
    const allowedFields = [
        "propertyName",
      "price",
      "description",
      "size",
      "Bedroom",
      "Bathroom",
      "Facing",
      "PropertyAge",
      "Floor",
      "location"
    ];

    const updatedData = {};

    for (let key of allowedFields) {
      if (req.body[key] !== undefined && req.body[key] !== property[key]) {
        updatedData[key] = req.body[key];
      }
    }

    // ✅ handle images separately
   if (req.files?.images && req.files.images.length > 0) {
  let newImages = [];

  for (const file of req.files.images) {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "properties",
    });

    newImages.push({
      url: result.secure_url,
      public_id: result.public_id,
    });

    fs.unlinkSync(file.path);
  }

  updatedData.images = newImages;
}

    // ❌ if nothing changed
    if (Object.keys(updatedData).length === 0) {
      return res.status(400).json({
        message: "No changes detected",
      });
    }

    // ✅ create update request
    await PropertyUpdateRequest.create({
      propertyId: property._id,
      userId: req.user._id,
      updatedData,
    });

    res.status(200).json({
      message: "Update request sent for admin approval",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create update request",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const approveUpdateRequest = async (req, res) => {
  try {
    const request = await PropertyUpdateRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    const property = await Properties.findById(request.propertyId);

    // 🔥 delete old images ONLY if new ones exist
    if (request.updatedData.images) {
      for (const img of property.images) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    }

    // ✅ apply update
    await Properties.findByIdAndUpdate(
      property._id,
      { $set: request.updatedData },
      { new: true }
    );

    request.status = "approved";
    await request.save();

    res.status(200).json({ message: "Update approved" });
  } catch (error) {
    res.status(500).json({ message: "Approval failed" });
  }
};
export const getUpdateRequests = async (req, res) => {
  try {
    const requests = await PropertyUpdateRequest.find({
      status: "pending",
    })
      .populate("propertyId")
      .populate("userId");

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({
      message: "Failed",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const rejectUpdateRequest = async (req, res) => {
  try {
    const request = await PropertyUpdateRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = "rejected";
    await request.save();

    res.status(200).json({
      message: "Update rejected",
    });
  } catch (error) {
    res.status(500).json({
      message: "Reject failed",
    });
  }
};

