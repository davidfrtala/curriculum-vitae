'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nodeField = exports.nodeInterface = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.connection = connection;

var _graphqlRelay = require('graphql-relay');

var _graphql = require('graphql');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
                                                                                                                                                                                                                   * Created by dave on 17.2.2017.
                                                                                                                                                                                                                   */


function connection(prop, type) {
  var _connectionDefinition = (0, _graphqlRelay.connectionDefinitions)({
    name: prop,
    nodeType: type,
    connectionFields: function connectionFields() {
      return _defineProperty({
        totalCount: {
          type: _graphql.GraphQLInt,
          resolve: function resolve(conn) {
            return conn.totalCount;
          }
        }
      }, prop, {
        type: new _graphql.GraphQLList(type),
        resolve: function resolve(conn) {
          return conn.edges.map(function (edge) {
            return edge.node;
          });
        }
      });
    }
  }),
      connectionType = _connectionDefinition.connectionType;

  return {
    type: connectionType,
    args: _graphqlRelay.connectionArgs,
    resolve: function resolve(obj, args) {
      var array = obj[prop] || [];

      return _extends({}, (0, _graphqlRelay.connectionFromArray)(array, args), {
        totalCount: array.length
      });
    }
  };
}

var _nodeDefinitions = (0, _graphqlRelay.nodeDefinitions)(function (globalId) {
  var _fromGlobalId = (0, _graphqlRelay.fromGlobalId)(globalId),
      type = _fromGlobalId.type,
      id = _fromGlobalId.id;

  var data = require('./data.json');
  var index = id - 1;

  switch (type) {
    case 'work':
      return data.experience.work[index];
    case 'volunteer':
      return data.experience.volunteer[index];
    case 'education':
      return data.education[index];
    case 'tech':
      return data.skills.technologies[index];
    case 'lang':
      return data.skills.languages[index];
    default:
      throw new Error('Data not found');
  }
}, function (obj) {
  var _require = require('./schema'),
      educationType = _require.educationType,
      workType = _require.workType,
      skillType = _require.skillType;

  switch (obj._type) {
    case 'work':
      return workType;
    case 'volunteer':
      return workType;
    case 'tech':
      return skillType;
    case 'lang':
      return skillType;
    case 'education':
      return educationType;
    default:
      return null;
  }
}),
    nodeInterface = _nodeDefinitions.nodeInterface,
    nodeField = _nodeDefinitions.nodeField;

exports.nodeInterface = nodeInterface;
exports.nodeField = nodeField;