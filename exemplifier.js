export default function createExample(providedExample, name) {
  return providedExample || {
    attributes: {},
    body: null
  };
}