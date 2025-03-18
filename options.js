export function normalizeAttributeConfig(config) {
  if (config === true) return { optional: false };
  if (config === false) return { optional: true };
  if (typeof config === 'string') return { description: config, optional: false };
  return { optional: false, ...config };
}

export function normalizeBodyConfig(config) {
  if (config === true) return { optional: false };
  if (config === false) return { optional: true };
  if (typeof config === 'string') return { description: config, optional: false };
  return { optional: false, ...config };
}

export function processOptions(name, options = {}) {
  return {
    attributes: options.attributes 
      ? Object.fromEntries(
          Object.entries(options.attributes).map(([key, value]) => 
            [key, normalizeAttributeConfig(value)]
          )
        )
      : {},
    body: options.body 
      ? normalizeBodyConfig(options.body)
      : { optional: true },
    description: options.description || `A command named ${name}`,
    example: options.example || {
      attributes: {},
      body: null
    }
  };
}