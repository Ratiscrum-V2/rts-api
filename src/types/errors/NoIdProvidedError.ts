import ApiError from "./ApiError";

interface NoIdProvidedError extends ApiError {
    name: "NoIdProvidedError";
}

export default NoIdProvidedError;