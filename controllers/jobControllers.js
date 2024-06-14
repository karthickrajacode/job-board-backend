import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Job } from "../models/jobSchema.js";


export const getAllJobs = catchAsyncError(async (req, res, next) => {
    const jobs = await Job.find({ expired: false })
    res.status(200).json({
        success: true,
        jobs,
    });
});

export const postJob = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "job seeker") {
        return next(new ErrorHandler(
            "Job seeker is not allowed access is resources!",
            400
        )
        );
    }

    const { title, description, category, country, city, location, fixedSalary, salaryForm, salaryTo, } = req.body;

    if (!title || !description || !category || !city || !location) {
        return next(new ErrorHandler("Please provide full job details", 400))
    }
    if ((!salaryForm || !salaryTo) && !fixedSalary) {
        return next(
            new ErrorHandler("Please either provide fixed salary or ranged salary"
            )
        );
    }
    if ((salaryForm && salaryTo) && fixedSalary) {
        return next(
            new ErrorHandler("Please either fixed salary and ranged salary together!"
            )
        );
    }
    const postedBy = req.user._id;
    const job = await Job.create({
        title, description, category, country, city, location, fixedSalary, salaryForm, salaryTo, postedBy
    })
    res.status(200).json({
        success: true,
        message: "Job posted successfully!",
        job
    })
});

export const getmyJobs = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "job seeker") {
        return next(new ErrorHandler(
            "Job seeker is not allowed access is resources!",
            400
        )
        )
    }
    const myjobs = await Job.find({ postedBy: req.user._id });
    res.status(200).json({
        success: true,
        myjobs,
    }
    )
});