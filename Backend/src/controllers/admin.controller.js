import { Properties } from "../Models/properties.js";
import { User } from "../Models/user.model.js";

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find().select("-password -refreshToken");
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to fetch users",
        error: error.message,
        stack: error.stack,
      });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to delete user",
        error: error.message,
        stack: error.stack,
      });
  }
};

export const updateUserinfo = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { firstname, lastname, mobileno } = req.body;

    const updatedData = {};
    if (firstname) updatedData.firstname = firstname.trim();
    if (lastname) updatedData.lastname = lastname.trim();
    if (mobileno) updatedData.mobileno = mobileno.trim();

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true },
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to update user info",
        error: error.message,
        stack: error.stack,
      });
  }
};


// properties 

export const getAllProperties = async (req, res) => {
  try {
    const properties = await Properties.find().populate("owner", "firstname lastname mobileno");
    res.status(200).json(properties);
  }
    catch (error) {
    res.status(500)
      .json({
        message: "Failed to fetch properties",
        error: error.message,
        stack: error.stack,
      });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const property = await Properties.findById(req.params.id);
    if (!property) {
        return res.status(404).json({ message: "Property not found" });
    }
    await Properties.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500)
      .json({
        message: "Failed to delete property",
        error: error.message,
        stack: error.stack,
      });
  }

};

export const getAllverfiedProperties = async (req, res) => {
  try {
 const properties = await Properties.find({
     isverifed : true, // ✅ single source of trut
    }).sort({ createdAt: -1 });
    if(!properties.length){
      return res.status(404).json({ message: "No verified properties found" });
    }
    res.status(200).json(properties);
  }
    catch (error) {
    res.status(500)
      .json({
        message: "Failed to fetch properties",
        error: error.message,
        stack: error.stack,
      });
  }
};

export const getAllUnverfiedProperties = async (req, res) => {
  try {
    const properties = await Properties.find({  isverifed : false, }).populate("owner", "firstname lastname mobileno");
    res.status(200).json(properties);
    }
    catch (error) {
    res.status(500)
      .json({
        message: "Failed to fetch properties",
        error: error.message,
        stack: error.stack,
      });
  }
};

export const iswhowingonhomepage = async (req, res) => {
  try {
    const property = await Properties.find({isShow : true}).populate("owner", "firstname lastname mobileno");
    if (!property) {
        return res.status(404).json({ message: "Property not found" });
    }   
    res.status(200).json(property);
  }
    catch (error) {
    res.status(500)
      .json({
        message: "Failed to fetch properties",
        error: error.message,
        stack: error.stack,
      });
  } 
};





