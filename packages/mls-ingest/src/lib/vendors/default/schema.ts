import { z } from 'zod';

/**
 * Defines the schema for a property according to the default vendor's CRM system requirements.
 * This Zod schema is used to validate the structure and data types of property information
 * before it is sent to the CRM system, ensuring that all necessary fields are present and
 * correctly formatted. It helps in catching data issues early in the data handling process.
 */
const CRMPropertySchema = z.object({
  mls_name: z.string(),
  mls_id: z.number(),
  street_address: z.string(),
  city: z.string(),
  state: z.string(),
  zip_code: z.number().min(10000).max(99999),
  list_price: z.number(),
  list_date: z.number(),
  bedrooms: z.number().optional(),
  full_baths: z.number().optional(),
  half_baths: z.number().optional(),
  size: z.number().optional(),
});

export type CRMPropertyPayload = z.infer<typeof CRMPropertySchema>; // Exports the TypeScript type inferred from the Zod schema.

export default CRMPropertySchema; // Exports the schema for use in data validation.
