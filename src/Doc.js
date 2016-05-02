import {
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';

import { SchemaDecorator } from './SchemaDecorator';

export class Doc {
  static defaultTag = 'doc';
  static locations = ['type', 'interface', 'union', 'scalar', 'field', 'arg'];
  static argDeclaration = {
    description: new GraphQLNonNull(GraphQLString),
  };

  constructor(config){
    const { tag } = config || {};
    this.tag = tag || Doc.defaultTag;
  }

  apply(args){
    const parsedArgs = SchemaDecorator.parseArgs(Doc.argDeclaration, args);

    return (decoratedThing) => {
      decoratedThing.description = parsedArgs.description;
    }
  }
}
