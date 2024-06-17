import express from "express";
import {
    employerGetAllApplications,
    jobSeekerDeleteApplication,
    jobSeekerGetAllApplications
} from "../controllers/applicationController.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.get("/jobseeker/getall", isAuthorized, employerGetAllApplications);
router.get("/employer/getall", isAuthorized, jobSeekerGetAllApplications);
router.delete("/delete/:id", isAuthorized, jobSeekerDeleteApplication);

export default router;