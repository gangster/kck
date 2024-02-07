/**
 * The mapping configuration for the other vendor. It defines how property fields
 * should be transformed between the application's internal format and the format
 * expected by this particular vendor's CRM system.
 */
export { default as mapping } from './mapping';

/**
 * The input schema for the other vendor. This Zod schema is used to validate the
 * structure and types of incoming property data, ensuring it adheres to what is
 * expected by the other vendor before any processing or transformation.
 */
export { default as inputSchema } from './schema';

/**
 * The output schema for the other vendor, which in this case, reuses the default
 * vendor's schema. It ensures that the data being sent out to the CRM system or
 * external entities is validated against the default schema, maintaining consistency
 * and reliability in data exchanges.
 */
export { default as outputSchema } from '../default/schema';
