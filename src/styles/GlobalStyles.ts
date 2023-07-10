import { createGlobalStyle } from "styled-components";
import LINESeedBd from "../static/fonts/LINESeedKR-Bd.ttf";
import LINESeedRg from "../static/fonts/LINESeedKR-Rg.ttf";
import LINESeedTh from "../static/fonts/LINESeedKR-Th.ttf";

export const GlobalStyles = createGlobalStyle`
   
  @font-face {
        font-family: 'LINESeedRg';
        src: local('LINESeedRg'), local('LINESeedRg');
        font-style: normal;
        src: url(${LINESeedRg}) format('truetype');
  }
  @font-face {
        font-family: 'LINESeedBd';
        src: local('LINESeedBd'), local('LINESeedBd');
        font-style: normal;
        src: url(${LINESeedBd}) format('truetype');
  }
  @font-face {
        font-family: 'LINESeedTh';
        src: local('LINESeedTh'), local('LINESeedTh');
        font-style: normal;
        src: url(${LINESeedTh}) format('truetype');
  }
  *{
        font-family: 'LINESeedRg';
    } 


    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        vertical-align: baseline;
        color: #171717;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
        overflow-y: scroll;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    button {
        background-color: transparent;
        border: 0;
        padding: 0;
        cursor: pointer;
    }
    a {
        text-decoration: none;
        color: black;
    }
    input[type="submit"], input[type="button"] {
        border: 0;
        &:hover {
            cursor: pointer;
        }
    } 
    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;
