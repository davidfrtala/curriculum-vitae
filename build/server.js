'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

var _data = require('./data.json');

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by dave on 17.2.2017.
 */
var app = (0, _express2.default)();
var PORT = 3000;

// set up our express application ========================================
// log every request to the console
app.use((0, _morgan2.default)('dev'));

// Use body-parser to get POST requests for API use
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

// GraphQL endpoint
app.use('/', _bodyParser2.default.text({ type: 'application/graphql' }), (0, _expressGraphql2.default)(function (req) {
  var startTime = Date.now();
  return {
    schema: _schema2.default,
    graphiql: true,
    rootValue: _data2.default,
    extensions: function extensions() {
      return { runTime: Date.now() - startTime };
    }
  };
}));

// launch ================================================================
app.listen(PORT, function () {
  console.log('GraphQL server running. listening on port', PORT);
});