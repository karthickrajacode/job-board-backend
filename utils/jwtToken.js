export const sendToken = (user, statusCode, res, message) => {
    const token = user.geJWTToken();
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE - EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    }
    res.status(statusCode).cookie("token", token, options).json({
        Success: true,
        user,
        message,
        token,
    });
};