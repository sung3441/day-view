import 'styled-components';

type FontKey =
  | 'title1'
  | 'title2'
  | 'title3'
  | 'body1'
  | 'body2'
  | 'body3'
  | 'caption1'
  | 'caption2'
  | 'caption3';

type Fonts = Record<
  FontKey,
  { fontWeight: string; fontSize: strin; lineHeight: string }
>;

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      bgColor: string;
      textColor: string;
      shadowColor: string;
      borderColor: string;
      redColor: string;
    };
    colors: {
      [name: stirng]: string;
    };
    fonts: Fonts;
    name: 'light' | 'dark';
  }
}
