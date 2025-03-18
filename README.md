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

## Output Interface 🖥️

Each Metamagic command returns a standardized result object compatible with command execution frameworks:

```javascript
{
  // Core result of the command execution
  result: any,
  
  // Command metadata (optional)
  metadata: {
    // Execution context
    name: string,           // Command name
    executedAt: Date,       // Execution timestamp
    
    // Input tracking
    input: {
      attributes: object,   // Attributes passed to the command
      body: any             // Body passed to the command
    },
    
    // Validation details
    validation: {
      attributesValidated: boolean,
      bodyValidated: boolean
    }
  }
}
```

### Example of Detailed Output

```javascript
const processCommand = metamagic('process', 
  (attrs, body) => {
    // Complex processing logic
    return {
      result: processData(body),
      metadata: {
        name: 'process',
        executedAt: new Date(),
        input: {
          attributes: attrs,
          body: body
        },
        validation: {
          attributesValidated: true,
          bodyValidated: true
        },
        // Additional custom metadata
        processingTime: measureExecutionTime(),
        inputSize: body.length
      }
    };
  },
  {
    attributes: {
      mode: {
        description: 'Processing mode',
        optional: true,
        validate: (mode) => ['strict', 'lenient'].includes(mode)
      }
    }
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