import { processOptions } from './options.js';
import { createValidator } from './validator.js';
import { createExample } from './exemplifier.js';

export default function metamagic(name, execute, options = {}) {
  const processedOptions = processOptions(name, options);

  return {
    name,
    description: processedOptions.description,
    example: createExample(options.example, name),
    validate: createValidator(
      processedOptions.attributes, 
      processedOptions.body
    ),
    execute
  };
}