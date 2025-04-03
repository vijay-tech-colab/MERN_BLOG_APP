export const handleError = (statusCode, message) => {
    const error = new Error(message); // Pass message to the Error constructor
    error.statusCode = statusCode;
    return error;
};
