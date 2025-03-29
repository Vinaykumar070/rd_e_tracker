// import { ApolloClient } from 'apollo-client';
// import { createHttpLink } from 'apollo-link-http';
// import { InMemoryCache } from 'apollo-cache-inmemory';
// import { onError } from 'apollo-link-error';
// import { ApolloLink, from } from 'apollo-link';

// const httpLink = createHttpLink({
//     uri: 'https://your-graphql-endpoint', // Replace with your GraphQL endpoint
//     // https://cloud.hasura.io/project/f3b04843-588d-4d79-a94b-e6727edd538b/console   // Vk@mongodbpas*95
//   });
//     ///Vk%40mongodbpas%2A95

    
//   const errorLink = onError(({ graphQLErrors, networkError }) => {
//     if (graphQLErrors) {
//       graphQLErrors.map(({ message, locations, path }) =>
//         console.log(
//           `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//         )
//       );
//     }
//     if (networkError) {
//       console.log(`[Network error]: ${networkError}`);
//     }
//   });
  
//   const link = from([errorLink, httpLink]);
  
//   const client = new ApolloClient({
//     link,
//     cache: new InMemoryCache(),
//   });
  
//   export default client;