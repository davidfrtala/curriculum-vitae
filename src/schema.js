/**
 * Created by dave on 17.2.2017.
 */
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLEnumType,
  GraphQLList
} from 'graphql';

import {
  toGlobalId,
  globalIdField
} from 'graphql-relay';

import {
  connection,
  nodeField,
  nodeInterface
} from './relayImplementation';

/*
 * GraphQL mutations
 */
import JobOffer from './jobMutation';


export const workType = new GraphQLObjectType({
  name: 'Work',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The ID of an object',
      resolve: ({ _type, id })  => toGlobalId(_type, id)
    },
    company: { type: GraphQLString },
    position: { type: GraphQLString },
    start: { type: GraphQLString },
    end: { type: GraphQLString },
    length: { type: GraphQLString },
    description: { type: GraphQLString },
    technologies: {
      type: new GraphQLList(skillType),
      resolve: ({ technologies }, _, __, { rootValue }) => {
        const skills = rootValue.skills.technologies;
        return skills.reduce((memo, item) => {
          if (technologies.indexOf(item.name) >= 0) {
            memo.push(item);
          }
          return memo;
        }, []);
      }
    }
  }),
  interfaces: () => [ nodeInterface ]
});
export const projectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: globalIdField('project'),
    name: { type: GraphQLString },
    link: { type: GraphQLString },
    status: { type: GraphQLString },
    description: { type: GraphQLString },
    technologies: {
      type: new GraphQLList(skillType),
      resolve: ({ technologies }, _, __, { rootValue }) => {
        const skills = rootValue.skills.technologies;
        return skills.reduce((memo, item) => {
          if (technologies.indexOf(item.name) >= 0) {
            memo.push(item);
          }
          return memo;
        }, []);
      }
    }
  }),
  interfaces: () => [ nodeInterface ]
});

const experiencekType = new GraphQLObjectType({
  name: 'Experience',
  fields: () => ({
    work: connection('work', workType),
    volunteer: connection('volunteer', workType),
    projects: connection('projects', projectType),
  })
});

export const educationType = new GraphQLObjectType({
  name: 'Education',
  fields: () => ({
    id: globalIdField('education'),
    school: { type: GraphQLString },
    faculty: { type: GraphQLString },
    field: { type: GraphQLString },
    degree: { type: GraphQLString },
    grade: { type: GraphQLString },
    start: { type: GraphQLString },
    end: { type: GraphQLString },
  }),
  interfaces: () => [ nodeInterface ]
});

export const skillType = new GraphQLObjectType({
  name: 'Skill',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The ID of an object',
      resolve: ({ _type, id })  => toGlobalId(_type, id)
    },
    name: { type: GraphQLString },
    level: { type: GraphQLString },
    description: { type: GraphQLString }
  }),
  interfaces: () => [ nodeInterface ]
});


const skillsType = new GraphQLObjectType({
  name: 'Skills',
  fields: () => ({
    languages: {
      type: new GraphQLList(skillType),
    },
    technologies: connection('technologies', skillType),
  })
});

const viewerType = new GraphQLObjectType({
  name: 'viewer',
  fields: () => ({
    id: globalIdField("viewer"),
    fullname: { type: GraphQLString, resolve: (root) => root.name+' '+root.surname },
    name: { type: GraphQLString },
    surname: { type: GraphQLString },
    title: { type: GraphQLString },
    address: { type: GraphQLString },
    phone: { type: GraphQLString },
    email: { type: GraphQLString },
    skype: { type: GraphQLString },
    links: {
      type: new GraphQLList(GraphQLString),
    },
    hobbies: {
      type: new GraphQLList(GraphQLString),
    },
    experience: { type: experiencekType },
    skills: { type: skillsType },
    education: connection('education', educationType)
  })
});

/**
 * Our root QUERY node
 * @var GraphQLObjectType
 */
const queryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    viewer: {
      type: viewerType,
      resolve: root => root // need to pass down the data
    },
    node: nodeField
  })
});

/**
 * Our root MUTATION node
 * @var GraphQLObjectType
 */
const mutationType = new GraphQLObjectType({
  name: 'RootMutation',
  fields: () => ({
    offerJob: JobOffer,
  })
});

/**
 * Final GraphQL schema
 *
 * @var GraphQLSchema
 */
export default new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});