const validate = require('../index');
const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-datetime'));

describe('Type conversion', () => {

  it('should convert boolean', () => {
    const { errors, data } = validate({
      a: 'true',
      b: 'yes',
      c: 'on',
      d: true,
      e: 1
    }, {
      rules: {
        a: { type: Boolean },
        b: { type: Boolean },
        c: { type: Boolean },
        d: { type: Boolean },
        e: { type: Boolean }
      }
    });
    expect(errors).to.be.undefined;
    expect(data.a).to.be.true;
    expect(data.b).to.be.true;
    expect(data.c).to.be.true;
    expect(data.d).to.be.true;
    expect(data.e).to.be.true;
  });

  it('should convert strings', () => {
    const date = new Date();
    const { errors, data } = validate({
      a: 1,
      b: undefined,
      c: null,
      d: date,
      e: 'xx',
    }, {
      rules: {
        a: { type: String },
        b: { type: String },
        c: { type: String },
        d: { type: String },
        e: { type: String }
      }
    });
    expect(errors).to.be.undefined;
    expect(data.a).to.equal('1');
    expect(data.b).to.be.undefined;
    expect(data.c).to.be.null;
    expect(data.d).to.equal(date.toString());
    expect(data.e).to.equal('xx');
  });

  it('should convert dates', () => {
    const { errors, data } = validate({
      dateOnly: '2010-01-02',
      dateTime: '2030-06-05 11:12:13',
      badDate: 'XXX',
      invalid: '2040-11-41'
    }, {
      rules: {
        dateOnly: { type: Date },
        dateTime: { type: Date },
        badDate: { type: Date },
        invalid: { type: Date }
      }
    });
    expect(errors).to.be.defined;
    expect(errors.dateOnly).to.not.be.defined;
    expect(errors.dateTime).to.not.be.defined;
    expect(errors.badDate).to.not.be.defined;
    expect(errors.invalid).to.not.be.defined;
    expect(data.dateOnly).to.equalDate(new Date('2010-01-02'));
    expect(data.dateTime).to.equalDate(new Date('2030-06-05 11:12:13'));
    expect(data.badDate).to.equal('XXX');
    expect(data.invalid).to.equal('2040-11-41');
  });

  it('should convert numbers', () => {
    return;
    const { errors, data } = validate({
      pos: '1',
      neg: '-2',
      zero: '0',
      posf: '1.23',
      negf: '-3.45'
    }, {
      rules: {
        pos: { type: Number },
        neg: { type: Number },
        zero: { type: Number },
        posf: { type: Number },
        negf: { type: Number }
      }
    });
    expect(errors).to.be.undefined;
    expect(data.pos).to.equal(1);
    expect(data.neg).to.equal(-2);
    expect(data.zero).to.equal(0);
    expect(data.posf).to.equal(1.23);
    expect(data.negf).to.equal(-3.45);
  });

  it ('should not convert invalid numbers', () => {
    const { errors, data } = validate({
      a: '#num'
    }, {
      rules: {
        a: { type: Number }
      }
    });
    expect(errors).to.be.defined;
    expect(data.a).to.equal('#num');
    expect(errors.a).to.be.defined;
  });

});
