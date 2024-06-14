import express from "express";
import { register, login, logout } from "../controllers/userController.js"
import{isAuthorized} from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.get("/logout",isAuthorized, logout)


export default router;