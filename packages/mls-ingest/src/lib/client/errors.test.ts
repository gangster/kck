import { HttpRequestError, MaxRetriesExceededError } from './errors';
describe('HttpRequestError', () => {
  it('should correctly instantiate with a message and original error', () => {
    const simulatedAxiosError = createMockAxiosError('Unprocessable Entity', 'ETIMEDOUT', 422, {
      error: 'Unprocessable Entity',
    });

    const httpRequestError = new HttpRequestError(simulatedAxiosError);

    expect(httpRequestError.message).toContain('Unprocessable Entity');
    expect(httpRequestError.originalError).toBe(simulatedAxiosError);
    expect(httpRequestError.name).toBe('HttpRequestError');
  });
});

describe('MaxRetriesExceededError', () => {
  it('should correctly instantiate with a count and last error', () => {
    const count = 5;
    const simulatedAxiosError = createMockAxiosError('Unprocessable Entity', 'ETIMEDOUT', 422, {
      error: 'Unprocessable Entity',
    });
    const lastError = new HttpRequestError(simulatedAxiosError);
    const maxRetriesExceededError = new MaxRetriesExceededError(count, lastError);
    expect(maxRetriesExceededError.message).toContain(`after ${count} retries`);
    expect(maxRetriesExceededError.count).toBe(count);
    expect(maxRetriesExceededError.lastError).toBe(lastError);
    expect(maxRetriesExceededError.name).toBe('MaxRetriesExceededError');
  });
});

// Mock the AxiosError structure
function createMockAxiosError(message: string, code: string, status: number, data: { error: string }): any {
  return {
    isAxiosError: true,
    message,
    code,
    response: {
      status,
      data,
    },
    config: {},
    toJSON: () => ({ message, code }),
  };
}
