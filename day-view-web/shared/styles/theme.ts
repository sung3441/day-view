import { DefaultTheme, Interpolation } from 'styled-components';
import { CSSProperties } from 'react';
import { pixelToRemUnit } from './util';

type BoxKeys = 'flexBetweenBox' | 'flexCenterBox';

const box: { [p in BoxKeys]: Interpolation<CSSProperties> } = {
  flexCenterBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexBetweenBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};

export const common = {
  layout: {
    pageHeader: {
      width: '100%',
      height: '70px',
      padding: `${pixelToRemUnit([17, 40])}`,
      borderBottom: '1px solid #dbdbdb',
    },
  },
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
      fontSize: pixelToRemUnit(32),
      lineHeight: '120%',
    },
    title2: {
      fontWeight: '700',
      fontSize: pixelToRemUnit(24),
      lineHeight: '120%',
    },
    title3: {
      fontWeight: '400',
      fontSize: pixelToRemUnit(24),
      lineHeight: '120%',
    },
    body1: {
      fontWeight: '900',
      fontSize: pixelToRemUnit(24),
      lineHeight: '200%',
    },
    body2: {
      fontWeight: '700',
      fontSize: pixelToRemUnit(20),
      lineHeight: '200%',
    },
    body3: {
      fontWeight: '400',
      fontSize: pixelToRemUnit(20),
      lineHeight: '200%',
    },
    caption1: {
      fontWeight: '700',
      fontSize: pixelToRemUnit(16),
      lineHeight: '200%',
    },
    caption2: {
      fontWeight: '400',
      fontSize: pixelToRemUnit(16),
      lineHeight: '200%',
    },
    caption3: {
      fontWeight: '700',
      fontSize: pixelToRemUnit(12),
      lineHeight: '200%',
    },
  },
  box,
  name: 'light' as const,
};

export const commonTheme: DefaultTheme = {
  ...common,
};
