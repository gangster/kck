import transform from '.';
import defaultMapping from '@lib/vendors/default/mapping';
import propertySchema from '@lib/vendors/default/schema';
import sampleVendorMapping from '@lib/vendors/sample_vendor/mapping';
import inputSchema from '@lib/vendors/sample_vendor/schema';
import { InputSchemaValidationError, OutputSchemaValidationError } from './errors';

const MLS_NAME = 'Example MLS';
const MLS_ID = 123456;
const STREET_ADDRESS = '123 Main St';
const CITY = 'Beverly Hills';
const STATE = 'CA';
const ZIP_CODE = 90210;
const LIST_PRICE = 4_000_000;
const LIST_DATE = 1525143600;
const BEDROOMS = 3;
const FULL_BATHS = 2;
const HALF_BATHS = 1;
const SIZE = 1500;

describe('Data Transformation Functionality', () => {
  describe('Applying Default Vendor Mappings', () => {
    it('accurately transforms data to match the default schema format', () => {
      const input = {
        mls_name: MLS_NAME,
        mls_id: MLS_ID,
        street_address: STREET_ADDRESS,
        city: CITY,
        state: STATE,
        zip_code: ZIP_CODE,
        list_price: LIST_PRICE,
        list_date: LIST_DATE,
        bedrooms: BEDROOMS,
        full_baths: FULL_BATHS,
        half_baths: HALF_BATHS,
        size: SIZE,
      };
      expect(
        transform({
          inputSchema: propertySchema,
          outputSchema: propertySchema,
          mapping: defaultMapping,
        })(input),
      ).toEqual(input);
    });
  });

  describe('Utilizing Sample Vendor Mappings', () => {
    it("correctly adapts data according to the sample vendor's schema requirements", () => {
      const input = {
        mlsName: MLS_NAME,
        mlsId: MLS_ID,
        address: {
          street: STREET_ADDRESS,
          city: CITY,
          state: STATE,
          zipCode: ZIP_CODE,
        },
        price: {
          listPrice: LIST_PRICE,
        },
        listingDate: LIST_DATE,
        details: {
          bedrooms: BEDROOMS,
          fullBaths: FULL_BATHS,
          halfBaths: HALF_BATHS,
          size: SIZE,
        },
      };
      expect(
        transform({
          inputSchema: inputSchema,
          outputSchema: propertySchema,
          mapping: sampleVendorMapping,
        })(input),
      ).toEqual({
        mls_name: MLS_NAME,
        mls_id: MLS_ID,
        street_address: STREET_ADDRESS,
        city: CITY,
        state: STATE,
        zip_code: ZIP_CODE,
        list_price: LIST_PRICE,
        list_date: LIST_DATE,
        bedrooms: BEDROOMS,
        full_baths: FULL_BATHS,
        half_baths: HALF_BATHS,
        size: SIZE,
      });
    });
  });

  describe('Handling Invalid Input Data Mapping', () => {
    it('throws an InputSchemaValidationError for incorrect or missing input fields', () => {
      const input = {
        mls_name: null, // Intentionally invalid to trigger error
        mls_id: MLS_ID,
        street_address: STREET_ADDRESS,
        city: CITY,
        state: STATE,
        zip_code: ZIP_CODE,
        list_price: LIST_PRICE,
        list_date: LIST_DATE,
        bedrooms: BEDROOMS,
        full_baths: FULL_BATHS,
        half_baths: HALF_BATHS,
        size: SIZE,
      };

      try {
        transform({
          inputSchema: propertySchema,
          outputSchema: propertySchema,
          mapping: defaultMapping,
        })(input);
        fail('Expected an InputSchemaValidationError to be thrown');
      } catch (e) {
        const error = e as InputSchemaValidationError;
        expect(error).toBeInstanceOf(InputSchemaValidationError);
        expect(error.message).toContain('Error parsing input schema');
        expect(error.issues).toContainEqual(
          expect.objectContaining({
            path: ['mls_name'],
            message: 'Expected string, received null',
          }),
        );
      }
    });
  });

  describe('Handling Invalid Output Data Mapping', () => {
    it('throws an OutputSchemaValidationError when the transformed data does not comply with the output schema', () => {
      const input = {
        mls_name: MLS_NAME,
        mls_id: MLS_ID,
        street_address: STREET_ADDRESS,
        city: CITY,
        state: STATE,
        zip_code: ZIP_CODE,
        list_price: LIST_PRICE,
        list_date: LIST_DATE,
        bedrooms: BEDROOMS,
        full_baths: FULL_BATHS,
        half_baths: HALF_BATHS,
        size: SIZE,
      };

      try {
        transform({
          inputSchema: propertySchema,
          outputSchema: propertySchema,
          mapping: { ...defaultMapping, mls_name: '$.mlsname' }, // Intentionally incorrect mapping
        })(input);
        fail('Expected an OutputSchemaValidationError to be thrown');
      } catch (e) {
        const error = e as OutputSchemaValidationError;
        expect(error).toBeInstanceOf(OutputSchemaValidationError);
        expect(error.message).toContain('Error validating output schema');
        expect(error.issues).toContainEqual(
          expect.objectContaining({
            path: ['mls_name'],
            message: 'Required',
          }),
        );
      }
    });
  });
});
