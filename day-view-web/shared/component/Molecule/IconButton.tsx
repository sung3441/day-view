import { Button, Icon } from '@/shared/component/Atom';
import { CSSProperties, memo, ReactNode, SyntheticEvent } from 'react';
import type { IconSize, Props as IconProps } from '../Atom/Icon';
import { defaultIconSizes } from '../Atom/Icon';

const defaultStyle: CSSProperties = {
  width: '55px',
  height: '55px',
  position: 'relative',
  // pointerEvents: 'auto',
  backgroundColor: 'transparent',
};

const UPSIZE = 12;
function conversionSize(iconSize: IconSize) {
  const { width, height } = defaultIconSizes[iconSize];

  return {
    width: width + UPSIZE,
    height: width + UPSIZE,
  };
}

interface Props extends IconProps {
  children?: ReactNode;
  customStyle?: CSSProperties;
  onClick?: (e: SyntheticEvent) => void;
  isActiveFnc?: boolean;
}

const IconButton = ({
  children,
  customStyle,
  onClick,
  type,
  iconSize = 'mid',
  isActiveFnc = true,
}: Props) => {
  const sizes = conversionSize(iconSize);

  return (
    <Button
      style={{ ...defaultStyle, ...sizes, ...customStyle }}
      onClick={onClick}
      aria-label={`${type} button`}
      isActiveFnc={isActiveFnc}
    >
      <Icon {...{ iconSize, type }} />
      {children}
    </Button>
  );
};

export default memo(IconButton);
