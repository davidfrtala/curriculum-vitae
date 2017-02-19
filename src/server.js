/**
 * Created by dave on 17.2.2017.
 */
import express from 'express';
import graphqlHTTP from 'express-graphql';
import bodyParser from 'body-parser';
import logger from 'morgan';
import Schema from './schema';
import data from './data.json';

const app = express();
const PORT = 4000;

// set up our express application ========================================
// log every request to the console
app.use(logger('dev'));

// Use body-parser to get POST requests for API use
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GraphQL endpoint
app.use('/',
  bodyParser.text({ type: 'application/graphql' }),
  graphqlHTTP( (req) => {
    const startTime = Date.now();
    return {
      schema: Schema,
      graphiql: true,
      rootValue: data,
      extensions: () => ({runTime: Date.now() - startTime })
    };
  })
);

// launch ================================================================
app.listen(PORT, () => {
  console.log('GraphQL server running. listening on port', PORT);
});