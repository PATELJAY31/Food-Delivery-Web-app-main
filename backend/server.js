import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"


//app config
const app = express()
const port = process.env.PORT || 4000

//middleware
app.use(express.json())
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL, process.env.ADMIN_URL] 
    : 'http://localhost:5173',
  credentials: true
}))

//db connection
connectDB().catch(err => console.error("Initial DB connection error:", err));

//api endpoints 
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/",(req,res)=>{
    res.send("API Working")
})

// For Vercel serverless deployment, we export the app
export default app;

// Only start the server if not in production (Vercel handles this in production)
if (process.env.NODE_ENV !== 'production') {
  app.listen(port,()=>{
      console.log(`Server Started on port ${port}`)
  })
}

