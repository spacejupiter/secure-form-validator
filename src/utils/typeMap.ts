import { EMAIL_REGEX } from '../constant/sanitise'

export const typeMap: Record<string, (value: any) => any> = {
  email: (value) => EMAIL_REGEX.test(value),
  number: (value) => typeof value === 'number' && !isNaN(value),
  string: (value) => typeof value === 'string',
  boolean: (value) => typeof value === 'boolean',
  array: (value) => Array.isArray(value),
  object: (value) =>
    typeof value === 'object' && value !== null && !Array.isArray(value),
  date: (value) => value instanceof Date,
}


