import nock from 'nock';
import { createProperty, BASE_URL, endpoint } from '.';
import { HttpRequestError, InvalidCustomerError, MaxRetriesExceededError } from './errors';

const customerId = 762910;
const input = {
  mls_name: 'Example MLS',
  mls_id: 123456,
  street_address: '123 Main St',
  city: 'Beverly Hills',
  state: 'CA',
  zip_code: 90210,
  list_price: 4_000_000,
  list_date: 1525143600,
  bedrooms: 3,
  full_baths: 2,
  half_baths: 1,
  size: 1500,
};

const output = { id: 1, ...input };

const retryConfig = {
  initialDelay: 1,
  maxRetries: 5,
  multiplier: 1,
  retryableStatusCodes: [500, 502, 503, 504], // Retry only for server errors
};

describe('Create Property Functionality', () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });

  describe('Successful Property Creation', () => {
    it('successfully returns the property data with no retries required', async () => {
      nock(BASE_URL).post(endpoint(customerId)).reply(201, output);

      const response = await createProperty({ customerId, input });
      expect(response).toStrictEqual(output);
    });
  });

  describe('Unsuccessful Property Creation', () => {
    it('does not retry on non-retryable status codes (422) and captures detailed HttpRequestError information', async () => {
      nock(BASE_URL).post(endpoint(customerId)).reply(422, { error: 'Unprocessable Entity' });

      try {
        await createProperty({ customerId, input, retryConfig });
        fail('Expected createProperty to throw HttpRequestError, but it did not.');
      } catch (e) {
        const error = e as HttpRequestError;

        expect(error).toBeInstanceOf(HttpRequestError);
        expect(error.status).toEqual(422);
        expect(error.response?.data.error).toEqual('Unprocessable Entity');
      }
    });

    it('retries on retryable status codes (500) and ultimately throws MaxRetriesExceededError after exceeding retry attempts', async () => {
      nock(BASE_URL).persist().post(endpoint(customerId)).reply(500, { error: 'Internal Server Error' });

      try {
        await createProperty({ customerId, input, retryConfig });
        fail('Expected createProperty to throw MaxRetriesExceededError, but it did not.');
      } catch (e) {
        const error = e as MaxRetriesExceededError;
        expect(error).toBeInstanceOf(MaxRetriesExceededError);
        expect(error.count).toEqual(retryConfig.maxRetries);
        expect(error.message).toContain(`after ${retryConfig.maxRetries} retries`);
        expect(error.lastError).toBeInstanceOf(HttpRequestError);
        expect(error.lastError?.response?.status).toEqual(500);
      }
    });
    describe('Invalid Customer ID Handling', () => {
      it('throws InvalidCustomerError for invalid customer IDs', async () => {
        // No need to mock an endpoint call as the error should be thrown before any HTTP request is made
        try {
          await createProperty({ customerId: 0, input, retryConfig });
          fail('Expected createProperty to throw InvalidCustomerError, but it did not.');
        } catch (e) {
          const error = e as InvalidCustomerError;

          expect(error).toBeInstanceOf(InvalidCustomerError);
          expect(error.message).toContain(`Invalid customer ID provided: 0`);
        }
      });
    });
  });
});
