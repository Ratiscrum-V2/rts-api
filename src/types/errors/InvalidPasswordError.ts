import ApiError from "./ApiError";

interface InvalidPasswordError extends ApiError {
    name: "InvalidPasswordError";
}

export default InvalidPasswordError;