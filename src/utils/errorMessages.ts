import { messages, type Locale } from '../i18n'

export const getErrorMessage = (ruleName: string, ruleValue: any, locale: Locale = 'en'): string => {
  const localeMessages = messages[locale] || messages.en
  
  const errorMessageMap: Record<string, (value: any) => string> = {
    required: () => localeMessages.required,
    minLength: (value) => localeMessages.minLength.replace('{min}', value.toString()),
    maxLength: (value) => localeMessages.maxLength.replace('{max}', value.toString()),
    type: (value) => localeMessages.type.replace('{type}', value),
    regex: () => localeMessages.regex,
    email: () => localeMessages.email
  }
  
  const getMessage = errorMessageMap[ruleName]
  return getMessage ? getMessage(ruleValue) : `Validation failed for rule: ${ruleName}`
}
