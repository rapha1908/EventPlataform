import { ApolloClient, InMemoryCache } from "@apollo/client";

// VITE_* values are public in a browser build. Only use a token with
// read access to published demo content; never a write or management token.
const accessToken = import.meta.env.VITE_API_ACCESS_TOKEN?.trim();

export const client = new ApolloClient({
    uri: import.meta.env.VITE_API_URL,
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    cache: new InMemoryCache()

})
