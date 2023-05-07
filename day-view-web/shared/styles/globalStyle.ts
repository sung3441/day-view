import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  
  *, *::before, *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  
  html,body{
    width: 100%;
    height: 100%;
  }
  
  body {
    font-family: 'Noto Sans KR';
  }

@font-face {
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 900;
  src: local("NotoSansKR"),
    url("/fonts/NotoSansKR-Black.woff2") format("woff2"),
    url("/fonts/NotoSansKR-Black.woff") format("woff");
  font-display: swap;
}

@font-face {
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  src: local("NotoSansKR"),
    url("/fonts/NotoSansKR-Bold.woff2") format("woff2"),
    url("/fonts/NotoSansKR-Bold.woff") format("woff");
  font-display: swap;
}

@font-face {
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  src: local("NotoSansKR"),
    url("/fonts/NotoSansKR-Regular.woff2") format("woff2"),
    url("/fonts/NotoSansKR-Regular.woff") format("woff");
  font-display: swap;
}

  div#__next {
    width: 100%;
    height: 100%;
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }

  @media ( width <= 400px ){
    html{
      font-size:65% ;
    }
  }
  @media (400px < width <= 720px){
    html{
      font-size:70% ;
    }
  }
  

  /* http://meyerweb.com/eric/tools/css/reset/
     v2.0 | 20110126
     License: none (public domain)
  */
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
  }

  input,
  textarea,
  button,
  select,
  a {
    -webkit-tap-highlight-color: transparent;
  }

  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }

  ol,
  ul,
  li {
    list-style: none;
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }
  
  img{
    user-select : none;
  }
  
`;

export default GlobalStyle;
