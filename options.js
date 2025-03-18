export default function options(n, o = {}) {
  const normalize = (k, c) => {
    if (c === true) c = { optional: false };
    if (c === false) c = { optional: true };
    if (typeof c === 'string') c = { description: c, optional: false };
    return {
      optional: false,
      description: `The ${k} parameter`,
      validate: v => typeof v === 'string',
      ...c
    };
  };

  return {
    attributes: o.attributes 
      ? Object.fromEntries(
          Object.entries(o.attributes).map(([k, v]) => 
            [k, normalize(k, v)]
          )
        )
      : {},
    body: o.body ? normalize('body', o.body) : null,
    description: o.description || `A command named ${n}`,
    example: o.example
  };
}
