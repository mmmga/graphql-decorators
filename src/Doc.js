import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLInputObjectType,
} from 'graphql';

import { SchemaDecorator, DecoratorLocation } from './SchemaDecorator';

export class Doc {
  static defaultTag = 'doc';
  static locations = [
    DecoratorLocation.TYPE,
    DecoratorLocation.UNION,
    DecoratorLocation.INTERFACE,
    DecoratorLocation.SCALAR,
    DecoratorLocation.FIELD,
    DecoratorLocation.ARG,
    DecoratorLocation.INPUT,
    DecoratorLocation.ENUM,
  ];
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
