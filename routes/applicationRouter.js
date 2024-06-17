import express from "express";
import { employerGetAllApplications } from "../controllers/applicationController.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.get("/jobseeker/getall", isAuthorized, employerGetAllApplications);

export default router;