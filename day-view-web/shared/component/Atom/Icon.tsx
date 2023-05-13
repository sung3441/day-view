import Image from 'next/image';
import { CSSProperties, memo } from 'react';

export type IconType =
  | 'close'
  | 'left'
  | 'menu'
  | 'right'
  | 'search'
  | 'select'
  | 'trash'
  | 'user'
  | 'write'
  | 'sm_close'
  | 'sm_config'
  | 'sm_more'
  | 'sm_plus'
  | 'sm_trash'
  | 'sm_up';

export type IconSize = keyof typeof defaultIconSizes;

export const defaultIconSizes = {
  sm: { width: 28, height: 28 },
  mid: { width: 40, height: 40 },
};

export interface Props {
  type: IconType;
  iconSize?: IconSize;
  style?: CSSProperties;
}

const Icon = ({ type, style, iconSize = 'mid' }: Props) => {
  const sizes = defaultIconSizes[iconSize];

  return (
    <Image
      style={style}
      src={`images/icon/${type}.svg`}
      alt={type}
      {...sizes}
    />
  );
};

export default memo(Icon);
