import { validate } from '../src/core/validator'
import { ValidationResult } from '../src/types'

describe('validate', () => {
  describe('Basic validation', () => {
    it('should return valid result for valid data', () => {
      const schema = {
        username: {
          required: true,
          minLength: 3,
          type: 'string',
        },
      }
      const data = { username: 'john' }

      const result: ValidationResult = validate(data, schema)

      expect(result.isValid).toBe(true)
      expect(result.errors).toEqual({})
      expect(result.sanitizedData).toEqual({ username: 'john' })
      expect(result.rawData).toEqual({ username: 'john' })
    })

    it('should return invalid result for missing required field', () => {
      const schema = {
        username: {
          required: true,
        },
      }
      const data = {}

      const result: ValidationResult = validate(data, schema)

      expect(result.isValid).toBe(false)
      expect(result.errors).toHaveProperty('username')
      expect(result.errors.username).toContain(
        'Validation failed for rule: required',
      )
    })

    it('should return invalid result for empty required field', () => {
      const schema = {
        username: {
          required: true,
        },
      }
      const data = { username: '' }

      const result: ValidationResult = validate(data, schema)

      expect(result.isValid).toBe(false)
      expect(result.errors).toHaveProperty('username')
    })
  })

  describe('String length validation', () => {
    it('should pass minLength validation', () => {
      const schema = {
        username: {
          minLength: 3,
        },
      }
      const data = { username: 'john' }

      const result: ValidationResult = validate(data, schema)

      expect(result.isValid).toBe(true)
    })

    it('should fail minLength validation', () => {
      const schema = {
        username: {
          minLength: 5,
        },
      }
      const data = { username: 'hi' }

      const result: ValidationResult = validate(data, schema)

      expect(result.isValid).toBe(false)
      expect(result.errors).toHaveProperty('username')
      expect(result.errors.username).toContain('minLength')
    })

    it('should pass maxLength validation', () => {
      const schema = {
        username: {
          maxLength: 10,
        },
      }
      const data = { username: 'john' }

      const result: ValidationResult = validate(data, schema)

      expect(result.isValid).toBe(true)
    })

    it('should fail maxLength validation', () => {
      const schema = {
        username: {
          maxLength: 3,
        },
      }
      const data = { username: 'john' }

      const result: ValidationResult = validate(data, schema)

      expect(result.isValid).toBe(false)
      expect(result.errors).toHaveProperty('username')
      expect(result.errors.username).toContain('maxLength')
    })
  })

  describe('Type validation', () => {
    it('should pass string type validation', () => {
      const schema = {
        username: {
          type: 'string',
        },
      }
      const data = { username: 'john' }

      const result: ValidationResult = validate(data, schema)

      expect(result.isValid).toBe(true)
    })

    it('should fail string type validation for non-string', () => {
      const schema = {
        age: {
          type: 'string',
        },
      }
      const data = { age: 25 }

      const result: ValidationResult = validate(data, schema)

      expect(result.isValid).toBe(false)
      expect(result.errors).toHaveProperty('age')
      expect(result.errors.age).toContain('type')
    })
  })

  describe('Regex validation', () => {
    it('should pass regex validation', () => {
      const schema = {
        email: {
          regex: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
        },
      }
      const data = { email: 'test@example.com' }

      const result: ValidationResult = validate(data, schema)

      expect(result.isValid).toBe(true)
    })

    it('should fail regex validation', () => {
      const schema = {
        email: {
          regex: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
        },
      }
      const data = { email: 'invalid-email' }

      const result: ValidationResult = validate(data, schema)

      expect(result.isValid).toBe(false)
      expect(result.errors).toHaveProperty('email')
      expect(result.errors.email).toContain('regex')
    })
  })

  describe('Sanitization', () => {
    it('should sanitize data when sanitize rule is present', () => {
      const schema = {
        username: {
          sanitize: true,
        },
      }
      const data = { username: '<script>alert("xss")</script>john' }

      const result: ValidationResult = validate(data, schema)

      expect(result.isValid).toBe(true)
      expect(result.sanitizedData.username).not.toContain('<script>')
      expect(result.sanitizedData.username).toContain('john')
    })

    it('should not sanitize when sanitize rule is false', () => {
      const schema = {
        username: {
          sanitize: false,
        },
      }
      const data = { username: '<script>alert("xss")</script>john' }

      const result: ValidationResult = validate(data, schema)

      expect(result.isValid).toBe(true)
      expect(result.sanitizedData.username).toBe(data.username)
    })
  })

  describe('Multiple field validation', () => {
    it('should validate multiple fields', () => {
      const schema = {
        username: {
          required: true,
          minLength: 3,
        },
        email: {
          required: true,
          regex: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
        },
      }
      const data = {
        username: 'john',
        email: 'john@example.com',
      }

      const result: ValidationResult = validate(data, schema)

      expect(result.isValid).toBe(true)
      expect(result.errors).toEqual({})
    })

    it('should return early on first validation failure', () => {
      const schema = {
        username: {
          required: true,
          minLength: 3,
        },
        email: {
          required: true,
          regex: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
        },
      }
      const data = {
        username: 'hi', // This will fail minLength
        email: 'john@example.com',
      }

      const result: ValidationResult = validate(data, schema)

      expect(result.isValid).toBe(false)
      expect(result.errors).toHaveProperty('username')
      expect(result.errors).not.toHaveProperty('email')
    })
  })

  describe('Edge cases', () => {
    it('should handle empty schema', () => {
      const schema = {}
      const data = { username: 'john' }

      const result: ValidationResult = validate(data, schema)

      expect(result.isValid).toBe(true)
      expect(result.errors).toEqual({})
    })

    it('should handle schema with empty rules', () => {
      const schema = {
        username: {},
      }
      const data = { username: 'john' }

      const result: ValidationResult = validate(data, schema)

      expect(result.isValid).toBe(true)
      expect(result.errors).toEqual({})
    })

    it('should handle non-existent rule functions', () => {
      const schema = {
        username: {
          nonExistentRule: true,
        },
      }
      const data = { username: 'john' }

      const result: ValidationResult = validate(data, schema)

      expect(result.isValid).toBe(true)
      expect(result.errors).toEqual({})
    })

    it('should handle null and undefined values', () => {
      const schema = {
        username: {
          required: true,
        },
      }
      const data = { username: null }

      const result: ValidationResult = validate(data, schema)

      expect(result.isValid).toBe(false)
      expect(result.errors).toHaveProperty('username')
    })
  })

  describe('Options parameter', () => {
    it('should accept options parameter', () => {
      const schema = {
        username: {
          required: true,
        },
      }
      const data = { username: 'john' }
      const options = { locale: 'en' }

      const result: ValidationResult = validate(data, schema, options)

      expect(result.isValid).toBe(true)
    })
  })
})
