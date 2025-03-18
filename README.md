# Metamagic 🧙‍♂️✨

A lightweight, flexible command definition and validation library for JavaScript.

[... previous content remains the same ...]

## Gallows Compatibility 🤝

Metamagic provides full compatibility with Gallows command execution patterns while offering additional features:

```javascript
import metamagic from 'metamagic';

// Gallows-compatible command definition
const echoCommand = metamagic('echo', 
  (attributes, body) => body, 
  {
    // Maintains Gallows-style example for backward compatibility
    example: {
      attributes: {},
      body: 'Hello, World!'
    },
    // Additional Metamagic-specific multiple examples
    examples: [
      {
        description: 'Simple echo',
        attributes: {},
        body: 'Hello, Metamagic!'
      },
      {
        description: 'Echo with prefix',
        attributes: { prefix: 'Message: ' },
        body: 'Hello, World!'
      }
    ]
  }
);

// Execution remains compatible with Gallows
const result = echoCommand.execute(
  'echo',   // action name
  {},       // attributes
  'Hello, World!'  // body
);
```

## Output Interface 🖥️

Metamagic commands provide a rich output interface:

```javascript
const command = metamagic('myCommand', 
  (attrs, body) => {
    // Returns a command result object
    return {
      // Execution result
      result: 'Processed successfully',
      
      // Optional metadata about the execution
      metadata: {
        // Timestamps
        executedAt: new Date(),
        
        // Input tracking
        input: {
          attributes: attrs,
          body: body
        },
        
        // Optional validation details
        validation: {
          attributesValidated: true,
          bodyValidated: true
        }
      }
    };
  }
);
```

### Output Features

- Standardized result format
- Optional metadata about command execution
- Preservation of input context
- Validation tracking
- Extensible result structure

## Advanced Execution 🚀

```javascript
// Command with advanced execution and result tracking
const advancedCommand = metamagic('process', 
  (attrs, body) => {
    // Complex processing
    return {
      result: processData(body),
      metadata: {
        processingTime: measureExecutionTime(),
        inputSize: body.length,
        customAttributes: attrs
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

[... rest of previous README remains the same ...]