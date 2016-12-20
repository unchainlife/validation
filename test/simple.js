const validate = require('../index');
const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-datetime'));

describe('Simple Examples', () => {

  it('should work for simple case', () => {

    const { errors, data } = validate({
      num: 1,
      str: '1234',
      date: new Date('2010-01-02'),
      array: [ 'foo', 'bah', 'meep' ]
    }, {
      strict: false,
      firstOnly: false,
      throwException: false,
      errors: 'errors',
      rules: {
        num   : { type: Number, required: false, range: { min: 1, max: 2, inclusive: 3 } },
        str   : { type: String, required: false, length: { min: 6, max: 12, inclusive: true } },
        date  : { type: Date, required: false },
        array : { type: [String], required: false }
      }
    });
    expect(errors).to.be.undefined;
    expect(data.num).to.equal(1);
    expect(data.str).to.equal('1234');
    expect(data.date).to.equalDate(new Date('2010-01-02'));
    expect(data.array).to.deep.equal(['foo','bah','meep']);
  });

});
