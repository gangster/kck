import nock from 'nock';
import { create } from '.';
import { BASE_URL, ENDPOINT } from '@lib/client';
import pino from 'pino';
import { HttpRequestError, MaxRetriesExceededError } from '@lib/client/errors';

export const logger = pino({
  name: 'mls-ingest',
  level: 'error',
});

describe('Create Property', () => {
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

  beforeEach(() => {
    nock.cleanAll();
  });

  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
    jest.clearAllMocks();
  });

  describe('When successful', () => {
    it('should return the property data on successful creation', async () => {
      nock(BASE_URL).post(ENDPOINT).reply(201, output);
      const response = await create({ input });
      expect(response).toStrictEqual(output);
    });
  });

  describe('When unsuccessful', () => {
    describe('Vendor Configuration Errors', () => {
      it('should throw an error indicating a problem with vendor configuration', async () => {
        try {
          await create({ input, vendor: 'invalid_vendor' });
          fail('Expected to throw an error but did not.');
        } catch (e) {
          const error = e as Error;
          expect(error.message).toContain("Error loading config for vendor 'invalid_vendor'");
        }
      });
    });

    describe('Input Validation Errors', () => {
      it('should indicate an error with input validation', async () => {
        try {
          await create({ input: { ...input, list_price: 'four million' } });
          fail('Expected to throw an error but did not.');
        } catch (e) {
          const error = e as Error;
          expect(error.message).toContain('Error parsing input schema.');
        }
      });
    });

    describe('API Errors', () => {
      const retryConfig = {
        initialDelay: 1,
        maxRetries: 2,
        multiplier: 2,
        retryableStatusCodes: [500, 502, 503, 504],
      };

      describe('when retryable', () => {
        beforeEach(() => {
          nock(BASE_URL).persist().post(ENDPOINT).reply(500, 'Internal Server Error');
        });

        it('should throw MaxRetriesExceededError', async () => {
          try {
            await create({ input, vendor: 'default', retryConfig });
            fail('Expected to throw an error but did not.');
          } catch (e) {
            const error = e as Error;
            expect(error.message).toContain('Maximum retry attempts exceeded');
          }
        });
        it('should invoke the provided error handler with detailed error information on retryable failures', async () => {
          nock(BASE_URL).persist().post(ENDPOINT).reply(500, 'Internal Server Error');
          const errorHandler = jest.fn();
          errorHandler.mockImplementation((error: HttpRequestError | MaxRetriesExceededError) => {
            logger.error(error.message);
          });
          await create({
            input,
            vendor: 'default',
            retryConfig: {
              initialDelay: 1,
              maxRetries: 2,
              multiplier: 2,
              retryableStatusCodes: [500],
            },
            errorHandler,
          });

          expect(errorHandler).toHaveBeenCalled();
          const errorHandlerCallArg = errorHandler.mock.calls[0][0];

          expect(errorHandlerCallArg.message).toContain('Maximum retry attempts exceeded');

          expect(errorHandlerCallArg).toHaveProperty('count', 2);

          expect(errorHandlerCallArg.lastError).toHaveProperty('status', 500);
        });
      });

      describe('when not retryable', () => {
        beforeEach(() => {
          nock(BASE_URL).persist().post(ENDPOINT).reply(422, 'Unprocessable Entity');
        });

        it('should throw HttpRequestError', async () => {
          try {
            await create({ input, vendor: 'default', retryConfig });
            fail('Expected to throw an error but did not.');
          } catch (e) {
            const error = e as Error;
            expect(error.message).toContain('Request failed with status code');
          }
        });

        it('should invoke the provided error handler with detailed error information on non-retryable failures', async () => {
          nock(BASE_URL).persist().post(ENDPOINT).reply(422, 'Unprocessable Entity');
          const errorHandler = jest.fn();
          await create({ input, vendor: 'default', errorHandler });

          expect(errorHandler).toHaveBeenCalled();
          const errorHandlerCallArg = errorHandler.mock.calls[0][0];
          expect(errorHandlerCallArg.message).toContain('Request failed with status code 422');
          expect(errorHandlerCallArg).toHaveProperty('status', 422);
        });
      });
    });
  });
});
