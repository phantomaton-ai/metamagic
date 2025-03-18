# Metamagic: Command Interface Design

## Design Goals

1. Simplify command creation
2. Enforce consistent command structure
3. Provide lightweight schema-based validation
4. Reduce boilerplate
5. Support flexible command definition

## Schema-Based Validation Approach

### Core Concept

The metamagic command creator will support lightweight schema validation with several key features:
- Simple type checking
- Optional/required attribute detection
- Default value generation
- Minimal runtime overhead

### Proposed Interface

```javascript
const echoCommand = metamagic('echo', {
  // Simple schema definition
  schema: {
    message: {
      type: 'string',
      required: true,
      default: () => 'Hello, world!',
      validate: (value) => value.length > 0
    },
    level: {
      type: 'enum',
      options: ['info', 'warn', 'error'],
      default: 'info'
    }
  },
  
  // Simplified execution
  execute: (attrs) => {
    console.log(`[${attrs.level}] ${attrs.message}`);
    return attrs.message;
  },

  // Optional description and example
  description: 'Echo a message with optional logging level',
  example: {
    message: 'Test message',
    level: 'warn'
  }
});
```

## Validation Strategy

### Type Checking
- Supports primitive types: 'string', 'number', 'boolean', 'object', 'array'
- Custom type validation functions
- Enum type support
- Runtime type coercion (optional)

### Validation Features
- Required vs. optional attributes
- Default value generation
- Custom validation functions
- Type coercion
- Error aggregation

### Example Complex Schema

```javascript
const userCommand = metamagic('createUser', {
  schema: {
    username: {
      type: 'string',
      required: true,
      validate: (value) => value.length >= 3 && value.length <= 20
    },
    email: {
      type: 'string',
      required: true,
      validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    },
    age: {
      type: 'number',
      required: false,
      default: null,
      validate: (value) => value === null || (value >= 18 && value <= 120)
    },
    roles: {
      type: 'array',
      default: () => ['user'],
      validate: (value) => {
        const validRoles = ['user', 'admin', 'moderator'];
        return value.every(role => validRoles.includes(role));
      }
    }
  },
  
  execute: (attrs) => {
    // Create user with validated attributes
    return { 
      id: generateId(),
      ...attrs 
    };
  }
});
```

## Implementation Considerations

### Validation Process
1. Check for required attributes
2. Apply default values
3. Perform type checking
4. Run custom validation functions
5. Aggregate and throw validation errors if needed

### Error Handling
- Comprehensive error messages
- Ability to collect multiple validation errors
- Configurable error reporting

## Future Extensions

- TypeScript type inference
- More complex validation scenarios
- Performance optimizations
- Middleware/hook support for validation

## Open Questions

1. How granular should the type checking be?
2. Should we support async validation?
3. What's the right balance between flexibility and constraint?

## Rationale

This approach provides:
- Lightweight schema definition
- Minimal boilerplate
- Flexible validation
- Consistent command structure
- Easy default and optional attribute handling