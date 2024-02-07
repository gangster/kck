import axios, { AxiosError } from 'axios';
import { retry } from './retry';
import type { CreatePropertyOptions, CreatePropertyResponse, RetryConfig } from './types';
import { HttpRequestError, InvalidCustomerError } from './errors';

/**
 * Default configuration for retrying HTTP requests on transient errors.
 * This configuration aims to enhance the resilience of HTTP calls by automatically retrying failed requests
 * due to temporary network issues or server errors, ensuring reliable data transmission to the CRM system.
 */
const DEFAULT_RETRY_CONFIG: RetryConfig = {
  initialDelay: 1000, // Initial delay in milliseconds before the first retry attempt.
  maxRetries: 5, // Maximum number of retry attempts to ensure request success.
  multiplier: 2, // Factor by which the retry delay increases after each attempt, to gradually back off.
  retryableStatusCodes: [500, 502, 503, 504], // HTTP status codes that indicate a request should be retried.
};

// Constants for the CRM system's base URL and the dynamic endpoint for property creation.
export const BASE_URL = 'https://kck-crm.io';

/**
 * Creates a property in the CRM system for a specified customer using provided data.
 * Encapsulates the HTTP POST request complexities to the CRM endpoint, including error handling and retry logic.
 *
 * @param options - Parameters for creating a property, wrapped in an object.
 * @returns A promise resolving to the CRM system's response, detailed by `CreatePropertyResponse`.
 * @throws {HttpRequestError} - For uniform handling of Axios errors.
 */
export async function createProperty({
  customerId,
  input,
  retryConfig = DEFAULT_RETRY_CONFIG,
}: CreatePropertyOptions): Promise<CreatePropertyResponse> {
  if (!customerId) {
    throw new InvalidCustomerError(`Invalid customer ID provided: ${customerId}`);
  }
  // Function encapsulating the HTTP POST request logic.
  const post = async () => {
    try {
      const url = BASE_URL + endpoint(customerId);
      const response = await axios.post(url, input);
      return response.data; // Returns the CRM system's response.
    } catch (e) {
      throw new HttpRequestError(e as AxiosError); // Standardizes Axios errors.
    }
  };

  // Executes the request with retry logic.
  return await retry(post, retryConfig);
}

export function endpoint(customerId: number) {
  return `/customers/${customerId}/properties`;
}
