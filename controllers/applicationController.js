import { application } from "express";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";

export const employerGetAllApplication = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
        return next(new ErrorHandler(
            "Employer is not allowed access is resources!",
            400
        )
        );
    }
    const { _id } = req.user;
    const applications = await application.find({ "applicantID.user": _id })
    res.status(200).json({
        success: true,
        applications
    })
});

