export interface ValidationResult {
  isValid: boolean;
  sanitizedData: Record<string, any>;
  errors: Record<string, string>;
  rawData?: Record<string, any>;
}