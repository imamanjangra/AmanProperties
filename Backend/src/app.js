import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

app.use(express.json({ limit: "16KB" }));
app.use(express.urlencoded({ extended: true, limit: "16KB" }));
app.use(cookieParser());

import formRoute from './Routes/formRoute.js'
import adminRoute from './Routes/adminRoute.js'
app.use("/api/v1/form" , formRoute)
app.use("/api/v1" , adminRoute)

export { app };