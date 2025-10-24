import { typeMap } from './typeMap'
import { sanitizeInput } from './sanitize'

const isString = (value: unknown): value is string => typeof value === 'string'

export const ruleMap: Record<
  string,
  (value: any, ruleValue: any) => boolean | any
> = {
  required: (value, isRequired) =>
    !isRequired || (value !== undefined && value !== null && value !== ''),
  minLength: (value, min) => (isString(value) ? value.length >= min : false),
  maxLength: (value, max) => (isString(value) ? value.length <= max : false),
  type: (value, type) => {
    return typeMap[type](value)
  },
  regex: (value, pattern) =>
    isString(value) ? new RegExp(pattern).test(value) : false,
  sanitize: (value, shouldSanitize) =>
    shouldSanitize ? sanitizeInput(value) : value,
}
