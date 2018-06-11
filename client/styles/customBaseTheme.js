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
      primary: 'rgba(255, 255, 255, 0.7)',
      secondary: cyan[700]
    }
  },
  typography: {
    fontFamily: "'Titillium Web', sans-serif",
    fontSize: 14,
    fontWeightLight: 200,
    fontWeightRegular: 400,
    display3: {
      fontSize: '2.9rem',
      fontWeight: 200
    },
    display2: {
      fontWeight: 400
    },
    display1: {
      fontSize: '2.1rem',
      fontWeight: 400,
      color: purple.A200
    },
    title: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '1.25rem',
      fontWeight: 400
    },
    subheading: {
      fontSize: '1.2rem',
      fontWeight: 400,
      color: purple.A200
    }
  }
})
