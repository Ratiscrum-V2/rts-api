import ApiError from "./ApiError";

interface InvalidTokenError extends ApiError {
    name: "InvalidTokenError";
}

export default InvalidTokenError;