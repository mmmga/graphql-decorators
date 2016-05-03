import { isValidLiteralValue, astFromValue } from 'graphql/utilities';

function checkArgs(args, inputType){
  let argsAST = astFromValue(args, inputType);
  const errors = isValidLiteralValue(inputType, argsAST);
  if (errors.length > 0){
    throw new Error(`Errors parsing decorator: ${errors[0]}`);
  }
}

// given an object, create a class that has all the right function
export function createDecorator(decoratorDefinition){

  // TODO: some sanity checks here to make sure decoratorDefinition is valid

  const Decorator = function(config) {
    const { tag } = config || {};
    this.tag = tag || decoratorDefinition.name;
    decoratorDefinition.constructor.call(this, config);
  }
  Decorator.prototype.apply = function(args){
    checkArgs(args, decoratorDefinition.inputType)
    // TODO: check here that the decorator is in one of the valid locations
    return decoratorDefinition.apply(args);
  };

  // Decorator.name = decoratorDefinition.name;

  // TODO: check that locations contains only locations from the list below
  Decorator.locations = decoratorDefinition.locations;
  Decorator.args = decoratorDefinition.args;

  return Decorator;
}


export const DecoratorLocation = {
  SCHEMA: 'SCHEMA',
  TYPE: 'TYPE',
  INPUT: 'INPUT',
  ENUM: 'ENUM',
  UNION: 'UNION',
  SCALAR: 'SCALAR',
  INTERFACE: 'INTERFACE',
  FIELD: 'FIELD',
  ARG: 'ARG',
};
