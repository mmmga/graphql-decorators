class Doc {
  locations = [ 'TYPE', 'FIELD', 'ARG' ];
  function apply({ description }){
    return function(decoratedThing) {
      decoratedThing.description = description;
    }
  }
}

class Log {
  // TODO: should also apply to type and schema
  locations = [ 'FIELD' ];

  function constructor({ logger }){
    // TODO: allow providing more arguments for what to actually log
    this.logger = logger; 
  }

  function apply({ prefix }) {
    return function( wrappedThing ){ 
      const resolver = wrappedThing.resolve;
      wrappedThing.resolve = (o, a, c, info){
        this.logger.log(prefix, info.fieldName, new Date());
        return resolver(o, a, c, i);
      }
    }
  }
}

export { Doc, Log };
