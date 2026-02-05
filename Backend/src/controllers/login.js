import jwt from "jsonwebtoken"

export const adminLogin = (req , res) => {
    const {username , password} = req.body;

    if(!username || !password){
        return res.status(400).json({message : "All filed are required"});
    }

    if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({ message: "Invalid admin credentials" });
  }

  const token = jwt.sign(
    { role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

   res.status(200).json({
    message: "Admin login successful",
    token
  });

}