export default function createValidator(attributesConfig, bodyConfig) {
  return (attributes, body) => {
    // Validate attributes
    for (const [key, config] of Object.entries(attributesConfig)) {
      const value = attributes[key];
      
      // Check for required attributes
      if (!config.optional && value === undefined) {
        return false;
      }

      // Skip validation for undefined optional attributes
      if (config.optional && value === undefined) {
        continue;
      }

      // Run custom validation if provided
      if (config.validate && !config.validate(value)) {
        return false;
      }
    }

    // Validate body
    if (body === undefined || body === null) {
      return bodyConfig.optional;
    }

    // Run body validation if provided
    if (bodyConfig.validate && !bodyConfig.validate(body)) {
      return false;
    }

    return true;
  };
}