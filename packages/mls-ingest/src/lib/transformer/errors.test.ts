import { ZodError } from 'zod';
import { InputSchemaValidationError, OutputSchemaValidationError } from './errors';

// Function to create a mock ZodError for testing

function createMockZodError(): ZodError {
  // Pass an array with the issue to the ZodError constructor
  return new ZodError([]);
}

describe('Custom Schema Validation Errors', () => {
  describe('InputSchemaValidationError', () => {
    it('should correctly instantiate with a message and original ZodError', () => {
      const mockZodError = createMockZodError();
      const error = new InputSchemaValidationError('Input validation failed', mockZodError);

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(InputSchemaValidationError);
      expect(error.message).toBe('Input validation failed');
      expect(error.originalError).toBe(mockZodError);
      expect(error.name).toBe('InputSchemaValidationError');
    });
  });

  describe('OutputSchemaValidationError', () => {
    it('should correctly instantiate with a message and original ZodError', () => {
      const mockZodError = createMockZodError();
      const error = new OutputSchemaValidationError('Output validation failed', mockZodError);

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(OutputSchemaValidationError);
      expect(error.message).toBe('Output validation failed');
      expect(error.originalError).toBe(mockZodError);
      expect(error.name).toBe('OutputSchemaValidationError');
    });
  });
});
