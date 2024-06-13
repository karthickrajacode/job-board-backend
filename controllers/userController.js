import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error";
import { User } from "../models/userSchema.js";

export const register = catchAsyncError(async (req, res, next) => {
    const { name, email, phone, role, password } = req.body
    if (!name || !email || !phone || !role || !password ||) {
        return next(new ErrorHandler("Please full fill registeration form!"));
    }
    const isEmail = await User.Findone({ email });
    if (isEmail) {
        return next(new ErrorHandler("Email  already exist!"));
    }
    const user = await User.create({
        name,
        email,
        phone,
        role,
        password
    });
    res.status(200).json({
        success: true,
        message: "user registered!",
        user,
    });
});