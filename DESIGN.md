# Metamagic: Command Interface Design

## Updated Design: Command Creation with Flexible Parameters

### Core Interface

```javascript
// Minimal example
const greetCommand = metamagic('greet', () => 'hello!');

// With options and schema
const echoCommand = metamagic('echo', 
  (attrs, body) => body, 
  {
    // Optional schema for attributes
    schema: {
      prefix: {
        type: 'string',
        default: ''
      }
    },
    // Optional body configuration
    body: {
      required: true,        // Body is mandatory
      type: 'string'         // Body must be a string
    }
  }
);
```

## Key Design Principles

### Arguments
1. `name` (string): Command identifier
2. `execute` (function): Core command logic
   - Signature: `(attributes, body) => result`
3. `options` (object, optional): 
   - `schema`: Attribute validation rules
   - `body`: Body parameter configuration
   - `description`: Command documentation
   - `example`: Example usage

### Body Handling
- Optional or required
- Type checking
- Potential transformation

### Validation Strategies
- Attribute schema validation
- Body validation
- Default value generation
- Type coercion

## Comprehensive Example

```javascript
const fileWriteCommand = metamagic(
  'writeFile', 
  ({ path }, body) => {
    // Actual file writing logic
    fs.writeFileSync(path, body);
    return { success: true, path };
  },
  {
    schema: {
      path: {
        type: 'string',
        required: true,
        validate: (path) => path.length > 0
      },
      encoding: {
        type: 'string',
        default: 'utf-8'
      }
    },
    body: {
      required: true,
      type: 'string',
      maxLength: 1_000_000  // Prevent massive file writes
    },
    description: 'Write content to a file',
    example: {
      attributes: { path: '/tmp/example.txt' },
      body: 'Hello, world!'
    }
  }
);
```

## Design Considerations

### Validation Flow
1. Validate attributes against schema
2. Check body requirements
3. Execute command
4. Handle errors gracefully

### Flexible Execution
- Support synchronous and async functions
- Consistent error handling
- Predictable parameter passing

## Future Extensions
- Middleware support
- Advanced type inference
- Performance optimizations
- Detailed error reporting

## Rationale
- Minimal configuration for simple commands
- Comprehensive options for complex scenarios
- Consistent command definition pattern
- Explicit body and attribute handling