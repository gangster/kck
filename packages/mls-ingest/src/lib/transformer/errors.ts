import { ZodError, ZodIssue } from 'zod'; // Importing Zod types for error handling.

/**
 * Represents an error that occurs when input data fails schema validation.
 * This error class extends the standard Error and includes additional details
 * about the validation issues encountered, as reported by Zod.
 */
export class InputSchemaValidationError extends Error {
  issues: ZodIssue[]; // An array of ZodIssue objects detailing the specific validation issues.

  /**
   * Constructs an instance of InputSchemaValidationError.
   *
   * @param {string} message - A message describing the error.
   * @param {ZodError} originalError - The original ZodError that occurred during input schema validation.
   */
  constructor(
    message: string,
    public originalError: ZodError,
  ) {
    super(message);
    this.name = 'InputSchemaValidationError';
    this.issues = originalError.issues; // Storing the validation issues from the original ZodError.

    // Capturing the stack trace, excluding the constructor call from it.
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InputSchemaValidationError);
    }
  }
}

/**
 * Represents an error that occurs when output data fails schema validation.
 * Similar to InputSchemaValidationError, it provides details about the validation
 * issues encountered, tailored for scenarios where output data doesn't meet the expected schema.
 */
export class OutputSchemaValidationError extends Error {
  issues: ZodIssue[]; // Details about the validation issues, as provided by Zod.

  /**
   * Constructs an instance of OutputSchemaValidationError.
   *
   * @param {string} message - A descriptive message for the error.
   * @param {ZodError} originalError - The ZodError encountered during output schema validation.
   */
  constructor(
    message: string,
    public originalError: ZodError,
  ) {
    super(message);
    this.name = 'OutputSchemaValidationError';
    this.issues = originalError.issues; // Capturing the specific validation issues from Zod.

    // Ensuring proper stack trace capture in V8 environments.
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, OutputSchemaValidationError);
    }
  }
}
