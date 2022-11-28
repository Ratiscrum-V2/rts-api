import ApiError from "./ApiError";

interface InexistantResourceError extends ApiError {
    name: "InexistantResourceError";
}

export default InexistantResourceError;