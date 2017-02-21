/* @flow */
import {
  connectionFromArray,
  connectionArgs,
  connectionDefinitions,
  nodeDefinitions,
  fromGlobalId,
} from 'graphql-relay';

import {
  GraphQLInt,
  GraphQLList
} from 'graphql';

import type {
  GraphQLOutputType,
  GraphQLFieldConfig
} from 'graphql';

/**
 * Construct a graphql connection field config.
 *
 * @param string prop
 * @param GraphQLOutputType type
 * @returns {{type, args, resolve: resolve}}
 */
export function connection(
  prop: string,
  type: GraphQLOutputType
): GraphQLFieldConfig<*, *> {
  const { connectionType } = connectionDefinitions({
    name: prop,
    nodeType: type,
    connectionFields: () => ({
      totalCount: { type: GraphQLInt },
      [prop]: {
        type: new GraphQLList(type),
        resolve: conn => conn.edges.map(edge => edge.node),
      }
    })
  });

  return {
    type: connectionType,
    args: connectionArgs,
    resolve: (obj, args) => {
      const array = obj[prop] || [];

      return {
        ...connectionFromArray(array, args),
        totalCount: array.length
      };
    },
  };
}

const { nodeInterface, nodeField } = nodeDefinitions(
  globalId => {
    const { type, id } = fromGlobalId(globalId);
    const data = require('./data.json');
    const index = id -1;

    switch (type) {
      case 'work':
        return data.experience.work[index];
      case 'volunteer':
        return data.experience.volunteer[index];
      case 'project':
        return data.experience.projects[index];
      case 'education':
        return data.education[index];
      case 'tech':
        return data.skills.technologies[index];
      case 'lang':
        return data.skills.languages[index];
      default:
        throw new Error('Data not found');
    }
  },
  obj => {
    const {
      educationType,
      workType,
      projectType,
      skillType
    } = require('./schema');

    switch (obj._type) {
      case 'work':
        return workType;
      case 'volunteer':
        return workType;
      case 'project':
        return projectType;
      case 'tech':
        return skillType;
      case 'lang':
        return skillType;
      case 'education':
        return educationType;
      default:
        return null;
    }
  }
);

export { nodeInterface, nodeField };