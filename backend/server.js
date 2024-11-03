import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";

//app config

const app = express();
const port = process.env.PORT || 4000;
//middlewares

app.use(express.json());
app.use(cors());

//api endpoint

//localhost:4000/api/admin/
app.use("/api/admin", adminRouter);
//localhost:4000/api/doctor/
app.use('/api/doctor', doctorRouter)
//localhost:4000/api/user/
app.use('/api/user', userRouter)


app.get("/", (req, res) => {
  res.send("api working ");
});

connectDB();
connectCloudinary();

app.listen(port, () => console.log("Server started", port));
