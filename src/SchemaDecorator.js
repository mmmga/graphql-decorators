import { isValidLiteralValue, astFromValue } from 'graphql/utilities';

function concreteValues(parsedArgs){
  const ret = {};
  Object.keys(parsedArgs).forEach((argName) => {
    ret[argName] = parsedArgs[argName].value;
  });
  return ret;
}

export class SchemaDecorator {

  constructor(config){
    const { tag } = config || {};
    this.tag = tag || Doc.defaultTag;
  }

  static checkArgs(inputType, args){
    let argsAST = astFromValue(args, inputType);

    return isValidLiteralValue(inputType, argsAST);
  }
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
