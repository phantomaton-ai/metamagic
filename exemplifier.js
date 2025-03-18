export default function createExample(n, o, p) {
  // If an example is explicitly provided, use it
  if (o.example) return {
    ...o.example,
    description: o.example.description || `Example usage of ${n} command`
  };

  // Generate attribute examples
  const attrs = Object.fromEntries(
    Object.entries(p.attributes).map(([k, c]) => {
      // Use description or key as basis for example value
      const desc = c.description || k;
      const def = c.default; // Support default value if provided
      const val = def !== undefined 
        ? def 
        : (desc.match(/\w+/)?.[0] || k);
      return [k, val];
    })
  );

  // Generate body example
  const body = p.body.default !== undefined 
    ? p.body.default
    : (p.body.optional 
      ? null 
      : (p.body.description?.match(/\w+/)?.[0] || n));

  return {
    attributes: attrs,
    body,
    description: `Perform the ${n} command`
  };
}