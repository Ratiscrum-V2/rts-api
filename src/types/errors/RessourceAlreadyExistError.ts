import ApiError from "./ApiError";

interface RessourceAlreadyExistError extends ApiError {
    name: "RessourceAlreadyExistError";
}

export default RessourceAlreadyExistError;