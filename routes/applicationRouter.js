import express from "express";
import { employerGetAllApplications, jobSeekerGetAllApplications } from "../controllers/applicationController.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.get("/jobseeker/getall", isAuthorized, employerGetAllApplications);
router.get("/employer/getall",isAuthorized,jobSeekerGetAllApplications)

export default router;