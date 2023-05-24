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
import { ElementType, memo } from 'react';

type IconType =
  | 'close'
  | 'left'
  | 'menu'
  | 'right'
  | 'search'
  | 'select'
  | 'sm_close'
  | 'sm_config'
  | 'sm_more'
  | 'sm_plus'
  | 'sm_trash'
  | 'sm_up'
  | 'trash'
  | 'user'
  | 'write';

type SizeType = 'small' | 'mid';

const iconSizes = {
  small: { width: 28, height: 28 },
  mid: { width: 40, height: 40 },
};

const iconComponents: Record<IconType, ElementType> = {
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
};

interface Props {
  type: IconType;
  size?: SizeType;
  width?: number;
  height?: number;
  fill?: string;
  color?: string;
}

const TestIcon = ({
  type,
  width,
  height,
  fill,
  color,
  size = 'small',
}: Props) => {
  const IconComponent = type ? iconComponents[type] : null;

  return (
    IconComponent && (
      <IconComponent
        width={width ? width : iconSizes[size].width}
        height={height ? height : iconSizes[size].height}
        fill={fill}
        color={color}
      />
    )
  );
};

export default memo(TestIcon);
