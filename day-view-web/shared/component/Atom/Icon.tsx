import {
  IconBell,
  IconClose,
  IconGoogle,
  IconKakao,
  IconLeft,
  IconLock,
  IconLogo,
  IconMainLogo,
  IconMenu,
  IconRight,
  IconSearch,
  IconSelect,
  IconSmCheck,
  IconSmClose,
  IconSmConfig,
  IconSmHamburgerMenu,
  IconSmLetter,
  IconSmMore,
  IconSmPlus,
  IconSmSearch,
  IconSmTrash,
  IconSmUp,
  IconSmUser,
  IconTrash,
  IconUser,
  IconWrite,
} from '@/public/images/icon';
import { pixelToRemUnit } from '@/shared/styles/util';
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
  mainLogo: IconMainLogo,
  logo: IconLogo,
  google: IconGoogle,
  kakao: IconKakao,
  bell: IconBell,
  lock: IconLock,
  sm_hamburgerMenu: IconSmHamburgerMenu,
  sm_letter: IconSmLetter,
  sm_search: IconSmSearch,
  sm_user: IconSmUser,
  sm_check: IconSmCheck,
} satisfies Record<string, ElementType>;

type IconType = keyof typeof iconComponents;

const covertRem = (value: number | string) => {
  if (typeof value === 'string') return value;
  return pixelToRemUnit(value);
};

export interface Props {
  type: IconType;
  size?: IconSizeType;
  width?: number | string;
  height?: number | string;
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
        width={
          width
            ? covertRem(width)
            : pixelToRemUnit(defaultIconSizes[size].width)
        }
        height={
          height
            ? covertRem(height)
            : pixelToRemUnit(defaultIconSizes[size].height)
        }
        fill={fill}
        color={color}
        style={style}
      />
    )
  );
};

export default memo(Icon);
