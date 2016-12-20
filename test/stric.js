const validate = require('../index');
const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-datetime'));

describe('Strict validation', () => {
  it('should succeed', () => {
    const { errors, data } = validate({
      foo: 1,
      bah: 2,
      meep: 3
    }, {
      strict: true,
      rules: {
        foo: { },
        bah: { },
        meep: { }
      }
    });
    expect(errors).to.be.undefined;
  });

  it('should not reject missing non-required attributes', () => {
    const { errors, data } = validate({
      foo: 1,
      bah: 2
    }, {
      strict: true,
      rules: {
        foo: { },
        bah: { },
        meep: { required: false }
      }
    });
    expect(errors).to.be.undefined;
  });

  it('should reject missing attributes', () => {
    const { errors, data } = validate({
      foo: 1,
      bah: 2
    }, {
      strict: true,
      rules: {
        foo: { },
        bah: { },
        meep: { }
      }
    });
    expect(errors).to.be.defined;
    expect(errors.meep).to.be.defined;
  });

  if('should reject extra attributes', () => {
    const { errors, data } = validate({
      foo: 1,
      bah: 2,
      meep: 3
    }, {
      strict: true,
      rules: {
        foo: { },
        bah: { }
      }
    });
    expect(errors).to.be.defined;
    expect(errors.glyph).to.be.defined;
  });
});
