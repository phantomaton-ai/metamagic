# Metamagic 🧙‍♂️✨

A lightweight, flexible command definition and validation library for JavaScript.

## Overview 🌟

Metamagic simplifies creating self-documenting, robust commands with built-in validation and example generation.

## Installation 📦

```bash
npm install metamagic
```

## Usage 🛠️

### Basic Command Creation

```javascript
import metamagic from 'metamagic';

// Simplest command: no attributes, no body
const greetCommand = metamagic('greet', () => 'Hello, world!');

// Command with attributes and body
const echoCommand = metamagic(
  'echo', 
  (attrs, body) => `${attrs.prefix || ''}${body}`,
  {
    attributes: {
      prefix: {
        description: 'Optional text to prepend to the message',
        optional: true
      }
    },
    body: {
      description: 'The message to echo'
    }
  }
);
```

## Command Object Interface 🖥️

The `metamagic()` function returns an object with the following structure:

```javascript
{
  // Command identifier
  name: string,

  // Human-readable description of the command
  description?: string,

  // Example usage of the command
  example?: {
    attributes: object,
    body?: any
  },

  // Validate command attributes and body
  validate: (attributes: object, body: any) => boolean,

  // Execute the command with given attributes and body
  execute: (attributes: object, body: any) => any
}
```

### Example of Command Object

```javascript
const processCommand = metamagic('process', 
  (attrs, body) => {
    // Command execution logic
    return processData(body);
  },
  {
    description: 'Process input data',
    attributes: {
      mode: {
        description: 'Processing mode',
        optional: true,
        validate: (mode) => ['strict', 'lenient'].includes(mode)
      }
    },
    example: {
      attributes: { mode: 'strict' },
      body: 'input data'
    }
  }
);

// Usage
const isValid = processCommand.validate({ mode: 'strict' }, 'data');
const result = processCommand.execute({ mode: 'strict' }, 'data');
```

## Validation Behavior 🕵️‍♀️

- Specified attributes are required by default
- Use `optional: true` to make an attribute or body optional
- Custom `validate` functions can provide complex validation logic
- Attributes are implicitly treated as strings

## Error Handling 🚨

- Validation errors provide detailed feedback
- Execution halts if attribute validation fails
- Custom validation functions can provide specific error messages

## Roadmap 🗺️

- [ ] TypeScript type inference
- [ ] Advanced middleware support
- [ ] Enhanced error reporting
- [ ] CLI generation from command definitions

## Contributing 🦄

We welcome contributions to the Metamagic project! If you have any ideas, bug reports, or pull requests, please feel free to submit them on our GitHub repository.

## License 🔒

Metamagic is licensed under the MIT License.