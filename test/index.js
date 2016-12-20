const validate = require('../index');
const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-datetime'));

describe('Validation', () => {

  describe('Basic success', () => {

    it('should work for simple case', () => {

      const model = validate({
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
      expect(model.errors).to.be.undefined;
      expect(model.data.num).to.equal(1);
      expect(model.data.str).to.equal('1234');
      expect(model.data.date).to.equalDate(new Date('2010-01-02'));
      expect(model.data.array).to.deep.equal(['foo','bah','meep']);
    });

  });

  describe('Basic failure', () => {

    describe('Strict validation', () => {
      it('should succeed', () => {
        const model = validate({
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
        expect(model.errors).to.be.undefined;
      });

      it('should not reject missing non-required attributes', () => {
        const model = validate({
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
        expect(model.errors).to.be.undefined;
      });

      it('should reject missing attributes', () => {
        const model = validate({
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
        expect(model.errors).to.be.defined;
        expect(model.errors.meep).to.be.defined;
      });

      if('should reject extra attributes', () => {
        const model = validate({
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
        expect(model.errors).to.be.defined;
        expect(model.errors.glyph).to.be.defined;
      });
    });

    describe('Type conversion', () => {

      it('should convert numbers', () => {
        return;
        const model = validate({
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
        expect(model.errors).to.be.undefined;
        expect(model.data.pos).to.equal(1);
        expect(model.data.neg).to.equal(-2);
        expect(model.data.zero).to.equal(0);
        expect(model.data.posf).to.equal(1.23);
        expect(model.data.negf).to.equal(-3.45);
      });

      it ('should not convert invalid numbers', () => {
        const model = validate({
          a: '#num'
        }, {
          rules: {
            a: { type: Number }
          }
        });
        expect(model.errors).to.be.defined;
        expect(model.data.a).to.equal('#num');
        expect(model.errors.a).to.be.defined;
      });

    });

  });

});
