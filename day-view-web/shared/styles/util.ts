import { css, DefaultTheme } from 'styled-components';

type Key = keyof DefaultTheme;

export function getStyledThemProperty<
  T extends Key,
  P extends keyof DefaultTheme[T]
>(key: T, subKey: P) {
  return css`
    ${({ theme }) => theme[key][subKey] ?? ''}
  `;
}

export function pixelToRemUnit(pixel: number | number[]) {
  if (typeof pixel === 'number') return pixel / 16 + 'rem';

  return pixel.reduce(
    (prev: string, curr) => `${prev} ${curr / 16 + 'rem'} `,
    ''
  );
}
