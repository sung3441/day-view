import { DefaultTheme, Interpolation } from 'styled-components';
import { CSSProperties } from 'react';

type BoxKeys = 'flexBetweenBox';

const box: { [p in BoxKeys]: Interpolation<CSSProperties> } = {
  flexBetweenBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};

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

export const common = {
  colors: {
    main: '#FF836D',
    G_100: '#FCFCFC',
    G_200: '#F3F3F3',
    G_300: '#DBDBDB',
    G_500: '#999999',
    G_700: '#767676',
    Black: '#222222',
    White: '#FFFFFF',
    Red: '#CF0F0F',
  },
  fonts: {
    title1: {
      fontWeight: '700',
      fontSize: '32px',
      lineHeight: '120%',
    },
    title2: {
      fontWeight: '700',
      fontSize: '24px',
      lineHeight: '120%',
    },
    title3: {
      fontWeight: '400',
      fontSize: '24px',
      lineHeight: '120%',
    },
    body1: {
      fontWeight: 'black',
      fontSize: '20px',
      lineHeight: '200%',
    },
    body2: {
      fontWeight: '700',
      fontSize: '20px',
      lineHeight: '200%',
    },
    body3: {
      fontWeight: '400',
      fontSize: '20px',
      lineHeight: '200%',
    },
    caption1: {
      fontWeight: '700',
      fontSize: '16px',
      lineHeight: '200%',
    },
    caption2: {
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: '200%',
    },
    caption3: {
      fontWeight: '700',
      fontSize: '12px',
      lineHeight: '200%',
    },
  },
  box,
  color: {
    bgColor: '#fff',
    textColor: '#000',
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    borderColor: 'rgb(222, 226, 230)',
    redColor: '#CF0F0F',
  },
  name: 'light' as const,
};

export const commonTheme: DefaultTheme = {
  ...common,
};

// export const lightTheme: DefaultTheme = {
//   ...common,

// };
// export const darkTheme: DefaultTheme = {
//   ...common,
//   color: {
//     bgColor: '#252525',
//     textColor: '#fff',
//     shadowColor: '#000',
//     borderColor: 'rgb(222, 226, 230)',
//     redColor: '#CF0F0F',
//   },
//   name: 'dark' as const,
// };
