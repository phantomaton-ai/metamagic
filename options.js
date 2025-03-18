export default function options(n, o = {}) {
  const normalize = (c) => {
    if (c === true) return { optional: false };
    if (c === false) return { optional: true };
    if (typeof c === 'string') return { description: c, optional: false };
    return { optional: false, validate: v => typeof v === 'string', ...c };
  };

  return {
    attributes: o.attributes 
      ? Object.fromEntries(
          Object.entries(o.attributes).map(([k, v]) => 
            [k, normalize(v)]
          )
        )
      : {},
    body: o.body ? normalize(o.body) : null,
    description: o.description || `A command named ${n}`,
    example: o.example
  };
}
