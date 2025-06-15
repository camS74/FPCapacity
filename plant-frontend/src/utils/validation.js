// Validation rules
export const rules = {
  required: (value) => !!value || 'This field is required',
  email: (value) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !value || pattern.test(value) || 'Invalid email address';
  },
  minLength: (min) => (value) => {
    return !value || value.length >= min || `Minimum length is ${min} characters`;
  },
  maxLength: (max) => (value) => {
    return !value || value.length <= max || `Maximum length is ${max} characters`;
  },
  number: (value) => {
    return !value || !isNaN(value) || 'Must be a number';
  },
  positive: (value) => {
    return !value || value > 0 || 'Must be a positive number';
  },
};

// Form validation helper
export const validateForm = (values, schema) => {
  const errors = {};
  
  Object.keys(schema).forEach(field => {
    const fieldRules = schema[field];
    const value = values[field];
    
    if (Array.isArray(fieldRules)) {
      for (const rule of fieldRules) {
        const error = rule(value);
        if (error) {
          errors[field] = error;
          break;
        }
      }
    } else if (typeof fieldRules === 'function') {
      const error = fieldRules(value);
      if (error) {
        errors[field] = error;
      }
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}; 