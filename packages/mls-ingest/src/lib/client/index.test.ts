import nock from 'nock';
import { createProperty, BASE_URL, ENDPOINT } from '.';
import { HttpRequestError, MaxRetriesExceededError } from './errors';

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

describe('Create Property', () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });

  describe('When Successful', () => {
    it('returns the property data and verifies no retries on success', async () => {
      nock(BASE_URL).post(ENDPOINT).reply(201, output);

      const response = await createProperty(input);
      expect(response).toStrictEqual(output);
    });
  });

  describe('When Unsuccessful', () => {
    it('does not retry on non-retryable status codes (422) and asserts values in HttpRequestError', async () => {
      nock(BASE_URL).post(ENDPOINT).reply(422, { error: 'Unprocessable Entity' });

      try {
        await createProperty(input, retryConfig);
        fail('Expected createProperty to throw HttpRequestError, but it did not.');
      } catch (e) {
        const error = e as HttpRequestError;

        expect(error).toBeInstanceOf(HttpRequestError);
        expect(error.status).toEqual(422);
        expect(error.response?.data.error).toEqual('Unprocessable Entity');
      }
    });
    it('retries on retryable status codes (500) and throws MaxRetriesExceededError error after all retries, asserting the count value', async () => {
      nock(BASE_URL).persist().post(ENDPOINT).reply(500, { error: 'Internal Server Error' });

      try {
        await createProperty(input, retryConfig);
        fail('Expected createProperty to throw MaxRetriesExceededError error, but it did not.');
      } catch (e) {
        const error = e as MaxRetriesExceededError;
        expect(error).toBeInstanceOf(MaxRetriesExceededError);
        expect(error.count).toEqual(retryConfig.maxRetries);
        expect(error.message).toContain(`after ${retryConfig.maxRetries} retries`);
        expect(error.lastError).toBeInstanceOf(HttpRequestError);
        expect(error.lastError?.response?.status).toEqual(500);
      }
    });
  });
});
