import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from ".jsonwebtoken";

export const isAuthorized = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("user not authorized", 400));
    }
    const decoded=jwt.verify(tokrn, process.env.JWT_SECRET_KEY );

});