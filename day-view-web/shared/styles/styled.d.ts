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
  { fontWeight: string; fontSize: string; lineHeight: string }
>;

type ColorKey =
  | 'main'
  | 'G_200'
  | 'G_100'
  | 'G_300'
  | 'G_500'
  | 'G_700'
  | 'Black'
  | 'White'
  | 'Red';

type Colors = Record<ColorKey, string>;

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      bgColor: string;
      textColor: string;
      shadowColor: string;
      borderColor: string;
      redColor: string;
    };
    colors: Colors;
    fonts: Fonts;
    name: 'light' | 'dark';
  }
}
