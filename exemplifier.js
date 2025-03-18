export default function createExample(name, opts, processed) {
  // If an example is explicitly provided, use it
  if (opts.example) return opts.example;

  // Generate attribute examples
  const attrs = Object.fromEntries(
    Object.entries(processed.attributes).map(([key, config]) => {
      // Use description or key as basis for example value
      const desc = config.description || key;
      const value = config.optional 
        ? undefined 
        : (desc.match(/\w+/)?.[0] || key);
      return [key, value];
    })
  );

  // Generate body example
  const body = processed.body.optional 
    ? null 
    : (processed.body.description?.match(/\w+/)?.[0] || name);

  return {
    attributes: attrs,
    body
  };
}