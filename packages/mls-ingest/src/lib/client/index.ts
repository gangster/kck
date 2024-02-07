import axios, { AxiosError } from 'axios';
import { CRMPropertyPayload } from '../vendors/default/schema';
import { retry } from './retry';
import type { CreatePropertyResponse, RetryConfig } from './types';
import { HttpRequestError } from './errors';

/**
 * Default configuration for retrying HTTP requests on transient errors.
 * This configuration helps in making resilient HTTP calls by retrying failed requests
 * that result from temporary network issues or server errors.
 */
const DEFAULT_RETRY_CONFIG: RetryConfig = {
  initialDelay: 1000, // Initial delay in milliseconds before the first retry attempt.
  maxRetries: 5, // Maximum number of retry attempts.
  multiplier: 2, // Factor by which the retry delay increases after each attempt.
  retryableStatusCodes: [500, 502, 503, 504], // HTTP status codes that trigger a retry.
};

// Constants defining the base URL and specific endpoint for creating a property in the CRM system.
export const BASE_URL = 'https://knock-crm.io';

// This string would be dynamically generated in a real-world scenario.
export const ENDPOINT = '/customer/762910/properties';

/**
 * Creates a property in the CRM system using provided property data.
 * This function abstracts the complexities of making an HTTP POST request to the CRM endpoint,
 * including error handling and retry logic for transient failures.
 *
 * @param data - The property data to be sent to the CRM system, conforming to `CRMPropertyPayload`.
 * @param retryConfig - Optional custom configuration for retry behavior, defaults to `DEFAULT_RETRY_CONFIG`.
 * @returns A promise that resolves to the response from the CRM system, detailed by `CreatePropertyResponse`.
 * @throws {HttpRequestError} - Wraps Axios errors for uniform error handling.
 */
export async function createProperty(
  data: CRMPropertyPayload,
  retryConfig: RetryConfig = DEFAULT_RETRY_CONFIG,
): Promise<CreatePropertyResponse> {
  // An async function that encapsulates the HTTP POST request logic.
  const post = async () => {
    try {
      const response = await axios.post(`${BASE_URL}${ENDPOINT}`, data);
      return response.data;
    } catch (e) {
      throw new HttpRequestError(e as AxiosError);
    }
  };

  // Execute the request with retry logic.
  return await retry(post, retryConfig);
}
