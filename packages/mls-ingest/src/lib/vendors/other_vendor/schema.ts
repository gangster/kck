import { z } from 'zod';

/**
 * Defines the schema for property data according to the specifications of the "other vendor".
 * This Zod schema is used for validating the format and types of property information
 * when interacting with the other vendor's systems. It ensures that the data conforms
 * to expected structures, reducing the likelihood of errors during data exchange.
 */
const OtherVendorInputSchema = z.object({
  mlsName: z.string(),
  mlsId: z.number(),
  streetAddress: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.number().min(10000).max(99999),
  listPrice: z.number(),
  listDate: z.number(),
  bedrooms: z.number().optional(),
  fullBaths: z.number().optional(),
  halfBaths: z.number().optional(),
  size: z.number().optional(),
});

export default OtherVendorInputSchema;
export type OtherVendorInputData = z.infer<typeof OtherVendorInputSchema>;
