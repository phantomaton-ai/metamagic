import { expect } from 'lovecraft';
import options from './options.js';

describe('Options', () => {
  it('should normalize boolean configurations', () => {
    const result = options('test', {
      attributes: {
        mode: true,
        optional: false
      },
      body: true
    });

    expect(result.attributes).to.deep.equal({
      mode: { optional: false },
      optional: { optional: true }
    });
    expect(result.body).to.deep.equal({ optional: false });
  });

  it('should handle string descriptions', () => {
    const result = options('test', {
      attributes: {
        mode: 'Processing mode'
      },
      body: 'Input data',
      description: 'Custom description'
    });

    expect(result.attributes.mode).to.deep.equal({ 
      description: 'Processing mode', 
      optional: false 
    });
    expect(result.body).to.deep.equal({ 
      description: 'Input data', 
      optional: false 
    });
    expect(result.description).to.equal('Custom description');
  });

  it('should provide default description', () => {
    const result = options('test');
    expect(result.description).to.equal('A command named test');
  });

  it('should handle complex attribute configurations', () => {
    const result = options('test', {
      attributes: {
        mode: { 
          description: 'Processing mode',
          optional: true
        }
      }
    });

    expect(result.attributes.mode.description).to.equal('Processing mode');
    expect(result.attributes.mode.optional).to.equal(true);
    expect(result.attributes.mode.validate('foo')).to.equal(true);
    expect(result.attributes.mode.validate(null)).to.equal(false);
  });
});