import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// 1. Define allowed origins clearly
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "https://amanproperties.me",
  "https://amanproperties.onrender.com",
  "https://amanproperties-admin.onrender.com",
  "https://aman-properties.vercel.app"
];

// 2. Configure CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"]
  })
);

// 3. IMPORTANT: Handle Preflight (OPTIONS) requests explicitly
// This fixes the red "Access-Control-Allow-Origin" error in your screenshot
app.options("*", cors());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// Route Imports
import formRoute from './Routes/formRoute.js';
import adminRoute from './Routes/adminRoute.js';
import propertyRoute from './Routes/propertyRoute.js';
import userRoutes from "./Routes/user.routes.js";
import propertyUpdateRoute from "./Routes/propertyUpdate.js";
import adminStatusRoute from "./Routes/Admin.status.Route.js";

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/form", formRoute);
app.use("/api/v1", adminRoute);
app.use("/api/v1/properties", propertyRoute);
app.use("/api/v1/propertyUpdates", propertyUpdateRoute);
app.use("/api/v1", adminStatusRoute);

export { app };