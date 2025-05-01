class HttpError extends Error {
  constructor(message, statusCode = 500, details) {
    super(message);
    this.name = "HttpError";
    this.statusCode = statusCode;
    this.details = details;
  }
}

class AuthenticationError extends HttpError {
  constructor(message) {
    super(message, 401);
    this.name = "AuthenticationError";
  }
}

export default AuthenticationError;
