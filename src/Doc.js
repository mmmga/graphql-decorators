import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLInputObjectType,
} from 'graphql';

import { createDecorator, DecoratorLocation } from './SchemaDecorator';

export const Doc = createDecorator({
  name: 'doc',
  locations: [
    DecoratorLocation.TYPE,
    DecoratorLocation.UNION,
    DecoratorLocation.INTERFACE,
    DecoratorLocation.SCALAR,
    DecoratorLocation.FIELD,
    DecoratorLocation.ARG,
    DecoratorLocation.INPUT,
    DecoratorLocation.ENUM,
  ],
  inputType: new GraphQLInputObjectType({
    name: 'docDecoratorInputType',
    fields: {
      description: { type: new GraphQLNonNull(GraphQLString) },
    },
  }),

  constructor(config){
    // nothing to do...
  },

  apply(args){
    return (decoratedThing) => {
      decoratedThing.description = args.description;
    }
  },
});
