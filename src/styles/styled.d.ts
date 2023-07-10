import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    logoColor: string;
    themeColor: string;
    inActiveColor: string;
    textColor: string;
    bgColor: string;
    accentColor: string;
  }
}