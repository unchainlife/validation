const validate = require('../index');
const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-datetime'));

describe('Array values', () => {
  it('should be implemented', () => {
    const { errors, data } = validate({
      x: ['one', 'two'],
      y: 'one'
    }, {
      rules: {
        x: { type: [String] },
        y: { type: [String] }
      }
    });
    expect(errors).to.be.undefined;
    expect(data.x).to.deep.equal(['one', 'two']);
    expect(data.y).to.deep.equal(['one']);
  });
});
