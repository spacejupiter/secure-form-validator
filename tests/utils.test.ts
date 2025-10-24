import { ruleMap } from '../src/utils/validationMap'
import { typeMap } from '../src/utils/typeMap'
import { sanitizeInput } from '../src/utils/sanitize'

describe('Validation Utilities', () => {
  describe('ruleMap', () => {
    describe('required rule', () => {
      it('should return true when value is provided and not empty', () => {
        expect(ruleMap.required('hello', true)).toBe(true)
        expect(ruleMap.required(123, true)).toBe(true)
        expect(ruleMap.required(0, true)).toBe(true)
        expect(ruleMap.required(false, true)).toBe(true)
      })

      it('should return false when value is empty or missing', () => {
        expect(ruleMap.required('', true)).toBe(false)
        expect(ruleMap.required(null, true)).toBe(false)
        expect(ruleMap.required(undefined, true)).toBe(false)
      })

      it('should return true when required is false', () => {
        expect(ruleMap.required('', false)).toBe(true)
        expect(ruleMap.required(null, false)).toBe(true)
        expect(ruleMap.required(undefined, false)).toBe(true)
      })
    })

    describe('minLength rule', () => {
      it('should return true when string meets minimum length', () => {
        expect(ruleMap.minLength('hello', 3)).toBe(true)
        expect(ruleMap.minLength('hello', 5)).toBe(true)
      })

      it('should return false when string is too short', () => {
        expect(ruleMap.minLength('hi', 3)).toBe(false)
        expect(ruleMap.minLength('', 1)).toBe(false)
      })

      it('should return false for non-string values', () => {
        expect(ruleMap.minLength(123, 3)).toBe(false)
        expect(ruleMap.minLength(null, 3)).toBe(false)
        expect(ruleMap.minLength(undefined, 3)).toBe(false)
      })
    })

    describe('maxLength rule', () => {
      it('should return true when string meets maximum length', () => {
        expect(ruleMap.maxLength('hello', 10)).toBe(true)
        expect(ruleMap.maxLength('hello', 5)).toBe(true)
      })

      it('should return false when string is too long', () => {
        expect(ruleMap.maxLength('hello', 3)).toBe(false)
        expect(ruleMap.maxLength('very long string', 5)).toBe(false)
      })

      it('should return false for non-string values', () => {
        expect(ruleMap.maxLength(123, 3)).toBe(false)
        expect(ruleMap.maxLength(null, 3)).toBe(false)
      })
    })

    describe('type rule', () => {
      it('should delegate to typeMap', () => {
        // This will be tested in typeMap tests
        expect(typeof ruleMap.type).toBe('function')
      })
    })

    describe('regex rule', () => {
      it('should return true when string matches pattern', () => {
        expect(ruleMap.regex('hello', '^h.*o$')).toBe(true)
        expect(
          ruleMap.regex(
            'test@example.com',
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
          ),
        ).toBe(true)
      })

      it('should return false when string does not match pattern', () => {
        expect(ruleMap.regex('world', '^h.*o$')).toBe(false)
        expect(
          ruleMap.regex(
            'invalid-email',
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
          ),
        ).toBe(false)
      })

      it('should return false for non-string values', () => {
        expect(ruleMap.regex(123, '^[0-9]+$')).toBe(false)
        expect(ruleMap.regex(null, '^[0-9]+$')).toBe(false)
      })
    })

    describe('sanitize rule', () => {
      it('should return sanitized value when shouldSanitize is true', () => {
        const result = ruleMap.sanitize(
          '<script>alert("xss")</script>hello',
          true,
        )
        expect(result).not.toContain('<script>')
        expect(result).toContain('hello')
      })

      it('should return original value when shouldSanitize is false', () => {
        const input = '<script>alert("xss")</script>hello'
        const result = ruleMap.sanitize(input, false)
        expect(result).toBe(input)
      })
    })
  })

  describe('typeMap', () => {
    it('should validate string type', () => {
      expect(typeMap.string('hello')).toBe(true)
      expect(typeMap.string('')).toBe(true)
      expect(typeMap.string(123)).toBe(false)
      expect(typeMap.string(null)).toBe(false)
    })

    it('should validate number type', () => {
      expect(typeMap.number(123)).toBe(true)
      expect(typeMap.number(0)).toBe(true)
      expect(typeMap.number(-123)).toBe(true)
      expect(typeMap.number('123')).toBe(false)
      expect(typeMap.number(null)).toBe(false)
    })

    it('should validate boolean type', () => {
      expect(typeMap.boolean(true)).toBe(true)
      expect(typeMap.boolean(false)).toBe(true)
      expect(typeMap.boolean(1)).toBe(false)
      expect(typeMap.boolean('true')).toBe(false)
      expect(typeMap.boolean(null)).toBe(false)
    })

    it('should validate array type', () => {
      expect(typeMap.array([])).toBe(true)
      expect(typeMap.array([1, 2, 3])).toBe(true)
      expect(typeMap.array('hello')).toBe(false)
      expect(typeMap.array(null)).toBe(false)
    })

    it('should validate object type', () => {
      expect(typeMap.object({})).toBe(true)
      expect(typeMap.object({ key: 'value' })).toBe(true)
      expect(typeMap.object([])).toBe(false)
      expect(typeMap.object(null)).toBe(false)
    })
  })

  describe('sanitizeInput', () => {
    it('should remove script tags', () => {
      const input = '<script>alert("xss")</script>hello'
      const result = sanitizeInput(input)
      expect(result).not.toContain('<script>')
      expect(result).not.toContain('</script>')
      expect(result).toContain('hello')
    })

    it('should remove event handlers', () => {
      const input = '<div onclick="alert(\'xss\')">hello</div>'
      const result = sanitizeInput(input)
      expect(result).not.toContain('onclick')
      expect(result).toContain('hello')
    })

    it('should remove JavaScript URLs', () => {
      const input = '<a href="javascript:alert(\'xss\')">click me</a>'
      const result = sanitizeInput(input)
      expect(result).not.toContain('javascript:')
      expect(result).toContain('click me')
    })

    it('should remove HTML tags', () => {
      const input = '<p>Hello <strong>world</strong>!</p>'
      const result = sanitizeInput(input)
      expect(result).not.toContain('<p>')
      expect(result).not.toContain('<strong>')
      expect(result).not.toContain('</strong>')
      expect(result).not.toContain('</p>')
      expect(result).toContain('Hello world!')
    })

    it('should trim whitespace', () => {
      const input = '  hello world  '
      const result = sanitizeInput(input)
      expect(result).toBe('hello world')
    })

    it('should return non-string values unchanged', () => {
      expect(sanitizeInput(123)).toBe(123)
      expect(sanitizeInput(null)).toBe(null)
      expect(sanitizeInput(undefined)).toBe(undefined)
      expect(sanitizeInput(true)).toBe(true)
    })

    it('should handle complex XSS attempts', () => {
      const input =
        '<img src="x" onerror="alert(\'xss\')"><script>alert("xss")</script>'
      const result = sanitizeInput(input)
      expect(result).not.toContain('<img')
      expect(result).not.toContain('onerror')
      expect(result).not.toContain('<script>')
      expect(result).not.toContain('alert')
    })
  })
})
