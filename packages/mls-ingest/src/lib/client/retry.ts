import { RetryConfig } from './types';
import { HttpRequestError, MaxRetriesExceededError } from './errors';

/**
 * Executes a provided asynchronous operation with retry logic based on the specified configuration.
 * It is designed to handle transient failures by retrying the operation up to a maximum number of attempts,
 * with an increasing delay between each attempt. This approach aims to enhance the resilience and reliability
 * of network requests or other operations that may temporarily fail due to external factors.
 *
 * @param {Function} operation - An asynchronous function representing the operation to be executed.
 * @param {RetryConfig} config - Settings controlling the retry behavior, including initial delay, maximum number of retries,
 *                                multiplier for delay increase, and HTTP status codes considered for retries.
 * @returns {Promise<T>} The result of the operation if it succeeds within the allowed number of retries.
 * @throws {MaxRetriesExceededError} Indicates that the operation failed after the maximum number of retries, including the last encountered error.
 * @throws {HttpRequestError} Thrown directly if an error with a non-retryable status code occurs.
 */
export async function retry<T>(
  operation: () => Promise<T>,
  { initialDelay, maxRetries, multiplier, retryableStatusCodes }: RetryConfig,
): Promise<T> {
  let delay = initialDelay;
  let lastError: HttpRequestError | null = null;
  for (let attempts = 0; attempts < maxRetries; attempts++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as HttpRequestError;

      // Check if the error's HTTP status code is not configured for retry, then rethrow the error.
      if (!retryableStatusCodes.includes(lastError.status)) {
        throw lastError;
      }

      // Wait for a delay before retrying the operation.
      await new Promise((resolve) => setTimeout(resolve, delay));
      delay *= multiplier; // Increase the delay based on the multiplier for subsequent retries.
    }
  }

  // If retries are exhausted and lastError is set, throw MaxRetriesExceededError including the last error.
  if (lastError) {
    throw new MaxRetriesExceededError(maxRetries, lastError);
  } else {
    // This case ideally should not occur as lastError should be set whenever retries are exhausted.
    throw new Error('Operation failed without capturing a specific HttpRequestError.');
  }
}
