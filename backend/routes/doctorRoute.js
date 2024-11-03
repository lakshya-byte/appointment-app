import express from "express";
import {
  doctorList,
  loginDoctor,
  appointmentsDoctor,
  appointmentComplete,
  appointmentCancel,
} from "../controllers/doctorController.js";
import { doctorAuth } from "../middlewares/authDoctor.js";

const doctorRouter = express.Router();

doctorRouter.get("/list", doctorList);
doctorRouter.post("/login", loginDoctor);
doctorRouter.get("/appointments", doctorAuth, appointmentsDoctor);
doctorRouter.post("/complete-appointment", doctorAuth, appointmentComplete);

doctorRouter.post("/cancel-appointment", doctorAuth, appointmentCancel);

export default doctorRouter;
