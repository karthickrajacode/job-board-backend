import express from "express";
import { deleteJob, getAllJobs, getSingleJob, getmyJobs, postJob, updateJob } from "../controllers/jobControllers.js"
import { isAuthorized } from "../middlewares/auth.js"

const router = express.Router();

router.get("/getall", isAuthorized, getAllJobs);
router.post("/post", isAuthorized, postJob);
router.get("/getmyjobs", isAuthorized, getmyJobs);
router.put("/update/:id", isAuthorized, updateJob);
router.put("/delete/:id", isAuthorized, deleteJob);
router.get("/:id", isAuthorized, getSingleJob);

export default router;