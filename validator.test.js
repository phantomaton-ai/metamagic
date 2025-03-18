import { expect } from 'lovecraft';
import createValidator from './validator.js';

describe('Validator', () => {
  it('should validate required attributes', () => {
    const validator = createValidator(
      { 
        mode: { optional: false },
        type: { optional: false }
      }, 
      { optional: false }
    );

    expect(validator({ mode: 'test', type: 'example' }, 'body')).to.be.true;
    expect(validator({ mode: 'test' }, 'body')).to.be.false;
    expect(validator({}, 'body')).to.be.false;
  });

  it('should validate optional attributes', () => {
    const validator = createValidator(
      { 
        mode: { optional: true },
        type: { optional: false }
      }, 
      { optional: false }
    );

    expect(validator({ type: 'example' }, 'body')).to.be.true;
    expect(validator({}, 'body')).to.be.false;
  });

  it('should run custom attribute validation', () => {
    const validator = createValidator(
      { 
        mode: { 
          optional: false, 
          validate: (value) => value.length > 3 
        }
      }, 
      { optional: false }
    );

    expect(validator({ mode: 'good' }, 'body')).to.be.true;
    expect(validator({ mode: 'bad' }, 'body')).to.be.false;
  });

  it('should validate body', () => {
    const validator = createValidator(
      {}, 
      { 
        optional: false,
        validate: (body) => body.length > 5
      }
    );

    expect(validator({}, 'longer body')).to.be.true;
    expect(validator({}, 'short')).to.be.false;
  });

  it('should handle optional body', () => {
    const validator = createValidator(
      {}, 
      { optional: true }
    );

    expect(validator({}, null)).to.be.true;
    expect(validator({}, undefined)).to.be.true;
  });
});