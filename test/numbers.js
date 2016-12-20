const validate = require('../index');
const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-datetime'));

describe('Number ranges', () => {
  it('should ignore', () => {
    const { errors, data } = validate({
      missing: null
    }, {
      rules: {
        missing: { min: 50, max: 1000 }
      }
    });
    expect(errors).to.be.undefined;
  });

  it('should pass', () => {
    const { errors, data } = validate({
      minOnly: 8,
      maxOnly: 19,
      between: 88
    }, {
      rules: {
        minOnly: { min: 1 },
        maxOnly: { max: 100 },
        between: { min: 50, max: 1000 }
      }
    });
    expect(errors).to.be.undefined;
  });

  it('should fail', () => {
    const { errors, data } = validate({
      minOnly: 8,
      maxOnly: 19,
      above: 88,
      below: 40
    }, {
      rules: {
        minOnly: { min: 99 },
        maxOnly: { max: 10 },
        between: { min: 100, max: 110 }
      }
    });
    expect(errors).to.be.defined;
    expect(errors.minOnly).to.be.defined;
    expect(errors.maxOnly).to.be.defined;
    expect(errors.between).to.be.defined;
  });
});
