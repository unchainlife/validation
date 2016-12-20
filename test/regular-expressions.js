const validate = require('../index');
const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-datetime'));

describe('Regular expressions', () => {
  it('should pass for null values', () => {
    const { errors, data } = validate({
      v: null
    }, {
      rules: {
        v: {
          type: String,
          pattern: /^[a-z]+$/
        }
      }
    });
    expect(errors).to.be.undefined;
  });
  it('should not pass for empty values', () => {
    const { errors, data } = validate({
      t: ''
    }, {
      rules: {
        t: {
          type: String,
          pattern: /^[a-z]+$/
        }
      }
    });
    expect(errors).to.not.be.undefined;
    expect(errors.t).to.not.be.defined;
  });
  if('should succeed', () => {
    const { errors, data } = validate({
      t: 'abcdef'
    }, {
      rules: {
        t: {
          type: String,
          pattern: /^[a-z]+$/
        }
      }
    });
    expect(errors).to.be.undefined;
  });
  it('should convert values to strings', () => {
    const { errors, data } = validate({
      v: 1234
    }, {
      rules: {
        v: {
          type: String,
          pattern: /^[0-9]+$/
        }
      }
    });
    expect(errors).to.be.undefined;
  });
});
