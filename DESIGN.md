# Metamagic: Command Interface Design

## Updated Design: Command Creation with Attribute Lists

### Core Interface

```javascript
// Minimal example
const greetCommand = metamagic('greet', () => 'hello!');

// With attribute requirements
const fileReadCommand = metamagic(
  'readFile', 
  ({ path }, body) => {
    // Actual file reading logic
    return fs.readFileSync(path, 'utf-8');
  },
  {
    // Attribute list with flexible validation
    attributes: [
      {
        name: 'path',
        description: 'Path to the file to read',
        validate: (value) => {
          // Custom validation: ensure path exists and is readable
          try {
            fs.accessSync(value, fs.constants.R_OK);
            return true;
          } catch {
            return false;
          }
        }
      },
      {
        name: 'encoding',
        description: 'File encoding',
        // Optional attribute with default
        validate: (value) => ['utf-8', 'ascii', 'base64'].includes(value)
      }
    ],
    body: {
      // Optional body configuration
      required: false
    },
    description: 'Read a file\'s contents',
    example: {
      attributes: { 
        path: '/path/to/example.txt',
        encoding: 'utf-8'
      }
    }
  }
);

// Another example with minimal attributes
const echoCommand = metamagic(
  'echo', 
  (attrs, body) => body,
  {
    attributes: [
      {
        name: 'prefix',
        description: 'Optional prefix for the message',
        validate: (value) => value.length <= 10 // Optional custom validation
      }
    ],
    body: {
      required: true
    }
  }
);
```

## Design Principles

### Attribute Specification
- Each attribute is an object with:
  - `name`: Identifier (required)
  - `description`: Human-readable explanation (optional)
  - `validate`: Custom validation function (optional)
- Implicit string type
- Supports optional attributes
- Enables rich, custom validation

### Validation Strategies
- Default: presence check for required attributes
- Custom validation via function
- Descriptive error potential
- Flexible attribute handling

### Execution Context
- `attributes`: Object of provided attributes
- `body`: Optional input parameter
- Return value determines command result

## Implementation Considerations

### Validation Process
1. Check required attributes
2. Run custom validation functions
3. Aggregate and report validation errors
4. Execute command if validation passes

### Error Handling
- Comprehensive validation error reporting
- Clear distinction between attribute and execution errors
- Potential for rich, extensible error types

## Future Extensions
- TypeScript type inference
- More complex validation scenarios
- Middleware for pre/post validation
- Detailed error reporting mechanism

## Rationale
- Lightweight attribute specification
- Flexible validation
- Clear command interface
- Support for both simple and complex use cases