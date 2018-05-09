import React from 'react'
import ReactDOM from 'react-dom'

import { MuiThemeProvider } from 'material-ui/styles'
import theme from './styles/customBaseTheme.js'
import App from './components/app.js'
import Genres from './components/genres.js'
import genres from '../data/genres.js'

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.querySelector('#app')
)
