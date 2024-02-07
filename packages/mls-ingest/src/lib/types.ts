import { ZodSchema } from 'zod'; // Importing ZodSchema from 'zod' for schema validation.

/**
 * Defines the structure for mapping property data between the application's internal format
 * and the format expected by various vendors' CRM systems. This mapping ensures that property
 * data conforms to the expected structure and naming conventions of the target CRM system,
 * facilitating seamless data exchange.
 */
export type CRMPropertyMapping = {
  mls_name: string; // Mapping for the MLS name.
  mls_id: string; // Mapping for the MLS ID.
  street_address: string; // Mapping for the street address.
  city: string; // Mapping for the city.
  state: string; // Mapping for the state.
  zip_code: string; // Mapping for the ZIP code.
  list_price: string; // Mapping for the listing price.
  list_date: string; // Mapping for the listing date.
  bedrooms: string; // Mapping for the number of bedrooms.
  full_baths: string; // Mapping for the number of full bathrooms.
  half_baths: string; // Mapping for the number of half bathrooms.
  size: string; // Mapping for the size of the property.
};

/**
 * Represents the configuration for a vendor, including mappings for property data and schemas
 * for validating both input and output data. The `VendorConfig` type ensures that all necessary
 * components for processing and validating property data for a specific vendor are grouped together,
 * providing a clear and organized structure for vendor-specific configurations.
 */
export type VendorConfig = {
  mapping: CRMPropertyMapping; // The mapping configuration for the vendor.
  inputSchema: ZodSchema; // The schema for validating input data before processing.
  outputSchema: ZodSchema; // The schema for validating output data before sending to the vendor's CRM system.
};
