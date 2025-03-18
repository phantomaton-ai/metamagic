# Metamagic: Command Interface Design

## Design Goals

1. Simplify command creation
2. Enforce consistent command structure
3. Provide flexible, composable command generation
4. Reduce boilerplate
5. Support various command definition styles

## Proposed Interfaces

### Option 1: Builder Pattern

```javascript
const echoCommand = metamagic()
  .name('echo')
  .description('Echo a message')
  .validate(({ message }) => message !== undefined)
  .execute(({ message }) => message)
  .example({ message: 'Hello, world!' });
```

### Option 2: Simplified Constructor

```javascript
const echoCommand = metamagic('echo', {
  description: 'Echo a message',
  validate: ({ message }) => message !== undefined,
  execute: ({ message }) => message,
  example: { message: 'Hello, world!' }
});
```

### Option 3: Functional Composition

```javascript
const withValidation = (validator) => (command) => ({
  ...command,
  validate: validator
});

const withExecution = (executor) => (command) => ({
  ...command,
  execute: executor
});

const echo = metamagic('echo')
  |> withDescription('Echo a message')
  |> withValidation(({ message }) => message !== undefined)
  |> withExecution(({ message }) => message)
  |> withExample({ message: 'Hello, world!' });
```

## Key Considerations

- Consistent validation strategy
- Optional vs. required attributes
- Error handling
- Type checking
- Logging/instrumentation hooks
- Serialization/deserialization support

## Validation Strategies

1. Simple predicate functions
2. Schema-based validation (e.g., Joi, Zod)
3. TypeScript type guards
4. Runtime type checking

## Example Advanced Usage

```javascript
const commands = metamagic()
  .register('echo', {
    description: 'Echo a message',
    validate: z.object({
      message: z.string()
    }),
    execute: ({ message }) => message
  })
  .register('log', {
    description: 'Log a message',
    validate: z.object({
      level: z.enum(['info', 'warn', 'error']),
      message: z.string()
    }),
    execute: (attrs) => {
      console[attrs.level](attrs.message);
      return attrs.message;
    }
  });
```

## Performance Considerations

- Minimal overhead
- Lazy validation
- Efficient command dispatch
- Minimal object creation

## Future Extensions

- Middleware support
- Dependency injection
- Aspect-oriented programming hooks
- Command composition/chaining

## Open Questions

1. How strict should type checking be?
2. Should we support async validators/executors?
3. What's the right balance between flexibility and constraint?
