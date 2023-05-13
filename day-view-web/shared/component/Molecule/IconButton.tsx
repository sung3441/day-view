import { Button, Icon } from '@/shared/component/Atom';
import { CSSProperties, memo, SyntheticEvent } from 'react';
import type { IconSize, Props as IconProps } from '../Atom/Icon';
import { defaultIconSizes } from '../Atom/Icon';

const defaultStyle: CSSProperties = {
  width: '55px',
  height: '55px',
  position: 'relative',
  pointerEvents: 'auto',
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
  customStyle?: CSSProperties;
  onClick?: (e?: SyntheticEvent) => void;
}

const IconButton = ({
  customStyle,
  onClick,
  type,
  iconSize = 'mid',
}: Props) => {
  const sizes = conversionSize(iconSize);

  return (
    <Button
      style={{ ...defaultStyle, ...sizes, ...customStyle }}
      onClick={onClick}
      aria-label={`${type} button`}
    >
      <Icon {...{ iconSize, type }} />
    </Button>
  );
};

export default memo(IconButton);
