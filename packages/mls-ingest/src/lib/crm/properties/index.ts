import { createProperty } from '@lib/client';
import { CreatePropertyResponse } from '@lib/client/types';
import transform from '@lib/transformer';
import { loadVendorConfig } from '@lib/vendors';
import { LoadVendorConfigError } from '@lib/vendors/errors';

import { InputSchemaValidationError, OutputSchemaValidationError } from '@lib/transformer/errors';
import { HttpRequestError, MaxRetriesExceededError } from '@lib/client/errors';
import { CreateOptions } from './types';

/**
 * Asynchronously creates a property in the CRM system using vendor-specific configurations.
 * This function orchestrates the process of loading the appropriate vendor configuration,
 * transforming the input data to match the vendor's schema, and then calling the CRM system's API
 * to create the property. It handles various types of errors that might occur during this process,
 * optionally invoking a custom error handler if provided.
 *
 * @param {CreateOptions} options - The options for creating a property, including the input data,
 *                                  the vendor identifier, an optional error handler, and a retry configuration.
 * @returns {Promise<CreatePropertyResponse | null>} A promise that resolves to the response from the CRM system
 *                                                   if the property is created successfully, or null if an error occurs.
 * @throws Various errors based on the failure scenario, such as configuration loading errors,
 *        schema validation errors, or HTTP request errors, unless an error handler is provided.
 */
export const create = async ({
  input,
  vendor = 'default', // Default to 'default' vendor if none is specified.
  errorHandler,
  retryConfig,
}: CreateOptions): Promise<CreatePropertyResponse | null> => {
  try {
    // Load the vendor configuration, transform the input according to the configuration,
    // and attempt to create the property in the CRM system.
    return await createProperty(transform(await loadVendorConfig(vendor))(input), retryConfig);
  } catch (e) {
    const error = e as
      | LoadVendorConfigError
      | InputSchemaValidationError
      | OutputSchemaValidationError
      | HttpRequestError
      | MaxRetriesExceededError;

    // If an error handler is provided, invoke it with the caught error.
    if (errorHandler) {
      errorHandler(error);
    } else {
      // If no error handler is provided, rethrow the error.
      throw error;
    }
    return null;
  }
};
