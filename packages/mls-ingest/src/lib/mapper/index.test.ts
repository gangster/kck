import map from '.';
import defaultMapping from '@lib/vendors/default/mapping';
import otherVendorMapping from '@lib/vendors/other_vendor/mapping';
import sampleVendorMapping from '@lib/vendors/sample_vendor/mapping';

describe('Data Mapper Functionality', () => {
  describe('Default Vendor Data Mapping', () => {
    it('correctly transforms data using the default vendor mapping', () => {
      const input = {
        mls_name: 'Example MLS',
        mls_id: 123456,
        street_address: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip_code: 90210,
        list_price: 400000,
        list_date: 1525143600,
        bedrooms: 3,
        full_baths: 2,
        half_baths: 1,
        size: 1500,
      };
      const output = map({ input, mapping: defaultMapping });
      expect(output).toEqual(input);
    });
  });

  describe('Other Vendor Data Mapping', () => {
    it('accurately transforms data from another vendor format', () => {
      const input = {
        mlsName: 'Different MLS',
        mlsId: 654321,
        streetAddress: '456 Secondary St',
        city: 'Othertown',
        state: 'WA',
        zipCode: 98001,
        listPrice: 250000,
        listingDate: 1625143600,
        bedrooms: 2,
        fullBaths: 1,
        halfBaths: 0,
        size: 1200,
      };
      const expectedOutput = {
        mls_name: 'Different MLS',
        mls_id: 654321,
        street_address: '456 Secondary St',
        city: 'Othertown',
        state: 'WA',
        zip_code: 98001,
        list_price: 250000,
        list_date: 1625143600,
        bedrooms: 2,
        full_baths: 1,
        half_baths: 0,
        size: 1200,
      };
      const output = map({ input, mapping: otherVendorMapping });
      expect(output).toEqual(expectedOutput);
    });
  });

  describe('Sample Vendor Data Mapping', () => {
    it('effectively maps data according to the sample vendor schema', () => {
      const input = {
        mlsName: 'Sample MLS',
        mlsId: 789012,
        address: {
          street: '789 Tertiary Rd',
          city: 'Samplecity',
          state: 'TX',
          zipCode: 75001,
        },
        price: {
          listPrice: 550000,
        },
        listingDate: 1725143600,
        details: {
          bedrooms: 4,
          fullBaths: 3,
          halfBaths: 1,
          size: 2200,
        },
      };
      const expectedOutput = {
        mls_name: 'Sample MLS',
        mls_id: 789012,
        street_address: '789 Tertiary Rd',
        city: 'Samplecity',
        state: 'TX',
        zip_code: 75001,
        list_price: 550000,
        list_date: 1725143600,
        bedrooms: 4,
        full_baths: 3,
        half_baths: 1,
        size: 2200,
      };
      const output = map({ input, mapping: sampleVendorMapping });
      expect(output).toEqual(expectedOutput);
    });
  });

  describe('Edge Cases in Data Mapping', () => {
    it('handles missing optional fields without errors', () => {
      const input = {
        mlsName: 'Sparse MLS',
        mlsId: 101112,
        address: {
          street: '101 Sparse Blvd',
          city: 'Sparseville',
          state: 'SP',
          zipCode: 10001,
        },
        price: {
          listPrice: 150000,
        },
        listingDate: 1825143600,
        // Omitting optional details like bedrooms, baths, and size
      };
      const expectedOutput = {
        mls_name: 'Sparse MLS',
        mls_id: 101112,
        street_address: '101 Sparse Blvd',
        city: 'Sparseville',
        state: 'SP',
        zip_code: 10001,
        list_price: 150000,
        list_date: 1825143600,
        // Expected to handle omitted fields gracefully
      };
      const output = map({ input, mapping: sampleVendorMapping });
      expect(output).toEqual(expectedOutput);
    });
  });
});
