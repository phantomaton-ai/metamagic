export default function processOptions(name, opts = {}) {
  const normalizeConfig = (config) => {
    if (config === true) return { optional: false };
    if (config === false) return { optional: true };
    if (typeof config === 'string') return { description: config, optional: false };
    return { optional: false, ...config };
  };

  return {
    attributes: opts.attributes 
      ? Object.fromEntries(
          Object.entries(opts.attributes).map(([key, value]) => 
            [key, normalizeConfig(value)]
          )
        )
      : {},
    body: opts.body 
      ? normalizeConfig(opts.body)
      : { optional: true },
    description: opts.description || `A command named ${name}`,
    example: opts.example || {
      attributes: {},
      body: null
    }
  };
}