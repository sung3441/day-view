export function pixelToRemUnit(pixel: number | number[]) {
  if (typeof pixel === 'number') return pixel / 16 + 'rem';

  return pixel.reduce(
    (prev: string, curr) => `${prev} ${curr / 16 + 'rem'} `,
    ''
  );
}
