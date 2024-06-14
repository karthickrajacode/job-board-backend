import express from "express";
import { getAllJobs, getmyJobs, postJob } from "../controllers/jobControllers.js"
import { isAuthorized } from "../middlewares/auth.js"

const router = express.Router();

router.get("/getall", getAllJobs)
router.post("/post", isAuthorized, postJob)
router.get("/getmyjobs", isAuthorized, getmyJobs)



export default router;