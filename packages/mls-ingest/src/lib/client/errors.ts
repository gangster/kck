import { AxiosError, AxiosResponse } from 'axios';

/**
 * Custom error class for HTTP request errors.
 * This class extends the native JavaScript `Error` class, providing additional
 * context specific to HTTP requests made within the application, such as the HTTP status code
 * and the original `AxiosError`.
 */
export class HttpRequestError extends Error {
  /**
   * The HTTP response associated with the error, if available.
   */
  response: AxiosResponse | undefined;

  /**
   * The HTTP status code from the error response.
   */
  status: number;

  /**
   * Constructs an instance of `HttpRequestError`.
   *
   * @param originalError - The original `AxiosError` thrown by an Axios request.
   */
  constructor(public originalError: AxiosError) {
    super(originalError.message);
    this.response = originalError.response;
    this.status = this.response?.status || 0;
    this.name = 'HttpRequestError';
    // Ensures the stack trace points to where this error was instantiated, not where Error was called.
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpRequestError);
    }
  }
}

/**
 * Custom error class indicating that the maximum number of retry attempts for an HTTP request has been exceeded.
 * This class provides details about the number of attempts made and the last encountered `HttpRequestError`.
 */
export class MaxRetriesExceededError extends Error {
  /**
   * Constructs an instance of `MaxRetriesExceededError`.
   *
   * @param count - The total number of retry attempts made.
   * @param lastError - The last `HttpRequestError` encountered during retry attempts.
   */
  constructor(
    public count: number,
    public lastError: HttpRequestError,
  ) {
    super(`Maximum retry attempts exceeded after ${count} retries.`);
    this.name = 'MaxRetriesExceededError';
    // Enhances debugging by making the stack trace point to this constructor.
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MaxRetriesExceededError);
    }
  }
}
