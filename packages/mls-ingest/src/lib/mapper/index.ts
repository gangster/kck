import { JSONPath } from 'jsonpath-plus';

import { CRMPropertyMapping } from '@lib/types';
import { CRMPropertyPayload } from '@lib/vendors/default/schema';

/**
 * Defines the structure for the options passed to the mapping function.
 * - `input`: The source property data as a generic record of key-value pairs.
 * - `mapping`: The mapping configuration that defines how each field in the input
 *              should be transformed to match the target CRM system's schema.
 */
type MapOptions = {
  input: Record<string, unknown>;
  mapping: CRMPropertyMapping;
};

/**
 * Transforms property data from a generic input format to the format expected by a CRM system,
 * according to the provided mapping configuration.
 *
 * @param {MapOptions} options - Contains the input data and the mapping configuration.
 * @returns {CRMPropertyPayload} - The transformed property data, conforming to the CRM system's schema.
 */
export default (options: MapOptions): CRMPropertyPayload => {
  const { input, mapping } = options;
  const output: Partial<CRMPropertyPayload> = {};

  // Iterating over each key in the mapping configuration to transform the corresponding data in the input.
  Object.keys(mapping).forEach((key) => {
    const mappedKey = key as keyof CRMPropertyPayload; // Casting the key to the specific type of CRMPropertyPayload keys.
    // Using JSONPath to retrieve the value from the input based on the mapping configuration
    // and assigning it to the corresponding key in the output object.
    output[mappedKey] = JSONPath({ path: mapping[mappedKey], json: input })[0];
  });

  return output as CRMPropertyPayload;
};
