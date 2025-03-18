import processOptions from './options.js';
import createValidator from './validator.js';
import createExample from './exemplifier.js';

export default function metamagic(name, execute, opts = {}) {
  const processed = processOptions(name, opts);

  return {
    name,
    description: processed.description,
    example: createExample(name, opts, processed),
    validate: createValidator(
      processed.attributes, 
      processed.body
    ),
    execute
  };
}