import { Doc, createClass } from '../src/Doc';
import { expect } from 'chai';

describe('Doc decorator', () => {
  it('can customize the tag', () => {
    const doc = new Doc({tag: 'docc'});
    expect(doc.tag).to.equal('docc');
    const defaultDoc = new Doc();
    expect(defaultDoc.tag).to.equal('doc');
  });

  it('can add a description to all allowed types', () => {
    const thing = {};
    const doc = new Doc();
    doc.apply({ description: "yes" })(thing);
    expect(thing.description).to.equal('yes');
  });

  it('throws an error if description is not provided', () => {
    const thing = {};
    const doc = new Doc();
    expect( () => doc.apply({ descripton: "yes" })(thing)).to.throw(
      'Errors parsing decorator: In field "descripton": Unknown field.'
    );
  });
});
