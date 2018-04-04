import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import customBaseTheme from './styles/customBaseTheme.js'

import { Controller } from './components/controller.js'
ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme(customBaseTheme)}>
    <Controller />
  </MuiThemeProvider>,
  document.querySelector('#app')
)
