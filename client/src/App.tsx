import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";

import Main from "./pages/Main";
import { apolloClient } from "./config/graphql";
import "./App.css";

class App extends Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <Main />
      </ApolloProvider>
    );
  }
}

export default App;
