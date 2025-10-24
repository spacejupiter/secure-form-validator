// TypeScript example
import { validate, ValidationResult } from '../src/index';

interface UserData {
  username: string;
  email: string;
  age: number;
  isActive: boolean;
}

const userSchema = {
  username: {
    required: true,
    minLength: 3,
    maxLength: 20,
    type: 'string' as const,
    sanitize: true
  },
  email: {
    required: true,
    type: 'string' as const,
    regex: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    sanitize: true
  },
  age: {
    required: true,
    type: 'number' as const
  },
  isActive: {
    required: true,
    type: 'boolean' as const
  }
};

// Test data
const userData: UserData = {
  username: 'typescript_user',
  email: 'user@typescript.com',
  age: 30,
  isActive: true
};

// Validation function with proper typing
function validateUser(data: UserData): ValidationResult {
  return validate(data, userSchema);
}

// Test the validation
console.log('=== TypeScript Example ===');
const result: ValidationResult = validateUser(userData);

console.log('Valid:', result.isValid);
console.log('Errors:', result.errors);
console.log('Sanitized Data:', result.sanitizedData);
console.log('Raw Data:', result.rawData);

// Error handling example
if (!result.isValid) {
  console.log('Validation failed:');
  Object.entries(result.errors).forEach(([field, error]) => {
    console.log(`- ${field}: ${error}`);
  });
} else {
  console.log('Validation passed! User data is valid.');
}
