const validate = require('../index');
const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-datetime'));

describe('Required values', () => {

  it('should succeed', () => {
    const { errors, data } = validate({
      num: 1,
      str: 'xx',
      date: new Date()
    }, {
      rules: {
        num: { required: true },
        str: { required: true },
        date: { required: true }
      }
    });
    expect(errors).to.be.undefined;
  });

  it('should fail', () => {
    const { errors, data } = validate({
      nullValue: null,
      undefinedValue: undefined,
      emptyValue: ''
    }, {
      rules: {
        nullValue: { required: true },
        undefinedValue: { required: true },
        emptyValue: { required: true }
      }
    });
    expect(errors).to.not.be.undefined;
    expect(errors.nullValue).to.not.be.undefined;
    expect(errors.undefinedValue).to.not.be.undefined;
    expect(errors.emptyValue).to.not.be.undefined;
  });

});
