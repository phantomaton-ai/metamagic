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

## API Reference 📝

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
  attributes: {
    [attributeName: string]: 
      | true                    // Simple required attribute
      | false                   // Optional attribute
      | string                  // Description of attribute
      | {
          description?: string,     // Human-readable explanation
          optional?: boolean,       // Default is false (required)
          validate?: (value) => boolean  // Custom validation function
        }
  },

  // Body configuration
  body?: 
    | true                      // Required body
    | false                     // Optional body
    | string                    // Body description
    | {
        optional?: boolean,     // Default is false (required)
        description?: string,   // Explanation of body purpose
        validate?: (body) => boolean  // Custom body validation
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

## Example: Complex Command 🚀

```javascript
const fileReadCommand = metamagic(
  'readFile',
  ({ path, encoding }, body) => {
    return fs.readFileSync(path, encoding || 'utf-8');
  },
  {
    attributes: {
      path: {
        description: 'File path to read',
        validate: (path) => fs.existsSync(path)
      },
      encoding: {
        description: 'File character encoding',
        optional: true
      }
    },
    body: {
      optional: true,
      description: 'Optional alternative file path',
      validate: (body) => body === undefined || fs.existsSync(body)
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