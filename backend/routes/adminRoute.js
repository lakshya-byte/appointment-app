import express from "express";
import {
  addDoctor,
  loginAdmin,
  allDoctors,
  appointmentsAdmin,
  appointmentCancel,
  adminDashboard
} from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import { adminAuth } from "../middlewares/authAdmin.js";
import { changeAvailability } from "../controllers/doctorController.js";

const adminRouter = express.Router();

adminRouter.post("/add-doctor", adminAuth, upload.single("image"), addDoctor);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/all-doctors", adminAuth, allDoctors);
adminRouter.post("/change-availability", adminAuth, changeAvailability);
adminRouter.get("/appointments", adminAuth, appointmentsAdmin);
adminRouter.post("/cancel-appointment", adminAuth, appointmentCancel);
adminRouter.get("/dashboard", adminAuth, adminDashboard);

export default adminRouter;
