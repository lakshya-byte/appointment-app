import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  paymentRazorpay,
  verifyRazorpay
} from "../controllers/userController.js";
import { userAuth } from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

userRouter.get("/get-profile", userAuth, getProfile);
userRouter.post(
  "/update-profile",
  upload.single("image"),
  userAuth,
  updateProfile
);
userRouter.post("/book-appointment", userAuth, bookAppointment);
userRouter.get("/appointments", userAuth, listAppointment);
userRouter.post("/cancel-appointment", userAuth, cancelAppointment);
userRouter.post("/payment-razorpay", userAuth, paymentRazorpay);
userRouter.post("/verifyRazorpay", userAuth, verifyRazorpay);

export default userRouter;
