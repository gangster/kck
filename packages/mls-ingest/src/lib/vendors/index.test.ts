import { loadVendorConfig } from '.';
import defaultInputSchema from './default/schema';
import defaultMapping from './default/mapping';
import sampleInputSchema from './sample_vendor/schema';
import sampleVendorMapping from './sample_vendor/mapping';
import { LoadVendorConfigError } from './errors';

describe('loadVendorConfig', () => {
  describe('when vendor configs exist', () => {
    describe('default vendor', () => {
      it('should return the vendor config', async () => {
        const vendor = 'default';
        const vendorConfig = await loadVendorConfig(vendor);
        expect(vendorConfig.inputSchema).toEqual(defaultInputSchema);
        expect(vendorConfig.outputSchema).toEqual(defaultInputSchema);
        expect(vendorConfig.mapping).toEqual(defaultMapping);
      });
    });
    describe('sample vendor', () => {
      it('should return the vendor config', async () => {
        const vendor = 'sample_vendor';
        const vendorConfig = await loadVendorConfig(vendor);
        expect(vendorConfig.inputSchema).toEqual(sampleInputSchema);
        expect(vendorConfig.outputSchema).toEqual(defaultInputSchema);
        expect(vendorConfig.mapping).toEqual(sampleVendorMapping);
      });
    });
  });
  describe('when vendor configs do not exist', () => {
    it('should throw a LoadVendorConfigError', async () => {
      const vendor = 'non_existent_vendor';
      try {
        await loadVendorConfig(vendor);
      } catch (e) {
        const error = e as LoadVendorConfigError;
        expect(error).toBeInstanceOf(LoadVendorConfigError);
        expect(error.message).toEqual("Error loading config for vendor 'non_existent_vendor'");
      }
    });
  });
});
