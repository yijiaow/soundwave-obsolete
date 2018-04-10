import purple from 'material-ui/colors/purple'
import deepPurple from 'material-ui/colors/deepPurple'
import { createMuiTheme } from 'material-ui/styles'

export default createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: purple.A200,
      main: purple[900],
      dark: '#38006b',
      contrastText: '#fff'
    },
    secondary: {
      light: deepPurple.A100,
      main: deepPurple.A400,
      dark: deepPurple.A700,
      contrastText: '#fff'
    }
  },
  typography: {
    fontFamily: "'Titillium Web', sans-serif",
    fontWeightLight: 200,
    fontWeightRegular: 400,
    display2: {
      fontWeight: 200
    }
  }
})
