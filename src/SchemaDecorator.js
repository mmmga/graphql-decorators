import { isValidLiteralValue } from 'graphql/utilities';
import { GraphQLNonNull, parseValue } from 'graphql';


function transformArgs(parsedArgs){
  const res = {};
  parsedArgs.fields.forEach((fieldDoc) => {
    res[fieldDoc.name.value] = fieldDoc.value;
  });
  return res;
}

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

  static parseArgs(argDeclaration, args){

    // types:
    // GraphQLInt, GraphQLString, GraphQLFloat, GraphQLBoolean, GraphQLEnum

    const errors = [];
    let parsedArgs = transformArgs(parseValue(args));

    // XXX the following two tests could be done in one pass, but separation makes
    // them a bit easier to understand.

    // are all required arguments provided?
    Object.keys(argDeclaration).forEach((argName) => {
      if (argDeclaration[argName] instanceof GraphQLNonNull){
        if (!parsedArgs.hasOwnProperty(argName)){
          errors.push(`Argument ${argName} is required but not provided`);
        }
      }
    });

    // are all provided arguments of correct type?
    Object.keys(args).forEach((argName) => {
      if (!isValidLiteralValue(argDeclaration[argName], parsedArgs[argName])){
        errors.push( new GraphQLError(`Argument ${argName} has invalid ` +
          `value ${parsedArgs[argName].value}`)); // TODO: would be great to add a location here!
      }
    });

    if (errors.length > 0){
      throw new Error(`Error while parsing decorators: ${errors[0]}`);
    }

    return concreteValues(parsedArgs);
  }
}
