class ErrorHandler extends Error {
    contructer(message, stateCode) {
        Super(message)
        this.stateCode = stateCode
    }
};

export const errorMiddleWare = (err, req, res, next) => {
    err.message = err.message || "Internel server error";
    err.stateCode = err.stateCode || 500;

    if (err.name === "caseError") {
        const message = `Resource not found.invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }

    if (err.name === "JsonWebTokenError") {
        const message = `Json Web Token is invalid, Try again`;
        err = new ErrorHandler(message, 400);
    }

    if (err.name === "TokenExpiredError") {
        const message = `Json Web Token Expired, Try Again`;
        err = new ErrorHandler(message, 400);
    }
    return res.status(statusCode).json({
        success: false,
        message: err.message
    })
};
export default ErrorHandler;


