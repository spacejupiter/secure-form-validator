import { ruleMap } from '../utils/validationMap'
import { getErrorMessage } from '../utils/errorMessages'
import { ValidationResult } from '../types'
import { type Locale } from '../i18n'

const hasValidationRules = (rules: Record<string, any>): boolean =>
  rules ? Object.keys(rules).length > 0 : false

const validateField = (
  key: string,
  value: any,
  rules: Record<string, any>,
  sanitizedData: Record<string, any>,
  locale: Locale = 'en'
): { isValid: boolean; error?: string } => {
  for (const [ruleName, ruleValue] of Object.entries(rules)) {
    const ruleFunction = ruleMap[ruleName]

    if (ruleFunction) {
      const result = ruleFunction(value, ruleValue)

      if (!result) {
        return {
          isValid: false,
          error: getErrorMessage(ruleName, ruleValue, locale),
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
  const locale = (options.locale as Locale) || 'en'

  for (const [key, rules] of Object.entries(schema)) {
    const value = data[key]
    const fieldHasRules = hasValidationRules(rules)

    if (fieldHasRules) {
      const fieldValidation = validateField(key, value, rules, sanitizedData, locale)

      if (!fieldValidation.isValid) {
        errors[key] = fieldValidation.error!
        return { isValid: false, errors, sanitizedData, rawData: data }
      }
    }
  }

  const isValid = Object.keys(errors).length === 0
  return { isValid, errors, sanitizedData, rawData: data }
}
