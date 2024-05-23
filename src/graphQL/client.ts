import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const GraphQLClient = new ApolloClient({
    link: new HttpLink({
        uri: process.env.NEXT_PUBLIC_graphQL
    }),
    cache: new InMemoryCache()
});

export default GraphQLClient;