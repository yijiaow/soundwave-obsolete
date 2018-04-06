import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import {
  MuiThemeProvider,
  createMuiTheme,
  getMuiTheme
} from 'material-ui/styles'
import theme from './styles/customBaseTheme.js'
import { App } from './components/app.js'

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
    <App />
  </MuiThemeProvider>,
  document.querySelector('#app')
)
