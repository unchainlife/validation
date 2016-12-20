const validate = require('../index');
const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-datetime'));

describe('String length', () => {

  it('should succeed', () => {
    const { errors, data } = validate({
      minLengthOnly: '1234567890',
      maxLengthOnly: 'asdfghjkl',
      both: 'qwertyuiopzxcvbnm'
    }, {
      rules: {
        minLengthOnly: { minLength: 4 },
        maxLengthOnly: { maxLength: 50 },
        both: { minLength: 5, maxLength: 100 }
      }
    });
    expect(errors).to.be.undefined;
    expect(data.minLengthOnly).to.equal('1234567890');
    expect(data.maxLengthOnly).to.equal('asdfghjkl');
    expect(data.both).to.equal('qwertyuiopzxcvbnm');
  });

  it('should fail', () => {
    const { errors, data } = validate({
      minLengthOnly: '1234567890',
      maxLengthOnly: 'asdfghjkl',
      both: 'qwertyuiopzxcvbnm'
    }, {
      rules: {
        minLengthOnly: { minLength: 40 },
        maxLengthOnly: { maxLength: 5 },
        both: { minLength: 5, maxLength: 100 }
      }
    });
    expect(errors).to.not.be.undefined;
    expect(errors.minLengthOnly).to.be.defined;
    expect(errors.maxLengthOnly).to.be.defined;
    expect(errors.both).to.be.defined;
    expect(data.minLengthOnly).to.equal('1234567890');
    expect(data.maxLengthOnly).to.equal('asdfghjkl');
    expect(data.both).to.equal('qwertyuiopzxcvbnm');
  });

});
