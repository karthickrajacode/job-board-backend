import express from "express";
import { getAllJobs } from "../controllers/jobControllers.js"

const router = express();

router.get("/getall", getAllJobs)


export default router;