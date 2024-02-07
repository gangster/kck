/**
 * Default mapping configuration for property data.
 * This mapping is used to transform property data between the application's internal
 * format and the format expected by the default vendor's CRM system.
 *
 * Each key in the mapping corresponds to a property field in the CRM system, and its value
 * specifies the JSONPath expression to locate the corresponding data in the application's
 * internal data structure.
 */
export default {
  mls_name: '$.mls_name',
  mls_id: '$.mls_id',
  street_address: '$.street_address',
  city: '$.city',
  state: '$.state',
  zip_code: '$.zip_code',
  list_price: '$.list_price',
  list_date: '$.list_date',
  bedrooms: '$.bedrooms',
  full_baths: '$.full_baths',
  half_baths: '$.half_baths',
  size: '$.size',
};
