/**
 * Created by dave on 17.2.2017.
 */
import {
  mutationWithClientMutationId
} from 'graphql-relay';

export default mutationWithClientMutationId({
  name: 'JobOffer',
  inputFields: {},
  outputFields: {
  },
  mutateAndGetPayload: () => ({
    me: {
      role: 'guest',
      user: null
    }
  })
});