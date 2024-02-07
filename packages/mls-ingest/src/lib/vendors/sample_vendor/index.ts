/**
 * The mapping configuration for the sample vendor. This configuration outlines how property
 * attributes should be mapped from the application's internal format to the format
 * expected by the sample vendor's CRM system, ensuring accurate data transformation.
 */
export { default as mapping } from './mapping';

/**
 * The input schema for the sample vendor. Utilizing Zod for schema validation, this schema
 * ensures the incoming property data's structure and types meet the sample vendor's
 * expectations, facilitating reliable data processing and transformation.
 */
export { default as inputSchema } from './schema';

/**
 * The output schema for the sample vendor. In this setup, it reuses the default vendor's
 * schema to validate outgoing data, promoting consistency in data validation practices
 * across different vendors and enhancing the reliability of data exchanges.
 */
export { default as outputSchema } from '../default/schema';
