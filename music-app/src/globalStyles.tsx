import {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
    --violetColor: #9B2DEF;
    --blueColor: #2D9BEF;
    --lightBlueColor: #2DCEEF;
    --opacityBlueColor: #F8FCFF;
    --darkestColor: #161A1A;
    --darkColor: #303033;
    --mediumDarkColor: #3A3A3D;
    --lighterDarkColor: #424346;
    --grayColor: #99999F;
    --lightGrayColor: #D5D5D5;
    --textColor: #ffffff;
  }
  
  * {
    box-sizing: border-box;
    text-decoration: none;
    
  }

  body {
    color: var(--blue);
    background-color: var(--darkestColor);
    font-family: 'Lato', sans-serif;
  }
`