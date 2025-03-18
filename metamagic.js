export default function metamagic(name, execute, options = {}) {
  // Normalize attributes configuration
  const normalizeAttributeConfig = (config) => {
    if (config === true) return { optional: false };
    if (config === false) return { optional: true };
    if (typeof config === 'string') return { description: config, optional: false };
    return { optional: false, ...config };
  };

  // Normalize body configuration
  const normalizeBodyConfig = (config) => {
    if (config === true) return { optional: false };
    if (config === false) return { optional: true };
    if (typeof config === 'string') return { description: config, optional: false };
    return { optional: false, ...config };
  };

  // Prepare attributes configuration
  const attributesConfig = options.attributes 
    ? Object.fromEntries(
        Object.entries(options.attributes).map(([key, value]) => 
          [key, normalizeAttributeConfig(value)]
        )
      )
    : {};

  // Prepare body configuration
  const bodyConfig = options.body 
    ? normalizeBodyConfig(options.body)
    : { optional: true };

  // Validation function
  const validate = (attributes, body) => {
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

  // Generate default example if not provided
  const example = options.example || {
    attributes: {},
    body: null
  };

  // Return command object
  return {
    name,
    description: options.description || `A command named ${name}`,
    example,
    validate,
    execute
  };
}