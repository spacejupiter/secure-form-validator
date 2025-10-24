import { ruleMap } from '../utils/validationMap'
import { ValidationResult } from '../types'

const hasValidationRules = (rules: Record<string, any>): boolean =>
  rules ? Object.keys(rules).length > 0 : false

const validateField = (
  key: string,
  value: any,
  rules: Record<string, any>,
  sanitizedData: Record<string, any>,
): { isValid: boolean; error?: string } => {
  for (const [ruleName, ruleValue] of Object.entries(rules)) {
    const ruleFunction = ruleMap[ruleName]

    if (ruleFunction) {
      const result = ruleFunction(value, ruleValue)

      if (!result) {
        return {
          isValid: false,
          error: `Validation failed for rule: ${ruleName}`,
        }
      }
    }
  }

  if (rules?.sanitize && ruleMap?.sanitize) {
    sanitizedData[key] = ruleMap.sanitize(value, rules.sanitize)
  }

  return { isValid: true }
}

export const validate = (
  data: Record<string, any>,
  schema: Record<string, any>,
  options: { locale?: string } = {},
): ValidationResult => {
  const errors: Record<string, string> = {}
  const sanitizedData: Record<string, any> = { ...data }

  for (const [key, rules] of Object.entries(schema)) {
    const value = data[key]
    const fieldHasRules = hasValidationRules(rules)

    if (fieldHasRules) {
      const fieldValidation = validateField(key, value, rules, sanitizedData)

      if (!fieldValidation.isValid) {
        errors[key] = fieldValidation.error!
        return { isValid: false, errors, sanitizedData, rawData: data }
      }
    }
  }

  const isValid = Object.keys(errors).length === 0
  return { isValid, errors, sanitizedData, rawData: data }
}
