# Secure Form Validator

A lightweight, fast, and secure form validation library for TypeScript/JavaScript applications. Built with performance and security in mind, featuring input sanitization, comprehensive validation rules, and early return optimization.

## Features

- **High Performance** - Optimized validation with early return
- **Security First** - Built-in XSS protection and input sanitization
- **TypeScript Support** - Full type safety and IntelliSense
- **Well Tested** - Comprehensive unit test coverage
- **Zero Dependencies** - No external dependencies
- **Lightweight** - Minimal bundle size
- **Flexible** - Customizable validation rules
- **Safe** - Immutable validation results

## Installation

```bash
npm install secure-form-validator
```

## Quick Start

```typescript
import { validate, ValidationResult } from 'secure-form-validator'

// Define your validation schema
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
}

// Your form data
const data = {
  username: 'john_doe',
  email: 'john@example.com',
  age: 25
}

// Validate the data
const result: ValidationResult = validate(data, schema)

if (result.isValid) {
  console.log('Validation passed!')
  console.log('Sanitized data:', result.sanitizedData)
} else {
  console.log('Validation failed:', result.errors)
}
```

## Validation Rules

### Required
Validates that a field has a value and is not empty.

```typescript
{
  fieldName: {
    required: true
  }
}
```

### String Length
Validates minimum and maximum string length.

```typescript
{
  fieldName: {
    minLength: 3,    // Minimum 3 characters
    maxLength: 50    // Maximum 50 characters
  }
}
```

### Type Validation
Validates data types.

```typescript
{
  fieldName: {
    type: 'string'   // 'string' | 'number' | 'boolean' | 'array' | 'object'
  }
}
```

### Regex Pattern
Validates against regular expressions.

```typescript
{
  email: {
    regex: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
  }
}
```

### Input Sanitization
Sanitizes input to prevent XSS attacks.

```typescript
{
  fieldName: {
    sanitize: true   // Removes script tags, event handlers, etc.
  }
}
```

## API Reference

### `validate(data, schema, options?)`

Validates form data against a schema.

**Parameters:**
- `data: Record<string, any>` - The data to validate
- `schema: Record<string, any>` - Validation schema
- `options: { locale?: string }` - Optional configuration

**Returns:**
```typescript
interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
  sanitizedData: Record<string, any>
  rawData?: Record<string, any>
}
```

## Security Features

### XSS Protection
Automatically sanitizes dangerous content:

```typescript
const schema = {
  content: {
    sanitize: true
  }
}

const data = {
  content: '<script>alert("xss")</script>Hello World'
}

const result = validate(data, schema)
// result.sanitizedData.content = "Hello World"
```

### Input Sanitization
Removes:
- Script tags (`<script>`, `</script>`)
- Event handlers (`onclick`, `onload`, etc.)
- JavaScript URLs (`javascript:`)
- HTML tags
- SQL meta characters
- Zero-width characters

## Performance

- **Early Return**: Stops validation on first error for better performance
- **Optimized Loops**: Uses `for...of` with `Object.entries()` for better performance
- **Immutable Results**: No mutation of input data
- **Lightweight**: Minimal memory footprint

## Testing

Run the test suite:

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Examples

### User Registration Form

```typescript
const registrationSchema = {
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
  password: {
    required: true,
    minLength: 8,
    type: 'string'
  },
  age: {
    required: true,
    type: 'number'
  },
  terms: {
    required: true,
    type: 'boolean'
  }
}
```

### Contact Form

```typescript
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
  message: {
    required: true,
    minLength: 10,
    maxLength: 1000,
    type: 'string',
    sanitize: true
  }
}
```

## Error Handling

The validator returns detailed error information:

```typescript
const result = validate(data, schema)

if (!result.isValid) {
  // Handle validation errors
  Object.entries(result.errors).forEach(([field, error]) => {
    console.log(`${field}: ${error}`)
  })
}
```

## Advanced Usage

### Custom Validation Options

```typescript
const result = validate(data, schema, {
  locale: 'en' // Future i18n support
})
```

### Working with Results

```typescript
const result = validate(data, schema)

// Check if validation passed
if (result.isValid) {
  // Use sanitized data
  processFormData(result.sanitizedData)
} else {
  // Handle errors
  displayErrors(result.errors)
}

// Access original data
console.log('Original data:', result.rawData)
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with TypeScript for type safety
- Jest for comprehensive testing
- Focus on security and performance

---

**Made with love for secure web applications**
