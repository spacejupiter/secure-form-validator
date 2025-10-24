// Basic usage example
const { validate } = require('../dist/index.js');

// Define validation schema
const schema = {
  username: {
    required: true,
    minLength: 3,
    maxLength: 20,
    type: 'string',
    sanitize: true
  },
  email: {
    required: true,
    type: 'string',
    regex: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    sanitize: true
  },
  age: {
    required: true,
    type: 'number'
  }
};

// Test data
const validData = {
  username: 'john_doe',
  email: 'john@example.com',
  age: 25
};

const invalidData = {
  username: 'jo', // Too short
  email: 'invalid-email', // Invalid format
  age: 'not-a-number' // Wrong type
};

console.log('=== Valid Data Test ===');
const validResult = validate(validData, schema);
console.log({validResult})

console.log('\n=== Invalid Data Test ===');
const invalidResult = validate(invalidData, schema);
console.log({invalidResult})

