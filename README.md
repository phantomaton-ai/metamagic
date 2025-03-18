# Metamagic 🧙‍♂️✨

A lightweight, flexible command definition and validation library for JavaScript.

## Overview

Metamagic simplifies creating self-documenting, robust commands with built-in validation and example generation.

## Installation

```bash
npm install metamagic
```

## Basic Usage

```javascript
import metamagic from 'metamagic';

// Simplest command: no attributes, no body
const greetCommand = metamagic('greet', () => 'Hello, world!');

// Command with attributes and body
const echoCommand = metamagic(
  'echo', 
  (attrs, body) => `${attrs.prefix || ''}${body}`,
  {
    attributes: [
      {
        name: 'prefix',
        description: 'Optional text to prepend to the message',
        optional: true
      }
    ],
    body: {
      description: 'The message to echo'
    }
  }
);
```

## API Reference

### `metamagic(name, execute, options?)`

#### Arguments

1. `name` (string, required): 
   - Unique identifier for the command
   - Used for documentation and potential CLI generation

2. `execute` (function, required):
   - Core command logic
   - Signature: `(attributes, body) => result`
   - Receives validated attributes and optional body
   - Returns command result

3. `options` (object, optional): Advanced configuration

#### Options Object

```javascript
{
  // Attribute validation specifications
  attributes: [
    {
      name: string,             // Attribute identifier
      description?: string,     // Human-readable explanation
      optional?: boolean,       // Default is false (required)
      validate?: (value) => boolean  // Custom validation function
    }
  ],

  // Body configuration
  body?: {
    optional?: boolean,         // Default is false (required)
    description?: string        // Explanation of body purpose
  },

  // Command documentation
  description?: string,         // What the command does

  // Multiple usage examples
  examples?: [
    {
      description: string,      // Context for this example
      attributes?: object,      // Example attribute values
      body?: any                // Optional example body
    }
  ]
}
```

## Validation Behavior

- Specified attributes are required by default
- Use `optional: true` to make an attribute or body optional
- Custom `validate` functions can provide complex validation logic
- Attributes are implicitly treated as strings

## Example: Complex Command

```javascript
const fileReadCommand = metamagic(
  'readFile',
  ({ path, encoding }, body) => {
    return fs.readFileSync(path, encoding || 'utf-8');
  },
  {
    attributes: [
      {
        name: 'path',
        description: 'File path to read',
        validate: (path) => fs.existsSync(path)
      },
      {
        name: 'encoding',
        description: 'File character encoding',
        optional: true
      }
    ],
    body: {
      optional: true,
      description: 'Optional alternative file path'
    },
    description: 'Read contents of a file',
    examples: [
      {
        description: 'Read file with default encoding',
        attributes: { path: '/path/to/file.txt' }
      },
      {
        description: 'Read file with specific encoding',
        attributes: { 
          path: '/path/to/file.txt', 
          encoding: 'base64' 
        }
      }
    ]
  }
);
```

## Error Handling

- Validation errors provide detailed feedback
- Execution halts if attribute validation fails
- Custom validation functions can provide specific error messages

## Roadmap

- [ ] TypeScript type inference
- [ ] Advanced middleware support
- [ ] Enhanced error reporting
- [ ] CLI generation from command definitions

## Contributing

Contributions welcome! Please read our Contributing Guidelines.

## License

MIT License