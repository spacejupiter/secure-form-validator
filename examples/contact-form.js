// Contact form example
const { validate } = require('../dist/index.js');

const contactSchema = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    type: 'string',
    sanitize: true
  },
  email: {
    required: true,
    type: 'string',
    regex: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    sanitize: true
  },
  subject: {
    required: true,
    minLength: 5,
    maxLength: 100,
    type: 'string',
    sanitize: true
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 1000,
    type: 'string',
    sanitize: true
  },
  newsletter: {
    required: false,
    type: 'boolean'
  }
};

// Test data
const contactData = {
  name: 'Jane Smith',
  email: 'jane@example.com',
  subject: 'Inquiry about your services',
  message: 'Hello, I would like to know more about your services. Please contact me at your earliest convenience.',
  newsletter: true
};

// Test with XSS attempt
const xssData = {
  name: 'Hacker',
  email: 'hacker@evil.com',
  subject: '<img src="x" onerror="alert(\'xss\')">Test',
  message: '<script>alert("xss")</script>This is a test message.',
  newsletter: false
};

console.log('=== Valid Contact Form ===');
const validResult = validate(contactData, contactSchema);
console.log('Valid:', validResult.isValid);
console.log('Errors:', validResult.errors);
console.log('Sanitized Data:', validResult.sanitizedData);

console.log('\n=== XSS Attack Prevention ===');
const xssResult = validate(xssData, contactSchema);
console.log('Valid:', xssResult.isValid);
console.log('Sanitized Subject:', xssResult.sanitizedData.subject);
console.log('Sanitized Message:', xssResult.sanitizedData.message);
