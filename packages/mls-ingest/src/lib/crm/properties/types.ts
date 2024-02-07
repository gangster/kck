import { RetryConfig } from '@lib/client/types';

/**
 * Represents the available options when creating a property in the CRM system for a specific customer.
 * This interface provides the flexibility to specify input data, select a vendor configuration, implement custom error handling,
 * and configure retry behavior, thereby catering to diverse property creation scenarios.
 *
 * Attributes:
 * - `customerId`: The unique identifier for the customer associated with the property creation request.
 *                  This field ensures that the property is linked to the correct customer record in the CRM system.
 * - `input`: The property data to be created in the CRM system. This is a flexible record that can vary in structure,
 *            depending on the specific requirements of the CRM system or the chosen vendor configuration.
 * - `vendor`: An optional identifier for selecting a specific vendor configuration for property creation.
 *             If not specified, a default vendor configuration may be utilized.
 * - `errorHandler`: An optional callback function for handling errors encountered during the property creation process.
 *                   This function is invoked with the error instance, allowing for bespoke error management strategies.
 * - `retryConfig`: An optional configuration object for defining retry behavior in scenarios involving transient errors
 *                  or failures encountered during the property creation request. This enables robust handling of network
 *                  and API-related issues.
 */
export interface CreatePropertyOptions {
  customerId: number; // The customer ID for whom the property is being created.
  input: Record<string, unknown>; // The input data for creating the property.
  vendor?: string; // Optional vendor identifier.
  errorHandler?: (error: Error) => void; // Optional custom error handler.
  retryConfig?: RetryConfig; // Optional retry configuration.
}
