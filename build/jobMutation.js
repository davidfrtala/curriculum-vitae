'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlRelay = require('graphql-relay');

exports.default = (0, _graphqlRelay.mutationWithClientMutationId)({
  name: 'JobOffer',
  inputFields: {},
  outputFields: {},
  mutateAndGetPayload: function mutateAndGetPayload() {
    return {
      me: {
        role: 'guest',
        user: null
      }
    };
  }
}); /**
     * Created by dave on 17.2.2017.
     */