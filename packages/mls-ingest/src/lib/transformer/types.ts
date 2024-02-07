import { ZodSchema } from 'zod';
import { CRMPropertyMapping } from '@lib/types';

/**
 * Describes the configuration for a data transformer, including the schemas for
 * validating input and output data, and the mapping rules for transforming data.
 *
 * @property {ZodSchema} inputSchema - A Zod schema for validating the structure and
 * types of incoming property data. Ensures that the data adheres to expected
 * formats before any processing or transformation.
 *
 * @property {ZodSchema} outputSchema - A Zod schema for validating the structure
 * and types of data after transformation. Ensures that the output data is in
 * the correct format for the target CRM system or external entity.
 *
 * @property {CRMPropertyMapping} mapping - Defines how individual fields in the input
 * data are transformed to match the output schema. This mapping is essential
 * for adapting data from various sources to a uniform target schema.
 */
export type TransformerConfig = {
  inputSchema: ZodSchema;
  outputSchema: ZodSchema;
  mapping: CRMPropertyMapping;
};
