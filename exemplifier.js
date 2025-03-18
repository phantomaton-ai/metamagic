export default function exemplifier(n, o, p) {
  if (o.example) return {
    ...o.example,
    description: o.example.description || `Example usage of ${n} command`
  };

  return {
    attributes: Object.fromEntries(
      Object.entries(p.attributes).map(([k, c]) => [k, 'some text'])
    ),
    body: (p.body && !p.body.optional)
      ? 'Example text.\nMay span multiple lines\n'
      : null,
    description: `Example usage of ${n} command`
  };
}
