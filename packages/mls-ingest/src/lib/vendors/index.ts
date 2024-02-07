import { VendorConfig } from '@lib/types';
import * as DefaultVendorConfig from './default';
import * as SampleVendorConfig from './sample_vendor';
import * as OtherVendorConfig from './other_vendor';
import { LoadVendorConfigError } from './errors';

// Define a type that represents the possible vendor keys.
type ConfigKeys = 'default' | 'sample_vendor' | 'other_vendor';

// Define a type for the configs object, mapping each key to its corresponding module type.
type Configs = {
  [key in ConfigKeys]: VendorConfig;
};

const configs: Configs = {
  default: DefaultVendorConfig,
  sample_vendor: SampleVendorConfig,
  other_vendor: OtherVendorConfig,
};

/**
 * Synchronously loads the configuration for a given vendor.
 *
 * @param vendor - The identifier of the vendor whose configuration is to be loaded.
 * @returns VendorConfig - The vendor's configuration object.
 * @throws {LoadVendorConfigError} When the configuration for the vendor cannot be accessed.
 */
export function loadVendorConfig(vendor: string): VendorConfig {
  const config = configs[vendor as ConfigKeys];
  if (!config) {
    throw new LoadVendorConfigError(vendor);
  }
  return config;
}
