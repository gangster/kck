import type { TransformerConfig } from './types'; // Importing the type definition for transformer configurations.
import map from '@lib/mapper'; // Importing the mapping function to apply transformation rules.
import { CRMPropertyPayload } from '@lib/vendors/default/schema'; // Importing the schema type for CRM property payloads.
import { ZodError } from 'zod'; // Importing Zod for schema validation error handling.
import { InputSchemaValidationError, OutputSchemaValidationError } from './errors'; // Importing custom error classes for handling schema validation failures.

/**
 * Transforms input data according to a specified transformer configuration.
 * This function validates the input data against the provided input schema,
 * applies the mapping transformations, and then validates the transformed data
 * against the output schema.
 *
 * @param {TransformerConfig} configuration - The transformer configuration, including input and output schemas and the mapping rules.
 * @returns {CRMPropertyPayload} The transformed data that conforms to the CRMPropertyPayload schema.
 * @throws {InputSchemaValidationError} If the input data fails validation against the input schema.
 * @throws {OutputSchemaValidationError} If the transformed data fails validation against the output schema.
 */
export default ({ mapping, inputSchema, outputSchema }: TransformerConfig) =>
  (input: Record<string, unknown>): CRMPropertyPayload => {
    // Validate the input data against the input schema.
    try {
      inputSchema.parse(input);
    } catch (e) {
      const error = e as ZodError;
      throw new InputSchemaValidationError('Error parsing input schema.', error);
    }

    // Apply the mapping transformations to the input data.
    const output = map({ input, mapping });

    // Validate the transformed data against the output schema.
    try {
      outputSchema.parse(output);
    } catch (e) {
      const error = e as ZodError;
      throw new OutputSchemaValidationError('Error validating output schema.', error);
    }

    // Return the transformed data that now conforms to the CRMPropertyPayload schema.
    return output;
  };
