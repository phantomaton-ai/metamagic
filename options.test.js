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

    expect(result.attributes.mode.optional).to.equal(false);
    expect(result.attributes.mode.description).to.equal('The mode parameter');
    expect(result.attributes.mode.validate('foo')).to.equal(true);
    expect(result.attributes.mode.validate(null)).to.equal(false);

    expect(result.attributes.optional.optional).to.equal(true);
    expect(result.attributes.optional.description).to.equal('The optional parameter');
    expect(result.attributes.optional.validate('foo')).to.equal(true);
    expect(result.attributes.optional.validate(null)).to.equal(false);

    expect(result.body.optional).to.equal(false);
    expect(result.body.description).to.equal('The body parameter');
    expect(result.body.validate('foo')).to.equal(true);
    expect(result.body.validate(null)).to.equal(false);
  });

  it('should handle string descriptions', () => {
    const result = options('test', {
      attributes: {
        mode: 'Processing mode'
      },
      body: 'Input data',
      description: 'Custom description'
    });

    expect(result.attributes.mode.optional).to.equal(false);
    expect(result.attributes.mode.description).to.equal('Processing mode');
    expect(result.attributes.mode.validate('foo')).to.equal(true);
    expect(result.attributes.mode.validate(null)).to.equal(false);

    expect(result.body.optional).to.equal(false);
    expect(result.body.description).to.equal('Input data');
    expect(result.body.validate('foo')).to.equal(true);
    expect(result.body.validate(null)).to.equal(false);

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