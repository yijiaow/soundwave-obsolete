import purple from '@material-ui/core/colors/purple'
import cyan from '@material-ui/core/colors/cyan'
import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: purple.A200,
      main: purple[900],
      dark: '#38006b'
    },
    secondary: {
      light: cyan.A400,
      main: cyan[700],
      dark: cyan[900]
    },
    text: {
      primary: purple.A200,
      secondary: cyan[700]
    }
  },
  typography: {
    fontFamily: "'Titillium Web', sans-serif",
    fontSize: 14,
    fontWeightLight: 200,
    fontWeightRegular: 400,
    display2: {
      fontWeight: 200
    },
    display1: {
      fontSize: '1.8rem',
      fontWeight: 200
    },
    title: {
      fontSize: '1.2rem',
      fontWeight: 400
    }
  }
})
