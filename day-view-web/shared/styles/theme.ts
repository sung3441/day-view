import { DefaultTheme } from 'styled-components';
import { CommonTheme } from './styled';

export const common: CommonTheme = {
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
};

export const lightTheme: DefaultTheme = {
  ...common,
  color: {
    bgColor: '#fff',
    textColor: '#000',
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    borderColor: 'rgb(222, 226, 230)',
    redColor: '#CF0F0F',
  },
  name: 'light' as const,
};
export const darkTheme: DefaultTheme = {
  ...common,
  color: {
    bgColor: '#252525',
    textColor: '#fff',
    shadowColor: '#000',
    borderColor: 'rgb(222, 226, 230)',
    redColor: '#CF0F0F',
  },
  name: 'dark' as const,
};
