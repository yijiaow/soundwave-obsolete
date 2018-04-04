import {
  purple500,
  purple900,
  purpleA200,
  deepPurpleA100,
  deepPurpleA400,
  deepPurpleA700,
  fullWhite
} from 'material-ui/styles/colors.js'
import { fade } from 'material-ui/utils/colorManipulator'

export default {
  fontFamily: 'Roboto, sans-serif',
  borderRadius: 5,
  palette: {
    primary1Color: purple500,
    primary2Color: purple900,
    primary3Color: purpleA200,
    accent1Color: deepPurpleA400,
    accent2Color: deepPurpleA700,
    accent3Color: deepPurpleA100,
    textColor: fullWhite,
    secondaryTextColor: fade(fullWhite, 0.7),
    alternateTextColor: '#10021C',
    canvasColor: '#10021C',
    borderColor: fade(fullWhite, 0.3),
    disabledColor: fade(fullWhite, 0.3),
    pickerHeaderColor: fade(fullWhite, 0.12),
    clockCirclecolor: fade(fullWhite, 0.12)
  }
}
