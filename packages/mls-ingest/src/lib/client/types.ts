import { CRMPropertyPayload } from '@lib/vendors/default/schema';

/**
 * Defines the configuration parameters for retrying operations.
 * This interface allows for specifying how retry logic should be applied to operations,
 * particularly useful for handling transient network errors or other temporary issues
 * that might benefit from multiple attempts to succeed.
 */
export type RetryConfig = {
  initialDelay: number; // The initial delay in milliseconds before the first retry attempt.
  maxRetries: number; // The maximum number of retry attempts before giving up.
  multiplier: number; // The factor by which the delay increases after each failed attempt.
  retryableStatusCodes: number[]; // HTTP status codes that are considered eligible for a retry.
};

/**
 * Represents the options for creating a property in the CRM system.
 * Allows the specification of customer ID, property data, and optional retry configuration
 * for handling transient network errors or other issues that might benefit from retry logic.
 *
 * @property {number} customerId - The unique identifier for the customer associated with the property.
 * @property {CRMPropertyPayload} input - The property data to be sent to the CRM system, conforming to the defined schema.
 * @property {RetryConfig} [retryConfig] - Optional configuration for retry behavior, allowing for customization
 *                                          of retry logic in case of transient errors or failures during the property creation process.
 */
export type CreatePropertyOptions = {
  customerId: number;
  input: CRMPropertyPayload;
  retryConfig?: RetryConfig;
};

/**
 * Describes the structure of the response expected from creating a property in the CRM system.
 * This type is used to ensure type safety and predictability of the response data structure,
 * facilitating easier data manipulation and access within the application.
 */
export type CreatePropertyResponse = {
  id: number; // The unique identifier for the created property.
  mls_name: string; // The name of the MLS (Multiple Listing Service) where the property is listed.
  mls_id: number; // A unique identifier within the MLS for the property.
  street_address: string; // The street address of the property.
  city: string; // The city where the property is located.
  state: string; // The state where the property is located.
  zip_code: number; // The postal code for the property's location.
  list_price: number; // The listing price of the property.
  list_date: number; // The date when the property was listed, represented as a Unix timestamp.
  bedrooms?: number; // Optional number of bedrooms in the property.
  full_baths?: number; // Optional number of full bathrooms in the property.
  half_baths?: number; // Optional number of half bathrooms in the property.
  size?: number; // Optional size of the property in square feet.
};
