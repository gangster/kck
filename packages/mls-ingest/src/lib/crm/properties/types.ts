import { RetryConfig } from '@lib/client/types';
/**
 * Represents the available options when creating a property in the CRM system.
 * This interface allows for the specification of input data, vendor identification,
 * custom error handling, and retry configurations, providing flexibility in how
 * property creation requests are handled and processed.
 *
 * Attributes:
 * - `input`: The property data to be created in the CRM system. This is a flexible record
 *            that can contain any structure, depending on the specific requirements of the
 *            CRM system or the vendor configuration being used.
 * - `vendor`: An optional identifier for the vendor configuration to use when creating the property.
 *             If not specified, a default vendor configuration may be used.
 * - `errorHandler`: An optional function that can be provided to handle errors that occur during
 *                   the property creation process. This function is called with the error that occurred,
 *                   allowing for custom error handling logic to be implemented.
 * - `retryConfig`: An optional configuration for retry behavior, allowing for customization of retry
 *                  logic in the case of transient errors or failures during the property creation request.
 */
export interface CreateOptions {
  input: Record<string, unknown>; // The input data for creating the property.
  vendor?: string; // Optional vendor identifier.
  errorHandler?: (error: Error) => void; // Optional custom error handler.
  retryConfig?: RetryConfig; // Optional retry configuration.
}
