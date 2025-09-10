import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import path from "path"
import fs from "fs"


//app config
const app = express()
const port = process.env.PORT || 4000

//middleware
app.use(express.json())
app.use(cors())

//db connection
connectDB();

// Create uploads directory if it doesn't exist (for development only)
if (process.env.NODE_ENV !== 'production') {
  const uploadsDir = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
}

//api endpoints 
app.use("/api/food", foodRouter)

// In production, we'll serve images from a cloud provider instead
if (process.env.NODE_ENV !== 'production') {
  app.use("/images", express.static('uploads'))
}

app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get("/", (req, res) => {
  res.send("API Working")
})

// For Vercel serverless deployment
export default app;

// Only start the server if not in production
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server Started on port ${port}`)
  })
}

