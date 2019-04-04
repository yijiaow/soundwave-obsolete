import React, {Component} from 'react'
import {ApolloClient} from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import {BrowserRouter, Switch, Route} from 'react-router'
import Unauthorized from './routes/Unauthorized'
import Authorized from './routes/Authorized.js'

import './App.css'

const client = new ApolloClient({
  uri: '',
})

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ApolloProvider client={client}>
          <Switch>
            <Authorized />
            <Unauthorized />
          </Switch>
        </ApolloProvider>
      </BrowserRouter>
    )
  }
}

export default App
