import fs from "fs";
import { Properties } from "../Models/properties.js";
import { uplodeOnCloudinary } from "../util/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";

export const createProperty = async (req, res) => {
  try {
    const { propertyName, location, description, price, propertyType } =
      req.body;

    if (!propertyName || !location || !price || !propertyType) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Images are required" });
    }

    const imageUrls = [];

    // Upload each image to cloudinary
    for (const file of req.files) {
      const cloudinaryResult = await uplodeOnCloudinary(file.path);
      console.log("API KEY:", process.env.CLOUDINARY_API_KEY);
      console.log("CLOUD NAME:", process.env.CLOUDINARY_CLOUD_NAME);
      if (!cloudinaryResult) {
        return res.status(500).json({
          message: "Image upload failed",
        });
      }
      
      imageUrls.push({
        url: cloudinaryResult.secure_url,
        public_id: cloudinaryResult.public_id,
      });
    }

    const property = await Properties.create({
      images: imageUrls,
      propertyName,
      location,
      description,
      price,
      propertyType,
    });

    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create property",
      error: error.message,
    });
  }
};

// 
/* ===============================
   GET ALL PROPERTIES (PUBLIC)
================================ */
export const getProperties = async (req, res) => {
  try {
    const properties = await Properties.find().sort({ createdAt: -1 });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch properties" });
  }
};

/* ===============================
   GET SINGLE PROPERTY (PUBLIC)
================================ */
export const getSingleProperty = async (req, res) => {
  try {
    const property = await Properties.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch property" });
  }
};

/* ===============================
   UPDATE PROPERTY (ADMIN)
================================ */
export const updateProperty = async (req, res) => {
  try {
    const property = await Properties.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    let images = property.images;

    // If new images uploaded → delete old images from cloudinary
    if (req.files && req.files.length > 0) {
      for (const img of property.images) {
        await cloudinary.uploader.destroy(img.public_id);
      }

      images = [];

      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "properties",
        });

        images.push({
          url: result.secure_url,
          public_id: result.public_id,
        });

        fs.unlinkSync(file.path);
      }
    }

    const updatedProperty = await Properties.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        images,
      },
      { new: true }
    );

    res.status(200).json(updatedProperty);
  } catch (error) {
    res.status(500).json({ message: "Failed to update property" });
  }
};

/* ===============================
   DELETE PROPERTY (ADMIN)
================================ */
export const deleteProperty = async (req, res) => {
  try {
    const property = await Properties.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    for (const img of property.images) {
      await cloudinary.uploader.destroy(img.public_id);
    }

    await Properties.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete property",
      error: error.message,
    });
  }
};

