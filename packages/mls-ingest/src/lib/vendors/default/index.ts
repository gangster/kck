/**
 * The mapping configuration for the default vendor. This includes the mappings
 * of property fields from the CRM's expected format to the internal representation
 * used within the application, and vice versa.
 */
export { default as mapping } from './mapping';

/**
 * The input schema for the default vendor. This schema validates the structure
 * and types of property data received from external sources before it is processed
 * or transformed by the application, ensuring data integrity and consistency.
 */
export { default as inputSchema } from './schema';

/**
 * The output schema for the default vendor. Similar to the input schema, this
 * schema validates the structure and types of property data before it is sent
 * to the CRM system or other external entities, safeguarding against data anomalies.
 */
export { default as outputSchema } from './schema';
