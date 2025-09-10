import express from "express"
import { addFood, listFood, removeFood } from "../controllers/foodController.js"
import multer from "multer"

const foodRouter = express.Router();

// For development environment - use local storage
let upload;

if (process.env.NODE_ENV === 'production') {
  // For production - use memory storage instead of disk storage
  const storage = multer.memoryStorage();
  upload = multer({ storage: storage });
} else {
  // For development - continue using disk storage
  const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
      return cb(null, `${Date.now()}${file.originalname}`)
    }
  });
  upload = multer({ storage: storage });
}

foodRouter.post("/add", upload.single("image"), addFood)
foodRouter.get("/list", listFood)
foodRouter.post("/remove", removeFood);

export default foodRouter;