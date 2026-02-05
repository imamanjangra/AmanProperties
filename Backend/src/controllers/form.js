import { ContactForm } from "../Models/form.js";


export const createForm = async (req, res) => {
  try {
    const { firstName, lastName, mobileNo, purpose, propertype } = req.body;


    if (!firstName || !mobileNo || !purpose || !propertype) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const form = await ContactForm.create({
      firstName: firstName.trim(),
      lastName: lastName?.trim(),
      mobileNo,
      purpose,
      propertype,
    });

    res.status(201).json(form);
  } catch (error) {
    res.status(500).json({ message: "Failed to create contact form" });
  }
};


export const getForm = async (req, res) => {
  try {
    const forms = await ContactForm.find().sort({ createdAt: -1 });
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contact form data" });
  }
};


export const deleteForm = async (req, res) => {
  try {
    const { id } = req.params;

    const form = await ContactForm.findById(id);

    if (!form) {
      return res.status(404).json({ message: "Contact form not found" });
    }

    await ContactForm.findByIdAndDelete(id);

    res.status(200).json({ message: "Form deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete contact form" });
  }
};
