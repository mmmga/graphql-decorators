import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLInputObjectType,
} from 'graphql';

import { SchemaDecorator } from './SchemaDecorator';

export class Doc {
  static defaultTag = 'doc';
  static locations = ['type', 'interface', 'union', 'scalar', 'field', 'arg'];
  static inputType = new GraphQLInputObjectType({
    name: 'docDecoratorInputType',
    fields: {
      description: { type: new GraphQLNonNull(GraphQLString) },
    },
  });

  constructor(config){
    const { tag } = config || {};
    this.tag = tag || Doc.defaultTag;
  }

  apply(args){
    const errors = SchemaDecorator.checkArgs(Doc.inputType, args);
    if (errors.length > 0){
      throw new Error(`Errors parsing decorator: ${errors[0]}`);
    }

    return (decoratedThing) => {
      decoratedThing.description = args.description;
    }
  }
}
