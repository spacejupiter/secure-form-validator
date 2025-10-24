// User registration form example
const { validate } = require('../dist/index.js')

const registrationSchema = {
  firstName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    type: 'string',
    sanitize: true,
  },
  lastName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    type: 'string',
    sanitize: true,
  },
  username: {
    required: true,
    minLength: 3,
    maxLength: 20,
    type: 'string',
    regex: '^[a-zA-Z0-9_]+$',
    sanitize: true,
  },
  email: {
    required: true,
    type: 'string',
    regex: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    sanitize: true,
  },
  password: {
    required: true,
    minLength: 8,
    type: 'string',
  },
  confirmPassword: {
    required: true,
    type: 'string',
  },
  age: {
    required: true,
    type: 'number',
  },
  terms: {
    required: true,
    type: 'boolean',
  },
}

// Test with valid registration data
const validRegistrationData = {
  firstName: 'John',
  lastName: 'Doe',
  username: 'john_doe',
  email: 'john@example.com',
  password: 'securepass123',
  confirmPassword: 'securepass123',
  age: 25,
  terms: true,
}

// Test with malicious input
const maliciousData = {
  firstName: '<script>alert("xss")</script>John',
  lastName: 'Doe',
  username: 'john_doe',
  email: 'john@example.com',
  password: 'securepass123',
  confirmPassword: 'securepass123',
  age: 25,
  terms: true,
}

console.log('=== Valid Registration ===')
const validResult = validate(validRegistrationData, registrationSchema)
console.log('Valid:', validResult.isValid)
console.log('Errors:', validResult.errors)
console.log('Sanitized Data:', validResult.sanitizedData)

console.log('\n=== Malicious Input Test ===')
const maliciousResult = validate(maliciousData, registrationSchema)
console.log('Valid:', maliciousResult.isValid)
console.log('Sanitized First Name:', maliciousResult.sanitizedData.firstName)
console.log('Original First Name:', maliciousResult.rawData.firstName)
