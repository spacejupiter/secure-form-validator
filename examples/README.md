# Examples

This folder contains various examples demonstrating how to use the secure-form-validator library.

## Running Examples

### Prerequisites

1. Build the library first:
```bash
npm run build
```

2. Run JavaScript examples:
```bash
node examples/basic-usage.js
node examples/registration-form.js
node examples/contact-form.js
```

3. Run TypeScript example:
```bash
npx ts-node examples/typescript-example.ts
```

## Examples Overview

### 1. Basic Usage (`basic-usage.js`)
- Simple validation example
- Shows required fields, string length, type validation, and regex
- Demonstrates both valid and invalid data scenarios

### 2. Registration Form (`registration-form.js`)
- Complete user registration form validation
- Includes all validation rules: required, minLength, maxLength, type, regex, sanitize
- Shows XSS protection in action

### 3. Contact Form (`contact-form.js`)
- Contact form validation example
- Demonstrates sanitization of malicious input
- Shows optional field handling

### 4. TypeScript Example (`typescript-example.ts`)
- TypeScript usage with proper type definitions
- Shows how to use the library with TypeScript interfaces
- Demonstrates proper error handling

## Key Features Demonstrated

- **Required Field Validation**: Ensures fields are not empty
- **String Length Validation**: minLength and maxLength constraints
- **Type Validation**: Validates string, number, boolean types
- **Regex Validation**: Email format and custom pattern validation
- **Input Sanitization**: XSS protection and HTML tag removal
- **Error Handling**: Comprehensive error reporting
- **TypeScript Support**: Full type safety and IntelliSense

## Testing Locally

1. **Install dependencies**:
```bash
npm install
```

2. **Run tests**:
```bash
npm test
```

3. **Build the library**:
```bash
npm run build
```

4. **Run examples**:
```bash
node examples/basic-usage.js
```

## Expected Output

When you run the examples, you should see:
- Validation results (valid/invalid)
- Error messages for invalid data
- Sanitized data showing XSS protection
- Original vs sanitized data comparison
