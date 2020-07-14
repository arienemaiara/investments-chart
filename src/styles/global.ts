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
    font-size: 14px;
    font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`

export default GlobalStyles
