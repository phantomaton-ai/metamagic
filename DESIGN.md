# Metamagic: Command Interface Design

## Updated Design: Command Creation with Enhanced Examples and Optional Attributes

### Core Interface

```javascript
const fileReadCommand = metamagic(
  'readFile', 
  ({ path, encoding }, body) => {
    // Actual file reading logic
    return fs.readFileSync(path, encoding || 'utf-8');
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
        optional: true, // Mark as optional
        validate: (value) => ['utf-8', 'ascii', 'base64'].includes(value)
      }
    ],
    body: {
      optional: true // Body is not required
    },
    // Multiple examples with descriptions
    examples: [
      {
        description: 'Read a text file with default UTF-8 encoding',
        attributes: { 
          path: '/path/to/example.txt'
        }
      },
      {
        description: 'Read a file with specific encoding',
        attributes: { 
          path: '/path/to/binary.txt',
          encoding: 'base64'
        }
      }
    ],
    description: 'Read a file\'s contents'
  }
);

// Another example with multiple examples
const gitCloneCommand = metamagic(
  'gitClone',
  ({ url, branch }, body) => {
    // Git clone logic
    return simpleGit().clone(url, body || './', branch ? ['-b', branch] : []);
  },
  {
    attributes: [
      {
        name: 'url',
        description: 'Repository URL to clone'
      },
      {
        name: 'branch',
        description: 'Specific branch to clone',
        optional: true
      }
    ],
    body: {
      optional: true,
      description: 'Optional destination directory'
    },
    examples: [
      {
        description: 'Clone a repository to current directory',
        attributes: {
          url: 'https://github.com/user/repo.git'
        }
      },
      {
        description: 'Clone a specific branch to a custom directory',
        attributes: {
          url: 'https://github.com/user/repo.git',
          branch: 'develop'
        },
        body: './my-project'
      }
    ],
    description: 'Clone a Git repository'
  }
);
```

## Design Principles

### Attribute and Body Handling
- `optional: true` explicitly marks non-required elements
- Default behavior is to require specified attributes
- Flexible validation and description

### Example Specification
- `examples` is an array of example objects
- Each example includes:
  - `description`: Explains the example's context
  - `attributes`: Example attribute values
  - `body`: Optional body value

### Validation and Execution
- Attributes and body are validated if specified
- Custom validation functions
- Comprehensive error potential
- Flexible execution context

## Implementation Considerations

### Validation Process
1. Check specified attributes
2. Run optional custom validation
3. Support partially specified configurations
4. Provide rich error information

### Examples Purpose
- Documentation
- Testing
- Quick start guidance
- Demonstrate different use cases

## Future Extensions
- Interactive example generation
- Example-driven testing
- Enhanced documentation tools
- IDE integration for example exploration

## Rationale
- Flexible attribute specification
- Clear, descriptive examples
- Support for complex command scenarios
- Improved developer experience