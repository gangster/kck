/**
 * Error class for handling failures when loading a vendor's configuration.
 * This error is thrown when the system cannot find or load the specified vendor's configuration,
 * which may occur due to the configuration file being missing, inaccessible, or corrupted.
 *
 * Attributes:
 * - `vendor`: A string indicating the vendor's name or identifier whose configuration failed to load.
 *
 * Constructor Parameters:
 * - `vendor`: The name or identifier of the vendor associated with the error.
 * - `message`: An optional message providing additional details about the error.
 *
 * The constructor initializes the error message to include the vendor's name, enhancing
 * the clarity of error logs and debugging processes. It also ensures the error stack trace
 * is captured correctly in environments that support `Error.captureStackTrace`, primarily V8 engines.
 */
export class LoadVendorConfigError extends Error {
  vendor: string;
  constructor(vendor: string) {
    super(`Error loading config for vendor '${vendor}'`);
    this.name = 'LoadVendorConfigError';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, LoadVendorConfigError);
    }
    this.vendor = vendor;
  }
}
