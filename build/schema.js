'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.skillType = exports.educationType = exports.workType = undefined;

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _relayImplementation = require('./relayImplementation');

var _jobMutation = require('./jobMutation');

var _jobMutation2 = _interopRequireDefault(_jobMutation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by dave on 17.2.2017.
 */
var workType = exports.workType = new _graphql.GraphQLObjectType({
  name: 'Work',
  fields: function fields() {
    return {
      id: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
        description: 'The ID of an object',
        resolve: function resolve(_ref) {
          var _type = _ref._type,
              id = _ref.id;
          return (0, _graphqlRelay.toGlobalId)(_type, id);
        }
      },
      company: { type: _graphql.GraphQLString },
      position: { type: _graphql.GraphQLString },
      start: { type: _graphql.GraphQLString },
      end: { type: _graphql.GraphQLString },
      length: { type: _graphql.GraphQLString },
      description: { type: _graphql.GraphQLString }
    };
  },
  interfaces: function interfaces() {
    return [_relayImplementation.nodeInterface];
  }
});

/*
 * GraphQL mutations
 */


var experiencekType = new _graphql.GraphQLObjectType({
  name: 'Experience',
  fields: function fields() {
    return {
      work: (0, _relayImplementation.connection)('work', workType),
      volunteer: (0, _relayImplementation.connection)('volunteer', workType)
    };
  }
});

var educationType = exports.educationType = new _graphql.GraphQLObjectType({
  name: 'Education',
  fields: function fields() {
    return {
      id: (0, _graphqlRelay.globalIdField)('education'),
      school: { type: _graphql.GraphQLString },
      faculty: { type: _graphql.GraphQLString },
      field: { type: _graphql.GraphQLString },
      degree: { type: _graphql.GraphQLString },
      grade: { type: _graphql.GraphQLString },
      start: { type: _graphql.GraphQLString },
      end: { type: _graphql.GraphQLString }
    };
  },
  interfaces: function interfaces() {
    return [_relayImplementation.nodeInterface];
  }
});

var skillType = exports.skillType = new _graphql.GraphQLObjectType({
  name: 'Skill',
  fields: function fields() {
    return {
      id: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
        description: 'The ID of an object',
        resolve: function resolve(_ref2) {
          var _type = _ref2._type,
              id = _ref2.id;
          return (0, _graphqlRelay.toGlobalId)(_type, id);
        }
      },
      name: { type: _graphql.GraphQLString },
      level: { type: _graphql.GraphQLString },
      description: { type: _graphql.GraphQLString }
    };
  },
  interfaces: function interfaces() {
    return [_relayImplementation.nodeInterface];
  }
});

var skillsType = new _graphql.GraphQLObjectType({
  name: 'Skills',
  fields: function fields() {
    return {
      languages: {
        type: new _graphql.GraphQLList(skillType)
      },
      technologies: (0, _relayImplementation.connection)('technologies', skillType)
    };
  }
});

var viewerType = new _graphql.GraphQLObjectType({
  name: 'viewer',
  fields: function fields() {
    return {
      id: (0, _graphqlRelay.globalIdField)("viewer"),
      fullname: { type: _graphql.GraphQLString, resolve: function resolve(root) {
          return root.name + ' ' + root.surname;
        } },
      name: { type: _graphql.GraphQLString },
      surname: { type: _graphql.GraphQLString },
      address: { type: _graphql.GraphQLString },
      phone: { type: _graphql.GraphQLString },
      email: { type: _graphql.GraphQLString },
      skype: { type: _graphql.GraphQLString },
      experience: { type: experiencekType },
      skills: { type: skillsType },
      education: (0, _relayImplementation.connection)('education', educationType),
      hobbies: {
        type: new _graphql.GraphQLList(_graphql.GraphQLString)
      }
    };
  }
});

/**
 * Our root QUERY node
 * @var GraphQLObjectType
 */
var queryType = new _graphql.GraphQLObjectType({
  name: 'RootQuery',
  fields: function fields() {
    return {
      viewer: {
        type: viewerType,
        resolve: function resolve(root) {
          return root;
        } // need to pass down the data
      },
      node: _relayImplementation.nodeField
    };
  }
});

/**
 * Our root MUTATION node
 * @var GraphQLObjectType
 */
var mutationType = new _graphql.GraphQLObjectType({
  name: 'RootMutation',
  fields: function fields() {
    return {
      offerJob: _jobMutation2.default
    };
  }
});

/**
 * Final GraphQL schema
 *
 * @var GraphQLSchema
 */
exports.default = new _graphql.GraphQLSchema({
  query: queryType,
  mutation: mutationType
});