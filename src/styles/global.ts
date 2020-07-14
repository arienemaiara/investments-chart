import { createGlobalStyle } from 'styled-components'

import Colors from '../constants/colors'

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html, body, #root {
    height: 100%;
    background: ${Colors.background}
  }
  body, input, button {
    font-size: 12px;
    font-family: 'Nunito', sans-serif;
    color: ${Colors.defaultText}
  }
`

export default GlobalStyles
