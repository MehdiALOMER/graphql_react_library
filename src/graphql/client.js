
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Backend GraphQL URL
  cache: new InMemoryCache(),
});

export default client;