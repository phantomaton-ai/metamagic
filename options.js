export default function processOptions(n, o = {}) {
  const normalize = (c) => {
    if (c === true) return { optional: false };
    if (c === false) return { optional: true };
    if (typeof c === 'string') return { description: c, optional: false };
    return { 
      optional: false, 
      ...c,
      // Ensure default can be specified
      default: c.default !== undefined ? c.default : undefined 
    };
  };

  return {
    attributes: o.attributes 
      ? Object.fromEntries(
          Object.entries(o.attributes).map(([k, v]) => 
            [k, normalize(v)]
          )
        )
      : {},
    body: o.body 
      ? normalize(o.body)
      : { optional: true },
    description: o.description || `A command named ${n}`,
    example: o.example
  };
}