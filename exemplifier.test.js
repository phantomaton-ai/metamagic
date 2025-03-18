import { expect } from 'lovecraft';
import exemplifier from './exemplifier.js';

describe('Exemplifier', () => {
  it('should return provided example if present', () => {
    const example = {
      attributes: { mode: 'test' },
      body: 'custom body',
      description: 'Custom description'
    };
    const result = exemplifier('test', { example }, {});
    expect(result).to.deep.equal({
      attributes: { mode: 'test' },
      body: 'custom body',
      description: 'Custom description'
    });
  });

  it('should generate example for required attributes', () => {
    const processed = {
      attributes: {
        mode: { optional: false },
        type: { optional: false }
      },
      body: { optional: false }
    };
    const result = exemplifier('test', {}, processed);
    expect(result).to.deep.equal({
      attributes: {
        mode: 'some text',
        type: 'some text'
      },
      body: 'Example text.\nMay span multiple lines\n',
      description: 'Example usage of test command'
    });
  });

  it('should handle optional attributes and body', () => {
    const processed = {
      attributes: {
        mode: { optional: true }
      },
      body: { optional: true }
    };
    const result = exemplifier('test', {}, processed);
    expect(result).to.deep.equal({
      attributes: {},
      body: null,
      description: 'Example usage of test command'
    });
  });
});