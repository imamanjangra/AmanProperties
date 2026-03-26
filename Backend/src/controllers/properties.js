import fs from "fs";
import { Properties } from "../Models/properties.js";
import { uploadOnCloudinary } from "../util/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";

export const createProperty = async (req, res) => {
  try {
    const { propertyName, location, description, price, propertyType , size , Bedroom , Bathroom , Facing , PropertyAge , Floor } =
      req.body;

    if (!propertyName || !location || !price || !propertyType) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Images are required" });
    }

    let propertyImages = [];

  if (req.files?.images) {

    for (const file of req.files.images) {

      const result = await uploadOnCloudinary(file.path);

      if (result) {
        propertyImages.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }
  }

    const property = await Properties.create({
      images: propertyImages,
      propertyName,
      location,
      description,
      price,
      propertyType,
      size,
      Bedroom,
      Bathroom,
      Facing,
      PropertyAge,
      Floor,
      owner : req.user._id
    });

    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create property",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const getProperties = async (req, res) => {
  try {
    const properties = await Properties.find().sort({ createdAt: -1 });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch properties" });
  }
};

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


export const updateProperty = async (req, res) => {
  try {
    const property = await Properties.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    let images = property.images;

  
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

export const getUserProperties = async (req, res) => {
  try {
    const properties = await Properties.find({ owner: req.user._id }).sort({
      createdAt: -1,
    }); 
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user properties" , error : error.message  , stack : error.stack });
  }
};

export const verifyProperty = async (req, res) => {
  try {
    const property = await Properties.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    property.isverifed = true;
    await property.save();
    res.status(200).json({ message: "Property verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to verify property" });
  }
};

export const unverifyProperty = async (req, res) => {
  try {
    const property = await Properties.findById(req.params.id);  
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    property.isverifed = false;
    await property.save();
    res.status(200).json({ message: "Property unverified successfully" });
  }
    catch (error) {
    res.status(500).json({ message: "Failed to unverify property" });
  }
};

export const getverifiedProperties = async (req, res) => {
  try {
    const properties = await Properties.find({ isverifed: true  , isShow: true }).sort({
      createdAt: -1,
    });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch verified properties" });
  }
};


export const hideProperty = async (req, res) => {
  try {
    const property = await Properties.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    property.isShow = !property.isShow;
    await property.save();
    res.status(200).json({ message: "Property visibility toggled successfully" });
  }
    catch (error) {
    res.status(500).json({ message: "Failed to toggle property visibility" });
  }
}

// export const serachProperties = async (req, res) => {
//   try {
//     const { query = "" } = req.query;

//     const searchQuery = {
//       isverifed: true,
//       isShow: true,
//       $or: [
//         { propertyName: { $regex: query, $options: "i" } },
//         { location: { $regex: query, $options: "i" } },
//         { propertyType: { $regex: query, $options: "i" } },
//       ],
//     };

//     // 👉 If query is a number → search by price
//     if (!isNaN(query)) {
//       searchQuery.$or.push({
//         price: query, // exact match (since it's string in DB)
//       });
//     }

//     const properties = await Properties.find(searchQuery);

//     res.status(200).json(properties);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch search results" });
//   }
// };

export const serachProperties = async (req, res) => {
  try {
    const { query = "", type = "", price = "" } = req.query;

    let filter = {
      isverifed: true,
      isShow: true,
    };

    // 🔍 SEARCH
    if (query) {
      filter.$or = [
        { propertyName: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
      ];
    }

    // 🏠 PROPERTY TYPE
    if (type && type !== "All") {
      filter.propertyType = type;
    }

    // 💰 PRICE RANGE
    if (price) {
      if (price === "under1") {
        filter.price = { $lt: "1000000" };
      } else if (price === "1to3") {
        filter.price = { $gte: "1000000", $lte: "3000000" };
      } else if (price === "above3") {
        filter.price = { $gt: "3000000" };
      }
    }

    const properties = await Properties.find(filter);

    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch search results" });
  }
};