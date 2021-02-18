import React from "react";
import App from "./App";
import {
     ApolloClient,
     InMemoryCache,
     createHttpLink,
     ApolloProvider,
} from "@apollo/client";

import { setContext } from "apollo-link-context";

const IP_ADDRESS = process.env.REACT_APP_SERVER_IP_ADDRESS;

const httpLink = createHttpLink({
     uri: IP_ADDRESS,
});

// set token in the header
const authLink = setContext(() => {
     const token = localStorage.getItem("jwtToken");
     return {
          headers: {
               Authorization: token ? `Bearer ${token}` : "",
          },
     };
});

const client = new ApolloClient({
     link: authLink.concat(httpLink),
     cache: new InMemoryCache(),
});

export default (
     <ApolloProvider client={client}>
          <App />
     </ApolloProvider>
);
