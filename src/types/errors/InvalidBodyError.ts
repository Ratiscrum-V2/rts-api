import ApiError from "./ApiError";

interface InvalidBodyError extends ApiError {
    name: "InvalidBodyError";
}

export default InvalidBodyError;