import ApiError from "./ApiError";

interface UnauthorizedError extends ApiError {
    name: "UnauthorizedError";
}

export default UnauthorizedError;