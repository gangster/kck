/**
 * Mapping configuration for the sample vendor, detailing how each property field
 * is transformed from the application's internal representation to the format
 * required by the sample vendor's CRM system.
 *
 * Paths are defined using JSONPath notation, allowing for precise specification
 * of how data should be mapped between formats.
 */
export default {
  mls_name: '$.mlsName',
  mls_id: '$.mlsId',
  street_address: '$.address.street',
  city: '$.address.city',
  state: '$.address.state',
  zip_code: '$.address.zipCode',
  list_price: '$.price.listPrice',
  list_date: '$.listingDate',
  bedrooms: '$.details.bedrooms',
  full_baths: '$.details.fullBaths',
  half_baths: '$.details.halfBaths',
  size: '$.details.size',
};
