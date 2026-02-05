import dotenv from "dotenv"
dotenv.config({ path: "./.env" })  

import { app } from "./app.js"
import connectDB from "../src/db/index.js"

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log("Server running on port:", process.env.PORT);
    })
})
.catch((error) => {
    console.log("MongoDB connection FAILED!", error);
})