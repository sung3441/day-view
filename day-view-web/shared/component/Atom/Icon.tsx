import {
  IconClose,
  IconLeft,
  IconMenu,
  IconRight,
  IconSearch,
  IconSelect,
  IconSmClose,
  IconSmConfig,
  IconSmMore,
  IconSmPlus,
  IconSmTrash,
  IconSmUp,
  IconTrash,
  IconUser,
  IconWrite,
} from '@/public/images/icon';
import { CSSProperties, ElementType, memo } from 'react';

export type IconSizeType = keyof typeof defaultIconSizes;

export const defaultIconSizes = {
  small: { width: 28, height: 28 },
  mid: { width: 40, height: 40 },
};

const iconComponents = {
  close: IconClose,
  left: IconLeft,
  menu: IconMenu,
  right: IconRight,
  search: IconSearch,
  select: IconSelect,
  sm_close: IconSmClose,
  sm_config: IconSmConfig,
  sm_more: IconSmMore,
  sm_plus: IconSmPlus,
  sm_trash: IconSmTrash,
  sm_up: IconSmUp,
  trash: IconTrash,
  user: IconUser,
  write: IconWrite,
} satisfies Record<string, ElementType>;

type IconType = keyof typeof iconComponents;

export interface Props {
  type: IconType;
  size?: IconSizeType;
  width?: number;
  height?: number;
  fill?: string;
  color?: string;
  style?: CSSProperties;
}

const Icon = ({
  type,
  width,
  height,
  fill,
  color,
  style,
  size = 'small',
}: Props) => {
  const IconComponent = type ? iconComponents[type] : null;

  return (
    IconComponent && (
      <IconComponent
        width={width ? width : defaultIconSizes[size].width}
        height={height ? height : defaultIconSizes[size].height}
        fill={fill}
        color={color}
        style={style}
      />
    )
  );
};

export default memo(Icon);
