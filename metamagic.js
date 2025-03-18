import processOptions from './options.js';
import createValidator from './validator.js';
import createExample from './exemplifier.js';

export default function metamagic(name, execute, opts = {}) {
  const processedOptions = processOptions(name, opts);

  return {
    name,
    description: processedOptions.description,
    example: createExample(opts.example, name),
    validate: createValidator(
      processedOptions.attributes, 
      processedOptions.body
    ),
    execute
  };
}