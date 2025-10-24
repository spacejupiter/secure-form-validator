// Internationalization messages
export const messages = {
  en: {
    required: 'This field is required',
    minLength: 'Must be at least {min} characters long',
    maxLength: 'Must be no more than {max} characters long',
    type: 'Must be a valid {type}',
    regex: 'Invalid format',
    email: 'Must be a valid email address',
  },
  es: {
    required: 'Este campo es obligatorio',
    minLength: 'Debe tener al menos {min} caracteres',
    maxLength: 'No debe tener más de {max} caracteres',
    type: 'Debe ser un {type} válido',
    regex: 'Formato inválido',
    email: 'Debe ser un email válido',
  },
  fr: {
    required: 'Ce champ est obligatoire',
    minLength: 'Doit contenir au moins {min} caractères',
    maxLength: 'Ne doit pas dépasser {max} caractères',
    type: 'Doit être un {type} valide',
    regex: 'Format invalide',
    email: 'Doit être un email valide',
  },
}

export type Locale = keyof typeof messages
export type MessageKey = keyof typeof messages['en']
