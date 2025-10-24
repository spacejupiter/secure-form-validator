// Locale support example
const { validate } = require('../dist/index.js');

const schema = {
  username: {
    required: true,
    minLength: 3,
    type: 'string'
  },
  email: {
    required: true,
    type: 'string',
    regex: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
  }
};

const invalidData = {
  username: 'jo', // Too short
  email: 'invalid-email' // Invalid format
};

console.log('=== English (Default) ===');
const enResult = validate(invalidData, schema, { locale: 'en' });
console.log('Errors:', enResult.errors);

console.log('\n=== Spanish ===');
const esResult = validate(invalidData, schema, { locale: 'es' });
console.log('Errors:', esResult.errors);

console.log('\n=== French ===');
const frResult = validate(invalidData, schema, { locale: 'fr' });
console.log('Errors:', frResult.errors);

console.log('\n=== Invalid Locale (Falls back to English) ===');
const invalidLocaleResult = validate(invalidData, schema, { locale: 'invalid' });
console.log('Errors:', invalidLocaleResult.errors);
