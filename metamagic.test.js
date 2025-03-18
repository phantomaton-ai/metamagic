import { expect, stub } from 'lovecraft';
import metamagic from './metamagic.js';

describe('Metamagic', () => {
  describe('Basic Command Creation', () => {
    it('should create a simple command with minimal arguments', () => {
      const greetCommand = metamagic('greet', () => 'Hello, world!');

      expect(greetCommand.name).to.equal('greet');
      expect(greetCommand.description).to.equal('A command named greet');
      expect(greetCommand.example).to.deep.equal({
        attributes: {},
        body: null,
        description: 'Example usage of greet command'
      });
      
      const result = greetCommand.execute({}, null);
      expect(result).to.equal('Hello, world!');
    });

    it('should handle boolean attribute specifications', () => {
      const echoCommand = metamagic(
        'echo', 
        (attrs, body) => `${attrs.prefix || ''}${body}`,
        {
          attributes: {
            prefix: false
          },
          body: true
        }
      );

      expect(echoCommand.validate({}, 'test message')).to.be.true;
      expect(echoCommand.validate({}, null)).to.be.false;
      expect(echoCommand.validate({ prefix: 'Hello ' }, 'world')).to.be.true;
    });

    it('should handle string attribute and body descriptions', () => {
      const processCommand = metamagic(
        'process', 
        (attrs, body) => body.toUpperCase(),
        {
          attributes: {
            mode: 'Processing mode'
          },
          body: 'Input data to process',
          description: 'Process and transform input'
        }
      );

      expect(processCommand.description).to.equal('Process and transform input');
      expect(processCommand.validate({ mode: 'test' }, 'data')).to.be.true;
    });
  });

  describe('Advanced Validation', () => {
    it('should support custom attribute validation', () => {
      const userCommand = metamagic(
        'createUser', 
        (attrs, body) => ({ 
          username: attrs.username, 
          email: body 
        }),
        {
          attributes: {
            username: {
              description: 'User\'s username',
              validate: (username) => username.length >= 3 && username.length <= 20
            }
          },
          body: {
            description: 'User\'s email',
            validate: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
          }
        }
      );

      expect(userCommand.validate({ username: 'johndoe' }, 'john@example.com')).to.be.true;
      expect(userCommand.validate({ username: 'jo' }, 'john@example.com')).to.be.false;
      expect(userCommand.validate({ username: 'johndoe' }, 'invalid-email')).to.be.false;
    });

    it('should provide default example when not specified', () => {
      const listCommand = metamagic(
        'list', 
        (attrs) => ['item1', 'item2'],
        {
          attributes: {
            type: {
              description: 'Type of items to list',
              optional: true
            }
          }
        }
      );

      expect(listCommand.example).to.deep.equal({
        attributes: {},
        body: null
      });
    });

    it('should support custom example', () => {
      const searchCommand = metamagic(
        'search', 
        (attrs, body) => body.filter(item => item.includes(attrs.query)),
        {
          attributes: {
            query: {
              description: 'Search query'
            }
          },
          body: {
            description: 'List of items to search'
          },
          example: {
            attributes: { query: 'apple' },
            body: 'banana\napple pie\norange',
            description: 'Search for apple in the body text'
          }
        }
      );

      expect(searchCommand.example).to.deep.equal({
        attributes: { query: 'apple' },
        body: 'banana\napple pie\norange',
        description: 'Search for apple in the body text'
      });
    });
  });

  describe('Execution and Validation', () => {
    it('should correctly execute command with attributes and body', () => {
      const multiplyCommand = metamagic(
        'multiply', 
        (attrs, body) => body.map(num => num * attrs.factor),
        {
          attributes: {
            factor: {
              description: 'Multiplication factor',
              validate: (factor) => typeof factor === 'number'
            }
          },
          body: {
            description: 'List of numbers to multiply',
            validate: (body) => Array.isArray(body)
          }
        }
      );

      const result = multiplyCommand.execute({ factor: 2 }, [1, 2, 3]);
      expect(result).to.deep.equal([2, 4, 6]);
    });
  });
});