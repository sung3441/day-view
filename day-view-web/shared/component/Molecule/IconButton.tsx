import { Button, Icon } from '@/shared/component/Atom';
import { CSSProperties, memo, ReactNode, SyntheticEvent } from 'react';
import type { IconSizeType, Props as IconProps } from '../Atom/Icon';
import { defaultIconSizes } from '../Atom/Icon';

const defaultStyle: CSSProperties = {
  width: '55px',
  height: '55px',
  position: 'relative',
  // pointerEvents: 'auto',
  backgroundColor: 'transparent',
};

const UPSIZE = 12;
function conversionSize(iconSize: IconSizeType) {
  const { width, height } = defaultIconSizes[iconSize];

  return {
    width: width + UPSIZE,
    height: height + UPSIZE,
  };
}

interface Props extends IconProps {
  children?: ReactNode;
  customStyle?: CSSProperties;
  isActiveFnc?: boolean;
  onClick?(): void;
  onClick?<T extends {}>(res: T, e?: SyntheticEvent): void;
  onClick?(e?: SyntheticEvent): void;
}

const IconButton = ({
  children,
  customStyle,
  onClick,
  type,
  size = 'mid',
  isActiveFnc = true,
  ...resForIcon
}: Props) => {
  const sizes = conversionSize(size);

  return (
    <Button
      style={{ ...defaultStyle, ...sizes, ...customStyle }}
      onClick={onClick}
      aria-label={`${type} button`}
      isActiveFnc={isActiveFnc}
      tabIndex={0}
    >
      <Icon type={type} size={size} fill="#fff" {...resForIcon} />
      {children}
    </Button>
  );
};

export default memo(IconButton);
