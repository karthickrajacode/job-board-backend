import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import cloudinary from "cloudinary";
import { Job } from "../models/jobSchema.js";

export const employerGetAllApplications = catchAsyncError(async (req, res, next) => {
    const { role } = req.user; 
    if (role === "Job Seeker") {
        return next(new ErrorHandler(
            "Job Seeker is not allowed access is resources!",
            400
        )
        );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "employerID.user": _id })
    res.status(200).json({
        success: true,
        applications
    })
});
export const jobSeekerGetAllApplications = catchAsyncError(async (req, res, next) => {
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

export const jobSeekerDeleteApplication = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
        return next(new ErrorHandler(
            "Employer is not allowed access is resources!",
            400
        )
        );
    }
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
        return next(new ErrorHandler("Oops,application not found!", 404));
    }
    await application.deleteOne()
    res.status(200).json({
        success: true,
        message: "Application Delete Succesfully! "
    })
});

export const postApplication = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
        return next(new ErrorHandler(
            "Employer is not allowed access is resources!",
            400
        )
        );
    }
    if (!req.files || Object.keys(req.files) === 0) {
        return next(new ErrorHandler("Resume file required"));
    }
    const { resume } = req.files;
    const allowedFormats = ["image/png", "image/jpg", "image/webp"]
    if (!allowedFormats.includes(resume.mimetypes)) {
        return next(new ErrorHandler("Invalid the types. Please upload you resume PNG or JPG and WEBP formats."))
    }
    const cloudinary = await cloudinary.uploader.upload(
        resume.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
            "cloudinary Error:",
            cloudinaryResponse.error || "Unknown cloudinary error"
        );
        return next(new ErrorHandler("Faile to upload resume.", 500));
    }
    const { name, email, coverletter, phone, address, jobid } = req.body;
    const applicantID = {
        user: req.user._id,
        role: "job seeker"
    }
    if (!jobId) {
        return next(new ErrorHandler("Job not found!", 404));
    }
    const jobDetails = await Job.findById(jobId);
    if (!jobDetails) {
        return next(new ErrorHandler("Job not found!", 404));
    }
    const employerID = {
        user: jobDetails.postedBy,
        role: "Employer"
    }
    if (
        !name ||
        !email ||
        !coverletter ||
        !phone ||
        !address ||
        !applicantID ||
        !employerID ||
        !resume
    ) {
        return next(new ErrorHandler("Please fil all field!", 400))
    }
    const application = await Application.create({
        name,
        email,
        coverletter,
        phone,
        address,
        applicantID,
        employerID,
        resume: {
            public_id: clouddinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
    });
    res.status(200).json({
        success: true,
        message: "Application Submitted!",
        application,
    });
});