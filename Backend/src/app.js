import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173","http://localhost:5174" , "https://amanproperties.onrender.com" , "https://amanproperties-admin.onrender.com/"
    ],
    credentials: true,
  })
);

app.use(express.json({ limit: "16KB" }));
app.use(express.urlencoded({ extended: true, limit: "16KB" }));
app.use(cookieParser());

import formRoute from './Routes/formRoute.js'
import adminRoute from './Routes/adminRoute.js'
import propertyRoute from './Routes/propertyRoute.js'
app.use("/api/v1/form" , formRoute)
app.use("/api/v1" , adminRoute)
app.use("/api/v1/properties", propertyRoute);
export { app };