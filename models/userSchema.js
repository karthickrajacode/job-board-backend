import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name!"],
        minlength: [3, "Name must content at least 3 chracters!"],
        maxlength: [30, "Name cannot exceed 30 characters!"]
    },
    email: {
        type: String,
        required: [true, "Please provide your Email!"],
        validate: [validator.isEmail, "Please provide a valid Email"]
    },
    phone: {
        type: Number,
        required: [true, "Please provide your Number!"],
    },
    password: {
        type: String,
        required: [true, "Please provide your password!"],
        minlength: [8, "Password must content at least 8 chracters!"],
        maxlength: [32, "Password cannot exceed 30 characters!"],
        select: false
    },
    role: {
        type: String,
        required: [true, "Please provide your role!"],
        enum: ["job seeker", "Employer"]
    },
    creatAt: {
        type: Date,
        default: Date.now,
    },
});

//HASHING THE PASSWORD
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10);
});

//COMPARING PASSWORD
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
};

//GENERATING A JWT TOKEN FOR AUTHORIZATION
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECKEY_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    })
};

export const User = mongoose.model("User", userSchema);

