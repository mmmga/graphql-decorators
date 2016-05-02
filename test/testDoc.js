import { Doc } from '../src/Doc';
import { expect } from 'chai';
import { parseValue } from 'graphql';

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
    doc.apply('{description: "yes"}')(thing);
    expect(thing.description).to.equal('yes');
  });

  it('throws an error if description is not provided', () => {
    const thing = {};
    const doc = new Doc();
    expect( () => doc.apply('{descripton: "yes"}')(thing)).to.throw(
      'Error while parsing decorators: Argument description is required but not provided'
    );
  });
});

describe('Parser', () => {
  it('lets me parse just the arguments string', () => {
    const parsed = parseValue('{uga: "igi", ala: 7, b: false, enum: [1,2,3]}');
  });
});
