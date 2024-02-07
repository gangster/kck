import { z } from 'zod';

/**
 * Defines the schema for an address according to the sample vendor's requirements.
 * This includes validation for typical address fields such as street, city, state, and zip code.
 */
const AddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.number().min(10000).max(99999),
});

/**
 * Defines the schema for pricing information according to the sample vendor's requirements.
 * This schema validates the listing price of the property.
 */
const PriceSchema = z.object({
  listPrice: z.number(),
});

/**
 * Defines the schema for additional property details according to the sample vendor's requirements.
 * This includes optional fields for the number of bedrooms, full baths, half baths, and the property's size.
 */
const DetailsSchema = z.object({
  bedrooms: z.number().optional(),
  fullBaths: z.number().optional(),
  halfBaths: z.number().optional(),
  size: z.number().optional(),
});

/**
 * Aggregates the individual schemas into a comprehensive schema for a property listing
 * according to the sample vendor's format. This schema ensures that all sections of
 * a property listing are validated together, providing a complete validation solution.
 */
const SampleVendorInputDataSchema = z.object({
  mlsName: z.string(),
  mlsId: z.number(),
  address: AddressSchema,
  price: PriceSchema,
  listingDate: z.number(),
  details: DetailsSchema,
});

export type SampleVendorInputData = z.infer<typeof SampleVendorInputDataSchema>;
export default SampleVendorInputDataSchema;
