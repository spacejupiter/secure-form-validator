// Quick local test file
const { validate } = require('./dist/index.js')

// Simple test
const schema = {
  name: {
    required: true,
    minLength: 2,
    type: 'string',
    sanitize: true,
  },
  email: {
    required: true,
    type: 'string',
    regex: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
  },
}

const data = {
  name: '<script>alert("xss")</script>John',
  email: 'john@example.com',
}

console.log('Testing secure form validator...')
const result = validate(data, schema)

console.log('Valid:', result.isValid)
console.log('Errors:', result.errors)
console.log('Original name:', result.rawData.name)
console.log('Sanitized name:', result.sanitizedData.name)
